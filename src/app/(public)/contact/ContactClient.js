"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import Button from "@/components/ui/Button";
import RemoteImage from "@/components/ui/RemoteImage";
import { usePortfolio } from "@/components/providers/PortfolioProvider";
import { createReview, uploadImage, errorMessage } from "@/lib/api";

const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

const revealVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

// Only rows with a value are shown; links are only built from real values.
function buildContactInfo(contact) {
  return [
    contact.email && { icon: <FaEnvelope />, value: contact.email, link: `mailto:${contact.email}` },
    contact.phone && { icon: <FaPhone />, value: contact.phone, link: `tel:${contact.phone.replace(/\s/g, "")}` },
    contact.location && { icon: <FaMapMarkerAlt />, value: contact.location },
    contact.socialLinks?.github && { icon: <FaGithub />, value: "GitHub Profile", link: contact.socialLinks.github, external: true },
    contact.socialLinks?.linkedin && { icon: <FaLinkedin />, value: "LinkedIn Profile", link: contact.socialLinks.linkedin, external: true },
  ].filter(Boolean);
}

const ContactClient = () => {
  const { contact = {} } = usePortfolio();
  const [loading, setLoading] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: registerReview,
    handleSubmit: handleSubmitReview,
    reset: resetReview,
    formState: { errors: reviewErrors },
  } = useForm();

  const contactInfo = buildContactInfo(contact);

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_AVATAR_BYTES) {
      toast.error("Please choose an image smaller than 2 MB.");
      e.target.value = "";
      return;
    }
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const removeAvatar = () => {
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const onContactSubmit = async (data) => {
    if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) {
      toast.error("The contact form isn't configured yet. Please email me directly.");
      return;
    }
    setLoading(true);
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        { name: data.name, email: data.email, message: data.message },
        { publicKey: EMAILJS.publicKey }
      );
      toast.success("Your message has been sent!");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    resetReview();
    setRating(5);
    removeAvatar();
  };

  const onReviewSubmit = async (data) => {
    setReviewLoading(true);
    try {
      const avatar = avatarFile ? (await uploadImage(avatarFile)).url : undefined;
      const res = await createReview({ ...data, rating, avatar });
      toast.success(res.message || "Thanks! Your review will appear once it's approved.");
      closeReviewModal();
    } catch (error) {
      toast.error(errorMessage(error, "Failed to submit review. Please try again."));
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="min-h-screen my-20 bg-base-100 px-5 relative">
      <section className="py-16 md:px-5 lg:px-24 flex flex-col md:flex-row justify-center items-start gap-12 md:gap-16">
        {/* Left: Contact Info */}
        <motion.div
          className="w-full md:w-5/12 lg:w-4/12"
          variants={revealVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          custom={0}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-spotify mb-8">
            {contact.heading || "Get In Touch"}
          </h1>
          <p className="text-lg text-base-content/80 mb-8">
            {contact.description ||
              "Feel free to reach out for collaborations or just a friendly hello. I'll try my best to get back to you!"}
          </p>

          <ul className="space-y-4 mb-10">
            {contactInfo.map((item) => (
              <li
                key={item.value}
                className="flex items-start gap-4 text-lg text-base-content"
              >
                <span className="mt-1 text-spotify" aria-hidden="true">{item.icon}</span>
                {item.link ? (
                  <a
                    href={item.link}
                    {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="hover:text-spotify hover:underline transition-colors duration-200"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span>{item.value}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-12 md:pt-10 border-t border-base-content/5">
            <p className="text-xs font-bold text-base-content/30 uppercase tracking-[0.2em] mb-4">
              Client Feedback
            </p>
            <Button onClick={() => setIsReviewModalOpen(true)}>
              Add a Review <FaStar className="ml-1" />
            </Button>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.form
          onSubmit={handleSubmit(onContactSubmit)}
          className="w-full md:w-7/12 lg:w-6/12 space-y-6 bg-base-300 p-5 md:p-8 rounded-3xl border border-base-300"
          noValidate
          variants={revealVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          custom={0.3}
        >
          <h3 className="text-2xl font-bold text-spotify mb-6 flex items-center gap-3">
            Send Me a Message
          </h3>

          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text font-semibold">Your Name</span>
            </label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              type="text"
              className="input input-bordered w-full bg-base-100/50"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-error mt-2 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text font-semibold">Your Email</span>
            </label>
            <input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email address",
                },
              })}
              type="email"
              className="input input-bordered w-full bg-base-100/50"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-error mt-2 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="message" className="label">
              <span className="label-text font-semibold">Your Message</span>
            </label>
            <textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              className="textarea textarea-bordered w-full h-32 bg-base-100/50"
              placeholder="How can I help you?"
            ></textarea>
            {errors.message && (
              <p className="text-error mt-2 text-sm">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </motion.form>
      </section>

      {/* Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-base-100 w-full max-w-lg p-8 rounded-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-spotify/10 blur-3xl -z-10" />

              <h3 className="text-2xl font-bold mb-2">Share Your Experience</h3>
              <p className="text-sm text-base-content/60 mb-6">
                Your feedback helps me grow and helps others build trust.
              </p>

              <form
                onSubmit={handleSubmitReview(onReviewSubmit)}
                className="space-y-4"
              >
                {/* Honeypot: hidden from people, filled in by bots */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                  {...registerReview("website")}
                />
                {/* Rating Selector */}
                <div className="form-control mb-4">
                  <label className="label-text font-semibold mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                        aria-pressed={star === rating}
                        className="text-2xl transition-all duration-200"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                      >
                        <FaStar
                          className={
                            star <= (hoverRating || rating)
                              ? "text-yellow-500 scale-110"
                              : "text-base-content/10"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label-text font-semibold mb-2">
                      Name
                    </label>
                    <input
                      {...registerReview("name", {
                        required: "Name is required",
                        maxLength: { value: 80, message: "Max 80 characters" },
                      })}
                      maxLength={80}
                      placeholder="Your Name"
                      className="input input-bordered w-full"
                    />
                    {reviewErrors.name && (
                      <p className="text-error text-xs mt-1">
                        {reviewErrors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label-text font-semibold mb-2">
                      Role/Company
                    </label>
                    <input
                      {...registerReview("role", {
                        required: "Role is required",
                        maxLength: { value: 100, message: "Max 100 characters" },
                      })}
                      maxLength={100}
                      placeholder="e.g. CEO, XYZ Corp"
                      className="input input-bordered w-full"
                    />
                    {reviewErrors.role && (
                      <p className="text-error text-xs mt-1">
                        {reviewErrors.role.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="form-control">
                  <label className="label-text font-semibold mb-2">
                    Profile Image
                  </label>
                  <div className="flex flex-col gap-3">
                    {!avatarPreview ? (
                      <label className="cursor-pointer flex flex-col items-center justify-center w-full h-32 bg-base-200/50 border-2 border-dashed border-base-content/10 rounded-md text-sm hover:border-spotify transition-all font-medium">
                        <span className="text-2xl mb-2">📁</span>
                        <span>Upload Photo</span>
                        <span className="text-xs text-base-content/50 mt-1">JPG, PNG or WebP, up to 2 MB</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          className="hidden"
                          onChange={handleAvatarUpload}
                        />
                      </label>
                    ) : (
                      <div className="relative w-full h-32 rounded-md overflow-hidden border border-base-content/10 group">
                        <RemoteImage src={avatarPreview} alt="Avatar preview" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={removeAvatar}
                            className="btn btn-sm btn-error text-white font-bold"
                          >
                            Remove Photo
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-control">
                  <label className="label-text font-semibold mb-2">
                    Your Review
                  </label>
                  <textarea
                    {...registerReview("review", {
                      required: "Review text is required",
                      minLength: { value: 10, message: "Please write at least 10 characters" },
                      maxLength: { value: 1000, message: "Max 1000 characters" },
                    })}
                    maxLength={1000}
                    placeholder="Write your experience here..."
                    className="textarea textarea-bordered h-24 w-full"
                  />
                  {reviewErrors.review && (
                    <p className="text-error text-xs mt-1">
                      {reviewErrors.review.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={closeReviewModal}
                    className="btn border hover:bg-red-500/80 hover:text-white"
                  >
                    Cancel
                  </button>
                  <Button type="submit" disabled={reviewLoading}>
                    {reviewLoading ? "Submitting..." : "Post Review"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Section */}
      <motion.section
        className="bg-base-300 rounded-3xl py-16 container mx-auto text-center border border-base-content/5 shadow-inner"
        variants={revealVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        custom={0.3}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          <span className="text-spotify">{contact.subheading || "Let's"}</span>{" "}
          Collaborate
        </h2>
        <p className="mb-6 max-w-4xl mx-auto p-5 text-base-content/70">
          I’m actively seeking new challenges, collaborations, and opportunities
          to grow as a developer. Whether you have a project idea, a technical
          question, or just want to connect—I’d love to hear from you!
        </p>
        <div className="flex flex-col sm:flex-row justify-center">
          <Button href="/projects">
            <span className="font-bold">View My Projects</span>
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactClient;
