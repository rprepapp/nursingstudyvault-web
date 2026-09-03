"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

const Star = ({ filled, onClick, onHover }) => (
  <svg
    className="cursor-pointer transition-colors"
    onClick={onClick}
    onMouseEnter={onHover}
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill={filled ? "#FFD700" : "#E5E5EA"}
    stroke={filled ? "#FFD700" : "#E5E5EA"}
    strokeWidth="1"
  >
    <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
  </svg>
);

export default function Rating({ fileId, fileSlug, categorySlug }) {
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(true);

  // Generate a unique user ID from localStorage (no login required)
  function getUserId() {
    let userId = localStorage.getItem("nsv_user_id");
    if (!userId) {
      userId = "user_" + Math.random().toString(36).substring(2, 10);
      localStorage.setItem("nsv_user_id", userId);
    }
    return userId;
  }

  useEffect(() => {
    if (!fileId) return;

    const docRef = doc(db, "ratings", fileId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setAverageRating(data.average || 0);
        setTotalRatings(data.total || 0);
        const userId = getUserId();
        setUserRating(data.users?.[userId] || 0);
      } else {
        setAverageRating(0);
        setTotalRatings(0);
        setUserRating(0);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fileId]);

  const handleRating = async (rating) => {
    const userId = getUserId();
    const docRef = doc(db, "ratings", fileId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const oldRating = data.users?.[userId] || 0;
      let newTotal = data.total || 0;
      let newSum = (data.sum || 0) - oldRating + rating;
      if (oldRating === 0) newTotal += 1;

      await updateDoc(docRef, {
        [`users.${userId}`]: rating,
        total: newTotal,
        sum: newSum,
        average: newSum / newTotal,
        updatedAt: new Date(),
      });
    } else {
      await setDoc(docRef, {
        fileSlug,
        categorySlug,
        total: 1,
        sum: rating,
        average: rating,
        users: { [userId]: rating },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    setUserRating(rating);
  };

  if (loading) return <div className="text-sm" style={{ color: "#9A9FAD" }}>Loading...</div>;

  return (
    <div className="flex flex-col gap-2 p-4 rounded-2xl border" style={{ borderColor: "#EDEDF3" }}>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              filled={star <= (hoverRating || userRating)}
              onClick={() => handleRating(star)}
              onHover={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold" style={{ color: "#1B1D28" }}>
            {averageRating.toFixed(1)}
          </span>
          <span className="text-sm" style={{ color: "#9A9FAD" }}>
            ({totalRatings} {totalRatings === 1 ? "review" : "reviews"})
          </span>
        </div>
      </div>
      {userRating > 0 && (
        <div className="text-xs" style={{ color: "#20C4B5" }}>
          ✅ You rated this {userRating} stars
        </div>
      )}
    </div>
  );
}
