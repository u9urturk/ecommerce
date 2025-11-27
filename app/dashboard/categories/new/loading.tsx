export default function NewCategoryLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header Skeleton */}
          <div className="border-b border-border bg-background/95">
            <div className="flex h-14 lg:h-16 items-center gap-4 px-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
              </div>
              
              <div className="h-6 w-px bg-border"></div>
              
              <div className="flex-1">
                <div className="h-6 w-48 bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-64 bg-muted rounded animate-pulse mt-1"></div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-10 w-28 bg-muted rounded animate-pulse"></div>
                <div className="h-10 w-32 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex">
            {/* Form Content Skeleton */}
            <div className="flex-1 p-6">
              <div className="max-w-4xl space-y-6">
                {/* Tabs Skeleton */}
                <div className="flex space-x-1 p-1 bg-muted rounded-lg w-fit">
                  <div className="h-8 w-24 bg-muted-foreground/20 rounded animate-pulse"></div>
                  <div className="h-8 w-20 bg-muted-foreground/20 rounded animate-pulse"></div>
                </div>

                {/* Form Skeleton */}
                <div className="space-y-6">
                  {/* Basic Info Card */}
                  <div className="card">
                    <div className="card-header">
                      <div className="h-6 w-32 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 w-64 bg-muted rounded animate-pulse"></div>
                    </div>
                    <div className="card-content space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                          <div className="h-10 w-full bg-muted rounded animate-pulse"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                          <div className="h-10 w-full bg-muted rounded animate-pulse"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                        <div className="h-20 w-full bg-muted rounded animate-pulse"></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="space-y-2">
                            <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                            <div className="h-10 w-full bg-muted rounded animate-pulse"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Image Card */}
                  <div className="card">
                    <div className="card-header">
                      <div className="h-6 w-32 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 w-48 bg-muted rounded animate-pulse"></div>
                    </div>
                    <div className="card-content">
                      <div className="w-32 h-32 bg-muted rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="w-80 border-l border-border p-6 bg-muted/30">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-8 bg-muted rounded animate-pulse"></div>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full animate-pulse"></div>
                </div>

                <div>
                  <div className="h-4 w-24 bg-muted rounded animate-pulse mb-3"></div>
                  <div className="space-y-2">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="h-8 w-full bg-muted rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <div className="h-4 w-16 bg-muted-foreground/20 rounded animate-pulse mb-2"></div>
                  <div className="space-y-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-3 w-full bg-muted-foreground/20 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
