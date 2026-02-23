export function CardDashboardSkeleton() {
  return (
    <>
      <div className="flex gap-6">
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm dark:bg-slate-800 w-70">
          <div className="flex p-4">
            <div className="h-5 w-5 bg-slate-400 animate-pulse rounded-full"></div>
            <h3 className="ml-2 bg-slate-400 w-30 rounded-xl animate-pulse"></h3>
          </div>
          <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl font-medium dark:bg-slate-900 dark:text-slate-50 animate-pulse"></p>
        </div>
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm dark:bg-slate-800 w-70">
          <div className="flex p-4">
            <div className="h-5 w-5 bg-slate-400 animate-pulse rounded-full"></div>
            <h3 className="ml-2 bg-slate-400 w-30 rounded-xl animate-pulse"></h3>
          </div>
          <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl font-medium dark:bg-slate-900 dark:text-slate-50 animate-pulse"></p>
        </div>
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm dark:bg-slate-800 w-70">
          <div className="flex p-4">
            <div className="h-5 w-5 bg-slate-400 animate-pulse rounded-full"></div>
            <h3 className="ml-2 bg-slate-400 w-30 rounded-xl animate-pulse"></h3>
          </div>
          <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl font-medium dark:bg-slate-900 dark:text-slate-50 animate-pulse"></p>
        </div>
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm dark:bg-slate-800 w-70">
          <div className="flex p-4">
            <div className="h-5 w-5 bg-slate-400 animate-pulse rounded-full"></div>
            <h3 className="ml-2 bg-slate-400 w-30 rounded-xl animate-pulse"></h3>
          </div>
          <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl font-medium dark:bg-slate-900 dark:text-slate-50 animate-pulse"></p>
        </div>
      </div>
    </>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      <div className="bg-stone-500 dark:bg-slate-100 w-50 h-8 mb-5 rounded animate-pulse"></div>
      <CardDashboardSkeleton />
    </>
  );
}
