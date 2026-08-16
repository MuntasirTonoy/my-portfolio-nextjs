"use client";

import React, { useState, useEffect } from "react";
import { fetchReviews, deleteReview, updateReviewStatus } from "@/lib/api";
import { SectionWrapper, Card } from "@/components/admin/AdminComponents";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff, FiTrash2, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { CardSkeleton } from "@/components/ui/Skeleton";

const ReviewsManager = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const data = await fetchReviews(true); // Fetch ALL reviews
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This testimonial will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteReview(id);
        Swal.fire("Deleted!", "Review has been removed.", "success");
        setReviews(reviews.filter((r) => r._id !== id));
      } catch (err) {
        Swal.fire("Error", "Failed to delete review", "error");
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await updateReviewStatus(id, !currentStatus);
      setReviews(
        reviews.map((r) =>
          r._id === id ? { ...r, isPublished: !currentStatus } : r
        )
      );
      Swal.fire({
        title: !currentStatus ? "Published!" : "Unpublished!",
        text: !currentStatus ? "Review is now visible on home page." : "Review is now hidden.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );

  return (
    <SectionWrapper
      title="Testimonials Manager"
      description="Approve, unpublish, or delete reviews submitted by your visitors."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className={`h-full flex flex-col border ${review.isPublished ? 'border-spotify/20' : 'border-base-content/10 bg-base-300/30'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-md object-cover border border-base-content/10"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">{review.name}</h4>
                    <p className="text-xs text-base-content/40 truncate">{review.role}</p>
                  </div>
                  <div className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${review.isPublished ? 'bg-spotify/20 text-spotify' : 'bg-base-content/10 text-base-content/40'}`}>
                    {review.isPublished ? 'LIVE' : 'HIDDEN'}
                  </div>
                </div>

                <p className="text-sm italic text-base-content/60 mb-6 flex-1 line-clamp-4">
                  "{review.review}"
                </p>

                <div className="flex gap-2 pt-4 border-t border-base-300">
                  <button
                    onClick={() => toggleStatus(review._id, review.isPublished)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      review.isPublished 
                        ? 'bg-base-200 hover:bg-base-300 text-base-content/60' 
                        : 'bg-spotify/10 hover:bg-spotify/20 text-spotify'
                    }`}
                  >
                    {review.isPublished ? <><FiEyeOff /> Unpublish</> : <><FiEye /> Publish</>}
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="px-4 py-2 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all cursor-pointer"
                    title="Delete Permanently"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {reviews.length === 0 && (
          <div className="col-span-full py-20 text-center bg-base-300/50 rounded-3xl border-2 border-dashed border-base-content/10">
            <FiUser className="mx-auto text-4xl text-base-content/20 mb-4" />
            <p className="text-base-content/40">No reviews found yet.</p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default ReviewsManager;
