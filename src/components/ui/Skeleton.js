// Loading placeholders. The public site renders on the server with real data,
// so these are only used by the admin dashboard.

const Skeleton = ({ className = "", width, height, rounded = "rounded-xl" }) => {
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

export default Skeleton;
