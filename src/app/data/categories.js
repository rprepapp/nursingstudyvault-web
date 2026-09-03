export const categories = [
  {
    slug: "nursing-care-plan",
    name: "Nursing Care Plan",
    description: "A consistent assessment-to-evaluation format applied to nearly every disease condition — ready to fill in and submit as part of your practical file.",
    keywords: ["diagnosis", "nursing diagnosis", "nanda", "assessment", "intervention", "evaluation", "goal", "rationale"],
    color: { bg: "#F1ECFF", text: "#3D2E85", sub: "#6C5FA8" },
  },
  {
    slug: "case-study",
    name: "Case Study",
    description: "Complete patient case files covering history, assessment, diagnosis, and nursing management, structured the way clinical postings expect.",
    keywords: ["diagnosis", "patient history", "clinical", "assessment"],
    color: { bg: "#FFEAF2", text: "#8A1F52", sub: "#B45D82" },
  },
  {
    slug: "assignment",
    name: "Assignment",
    description: "Ready-to-submit written assignments covering a wide range of nursing topics, structured with clear headings and explanations.",
    keywords: ["written work", "topics", "homework"],
    color: { bg: "#FFF1E2", text: "#8A4E10", sub: "#B4783C" },
  },
  {
    slug: "procedure",
    name: "Procedure",
    description: "Step-by-step nursing procedure write-ups, including purpose, equipment, and technique, for practical and viva preparation.",
    keywords: ["technique", "equipment", "viva", "skill"],
    color: { bg: "#E4FBF7", text: "#0E6B5F", sub: "#3F9186" },
  },
  {
    slug: "health-education",
    name: "Health Education",
    description: "Patient and community health teaching materials and health talk write-ups, ready for classroom or clinical use.",
    keywords: ["teaching", "patient education", "community"],
    color: { bg: "#EAF2FF", text: "#1E4F9C", sub: "#5B82BE" },
  },
  {
    slug: "surgical-care-plan",
    name: "Surgical Care Plan",
    description: "Pre-operative and post-operative nursing care plans covering assessment, risk, and recovery-focused interventions.",
    keywords: ["diagnosis", "pre-operative", "post-operative", "surgery", "intervention", "assessment"],
    color: { bg: "#F2FBE6", text: "#4C6B1F", sub: "#7A9256" },
  },
  {
    slug: "health-talk",
    name: "Health Talk",
    description: "Structured community health talk scripts and outlines for patient and public health education sessions.",
    keywords: ["community", "public health", "education session"],
    color: { bg: "#FFF0F0", text: "#8A2F2F", sub: "#B46A6A" },
  },
  {
    slug: "family-folder",
    name: "Family Folder",
    description: "Family study and home visit records for community health nursing postings, including assessment formats.",
    keywords: ["assessment", "home visit", "community health", "family study"],
    color: { bg: "#F0F4FF", text: "#2E3E8A", sub: "#6272B4" },
  },
  {
    slug: "case-presentation",
    name: "Case Presentation",
    description: "Structured clinical case presentation formats for seminars and case discussions during clinical postings.",
    keywords: ["diagnosis", "seminar", "clinical", "case discussion"],
    color: { bg: "#FFF6E0", text: "#8A6A10", sub: "#B49A3C" },
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}
