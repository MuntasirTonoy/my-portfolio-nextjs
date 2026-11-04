"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import ReviewCard from "@/components/ui/ReviewCard";

const breakpoints = {
  0: { slidesPerView: 1 },
  640: { slidesPerView: 1.2 },
  768: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
};

const Testimonials = ({ reviews = [] }) => (
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

      {reviews.length > 0 ? (
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={20}
          breakpoints={breakpoints}
          style={{ paddingBottom: "60px", paddingTop: "20px" }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
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

export default Testimonials;
