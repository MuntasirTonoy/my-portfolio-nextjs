import React from "react";

const Skeleton = ({ className, width, height, rounded = "rounded-xl" }) => {
  return (
    <div 
      className={`animate-pulse bg-base-content/10 ${rounded} ${className}`}
      style={{ width, height }}
    />
  );
};

export const CardSkeleton = () => (
  <div className="bg-base-300/30 rounded-3xl p-8 space-y-6 border border-base-content/5">
    <div className="flex justify-between items-start">
      <Skeleton width="60px" height="60px" rounded="rounded-2xl" />
      <div className="flex gap-1">
        {[1,2,3,4,5].map(i => <Skeleton key={i} width="12px" height="12px" rounded="rounded-full" />)}
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="w-full" height="16px" />
      <Skeleton className="w-5/6" height="16px" />
      <Skeleton className="w-4/6" height="16px" />
    </div>
    <div className="pt-6 border-t border-base-content/5 space-y-2">
      <Skeleton width="100px" height="16px" />
      <Skeleton width="60px" height="12px" />
    </div>
  </div>
);

export const ProjectSkeleton = () => (
  <div className="bg-base-300/30 rounded-3xl overflow-hidden border border-base-content/5">
    <Skeleton className="w-full" height="240px" rounded="rounded-none" />
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <Skeleton width="150px" height="24px" />
        <Skeleton width="60px" height="24px" rounded="rounded-full" />
      </div>
      <Skeleton className="w-full" height="16px" />
      <Skeleton className="w-2/3" height="16px" />
      <div className="flex gap-2">
        <Skeleton width="50px" height="20px" rounded="rounded-full" />
        <Skeleton width="50px" height="20px" rounded="rounded-full" />
      </div>
    </div>
  </div>
);

export const SkillSkeleton = () => (
  <div className="bg-base-300/30 rounded-3xl p-6 border border-base-content/5 space-y-4">
    <Skeleton width="120px" height="24px" />
    <div className="grid grid-cols-4 gap-4">
      {[1,2,3,4,5,6,7,8].map(i => <Skeleton key={i} width="40px" height="40px" rounded="rounded-lg" />)}
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="min-h-screen bg-base-200 flex items-center px-4 lg:px-20">
    <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 py-20 lg:py-0">
      <div className="flex-1 w-full space-y-6 text-center lg:text-left">
        <Skeleton width="160px" height="16px" rounded="rounded-full" className="mx-auto lg:mx-0" />
        <Skeleton width="120px" height="20px" className="mx-auto lg:mx-0" />
        <Skeleton className="w-3/4 mx-auto lg:mx-0" height="56px" rounded="rounded-2xl" />
        <Skeleton className="w-2/3 mx-auto lg:mx-0" height="32px" rounded="rounded-xl" />
        <Skeleton className="w-full max-w-lg mx-auto lg:mx-0" height="16px" />
        <Skeleton className="w-5/6 max-w-md mx-auto lg:mx-0" height="16px" />
        <div className="flex gap-3 justify-center lg:justify-start pt-2">
          <Skeleton width="140px" height="48px" rounded="rounded-md" />
          <Skeleton width="120px" height="48px" rounded="rounded-md" />
        </div>
      </div>
      <div className="flex-1 flex justify-center order-1 lg:order-2">
        <Skeleton width="260px" height="260px" rounded="rounded-full" />
      </div>
    </div>
  </div>
);

export const SectionSkeleton = ({ className = "" }) => (
  <section className={`py-20 px-4 md:px-6 lg:px-8 ${className}`}>
    <div className="max-w-6xl mx-auto text-center mb-10 space-y-3">
      <Skeleton width="160px" height="16px" rounded="rounded-full" className="mx-auto" />
      <Skeleton className="w-2/3 mx-auto" height="36px" rounded="rounded-2xl" />
    </div>
    <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  </section>
);

export const AdminFormSkeleton = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Skeleton width="240px" height="28px" rounded="rounded-lg" />
      <Skeleton width="320px" height="14px" />
    </div>
    <CardSkeleton />
    <CardSkeleton />
  </div>
);

export const PageSkeleton = () => (
  <>
    <HeroSkeleton />
    <SectionSkeleton />
    <SectionSkeleton />
  </>
);

