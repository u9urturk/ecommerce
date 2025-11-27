export default function CategoriesLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="h-8 w-48 bg-muted rounded-lg animate-pulse"></div>
          <div className="h-5 w-80 bg-muted rounded-lg animate-pulse mt-2"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-muted rounded-lg animate-pulse"></div>
          <div className="h-10 w-32 bg-muted rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <div className="h-10 w-80 bg-muted rounded-lg animate-pulse"></div>
          <div className="h-10 w-40 bg-muted rounded-lg animate-pulse"></div>
        </div>
        <div className="h-5 w-32 bg-muted rounded-lg animate-pulse"></div>
      </div>

      {/* Table Skeleton */}
      <div className="card">
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 w-12">
                  <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
                </th>
                <th className="text-left p-4">
                  <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                </th>
                <th className="text-left p-4">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                </th>
                <th className="text-left p-4">
                  <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                </th>
                <th className="text-left p-4">
                  <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                </th>
                <th className="text-left p-4">
                  <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                </th>
                <th className="text-right p-4">
                  <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="p-4">
                    <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded-lg animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                        <div className="h-3 w-48 bg-muted rounded animate-pulse"></div>
                        <div className="h-3 w-24 bg-muted rounded animate-pulse"></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="h-6 w-20 bg-muted rounded-full animate-pulse"></div>
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-12 bg-muted rounded animate-pulse"></div>
                  </td>
                  <td className="p-4">
                    <div className="h-6 w-16 bg-muted rounded-full animate-pulse"></div>
                  </td>
                  <td className="p-4">
                    <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end">
                      <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
