"use client";

import React from "react";
import animationData from "@/assets/animation/loading-animation.json";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default Loading;
