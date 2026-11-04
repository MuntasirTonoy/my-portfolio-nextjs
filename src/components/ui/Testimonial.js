"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import ReviewCard from "@/components/ui/ReviewCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/motion";

const breakpoints = {
  0: { slidesPerView: 1 },
  640: { slidesPerView: 1.2 },
  768: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
};

const Testimonials = ({ reviews = [] }) => (
  <section className="bg-base-100 overflow-hidden py-16">
    <div className="max-w-6xl mx-auto px-4 lg:px-8">
      <SectionHeading eyebrow="Testimonials" title={<>What <span className="text-spotify">People</span> Say</>} className="mb-8 sm:mb-12" />

      <motion.div {...fadeUp(0.2, 30)}>
        {reviews.length > 0 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            spaceBetween={20}
            breakpoints={breakpoints}
            style={{ paddingBottom: "60px", paddingTop: "20px" }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id} className="h-auto!">
                <ReviewCard {...review} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center text-base-content/30 italic py-10">
            No testimonials yet. Be the first to add one!
          </div>
        )}
      </motion.div>
    </div>
  </section>
);

export default Testimonials;
