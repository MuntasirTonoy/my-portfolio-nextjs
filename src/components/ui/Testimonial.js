"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import ReviewCard from "@/components/ui/ReviewCard";
import { fetchReviews } from "@/lib/api";
import { CardSkeleton } from "@/components/ui/Skeleton";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data && data.length ? data : []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } finally {
        setTimeout(() => setLoading(false), 500); // Small delay for smooth transition
      }
    };
    getReviews();
  }, []);

  return (
    <motion.section
      className="bg-base-100 overflow-hidden py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h4 className="text-spotify font-bold text-sm sm:text-lg mb-2 uppercase tracking-widest">
            TESTIMONIALS
          </h4>
          <h2 className="text-2xl sm:text-5xl font-extrabold">
            What <span className="text-spotify">People</span> Say
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardSkeleton />
            <CardSkeleton className="hidden md:block" />
            <CardSkeleton className="hidden lg:block" />
          </div>
        ) : reviews.length > 0 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ paddingBottom: "60px", paddingTop: "20px" }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={review._id || index}>
                <ReviewCard {...review} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center text-base-content/30 italic py-10">
            No testimonials yet. Be the first to add one!
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Testimonials;
