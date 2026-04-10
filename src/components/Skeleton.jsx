import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div className={`glass-panel animate-pulse bg-white/5 ${className}`}>
      {/* Shimmer effect inside the bounds */}
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
};

export default Skeleton;
