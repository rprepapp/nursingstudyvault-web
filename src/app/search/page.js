"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import Breadcrumb from "@/app/components/Breadcrumb";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q) {
      setLoading(false);
      return;
    }
    (async () => {
      const snap = await getDocs(
        query(collection(db, "files"), where("published", "==", true))
      );
      const all = snap.docs.map((d) => d.data());
      const filtered = all.filter((f) => {
        const searchText = q.toLowerCase();
        return (
          f.title.toLowerCase().includes(searchText) ||
          f.summary.toLowerCase().includes(searchText) ||
          (f.tags || []).some((t) => t.toLowerCase().includes(searchText)) ||
          (f.keywords || []).some((k) => k.toLowerCase().includes(searchText))
        );
      });
      setResults(filtered);
      setLoading(false);
    })();
  }, [q]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact navy header */}
      <div className="bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#00C2D1]/10 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-12 relative">
          <div className="[&_*]:!text-gray-300 [&_a:hover]:!text-[#00C2D1] mb-6">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
          </div>

          <h1 className="font-extrabold text-3xl md:text-4xl mb-3 text-white">
            Search Results
          </h1>
          <p className="text-base text-gray-300">
            {loading ? "Searching..." : `Found ${results.length} file${results.length !== 1 ? "s" : ""} for "${q}"`}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-6 relative pb-16">
        {loading ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-gray-100">
            <div className="text-sm text-gray-500">Loading...</div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-[#00C2D1]/40">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-extrabold text-lg text-[#0B1F3A] mb-2">No files found for "{q}"</p>
            <p className="text-sm max-w-sm mx-auto mb-8 text-gray-500">
              Try a different keyword, or request the topic you're looking for.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 rounded-full font-bold text-sm text-[#0B1F3A] bg-[#00C2D1] hover:bg-[#33d1de] transition-colors"
            >
              Request a file
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {results.map((f) => (
              <a
                key={f.slug}
                href={`/${f.categorySlug}/${f.slug}`}
                className="group relative overflow-hidden block p-5 rounded-2xl bg-white border-2 border-gray-100 hover:border-[#00C2D1] hover:shadow-md transition-all"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0B1F3A] group-hover:bg-[#00C2D1] transition-colors"></div>
                <div className="font-bold text-lg text-[#0B1F3A] group-hover:text-[#0891a1] transition-colors">
                  {f.title}
                </div>
                <div className="text-sm mt-1 text-gray-600">
                  {f.summary}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#00C2D1]/15 text-[#0891a1]">
                    {f.categorySlug.replace(/-/g, " ")}
                  </span>
                  {f.tags?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
