import Breadcrumb from "@/app/components/Breadcrumb";

export const metadata = {
  title: "Disclaimer | NursingStudyVault",
  description: "NursingStudyVault content is for educational purposes only and is not a substitute for professional medical advice. Read our full disclaimer.",
  alternates: { canonical: "https://nursingstudyvault.online/disclaimer" },
};

const sections = [
  { id: "purpose", title: "1. Educational purpose only", body: `All content on NursingStudyVault.online — including community health files, disease condition write-ups, case studies, nursing care plans, and any other material — is provided strictly for academic and educational purposes. It is intended to help nursing students structure and understand their practical files and coursework.` },
  { id: "not-medical-advice", title: "2. Not medical advice", body: `Nothing on this Site constitutes medical advice, diagnosis, or treatment recommendations for any real patient. Content related to diseases, conditions, medications, dosages, or clinical procedures is written for study purposes and must never be used to make actual clinical or patient-care decisions. Always consult a qualified healthcare professional, your clinical instructor, or your institution's protocols before applying any information from this Site in a real clinical setting.` },
  { id: "no-relationship", title: "3. No doctor-patient or nurse-patient relationship", body: `Use of this Site does not create a doctor-patient, nurse-patient, or any other healthcare provider relationship between you and NursingStudyVault. We are not a healthcare provider and do not offer clinical consultations of any kind.` },
  { id: "accuracy", title: "4. Accuracy and currency of information", body: `Medical and nursing knowledge, drug information, and clinical guidelines change over time. While we take reasonable care to keep files accurate and aligned with commonly taught nursing curricula, we do not guarantee that every file reflects the most current clinical guidelines, drug protocols, or your specific institution's requirements. Always cross-check clinical details against current, authoritative textbooks and your institution's own standards before relying on them academically or clinically.` },
  { id: "liability", title: "5. No liability", body: `NursingStudyVault, its creators, and contributors accept no liability for any loss, damage, or adverse outcome — academic, clinical, or otherwise — arising from the use of, reliance on, or inability to use content on this Site. You use this Site and its content entirely at your own discretion and risk.` },
  { id: "contact", title: "6. Questions about this disclaimer", body: null },
];

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">

        <div className="mb-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />
        </div>

        <div className="mb-10 pb-8 border-b border-gray-200">
          <h1 className="font-extrabold text-3xl md:text-4xl text-[#0B1F3A] mb-2">Disclaimer</h1>
          <p className="text-sm text-gray-500">Last updated: September 1, 2026</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">

          {/* ===== Sticky Table of Contents ===== */}
          <nav className="hidden lg:block lg:sticky lg:top-6 lg:self-start">
            <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-4">On this page</div>
            <ul className="flex flex-col gap-1 border-l-2 border-gray-100">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block pl-4 py-1.5 text-sm text-gray-500 hover:text-[#0891a1] hover:border-l-2 hover:border-[#00C2D1] hover:-ml-0.5 transition-all"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ===== Content ===== */}
          <div className="min-w-0 max-w-2xl">

            <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 border border-gray-200 rounded-lg p-4 mb-10">
              <strong className="text-[#0B1F3A]">In short:</strong> All content here is for academic study only —
              it is not medical advice and must not be used for real patient care. Always verify against
              your institution's protocols.
            </div>

            <div className="flex flex-col gap-10">
              {sections.slice(0, 5).map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-6">
                  <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">
                    {s.title}
                  </h2>
                  <p className="text-[15px] leading-7 text-gray-700">
                    {s.body}
                  </p>
                </section>
              ))}

              <section id="contact" className="scroll-mt-6">
                <h2 className="font-bold text-lg text-[#0B1F3A] mb-3 pb-2 border-b border-gray-100">
                  6. Questions about this disclaimer
                </h2>
                <p className="text-[15px] leading-7 text-gray-700">
                  If you have questions about this Disclaimer, contact us at{" "}
                  <a href="mailto:support@nursingstudyvault.online" className="font-semibold text-[#0891a1] hover:underline">
                    support@nursingstudyvault.online
                  </a>.
                </p>
              </section>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
