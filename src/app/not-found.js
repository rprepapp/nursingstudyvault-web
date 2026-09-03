export const metadata = {
  title: "Page Not Found | NursingStudyVault",
  description: "The page you're looking for doesn't exist. Browse our nursing practical file categories instead.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
      <div className="max-w-lg mx-auto text-center relative">

        {/* Big faded 404 background number */}
        <div className="text-[120px] md:text-[160px] font-extrabold leading-none text-[#0B1F3A]/5 select-none">
          404
        </div>

        <div className="-mt-16 md:-mt-24 relative">
          <div className="inline-block text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-6 bg-[#00C2D1]/15 text-[#0891a1] border border-[#00C2D1]/30">
            Page Not Found
          </div>

          <h1 className="font-extrabold text-3xl md:text-4xl mb-4 text-[#0B1F3A]">
            This file isn't in the <span className="text-[#00C2D1]">vault.</span>
          </h1>

          <p className="text-base max-w-md mx-auto mb-10 text-gray-600">
            The page you're looking for may have moved, been renamed, or doesn't exist yet.
            Try browsing our categories instead, or head back home.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/"
              className="px-7 py-3 rounded-full font-bold text-sm text-[#0B1F3A] bg-[#00C2D1] hover:bg-[#33d1de] transition-colors"
            >
              Back to home
            </a>
            <a
              href="/categories"
              className="px-7 py-3 rounded-full font-bold text-sm border-2 border-[#0B1F3A] text-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white transition-colors"
            >
              Browse categories
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
