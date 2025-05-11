const CardSkeleton = () => {
  return (
    <div className="border-orange-300 border rounded-xl p-4 shadow-sm bg-white animate-pulse flex flex-col gap-3">
      <div className="w-full h-40 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  );
};

export default CardSkeleton;
