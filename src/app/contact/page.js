import Breadcrumb from "@/app/components/Breadcrumb";

export const metadata = {
  title: "Contact Us | NursingStudyVault",
  description: "Get in touch with NursingStudyVault to request a subject, report an issue with a file, or ask a question about our nursing practical file library.",
  alternates: { canonical: "https://nursingstudyvault.online/contact" },
};

const contactCards = [
  { icon: "📧", label: "General Support", value: "support@nursingstudyvault.online", desc: "Questions about using the site or finding files." },
  { icon: "💬", label: "Help Desk", value: "help@nursingstudyvault.online", desc: "Report an issue or need direct assistance." },
];

const topics = [
  {
    icon: "📝",
    title: "Request a subject or file",
    body: "If your practical file requires a disease condition, case study format, or care plan that isn't in the vault yet, send us the subject name and the exact type of file required (for example, \"Nursing Care Plan — Chronic Kidney Disease\"). We review requests regularly and prioritise the most requested topics when adding new files each week.",
    cta: { label: "Go to Request Page", href: "/request" },
  },
  {
    icon: "⚠️",
    title: "Report an issue with a file",
    body: "Found something in a file that looks incorrect, outdated, or inconsistent with your textbook or clinical protocol? Please tell us which file it is and what needs correcting, so we can review and update it. Reports like this directly improve the accuracy of the vault for every student who downloads that file after you.",
  },
  {
    icon: "🏫",
    title: "Partnerships and colleges",
    body: "If you represent a nursing college or training institute and would like to discuss how NursingStudyVault could support your students, write to us at the address above with \"Institution enquiry\" in the subject line.",
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ===== Navy Hero ===== */}
      <div className="bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C2D1]/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#00C2D1]/10 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-16 relative">
          <div className="[&_*]:!text-gray-300 [&_a:hover]:!text-[#00C2D1] mb-6">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 bg-[#00C2D1]/15 border border-[#00C2D1]/40 text-[#00C2D1] rounded-full font-bold text-xs uppercase tracking-wide">
              Get In Touch
            </div>
            <h1 className="font-extrabold text-4xl md:text-5xl mb-5 text-white">
              We'd Love to <span className="text-[#00C2D1]">Hear From You</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-gray-300">
              Questions, corrections, or a subject you'd like to see added — reach out anytime.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-8 relative pb-16">

        {/* Quick contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {contactCards.map((c) => (
            <a
              key={c.value}
              href={`mailto:${c.value}`}
              className="group bg-white rounded-2xl border-2 border-[#00C2D1]/20 hover:border-[#00C2D1] transition-colors p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <span className="w-12 h-12 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-xl flex-shrink-0">
                  {c.icon}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">{c.label}</div>
                  <div className="font-bold text-[#0B1F3A] group-hover:text-[#0891a1] transition-colors text-sm break-all">
                    {c.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{c.desc}</div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Topic sections */}
        <div className="flex flex-col gap-5">
          {topics.map((t) => (
            <section key={t.title} className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-lg flex-shrink-0">
                  {t.icon}
                </span>
                <h2 className="font-extrabold text-xl md:text-2xl text-[#0B1F3A]">{t.title}</h2>
              </div>
              <p className="text-base leading-relaxed text-gray-700">
                {t.body}
              </p>
              {t.cta && (
                <a
                  href={t.cta.href}
                  className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-[#0891a1] hover:underline"
                >
                  {t.cta.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </section>
          ))}
        </div>

        {/* Response time strip */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <span className="text-xs font-semibold px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600">⏱️ 3-5 Day Response</span>
          <span className="text-xs font-semibold px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600">🆓 Always Free to Reach Us</span>
          <span className="text-xs font-semibold px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600">📍 Serving Students Across India</span>
        </div>

      </div>
    </div>
  );
}
