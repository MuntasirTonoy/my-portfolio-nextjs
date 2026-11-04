"use client";

import Lottie from "lottie-react";
import animation from "@/assets/animation/Lonely 404.json";

export default function NotFoundAnimation() {
  return <Lottie animationData={animation} loop className="w-full max-w-sm" aria-hidden="true" />;
}
