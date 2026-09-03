import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/app/data/categories";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import Breadcrumb from "@/app/components/Breadcrumb";

export const dynamic = "force-dynamic";

async function getFilesForCategory(categorySlug) {
  try {
    const q = query(
      collection(db, "files"),
      where("categorySlug", "==", categorySlug),
      where("published", "==", true)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error fetching category files:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} | Free Nursing Practical Files & Notes | NursingStudyVault`,
    description: `Download free ${category.name.toLowerCase()} for nursing students. ${category.description} Get ready-to-use practical files, assignments, and study material for GNM and BSc Nursing.`,
    keywords: `${category.name}, nursing practical files, ${category.name.toLowerCase()}, GNM nursing, BSc nursing, nursing assignments, ${slug.replace(/-/g, ' ')}`,
    alternates: { canonical: `https://nursingstudyvault.online/${slug}` },
    openGraph: {
      title: `${category.name} | Free Nursing Files`,
      description: `Download free ${category.name.toLowerCase()} for nursing students. ${category.description}`,
      type: "website",
      url: `https://nursingstudyvault.online/${slug}`,
    },
  };
}

function formatDate(ts) {
  if (!ts) return "";
  try {
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return "";
  }
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const files = await getFilesForCategory(slug);
  const nameLower = category.name.toLowerCase();

  const faqs = [
    {
      q: `What is ${category.name}?`,
      a: `${category.name} is an essential part of nursing education. ${category.description} It helps nursing students develop practical skills and theoretical knowledge required for their GNM and BSc Nursing programs.`
    },
    {
      q: `How to download ${nameLower} files?`,
      a: `Simply browse through our collection of ${nameLower} files below, click on any file that interests you, and download it for free. All files are in PDF format and ready to use.`
    },
    {
      q: `Are these ${nameLower} files free?`,
      a: `Yes! All ${nameLower} files on NursingStudyVault are completely free for nursing students. We believe in making quality nursing education accessible to everyone.`
    },
    {
      q: `Can I request a specific ${nameLower} file?`,
      a: `Absolutely! If you need a specific ${nameLower} file that's not available in our collection, you can request it through our request page and we'll create it for you.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Categories", href: "/categories" },
              { label: category.name },
            ]}
          />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-5 py-2.5 bg-[#00C2D1]/10 border border-[#00C2D1]/30 text-[#0891a1] rounded-full font-bold text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v2H7V5zm6 4H7v2h6V9zm-6 4h6v2H7v-2z" clipRule="evenodd" />
            </svg>
            {files.length} Files Available
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] mb-4">
            {category.name}
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            {category.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white border-2 border-gray-100 rounded-xl px-6 py-4 shadow-sm">
              <div className="text-2xl font-extrabold text-[#0B1F3A]">{files.length}</div>
              <div className="text-sm text-gray-600 font-medium mt-1">Files</div>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-xl px-6 py-4 shadow-sm">
              <div className="text-2xl font-extrabold text-[#00C2D1]">FREE</div>
              <div className="text-sm text-gray-600 font-medium mt-1">Downloads</div>
            </div>
            <div className="bg-white border-2 border-gray-100 rounded-xl px-6 py-4 shadow-sm">
              <div className="text-2xl font-extrabold text-[#0B1F3A]">PDF</div>
              <div className="text-sm text-gray-600 font-medium mt-1">Format</div>
            </div>
          </div>
        </div>

        {/* Files List */}
        {files.length === 0 ? (
          <div className="text-center py-16 bg-white border-2 border-dashed border-[#00C2D1]/40 rounded-2xl">
            <div className="text-6xl mb-4">📚</div>
            <p className="font-extrabold text-2xl text-[#0B1F3A] mb-2">
              Files for this category are on the way.
            </p>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              We're actively adding {nameLower} files to the vault. Check back soon, or let us know exactly what you need.
            </p>
            <a
              href="/request"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-[#0B1F3A] bg-[#00C2D1] hover:bg-[#33d1de] transition-colors"
            >
              Request a file
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {files.map((f) => {
              return (
                <a
                  key={f.slug || f.id}
                  href={`/${slug}/${f.slug}`}
                  className="group flex items-start gap-4 bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#00C2D1] hover:shadow-md transition-all"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#0B1F3A] rounded-xl flex items-center justify-center text-2xl">
                    📄
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-3 py-1 rounded-full text-[#0B1F3A] bg-[#00C2D1]">
                        {category.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        📅 {formatDate(f.createdAt)}
                      </span>
                      {f.downloads && (
                        <span className="text-xs text-gray-500">
                          ⬇️ {f.downloads} downloads
                        </span>
                      )}
                    </div>
                    <h2 className="font-bold text-lg text-[#0B1F3A] group-hover:text-[#0891a1] transition-colors mb-1">
                      {f.title}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {f.summary}
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-center text-gray-400 group-hover:text-[#00C2D1] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* SEO Content Section — Blog/Article style */}
        <article className="mt-14 bg-white border-2 border-gray-100 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <span className="h-px w-10 bg-[#00C2D1]"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0891a1]">Article</span>
            <span className="h-px w-10 bg-[#00C2D1]"></span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B1F3A] mb-6 text-center">
            About {category.name}
          </h2>
          <div className="max-w-3xl mx-auto space-y-5">
            <p className="text-gray-700 leading-8 text-[15px] first-letter:text-4xl first-letter:font-extrabold first-letter:text-[#0B1F3A] first-letter:mr-1 first-letter:float-left">
              {category.description} Our collection of {nameLower} files is specifically designed for GNM and BSc Nursing students. Each file is carefully prepared by nursing experts and follows the latest curriculum guidelines.
            </p>
            <p className="text-gray-700 leading-8 text-[15px]">
              All {nameLower} files are available in PDF format for easy download and printing. Whether you're preparing for practical exams, completing assignments, or building your nursing portfolio, our resources will help you succeed.
            </p>
            <p className="text-gray-700 leading-8 text-[15px] border-l-4 border-[#00C2D1] pl-4 italic text-gray-600">
              We regularly update our collection with new {nameLower} files based on student requests and curriculum changes. Don't forget to bookmark this page and check back for new additions!
            </p>
          </div>
        </article>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-extrabold text-[#0B1F3A] mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden open:border-[#00C2D1]"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-bold text-[#0B1F3A]">{faq.q}</span>
                  <span className="text-[#00C2D1] text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="relative overflow-hidden bg-[#0B1F3A] rounded-3xl p-8 md:p-12">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#00C2D1]/15 rounded-full blur-3xl"></div>
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                Need a specific <span className="text-[#00C2D1]">{category.name}</span>?
              </h2>
              <p className="text-gray-300 text-lg max-w-md mx-auto mb-8">
                Request a topic and we'll add it to the vault within 48 hours.
              </p>
              <a
                href="/request"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-[#0B1F3A] bg-[#00C2D1] hover:bg-[#33d1de] shadow-lg transition-all"
              >
                Request a File
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