export const AboutSkeleton = () => (
  <div className="min-h-screen font-sans p-6 md:p-12 max-w-7xl mx-auto mt-20">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
      {/* Left card: avatar + identity */}
      <div className="bg-base-300 rounded-xl p-8 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
        <Skeleton width="160px" height="160px" rounded="rounded-full" />
        <Skeleton width="160px" height="28px" rounded="rounded-lg" />
        <Skeleton width="120px" height="16px" />
        <div className="flex gap-4 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} width="28px" height="28px" rounded="rounded-md" />
          ))}
        </div>
        <div className="space-y-3 w-full max-w-[200px]">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-full" height="16px" />
          ))}
        </div>
      </div>

      {/* Right: About Me */}
      <div className="lg:col-span-2">
        <div className="bg-base-300 rounded-xl p-8 h-full space-y-4">
          <Skeleton width="140px" height="28px" rounded="rounded-lg" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-full" height="16px" />
          ))}
          <Skeleton className="w-5/6" height="16px" />
          <Skeleton className="w-2/3" height="16px" />
        </div>
      </div>
    </div>

    {/* Education section */}
    <div className="bg-base-300 rounded-xl p-8 mb-16 space-y-6">
      <Skeleton width="140px" height="28px" rounded="rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton width="80px" height="80px" rounded="rounded-xl" />
            <Skeleton className="w-3/4" height="18px" />
            <Skeleton className="w-full" height="14px" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ContactSkeleton = () => (
  <div className="min-h-screen my-20 bg-base-100 px-5 relative">
    <section className="py-16 md:px-5 lg:px-24 flex flex-col md:flex-row justify-center items-start gap-12 md:gap-16">
      {/* Left: contact info */}
      <div className="w-full md:w-5/12 lg:w-4/12 space-y-6">
        <Skeleton width="220px" height="40px" rounded="rounded-xl" />
        <Skeleton className="w-full" height="16px" />
        <Skeleton className="w-4/5" height="16px" />
        <div className="space-y-4 pt-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-3/4" height="20px" />
          ))}
        </div>
        <Skeleton width="180px" height="48px" rounded="rounded-md" />
      </div>

      {/* Right: contact form */}
      <div className="w-full md:w-7/12 lg:w-6/12 space-y-6 bg-base-300 p-5 md:p-8 rounded-3xl">
        <Skeleton width="200px" height="24px" rounded="rounded-lg" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton width="100px" height="14px" />
            <Skeleton className="w-full" height="44px" rounded="rounded-md" />
          </div>
        ))}
        <Skeleton className="w-full" height="48px" rounded="rounded-md" />
      </div>
    </section>

    {/* Bottom CTA */}
    <div className="bg-base-300 rounded-3xl py-16 container mx-auto text-center border border-base-content/5 space-y-6">
      <Skeleton className="w-1/2 mx-auto" height="36px" rounded="rounded-2xl" />
      <Skeleton className="w-3/4 mx-auto" height="16px" />
      <Skeleton className="w-1/4 mx-auto" height="48px" rounded="rounded-md" />
    </div>
  </div>
);

export const ProjectDetailsSkeleton = () => (
  <div className="relative max-w-6xl mx-auto my-20 p-6 bg-base-300 rounded-xl min-h-[70vh]">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: image + title + tech */}
      <div>
        <Skeleton className="w-full" height="280px" rounded="rounded-xl" />
        <Skeleton className="w-3/4 mt-6" height="28px" rounded="rounded-lg" />
        <div className="flex flex-wrap gap-3 mt-5">
          <Skeleton width="90px" height="24px" rounded="rounded-full" />
          <Skeleton width="130px" height="24px" rounded="rounded-full" />
        </div>
        <div className="mt-8 space-y-4">
          <Skeleton width="120px" height="20px" rounded="rounded-lg" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} width="60px" height="24px" rounded="rounded-lg" />
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-8">
          <Skeleton width="140px" height="44px" rounded="rounded-md" />
          <Skeleton width="140px" height="44px" rounded="rounded-md" />
        </div>
      </div>

      {/* Right: description + features */}
      <div className="space-y-8">
        <div className="space-y-3">
          <Skeleton width="160px" height="20px" rounded="rounded-lg" />
          <Skeleton className="w-full" height="16px" />
          <Skeleton className="w-full" height="16px" />
          <Skeleton className="w-5/6" height="16px" />
        </div>
        <div className="space-y-3">
          <Skeleton width="140px" height="20px" rounded="rounded-lg" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-full" height="14px" />
          ))}
        </div>
        <div className="space-y-3">
          <Skeleton width="170px" height="20px" rounded="rounded-lg" />
          <Skeleton className="w-4/5" height="16px" />
          <Skeleton className="w-3/5" height="16px" />
        </div>
      </div>
    </div>
  </div>
);

export default Skeleton;
