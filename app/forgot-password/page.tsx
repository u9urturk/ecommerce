'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ShoppingBag, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useLoading } from '@/contexts/loading-context';

export default function ForgotPasswordPage() {
  const { isLoading } = useLoading();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email.trim()) {
      newErrors.email = 'E-posta adresi gerekli';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Here you would make your password reset API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated API call
      console.log('Reset password for:', email);
      setIsSuccess(true);
    } catch (error) {
      console.error('Password reset error:', error);
      setErrors({ general: 'Şifre sıfırlama talebiniz gönderilemedi. Lütfen tekrar deneyin.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="relative min-h-screen flex items-center justify-center p-4">
        {/* Back Button */}
        <Link 
          href="/login" 
          className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Giriş Sayfası
        </Link>

        <div className="w-full max-w-md space-y-6">
          {/* Brand Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2">
              <div className="p-3 bg-primary rounded-xl">
                <ShoppingBag className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">My-OZ</span>
            </div>
            
            {!isSuccess ? (
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">Şifremi Unuttum</h1>
                <p className="text-muted-foreground">
                  E-posta adresinizi girin, şifre sıfırlama bağlantısını gönderelim
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">E-posta Gönderildi</h1>
                <p className="text-muted-foreground">
                  Şifre sıfırlama bağlantısını e-posta adresinize gönderdik
                </p>
              </div>
            )}
          </div>

          {/* Form Card */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                    {errors.general}
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    E-posta Adresi
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                        errors.email ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : 'border-border'
                      }`}
                      placeholder="ornek@email.com"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : (
                    'Sıfırlama Bağlantısı Gönder'
                  )}
                </button>

                {/* Back to Login */}
                <div className="text-center pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Şifrenizi hatırladınız mı?{' '}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                      Giriş Yapın
                    </Link>
                  </p>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-center">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <p className="text-sm text-success mb-2">
                    <strong>{email}</strong> adresine şifre sıfırlama bağlantısı gönderildi.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    E-posta gelmezse spam klasörünüzü kontrol edin.
                  </p>
                </div>

                {/* Instructions */}
                <div className="space-y-3 text-left">
                  <h3 className="font-medium text-foreground">Sonraki adımlar:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">1.</span>
                      E-posta kutunuzu kontrol edin
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">2.</span>
                      "Şifremi Sıfırla" bağlantısına tıklayın
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">3.</span>
                      Yeni şifrenizi oluşturun
                    </li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setEmail('');
                      setErrors({});
                    }}
                    className="w-full text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                  >
                    Farklı e-posta ile tekrar dene
                  </button>
                  
                  <Link 
                    href="/login"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 px-4 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Giriş Sayfasına Dön
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Security Info */}
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Güvenlik nedeniyle bağlantı 15 dakika sonra geçersiz olacak
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                🔒 Güvenli İşlem
              </span>
              <span>•</span>
              <span>256-bit Şifreleme</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}