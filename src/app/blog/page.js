import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";
import { blogPosts } from "@/app/data/blog";

export const metadata = {
  title: "Nursing Blog | NursingStudyVault",
  description: "Read nursing study tips, care plan guides, and exam preparation articles from NursingStudyVault.",
};

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navy header band */}
      <div className="bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C2D1]/15 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-16 relative">
          <div className="[&_*]:!text-gray-300 [&_a:hover]:!text-[#00C2D1] mb-6">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 bg-[#00C2D1]/15 border border-[#00C2D1]/40 text-[#00C2D1] rounded-full font-bold text-xs uppercase tracking-wide">
              {posts.length} Articles
            </div>
            <h1 className="font-extrabold text-4xl md:text-5xl mb-4 text-white">
              Nursing <span className="text-[#00C2D1]">Blog</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-gray-300">
              Study tips, care plan guides, and nursing exam preparation articles.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-8 relative pb-16">
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-[#00C2D1]/40">
            <div className="text-5xl mb-4">✍️</div>
            <p className="font-extrabold text-lg text-[#0B1F3A] mb-2">No blog posts yet.</p>
            <p className="text-sm text-gray-500">Check back soon for new articles.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-[#00C2D1] hover:shadow-lg transition-all relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0B1F3A] group-hover:bg-[#00C2D1] transition-colors"></div>

                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#00C2D1]/15 text-[#0891a1]">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(post.date)}
                  </span>
                  <span className="text-xs text-gray-400">
                    ⏱️ {post.readTime}
                  </span>
                </div>

                <h2 className="font-extrabold text-xl mb-2 text-[#0B1F3A] group-hover:text-[#0891a1] transition-colors">
                  {post.title}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between mt-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 group-hover:bg-[#00C2D1]/10 group-hover:text-[#0B1F3A] transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#0B1F3A] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
