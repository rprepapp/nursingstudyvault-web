import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { categories as categoryList } from "@/app/data/categories";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "NursingStudyVault | Free Nursing Practical Files, Care Plans & Case Studies",
  description: "Download ready-to-use community health files, disease condition write-ups, case studies, and nursing care plans for GNM and BSc Nursing practical files.",
  alternates: { canonical: "https://nursingstudyvault.online" },
};

const categories = categoryList.map((c) => ({
  name: c.name,
  desc: c.description,
  href: `/${c.slug}`,
  bg: c.color.bg,
  text: c.color.text,
  sub: c.color.sub,
  slug: c.slug,
}));

async function getFileCounts() {
  try {
    const snap = await getDocs(query(collection(db, "files"), where("published", "==", true)));
    const total = snap.size;
    const perCategory = {};
    snap.docs.forEach((d) => {
      const cat = d.data().categorySlug;
      perCategory[cat] = (perCategory[cat] || 0) + 1;
    });
    return { total, perCategory };
  } catch (error) {
    console.error("Error fetching file counts:", error);
    return { total: 0, perCategory: {} };
  }
}

async function getRecentFiles() {
  try {
    const q = query(
      collection(db, "files"),
      where("published", "==", true),
      limit(6)
    );
    const snap = await getDocs(q);
    const files = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return files.sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() || 0;
      const dateB = b.createdAt?.toDate?.() || 0;
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching recent files:", error);
    return [];
  }
}

function formatDate(ts) {
  if (!ts) return "";
  try {
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

export default async function Home() {
  const { total, perCategory } = await getFileCounts();
  const recentFiles = await getRecentFiles();

  return (
    <div className="min-h-screen bg-white">

      {/* ====== HERO SECTION ====== */}
      <section className="bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C2D1]/10 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-16 md:pb-20 relative">
          <div className="text-center max-w-4xl mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-[#00C2D1]/15 border border-[#00C2D1]/40 text-[#00C2D1] rounded-full font-bold text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% Free for Nursing Students
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Practical Files for{" "}
              <span className="text-[#00C2D1]">Nursing Students</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Ready-to-use nursing care plans, case studies, assignments and more —
              completely free for GNM and BSc Nursing students.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
              <div className="bg-white/5 border border-[#00C2D1]/30 rounded-xl px-6 py-4">
                <div className="text-3xl font-extrabold text-[#00C2D1]">{total}</div>
                <div className="text-sm text-gray-300 font-medium mt-1">Files</div>
              </div>
              <div className="bg-white/5 border border-[#00C2D1]/30 rounded-xl px-6 py-4">
                <div className="text-3xl font-extrabold text-[#00C2D1]">{categories.length}</div>
                <div className="text-sm text-gray-300 font-medium mt-1">Categories</div>
              </div>
              <div className="bg-white/5 border border-[#00C2D1]/30 rounded-xl px-6 py-4">
                <div className="text-3xl font-extrabold text-[#00C2D1]">100%</div>
                <div className="text-sm text-gray-300 font-medium mt-1">Free Access</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/categories"
                className="px-8 py-3.5 rounded-full font-bold text-[#0B1F3A] bg-[#00C2D1] hover:bg-[#33d1de] shadow-lg transition-all"
              >
                Browse All Files
              </a>
              <a
                href="/request"
                className="px-8 py-3.5 rounded-full font-bold text-white bg-white/10 border-2 border-white/20 hover:bg-white/20 transition-all"
              >
                Request a File
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FEATURES SECTION ====== */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0B1F3A]/[0.03] border-2 border-[#0B1F3A]/10 rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#0B1F3A] rounded-xl flex items-center justify-center text-2xl mb-4">📚</div>
              <h3 className="font-extrabold text-[#0B1F3A] mb-2">Comprehensive Content</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Detailed care plans, case studies, and assignments following NANDA guidelines and nursing curriculum.
              </p>
            </div>
            <div className="bg-[#00C2D1]/10 border-2 border-[#00C2D1]/30 rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#00C2D1] rounded-xl flex items-center justify-center text-2xl mb-4">⚡</div>
              <h3 className="font-extrabold text-[#0B1F3A] mb-2">Ready to Download</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                All files are in PDF format, properly formatted, and instantly downloadable. No signup required.
              </p>
            </div>
            <div className="bg-[#0B1F3A]/[0.03] border-2 border-[#0B1F3A]/10 rounded-2xl p-6">
              <div className="w-12 h-12 bg-[#0B1F3A] rounded-xl flex items-center justify-center text-2xl mb-4">🎯</div>
              <h3 className="font-extrabold text-[#0B1F3A] mb-2">Regularly Updated</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                New files added weekly based on student requests and latest curriculum changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CATEGORIES SECTION ====== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3A] mb-4">
              Browse Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find exactly what you need from our organized collection of nursing study materials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c) => {
              const count = perCategory[c.slug] || 0;
              return (
                <a
                  key={c.slug}
                  href={c.href}
                  className="group bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#00C2D1] hover:shadow-xl transition-all relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0B1F3A] group-hover:bg-[#00C2D1] transition-colors"></div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#0B1F3A] rounded-xl flex items-center justify-center text-2xl">
                      📄
                    </div>
                    <span className="text-xs font-bold text-[#0B1F3A] bg-[#00C2D1]/20 px-3 py-1 rounded-full">
                      {count} files
                    </span>
                  </div>
                  <h3 className="font-extrabold text-[#0B1F3A] mb-2 group-hover:text-[#0891a1] transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {c.desc}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-bold text-[#0B1F3A]">
                    Explore
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== RECENT FILES SECTION ====== */}
      {recentFiles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3A] mb-4">
                Latest Files
              </h2>
              <p className="text-gray-600">
                Recently added nursing study materials
              </p>
            </div>

            <div className="space-y-4">
              {recentFiles.map((f) => {
                const cat = categoryList.find((c) => c.slug === f.categorySlug);
                return (
                  <a
                    key={f.id}
                    href={`/${f.categorySlug}/${f.slug}`}
                    className="group flex items-start gap-4 bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#00C2D1] hover:shadow-lg transition-all"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[#0B1F3A] rounded-xl flex items-center justify-center text-2xl">
                      📄
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-bold px-3 py-1 rounded-full text-[#0B1F3A] bg-[#00C2D1]">
                          {cat?.name || f.categorySlug}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(f.createdAt)}
                        </span>
                      </div>
                      <div className="font-bold text-[#0B1F3A] group-hover:text-[#0891a1] transition-colors">
                        {f.title}
                      </div>
                    </div>
                    <div className="flex-shrink-0 self-center text-gray-400 group-hover:text-[#0B1F3A] transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <a
                href="/categories"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-[#0B1F3A] bg-[#00C2D1]/20 hover:bg-[#00C2D1]/30 transition-colors"
              >
                View All Files
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ====== CTA SECTION ====== */}
      <section className="py-16 bg-[#0B1F3A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Need a Specific File?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Request any nursing file you need and we'll create it for you within 48 hours.
          </p>
          <a
            href="/request"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-[#0B1F3A] bg-[#00C2D1] hover:bg-[#33d1de] shadow-lg transition-all"
          >
            Request Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

    </div>
  );
}
