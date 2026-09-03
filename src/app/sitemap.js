import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

const SITE_LAST_REVISED = new Date("2026-08-01");

async function getPublishedFiles() {
  const snap = await getDocs(query(collection(db, "files"), where("published", "==", true)));
  return snap.docs.map((d) => d.data());
}

export default async function sitemap() {
  const baseUrl = "https://nursingstudyvault.online";

  const staticPages = [
    "",
    "/about",
    "/contact",
    "/disclaimer",
    "/privacy",
    "/terms",
    "/categories",
  ];

  const categories = [
    "nursing-care-plan",
    "case-study",
    "assignment",
    "procedure",
    "health-education",
    "surgical-care-plan",
    "health-talk",
    "family-folder",
    "case-presentation",
  ];

  const staticEntries = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: SITE_LAST_REVISED,
    changeFrequency: "weekly",
    priority: path === "" ? 1.0 : 0.6,
  }));

  const categoryEntries = categories.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: SITE_LAST_REVISED,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const files = await getPublishedFiles();
  const fileEntries = files.map((f) => {
    const ts = f.updatedAt || f.createdAt;
    const lastModified = ts && ts.toDate ? ts.toDate() : SITE_LAST_REVISED;
    return {
      url: `${baseUrl}/${f.categorySlug}/${f.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    };
  });

  return [...staticEntries, ...categoryEntries, ...fileEntries];
}
