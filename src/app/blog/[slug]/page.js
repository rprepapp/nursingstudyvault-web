import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";
import { blogPosts, getBlogPost } from "@/app/data/blog";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | NursingStudyVault Blog`,
    description: post.excerpt,
  };
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navy header band — matches blog listing page */}
      <div className="bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C2D1]/15 rounded-full blur-3xl"></div>
        <div className="max-w-3xl mx-auto px-6 pt-8 pb-14 relative">
          <div className="[&_*]:!text-gray-300 [&_a:hover]:!text-[#00C2D1] mb-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#00C2D1] text-[#0B1F3A]">
              {post.category}
            </span>
            <span className="text-xs text-gray-400">
              {formatDate(post.date)}
            </span>
            <span className="text-xs text-gray-400">
              ⏱️ {post.readTime}
            </span>
          </div>

          <h1 className="font-extrabold text-3xl md:text-4xl mb-6 text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-[#00C2D1] text-[#0B1F3A]">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-sm text-white">{post.author}</div>
              <div className="text-xs text-gray-400">Nursing Educator</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-8 relative pb-16">
        <div className="bg-white rounded-2xl border-2 border-[#00C2D1]/20 p-6 md:p-10">

          <div
            className="page-content prose prose-slate prose-lg max-w-none
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
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="font-bold text-sm mb-3 text-[#0B1F3A]">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-[#00C2D1]/15 hover:text-[#0B1F3A] transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA — navy + cyan glow */}
        <div className="mt-8 p-8 rounded-2xl text-center bg-[#0B1F3A] relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00C2D1]/20 rounded-full blur-2xl"></div>
          <div className="relative">
            <p className="font-extrabold text-lg mb-2 text-white">📚 Want to learn more?</p>
            <p className="text-sm mb-5 text-gray-300">
              Browse our{" "}
              <Link href="/categories" className="text-[#00C2D1] font-bold hover:underline">
                practical files
              </Link>{" "}
              for nursing students.
            </p>
            <Link
              href="/categories"
              className="inline-block px-6 py-2.5 rounded-full font-bold text-sm text-[#0B1F3A] bg-[#00C2D1] hover:bg-[#33d1de] transition-colors"
            >
              Browse Files
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
