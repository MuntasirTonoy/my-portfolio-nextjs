"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff, FiTrash2, FiUser, FiCheck } from "react-icons/fi";
import { fetchAllReviews, deleteReview, updateReviewStatus, errorMessage } from "@/lib/api";
import { SectionWrapper, Card } from "@/components/admin/AdminComponents";
import { CardSkeleton } from "@/components/ui/Skeleton";
import RemoteImage from "@/components/ui/RemoteImage";

const ReviewsManager = () => {
  const [reviews, setReviews] = useState(null);
  const [confirmingId, setConfirmingId] = useState(null);

  useEffect(() => {
    fetchAllReviews()
      .then(setReviews)
      .catch((err) => {
        toast.error(errorMessage(err, "Failed to load reviews"));
        setReviews([]);
      });
  }, []);

  const handleDelete = async (id) => {
    // First click arms the button, second click deletes.
    if (confirmingId !== id) {
      setConfirmingId(id);
      return;
    }
    setConfirmingId(null);
    try {
      await deleteReview(id);
      setReviews((list) => list.filter((r) => r._id !== id));
      toast.success("Review deleted");
    } catch (err) {
      toast.error(errorMessage(err, "Failed to delete review"));
    }
  };

  const toggleStatus = async (id, isPublished) => {
    try {
      await updateReviewStatus(id, !isPublished);
      setReviews((list) => list.map((r) => (r._id === id ? { ...r, isPublished: !isPublished } : r)));
      toast.success(!isPublished ? "Review is now visible on the home page" : "Review hidden");
    } catch (err) {
      toast.error(errorMessage(err, "Failed to update status"));
    }
  };

  if (!reviews) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const pending = reviews.filter((r) => !r.isPublished).length;

  return (
    <SectionWrapper
      title="Testimonials Manager"
      description={`Approve, unpublish, or delete reviews submitted by your visitors.${
        pending ? ` ${pending} awaiting approval.` : ""
      }`}
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
              <Card
                className={`h-full flex flex-col border ${
                  review.isPublished ? "border-spotify/20" : "border-base-content/10 bg-base-300/30"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  {review.avatar ? (
                    <RemoteImage
                      src={review.avatar}
                      alt={review.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-md object-cover border border-base-content/10"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-md bg-base-200 flex items-center justify-center font-bold text-base-content/50">
                      {review.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">{review.name}</h4>
                    <p className="text-xs text-base-content/40 truncate">{review.role}</p>
                  </div>
                  <div
                    className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${
                      review.isPublished ? "bg-spotify/20 text-spotify" : "bg-yellow-500/20 text-yellow-600"
                    }`}
                  >
                    {review.isPublished ? "LIVE" : "PENDING"}
                  </div>
                </div>

                <p className="text-sm italic text-base-content/60 mb-6 flex-1 line-clamp-4">
                  &ldquo;{review.review}&rdquo;
                </p>

                <div className="flex gap-2 pt-4 border-t border-base-300">
                  <button
                    type="button"
                    onClick={() => toggleStatus(review._id, review.isPublished)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      review.isPublished
                        ? "bg-base-200 hover:bg-base-300 text-base-content/60"
                        : "bg-spotify/10 hover:bg-spotify/20 text-spotify"
                    }`}
                  >
                    {review.isPublished ? (
                      <>
                        <FiEyeOff /> Unpublish
                      </>
                    ) : (
                      <>
                        <FiEye /> Publish
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(review._id)}
                    onBlur={() => setConfirmingId((id) => (id === review._id ? null : id))}
                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      confirmingId === review._id
                        ? "bg-red-500 text-white"
                        : "bg-red-500/10 hover:bg-red-500/20 text-red-500"
                    }`}
                    aria-label={confirmingId === review._id ? "Confirm delete" : "Delete review"}
                    title="Delete permanently"
                  >
                    {confirmingId === review._id ? (
                      <>
                        <FiCheck /> Confirm
                      </>
                    ) : (
                      <FiTrash2 />
                    )}
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
