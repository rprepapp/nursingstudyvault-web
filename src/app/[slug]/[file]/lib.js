import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export async function getFileFromFirestore(categorySlug, fileSlug) {
  const q = query(
    collection(db, "files"),
    where("categorySlug", "==", categorySlug),
    where("slug", "==", fileSlug),
    where("published", "==", true)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data();
}
