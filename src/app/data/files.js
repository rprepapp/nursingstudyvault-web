export const files = [
  {
    categorySlug: "nursing-care-plan",
    slug: "sample-file",
    title: "Sample File — Template Preview",
    summary:
      "This is a placeholder file used only to test the file page template. It will be replaced with real, fully written nursing content.",
    readTime: "5 min read",
    sections: [
      { heading: "Assessment", body: "Sample assessment content will appear here." },
      { heading: "Nursing Diagnosis", body: "Sample nursing diagnosis content will appear here." },
      { heading: "Goal", body: "Sample goal content will appear here." },
      { heading: "Intervention", body: "Sample intervention content will appear here." },
      { heading: "Evaluation", body: "Sample evaluation content will appear here." },
    ],
    pdfUrl: null,
  },
];

export function getFile(categorySlug, fileSlug) {
  return files.find((f) => f.categorySlug === categorySlug && f.slug === fileSlug);
}

export function getFilesByCategory(categorySlug) {
  return files.filter((f) => f.categorySlug === categorySlug);
}
