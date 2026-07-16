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

export default Skeleton;
