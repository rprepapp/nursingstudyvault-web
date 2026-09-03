import { categories } from "@/app/data/categories";
import Breadcrumb from "@/app/components/Breadcrumb";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Browse All Categories | NursingStudyVault",
  description: "Browse all nursing practical file categories — Nursing Care Plans, Case Studies, Assignments, Procedures, Health Education and more.",
  alternates: { canonical: "https://nursingstudyvault.online/categories" },
};

async function getFileCounts() {
  try {
    const snap = await getDocs(query(collection(db, "files"), where("published", "==", true)));
    const perCategory = {};
    snap.docs.forEach((d) => {
      const cat = d.data().categorySlug;
      perCategory[cat] = (perCategory[cat] || 0) + 1;
    });
    return perCategory;
  } catch (error) {
    console.error("Error fetching category counts:", error);
    return {};
  }
}

export default async function CategoriesPage() {
  const perCategory = await getFileCounts();
  const totalFiles = Object.values(perCategory).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">

        <div className="mb-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Categories" }]} />
        </div>

        {/* Header */}
        <div className="mb-10 pb-6 border-b-2 border-gray-100">
          <div className="text-xs font-bold uppercase tracking-wide text-[#0891a1] mb-3">
            Category Index
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3A] mb-3">
            Browse All Categories
          </h1>
          <p className="text-base text-gray-600">
            {categories.length} categories · {totalFiles} files total
          </p>
        </div>

        {/* Numbered Index List */}
        <div className="flex flex-col">
          {categories.map((c, index) => {
            const count = perCategory[c.slug] || 0;
            const icons = ["🏥", "💊", "🩺", "🧬", "📋", "🔬", "💉", "🏨", "📝", "🩹", "🧠", "❤️"];
            const icon = icons[index % icons.length];

            return (
              <a
                key={c.slug}
                href={`/${c.slug}`}
                className="group flex items-baseline gap-4 md:gap-5 py-5 border-b border-dashed border-gray-200 hover:bg-gray-50 transition-colors -mx-2 px-2 rounded-lg"
              >
                <span className="text-lg md:text-xl font-extrabold text-[#00C2D1] min-w-[32px] flex-shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="font-bold text-base md:text-lg text-[#0B1F3A] group-hover:text-[#0891a1] transition-colors">
                    {icon} {c.name}
                  </div>
                  <div className="text-[13px] md:text-sm text-gray-500 mt-1 leading-relaxed">
                    {c.description}
                  </div>
                </div>

                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {count > 0 ? `${count} files` : "Coming soon"}
                  </span>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-[#00C2D1] group-hover:translate-x-1 transition-all hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            );
          })}
        </div>

        {/* CTA — slim bar, matches editorial tone */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0B1F3A] rounded-xl p-6 md:p-7">
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-extrabold text-white mb-1">Can't find what you need?</h2>
            <p className="text-gray-300 text-sm">Request a specific file and we'll create it for you.</p>
          </div>
          <a
            href="/request"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm text-[#0B1F3A] bg-[#00C2D1] hover:bg-[#33d1de] transition-all whitespace-nowrap"
          >
            Request a File
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
}
