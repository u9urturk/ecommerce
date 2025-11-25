import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function LoginPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="relative min-h-screen flex items-center justify-center p-4">
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Skeleton height="h-9" width="w-16" rounded="lg" />
        </div>

        <div className="w-full max-w-md space-y-6">
          {/* Brand Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2">
              <Skeleton height="h-12" width="w-12" rounded="lg" />
              <Skeleton height="h-6" width="w-24" />
            </div>
            <div className="space-y-2">
              <Skeleton height="h-8" width="w-48" className="mx-auto" />
              <Skeleton height="h-4" width="w-64" className="mx-auto" />
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
            {/* Card Title */}
            <Skeleton height="h-6" width="w-20" className="mx-auto" />
            
            {/* Form Fields */}
            <div className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Skeleton height="h-4" width="w-32" />
                <Skeleton height="h-10" width="w-full" rounded="lg" />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Skeleton height="h-4" width="w-16" />
                <Skeleton height="h-10" width="w-full" rounded="lg" />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton height="h-4" width="w-4" rounded="sm" />
                  <Skeleton height="h-4" width="w-20" />
                </div>
                <Skeleton height="h-4" width="w-24" />
              </div>

              {/* Submit Button */}
              <Skeleton height="h-11" width="w-full" rounded="lg" />

              {/* Divider */}
              <div className="relative py-2">
                <Skeleton height="h-px" width="w-full" />
                <div className="absolute inset-0 flex justify-center">
                  <div className="bg-card px-2">
                    <Skeleton height="h-3" width="w-8" />
                  </div>
                </div>
              </div>

              {/* Social Login */}
              <div className="space-y-2">
                <Skeleton height="h-11" width="w-full" rounded="lg" />
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton height="h-11" width="w-full" rounded="lg" />
                  <Skeleton height="h-11" width="w-full" rounded="lg" />
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center pt-4">
                <Skeleton height="h-4" width="w-48" className="mx-auto" />
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center space-y-2">
            <Skeleton height="h-3" width="w-40" className="mx-auto" />
            <div className="flex items-center justify-center gap-2">
              <Skeleton height="h-3" width="w-20" />
              <Skeleton height="h-3" width="w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RegisterPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="relative min-h-screen flex items-center justify-center p-4">
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Skeleton height="h-9" width="w-16" rounded="lg" />
        </div>

        <div className="w-full max-w-md space-y-6">
          {/* Brand Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2">
              <Skeleton height="h-12" width="w-12" rounded="lg" />
              <Skeleton height="h-6" width="w-24" />
            </div>
            <div className="space-y-2">
              <Skeleton height="h-8" width="w-48" className="mx-auto" />
              <Skeleton height="h-4" width="w-64" className="mx-auto" />
            </div>
          </div>

          {/* Register Card */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
            {/* Form Fields */}
            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Skeleton height="h-4" width="w-8" />
                  <Skeleton height="h-10" width="w-full" rounded="lg" />
                </div>
                <div className="space-y-2">
                  <Skeleton height="h-4" width="w-12" />
                  <Skeleton height="h-10" width="w-full" rounded="lg" />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Skeleton height="h-4" width="w-32" />
                <Skeleton height="h-10" width="w-full" rounded="lg" />
              </div>

              {/* Password Fields */}
              <div className="space-y-2">
                <Skeleton height="h-4" width="w-16" />
                <Skeleton height="h-10" width="w-full" rounded="lg" />
              </div>

              <div className="space-y-2">
                <Skeleton height="h-4" width="w-20" />
                <Skeleton height="h-10" width="w-full" rounded="lg" />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Skeleton height="h-4" width="w-4" rounded="sm" className="mt-0.5" />
                  <Skeleton height="h-4" width="w-48" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton height="h-4" width="w-4" rounded="sm" />
                  <Skeleton height="h-4" width="w-40" />
                </div>
              </div>

              {/* Submit Button */}
              <Skeleton height="h-11" width="w-full" rounded="lg" />

              {/* Divider */}
              <div className="relative py-2">
                <Skeleton height="h-px" width="w-full" />
                <div className="absolute inset-0 flex justify-center">
                  <div className="bg-card px-2">
                    <Skeleton height="h-3" width="w-8" />
                  </div>
                </div>
              </div>

              {/* Social Register */}
              <div className="space-y-2">
                <Skeleton height="h-11" width="w-full" rounded="lg" />
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton height="h-11" width="w-full" rounded="lg" />
                  <Skeleton height="h-11" width="w-full" rounded="lg" />
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-border">
                <Skeleton height="h-4" width="w-48" className="mx-auto" />
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center space-y-2">
            <Skeleton height="h-3" width="w-40" className="mx-auto" />
            <div className="flex items-center justify-center gap-2">
              <Skeleton height="h-3" width="w-20" />
              <Skeleton height="h-3" width="w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ForgotPasswordSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="relative min-h-screen flex items-center justify-center p-4">
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Skeleton height="h-9" width="w-24" rounded="lg" />
        </div>

        <div className="w-full max-w-md space-y-6">
          {/* Brand Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2">
              <Skeleton height="h-12" width="w-12" rounded="lg" />
              <Skeleton height="h-6" width="w-24" />
            </div>
            <div className="space-y-2">
              <Skeleton height="h-8" width="w-40" className="mx-auto" />
              <Skeleton height="h-4" width="w-72" className="mx-auto" />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
            <div className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Skeleton height="h-4" width="w-32" />
                <Skeleton height="h-10" width="w-full" rounded="lg" />
              </div>

              {/* Submit Button */}
              <Skeleton height="h-11" width="w-full" rounded="lg" />

              {/* Back to Login */}
              <div className="text-center pt-4 border-t border-border">
                <Skeleton height="h-4" width="w-48" className="mx-auto" />
              </div>
            </div>
          </div>

          {/* Security Info */}
          <div className="text-center space-y-2">
            <Skeleton height="h-3" width="w-56" className="mx-auto" />
            <div className="flex items-center justify-center gap-2">
              <Skeleton height="h-3" width="w-24" />
              <Skeleton height="h-3" width="w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}