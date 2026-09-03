"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
      <div className="max-w-lg mx-auto text-center relative">

        <div className="text-6xl mb-6">⚠️</div>

        <div className="inline-block text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-6 bg-orange-50 text-orange-700 border border-orange-200">
          Something went wrong
        </div>

        <h1 className="font-extrabold text-3xl md:text-4xl mb-4 text-[#0B1F3A]">
          This page <span className="text-[#00C2D1]">hit a snag.</span>
        </h1>

        <p className="text-base max-w-md mx-auto mb-10 text-gray-600">
          Something unexpected happened while loading this page. You can try again, or head back
          to the homepage.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => reset()}
            className="px-7 py-3 rounded-full font-bold text-sm text-[#0B1F3A] bg-[#00C2D1] hover:bg-[#33d1de] transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="px-7 py-3 rounded-full font-bold text-sm border-2 border-[#0B1F3A] text-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white transition-colors"
          >
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
