import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/app/data/categories";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import Breadcrumb from "@/app/components/Breadcrumb";
import ShareButtons from "@/app/components/ShareButtons";
import PrintButton from "@/app/components/PrintButton";

export const dynamic = "force-dynamic";

function toEmbedDriveLink(url) {
  if (!url) return url;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const id = match ? match[1] : null;
  return id ? `https://drive.google.com/file/d/${id}/preview` : url;
}

function estimateReadTime(html) {
  const text = (html || "").replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

async function getFileFromFirestore(categorySlug, fileSlug) {
  try {
    const q = query(
      collection(db, "files"),
      where("categorySlug", "==", categorySlug),
      where("slug", "==", fileSlug),
      where("published", "==", true)
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return snap.docs[0].data();
  } catch (error) {
    console.error("Error fetching file:", error);
    return null;
  }
}

async function getRelatedFiles(categorySlug, excludeSlug) {
  try {
    const q = query(
      collection(db, "files"),
      where("categorySlug", "==", categorySlug),
      where("published", "==", true),
      limit(5)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => d.data())
      .filter((f) => f.slug !== excludeSlug)
      .slice(0, 3);
  } catch (error) {
    console.error("Error fetching related files:", error);
    return [];
  }
}

function formatDate(ts) {
  if (!ts) return null;
  try {
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return null;
  }
}

function toISODate(ts) {
  if (!ts) return null;
  try {
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toISOString();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug, file } = await params;
  const fileData = await getFileFromFirestore(slug, file);
  if (!fileData) return {};

  return {
    title: `${fileData.title} | Free Download | NursingStudyVault`,
    description: fileData.summary,
    keywords: `${fileData.title}, nursing practical file, ${slug.replace(/-/g, ' ')}, GNM nursing, BSc nursing`,
    alternates: { canonical: `https://nursingstudyvault.online/${slug}/${file}` },
    openGraph: {
      title: `${fileData.title} | NursingStudyVault`,
      description: fileData.summary,
      type: "article",
      url: `https://nursingstudyvault.online/${slug}/${file}`,
    },
  };
}

export default async function FilePage({ params }) {
  const { slug, file } = await params;
  const category = getCategoryBySlug(slug);
  const fileData = await getFileFromFirestore(slug, file);

  if (!category || !fileData) notFound();

  const relatedFiles = await getRelatedFiles(slug, file);
  const pageUrl = `https://nursingstudyvault.online/${slug}/${file}`;
  const publishDate = formatDate(fileData.createdAt);
  const updatedDate = formatDate(fileData.updatedAt || fileData.createdAt);
  const readTime = estimateReadTime(fileData.pageContent);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fileData.title,
    description: fileData.summary,
    datePublished: toISODate(fileData.createdAt),
    dateModified: toISODate(fileData.updatedAt || fileData.createdAt),
    author: { "@type": "Organization", name: "NursingStudyVault Team" },
    publisher: {
      "@type": "Organization",
      name: "NursingStudyVault",
      url: "https://nursingstudyvault.online",
    },
    mainEntityOfPage: pageUrl,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Navy title block */}
      <div className="bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C2D1]/15 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-10 relative">
          <div className="mb-6 [&_*]:!text-gray-300 [&_a:hover]:!text-[#00C2D1]">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Categories", href: "/categories" },
                { label: category.name, href: `/${category.slug}` },
                { label: fileData.title },
              ]}
            />
          </div>

          <span className="inline-block text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-md mb-4 text-[#0B1F3A] bg-[#00C2D1]">
            {category.name}
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight max-w-3xl">
            {fileData.title}
          </h1>
          {fileData.summary && (
            <p className="text-gray-300 text-base leading-relaxed mb-5 max-w-2xl">
              {fileData.summary}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
            <span className="text-[#00C2D1] font-semibold">NursingStudyVault Team</span>
            <span>·</span>
            {publishDate && <span>{publishDate}</span>}
            {updatedDate && updatedDate !== publishDate && (
              <>
                <span>·</span>
                <span>Updated {updatedDate}</span>
              </>
            )}
            <span>·</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

          {/* ===== MAIN COLUMN ===== */}
          <div className="min-w-0 bg-white rounded-2xl border-2 border-[#00C2D1]/20 p-6 md:p-8">

            {/* Disclaimer */}
            <div className="flex gap-3 rounded-lg border-l-4 border-[#00C2D1] bg-[#00C2D1]/5 p-4 mb-8">
              <div className="text-sm text-gray-700 leading-relaxed">
                <span className="font-bold text-[#0B1F3A]">Note: </span>
                This file is structured to align with standard nursing curriculum and NANDA-based
                care planning guidelines. It is for academic reference only and is not a substitute
                for clinical judgment or your institution's protocols. See our{" "}
                <a href="/disclaimer" className="text-[#0891a1] font-semibold hover:underline">full disclaimer</a>.
              </div>
            </div>

            {/* Content */}
            <div
              className="page-content prose prose-slate max-w-none
                prose-headings:text-[#0B1F3A] prose-headings:font-extrabold
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-ul:text-gray-700 prose-ol:text-gray-700
                prose-li:text-gray-700 prose-li:leading-relaxed
                prose-strong:text-[#0B1F3A]
                prose-table:border prose-table:border-gray-200
                prose-th:bg-gray-100 prose-th:text-[#0B1F3A] prose-th:font-semibold prose-th:px-3 prose-th:py-2
                prose-td:text-gray-700 prose-td:px-3 prose-td:py-2 prose-td:border prose-td:border-gray-200
                prose-a:text-[#0891a1] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-[#00C2D1] prose-blockquote:bg-[#00C2D1]/5 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-lg"
              dangerouslySetInnerHTML={{ __html: fileData.pageContent || "" }}
            />

            {/* ===== PDF VIEWER (view only, no download) ===== */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-[#0B1F3A] flex items-center justify-center text-sm">📄</span>
                <h2 className="font-extrabold text-lg text-[#0B1F3A]">View Full Document</h2>
              </div>
              <div className="text-sm text-gray-500 mb-4">
                Use the zoom and page controls inside the viewer below to read the complete file. This document is for on-site viewing only.
              </div>
              <div className="rounded-2xl overflow-hidden border-2 border-[#0B1F3A]/10 bg-gray-100" style={{ aspectRatio: "3 / 4" }}>
                <iframe
                  src={toEmbedDriveLink(fileData.driveLink)}
                  className="w-full h-full"
                  allow="autoplay"
                  title={fileData.title}
                />
              </div>
            </div>

            {/* Tags */}
            {fileData.tags && fileData.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {fileData.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold px-3 py-1.5 rounded-md bg-[#0B1F3A]/5 text-[#0B1F3A] hover:bg-[#00C2D1]/20 transition-colors"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share row */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-bold text-[#0B1F3A]">Share this file</span>
              <div className="flex items-center gap-3">
                <ShareButtons url={pageUrl} title={fileData.title} />
                <PrintButton />
              </div>
            </div>
          </div>

          {/* ===== SIDEBAR ===== */}
          <aside className="lg:sticky lg:top-6 lg:self-start flex flex-col gap-5">

            {/* View info box (replaces download box) */}
            <div className="rounded-2xl bg-[#0B1F3A] overflow-hidden relative">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#00C2D1]/20 rounded-full blur-2xl"></div>
              <div className="p-5 relative">
                <div className="font-extrabold text-white text-sm flex items-center gap-2 mb-3">👁️ View Only</div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  This file can be viewed directly on the page — pinch or use the on-screen controls to zoom and navigate between pages.
                  Downloading is disabled to keep the vault's content protected.
                </p>
              </div>
            </div>

            {/* File info box */}
            <div className="rounded-2xl border-2 border-[#00C2D1]/30 bg-white p-5">
              <div className="text-xs font-bold uppercase tracking-wide text-[#0891a1] mb-3">File Info</div>
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Category</span><span className="font-bold text-[#0B1F3A]">{category.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Format</span><span className="font-bold text-[#0B1F3A]">PDF (View Only)</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Access</span><span className="font-bold text-[#0B1F3A]">Free</span></div>
              </div>
            </div>

            {/* Request box */}
            <div className="rounded-2xl bg-[#00C2D1]/10 border-2 border-[#00C2D1]/30 p-5 text-center">
              <div className="text-sm text-[#0B1F3A] font-semibold mb-3">Need something specific?</div>
              <a href="/request" className="inline-block text-sm font-bold text-[#0891a1] hover:underline">
                Request a File →
              </a>
            </div>

            {/* Related files */}
            {relatedFiles.length > 0 && (
              <div className="rounded-2xl border-2 border-gray-100 overflow-hidden">
                <div className="bg-[#0B1F3A] px-5 py-3">
                  <div className="text-white font-bold text-sm">Related in {category.name}</div>
                </div>
                <div className="flex flex-col divide-y divide-gray-100">
                  {relatedFiles.map((f) => (
                    <a
                      key={f.slug}
                      href={`/${category.slug}/${f.slug}`}
                      className="p-4 hover:bg-[#00C2D1]/5 transition-colors"
                    >
                      <div className="font-semibold text-sm text-[#0B1F3A] mb-1">{f.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-2">{f.summary}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>

        </div>
      </div>
    </div>
  );
}
