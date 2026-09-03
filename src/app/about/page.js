import Breadcrumb from "@/app/components/Breadcrumb";

export const metadata = {
  title: "About Us | NursingStudyVault",
  description: "Learn how NursingStudyVault helps nursing students access ready-to-use community health files, disease condition write-ups, case studies, and nursing care plans.",
  alternates: { canonical: "https://nursingstudyvault.online/about" },
};

const fileTypes = [
  { icon: "🏘️", title: "Community Health Nursing", desc: "Family studies, health surveys, and home visit records." },
  { icon: "🩺", title: "Medical-Surgical Nursing", desc: "Disease write-ups covering pathophysiology, clinical features and nursing management." },
  { icon: "👶", title: "OBG Nursing", desc: "Case files across antenatal, intranatal and postnatal care." },
  { icon: "🧒", title: "Pediatric Nursing", desc: "Growth & development records, immunisation schedules, and child case studies." },
  { icon: "🧠", title: "Psychiatric Nursing", desc: "Mental status examinations and psychiatric case records." },
  { icon: "📋", title: "Nursing Care Plans", desc: "A consistent assessment-to-evaluation format across every subject." },
];

const values = [
  { icon: "🎯", title: "Curriculum Aligned", desc: "Every file follows commonly taught nursing curricula and standard nursing process documentation." },
  { icon: "🔁", title: "Consistent Structure", desc: "A fixed format so only the clinical content changes — never the layout." },
  { icon: "✅", title: "Quality Checked", desc: "Content is reviewed for accuracy against standard textbooks before publishing." },
  { icon: "🆓", title: "Always Free", desc: "No signup, no paywall, no hidden charges — built to be accessible to every student." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ===== Navy Hero ===== */}
      <div className="bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C2D1]/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#00C2D1]/10 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-16 relative">
          <div className="[&_*]:!text-gray-300 [&_a:hover]:!text-[#00C2D1] mb-6">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 bg-[#00C2D1]/15 border border-[#00C2D1]/40 text-[#00C2D1] rounded-full font-bold text-xs uppercase tracking-wide">
              About Us
            </div>
            <h1 className="font-extrabold text-4xl md:text-5xl mb-5 text-white">
              Built for <span className="text-[#00C2D1]">Nursing Students</span>, by Design
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-gray-300">
              A structured library of practical files, case studies and nursing care plans —
              built for GNM and BSc Nursing students across India.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-8 relative pb-16">

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          <div className="bg-white rounded-2xl border-2 border-[#00C2D1]/20 p-5 text-center shadow-sm">
            <div className="text-2xl md:text-3xl font-extrabold text-[#0B1F3A]">320+</div>
            <div className="text-xs text-gray-500 font-medium mt-1">Files Available</div>
          </div>
          <div className="bg-white rounded-2xl border-2 border-[#00C2D1]/20 p-5 text-center shadow-sm">
            <div className="text-2xl md:text-3xl font-extrabold text-[#0B1F3A]">9</div>
            <div className="text-xs text-gray-500 font-medium mt-1">Categories</div>
          </div>
          <div className="bg-white rounded-2xl border-2 border-[#00C2D1]/20 p-5 text-center shadow-sm">
            <div className="text-2xl md:text-3xl font-extrabold text-[#0B1F3A]">100%</div>
            <div className="text-xs text-gray-500 font-medium mt-1">Free Access</div>
          </div>
        </div>

        {/* Why we exist */}
        <section className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-10 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-lg">💡</span>
            <h2 className="font-extrabold text-2xl text-[#0B1F3A]">Why We Exist</h2>
          </div>
          <p className="mb-4 text-base leading-relaxed text-gray-700">
            Every nursing student, from GNM to BSc Nursing, is required to maintain detailed
            practical files throughout their clinical postings — community health surveys,
            disease condition write-ups, case studies, and nursing care plans for nearly every
            subject. These files take hours to research, structure and write correctly, and the
            expected format varies little from college to college, yet students end up rebuilding
            the same structure from scratch every single time.
          </p>
          <p className="text-base leading-relaxed text-gray-700">
            NursingStudyVault was created to remove that repetitive burden. Instead of starting
            each file from a blank page, students can reference a properly structured, well
            researched file for the subject or condition they are working on, and adapt it to
            their own clinical observations and their institution's specific requirements —
            saving hours of preparation time on every submission.
          </p>
        </section>

        {/* What you'll find — card grid */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-6 px-1">
            <span className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-lg">📚</span>
            <h2 className="font-extrabold text-2xl text-[#0B1F3A]">What You'll Find Here</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fileTypes.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border-2 border-gray-100 hover:border-[#00C2D1] transition-colors p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <h3 className="font-bold text-[#0B1F3A] text-sm mb-1">{f.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our approach to quality — values grid */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-6 px-1">
            <span className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-lg">🛡️</span>
            <h2 className="font-extrabold text-2xl text-[#0B1F3A]">Our Approach to Quality</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {values.map((v) => (
              <div key={v.title} className="bg-[#00C2D1]/5 border-2 border-[#00C2D1]/20 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2">{v.icon}</div>
                <h3 className="font-bold text-[#0B1F3A] text-xs mb-1">{v.title}</h3>
                <p className="text-[11px] text-gray-600 leading-snug">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8">
            <p className="mb-4 text-base leading-relaxed text-gray-700">
              Every file follows a fixed, standard structure so that the format itself is never a
              source of confusion — only the clinical content changes from one topic to the next.
              Content is written to align with commonly taught nursing curricula and standard
              nursing process documentation (assessment, nursing diagnosis, goal setting,
              intervention with rationale, and evaluation).
            </p>
            <div className="flex gap-3 rounded-lg border-l-4 border-[#00C2D1] bg-[#00C2D1]/5 p-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-bold text-[#0B1F3A]">Please note: </span>
                These files are intended as structured study and reference material to support your
                own learning and clinical documentation — not as a substitute for your institution's
                curriculum, your clinical instructor's guidance, or established nursing practice
                standards. Always verify clinical content against your current textbooks and
                institutional protocols before submission or clinical use.
              </p>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-10 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-lg">🎓</span>
            <h2 className="font-extrabold text-2xl text-[#0B1F3A]">Who It's For</h2>
          </div>
          <p className="text-base leading-relaxed text-gray-700 mb-4">
            NursingStudyVault is built primarily for <strong className="text-[#0B1F3A]">GNM (General Nursing and Midwifery)</strong> and{" "}
            <strong className="text-[#0B1F3A]">BSc Nursing</strong> students in India, but the resources are equally useful for
            nursing tutors preparing teaching material, and any healthcare student looking for well-structured
            reference documentation.
          </p>
          <p className="text-base leading-relaxed text-gray-700">
            Whether you're preparing for a clinical posting submission, revising before a practical exam, or
            building your own nursing portfolio, the vault is designed to be a starting point you can trust —
            not a replacement for your own understanding of the subject.
          </p>
        </section>

        {/* Get in touch — CTA */}
        <section className="p-8 rounded-2xl text-center bg-[#0B1F3A] relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00C2D1]/20 rounded-full blur-2xl"></div>
          <div className="relative">
            <p className="font-extrabold text-lg mb-2 text-white">📩 Get in Touch</p>
            <p className="text-sm mb-5 text-gray-300 max-w-md mx-auto">
              NursingStudyVault is an independent, growing project. If you'd like to see a subject
              or condition added, or have feedback on an existing file, we'd love to hear from you.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-2.5 rounded-full font-bold text-sm text-[#0B1F3A] bg-[#00C2D1] hover:bg-[#33d1de] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
