"use client";
import { useState } from "react";
import Image from "next/image";
import { categories } from "@/app/data/categories";
import { files } from "@/app/data/files";

const directLinks = [
  { name: "Nursing Care Plan", href: "/nursing-care-plan" },
  { name: "Case Study", href: "/case-study" },
  { name: "Assignment", href: "/assignment" },
];

const moreLinks = [
  { name: "Procedure", href: "/procedure" },
  { name: "Health Education", href: "/health-education" },
  { name: "Surgical Care Plan", href: "/surgical-care-plan" },
  { name: "Health Talk", href: "/health-talk" },
  { name: "Family Folder", href: "/family-folder" },
  { name: "Case Presentation", href: "/case-presentation" },
];

function ChevronIcon() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
      <path d="M1 1L5 5L9 1" stroke="#00C2D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ color = "#0B1F3A" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="6.5" stroke={color} strokeWidth="1.8" />
      <path d="M18 18L14 14" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();

  const matchedCategories = q
    ? categories.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      )
    : [];

  const matchedFiles = q
    ? files.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.summary.toLowerCase().includes(q)
      )
    : [];

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <>
      <header className="sticky top-0 z-[9999] w-full bg-[#0B1F3A] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo.svg"
                alt="NursingStudyVault logo"
                width={40}
                height={40}
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-extrabold text-xl text-white">
                Nursing<span className="text-[#00C2D1]">Study</span>
                <span className="text-white">Vault</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-200">
              <a href="/" className="hover:text-[#00C2D1] transition-colors">
                Home
              </a>
              {directLinks.map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  className="hover:text-[#00C2D1] transition-colors"
                >
                  {c.name}
                </a>
              ))}

              <div className="relative">
                <button
                  className="flex items-center gap-1.5 hover:text-[#00C2D1] transition-colors"
                  onClick={() => setMoreOpen((v) => !v)}
                >
                  More
                  <ChevronIcon />
                </button>
                {moreOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[9998]"
                      onClick={() => setMoreOpen(false)}
                    />
                    <div
                      className="absolute top-full left-0 mt-3 w-56 rounded-xl overflow-y-auto z-[9999] bg-white border-2 border-[#00C2D1] shadow-2xl"
                      style={{ maxHeight: "340px" }}
                    >
                      {moreLinks.map((c) => (
                        <a
                          key={c.href}
                          href={c.href}
                          className="block px-5 py-3 text-sm font-semibold text-[#0B1F3A] hover:bg-[#00C2D1]/15 transition-colors"
                          onClick={() => setMoreOpen(false)}
                        >
                          {c.name}
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <a href="/contact" className="hover:text-[#00C2D1] transition-colors">
                Contact
              </a>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <SearchIcon color="#fff" />
              </button>
              <a
                href="/categories"
                className="inline-block px-6 py-2.5 rounded-full font-bold text-sm text-[#0B1F3A] bg-[#00C2D1] hover:bg-[#33d1de] transition-colors shadow-md"
              >
                Browse Vault
              </a>
            </div>

            {/* Mobile: search + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="p-2 rounded-lg bg-white/10 transition-colors"
              >
                <SearchIcon color="#fff" />
              </button>
              <button
                className="flex flex-col gap-1.5 p-2 rounded-lg bg-white/10 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <span className="block w-6 h-0.5 bg-[#00C2D1]" />
                <span className="block w-6 h-0.5 bg-[#00C2D1]" />
                <span className="block w-6 h-0.5 bg-[#00C2D1]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[10000] flex flex-col bg-white">
          <div className="flex items-center gap-3 px-6 py-5 border-b-2 border-[#00C2D1] bg-[#0B1F3A]">
            <SearchIcon color="#fff" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search categories or files..."
              className="flex-1 text-base outline-none bg-transparent text-white placeholder-gray-400"
            />
            <button
              onClick={closeSearch}
              aria-label="Close search"
              className="text-3xl leading-none text-[#00C2D1] hover:text-white transition-colors"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {q === "" ? (
              <p className="text-sm text-gray-500">
                Start typing to search categories and files.
              </p>
            ) : matchedCategories.length === 0 && matchedFiles.length === 0 ? (
              <p className="text-sm text-gray-500">
                No results for &quot;{query}&quot;. Try a different term, or{" "}
                <a href="/contact" className="text-[#0B1F3A] font-bold hover:underline">
                  request it
                </a>
                .
              </p>
            ) : (
              <div className="flex flex-col gap-8">
                {matchedCategories.length > 0 && (
                  <div>
                    <div className="text-xs font-bold uppercase mb-3 text-[#0B1F3A]">
                      Categories
                    </div>
                    <div className="flex flex-col gap-1">
                      {matchedCategories.map((c) => (
                        <a
                          key={c.slug}
                          href={`/${c.slug}`}
                          onClick={closeSearch}
                          className="py-3 border-b border-gray-100 hover:bg-[#00C2D1]/10 rounded-lg px-3 transition-colors"
                        >
                          <div className="font-bold text-sm text-[#0B1F3A]">{c.name}</div>
                          <div className="text-xs mt-1 text-gray-500">{c.description}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {matchedFiles.length > 0 && (
                  <div>
                    <div className="text-xs font-bold uppercase mb-3 text-[#0891a1]">
                      Files
                    </div>
                    <div className="flex flex-col gap-1">
                      {matchedFiles.map((f) => (
                        <a
                          key={f.slug}
                          href={`/${f.categorySlug}/${f.slug}`}
                          onClick={closeSearch}
                          className="py-3 border-b border-gray-100 hover:bg-[#00C2D1]/10 rounded-lg px-3 transition-colors"
                        >
                          <div className="font-bold text-sm text-[#0B1F3A]">{f.title}</div>
                          <div className="text-xs mt-1 text-gray-500">{f.summary}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[10000] flex flex-col bg-[#0B1F3A]">
          <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
            <span className="font-extrabold text-xl text-white">
              Nursing<span className="text-[#00C2D1]">Study</span>Vault
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="text-3xl leading-none text-[#00C2D1] hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
          <div className="flex flex-col px-6 py-6 gap-1 overflow-y-auto text-base font-semibold text-white">
            <a
              href="/"
              className="py-3 border-b border-white/10 hover:bg-white/5 rounded-lg px-3 transition-colors"
            >
              🏠 Home
            </a>
            {directLinks.map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="py-3 border-b border-white/10 hover:bg-white/5 rounded-lg px-3 transition-colors"
              >
                📄 {c.name}
              </a>
            ))}
            <div className="py-3 border-b border-white/10">
              <div className="mb-2 font-bold text-xs uppercase text-[#00C2D1]">
                More categories
              </div>
              <div className="flex flex-col gap-3 pl-1">
                {moreLinks.map((c) => (
                  <a
                    key={c.href}
                    href={c.href}
                    className="text-gray-300 hover:text-[#00C2D1] rounded-lg px-3 py-1 transition-colors"
                  >
                    {c.name}
                  </a>
                ))}
              </div>
            </div>
            <a
              href="/contact"
              className="py-3 border-b border-white/10 hover:bg-white/5 rounded-lg px-3 transition-colors"
            >
              📞 Contact
            </a>
            <a
              href="/categories"
              className="mt-6 text-center px-6 py-3.5 rounded-full font-bold text-[#0B1F3A] bg-[#00C2D1] hover:bg-[#33d1de] transition-colors"
            >
              🚀 Browse Vault
            </a>
          </div>
        </div>
      )}
    </>
  );
}
