export const blogPosts = [
  {
    slug: "how-to-write-nursing-care-plan",
    title: "How to Write a Nursing Care Plan — Step by Step Guide",
    excerpt: "Learn the complete process of writing a nursing care plan with NANDA diagnoses, interventions, and evaluation.",
    content: `
      <h2>What is a Nursing Care Plan?</h2>
      <p>A nursing care plan is a written document that outlines the nursing care a patient will receive. It includes assessment, nursing diagnosis, goals, interventions, and evaluation.</p>
      
      <h2>Step 1: Assessment</h2>
      <p>Collect data about the patient's health status through observation, interview, and physical examination.</p>
      
      <h2>Step 2: Nursing Diagnosis</h2>
      <p>Use NANDA-approved nursing diagnoses to identify patient problems.</p>
      
      <h2>Step 3: Goals and Outcomes</h2>
      <p>Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound).</p>
      
      <h2>Step 4: Nursing Interventions</h2>
      <p>Plan specific actions to achieve the goals.</p>
      
      <h2>Step 5: Evaluation</h2>
      <p>Assess whether the goals were achieved.</p>
    `,
    category: "Study Tips",
    tags: ["nursing care plan", "nanda", "nursing process"],
    author: "NursingStudyVault Team",
    date: "2026-09-01",
    readTime: "5 min read"
  },
  {
    slug: "top-10-nursing-diagnoses",
    title: "Top 10 Most Common NANDA Nursing Diagnoses",
    excerpt: "Learn the most frequently used nursing diagnoses and their definitions.",
    content: `
      <h2>1. Acute Pain</h2>
      <p>Definition: Unpleasant sensory and emotional experience associated with actual or potential tissue damage.</p>
      
      <h2>2. Impaired Physical Mobility</h2>
      <p>Definition: Limitation in independent, purposeful physical movement of the body.</p>
      
      <h2>3. Risk for Infection</h2>
      <p>Definition: At increased risk for being invaded by pathogenic organisms.</p>
      
      <h2>4. Imbalanced Nutrition: Less Than Body Requirements</h2>
      <p>Definition: Intake of nutrients insufficient to meet metabolic needs.</p>
      
      <h2>5. Impaired Gas Exchange</h2>
      <p>Definition: Excess or deficit in oxygenation and/or carbon dioxide elimination.</p>
    `,
    category: "Nursing Diagnosis",
    tags: ["nanda", "nursing diagnosis", "care plan"],
    author: "NursingStudyVault Team",
    date: "2026-08-28",
    readTime: "4 min read"
  },
  {
    slug: "nursing-interventions-guide",
    title: "Complete Guide to Nursing Interventions with Rationales",
    excerpt: "Learn how to write effective nursing interventions with evidence-based rationales.",
    content: `
      <h2>What are Nursing Interventions?</h2>
      <p>Nursing interventions are actions taken by nurses to achieve patient outcomes. Each intervention should have a rationale based on evidence.</p>
      
      <h2>Types of Interventions</h2>
      <ul>
        <li><strong>Independent:</strong> Actions the nurse can perform without a doctor's order</li>
        <li><strong>Dependent:</strong> Actions that require a doctor's order</li>
        <li><strong>Collaborative:</strong> Actions performed with other healthcare team members</li>
      </ul>
      
      <h2>Common Interventions and Rationales</h2>
      <ul>
        <li><strong>Positioning:</strong> Promotes comfort and prevents complications</li>
        <li><strong>Medication Administration:</strong> Follows the 6 rights of medication administration</li>
        <li><strong>Patient Education:</strong> Empowers patients to manage their health</li>
      </ul>
    `,
    category: "Interventions",
    tags: ["nursing interventions", "rationale", "nursing care"],
    author: "NursingStudyVault Team",
    date: "2026-08-25",
    readTime: "6 min read"
  }
];

export function getBlogPost(slug) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRecentBlogPosts(limit = 3) {
  return [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
}
