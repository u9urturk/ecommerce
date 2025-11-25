'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ShoppingBag, 
  ArrowLeft,
  Github,
  Chrome,
  Facebook,
  Loader2
} from 'lucide-react';
import { useLoadingNavigation } from '@/contexts/loading-context';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const router = useRouter();
  const { navigateWithLoading } = useLoadingNavigation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'E-posta adresi gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }
    
    if (!formData.password) {
      newErrors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically call your authentication API
      console.log('Login attempt:', formData);
      
      // Simulate successful login
      navigateWithLoading('/', { message: 'Giriş başarılı, yönlendiriliyor...' });
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`${provider} login attempt`);
      navigateWithLoading('/', { message: `${provider} ile giriş yapılıyor...` });
    } catch (error) {
      console.error(`${provider} login error:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <ArrowLeft className="w-4 h-4" />
            Geri
          </Button>
        </div>

        <div className="w-full max-w-md space-y-6">
          {/* Brand Header */}
          <div className="text-center space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                <ShoppingBag className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">Aspaio Oz</span>
            </Link>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-foreground">Hoş Geldiniz</h1>
              <p className="text-muted-foreground">
                Hesabınıza giriş yapın ve alışverişe devam edin
              </p>
            </div>
          </div>

          {/* Login Card */}
          <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-center text-foreground">Giriş Yap</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* General Error */}
              {errors.general && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                  {errors.general}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    E-posta Adresi
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ornek@email.com"
                      className={`w-full pl-10 pr-4 py-2 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                        errors.email ? 'border-destructive' : 'border-border hover:border-primary/50'
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Şifre
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Şifrenizi girin"
                      className={`w-full pl-10 pr-12 py-2 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                        errors.password ? 'border-destructive' : 'border-border hover:border-primary/50'
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                      disabled={isLoading}
                    />
                    <span className="text-sm text-muted-foreground">Beni hatırla</span>
                  </label>
                  
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Şifremi unuttum
                  </Link>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Giriş yapılıyor...
                    </>
                  ) : (
                    'Giriş Yap'
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">veya</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 bg-background hover:bg-muted border-border hover:border-primary/50 transition-all duration-300"
                  onClick={() => handleSocialLogin('Google')}
                  disabled={isLoading}
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Google ile devam et
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 bg-background hover:bg-muted border-border hover:border-primary/50 transition-all duration-300"
                    onClick={() => handleSocialLogin('Facebook')}
                    disabled={isLoading}
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 bg-background hover:bg-muted border-border hover:border-primary/50 transition-all duration-300"
                    onClick={() => handleSocialLogin('GitHub')}
                    disabled={isLoading}
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  Hesabınız yok mu?{' '}
                  <Link 
                    href="/register" 
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Hemen kayıt olun
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Güvenli giriş • 256-bit SSL şifrelemeli
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>Gizlilik Politikası</span>
              <span>•</span>
              <span>Kullanım Şartları</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(var(--primary-rgb), 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--primary-rgb), 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}