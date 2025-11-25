import React from 'react';
import Link from 'next/link';
import { NewsletterForm } from './newsletter-form';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart,
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  Award
} from 'lucide-react';

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: "Tüm Ürünler", href: "/products" },
    { label: "Kategoriler", href: "/products/category" },
    { label: "Öne Çıkanlar", href: "/products/featured" },
    { label: "İndirimli Ürünler", href: "/products/sale" },
    { label: "Yeni Gelenler", href: "/products/new" }
  ];

  const accountLinks = [
    { label: "Hesabım", href: "/account/profile" },
    { label: "Siparişlerim", href: "/account/orders" },
    { label: "Favorilerim", href: "/account/wishlist" },
    { label: "Adres Defteri", href: "/account/addresses" },
    { label: "Giriş Yap", href: "/login" }
  ];

  const supportLinks = [
    { label: "Müşteri Hizmetleri", href: "/support" },
    { label: "SSS", href: "/support/faq" },
    { label: "İade & Değişim", href: "/support/returns" },
    { label: "Kargo & Teslimat", href: "/support/shipping" },
    { label: "Güvenlik", href: "/support/security" }
  ];

  const legalLinks = [
    { label: "Hakkımızda", href: "/about" },
    { label: "Gizlilik Politikası", href: "/privacy" },
    { label: "Kullanım Şartları", href: "/terms" },
    { label: "KVKK", href: "/kvkk" },
    { label: "Çerez Politikası", href: "/cookies" }
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "https://facebook.com/aspaio", color: "hover:text-blue-600" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/aspaio", color: "hover:text-blue-400" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/aspaio", color: "hover:text-pink-600" },
    { icon: Youtube, label: "Youtube", href: "https://youtube.com/aspaio", color: "hover:text-red-600" }
  ];

  const features = [
    {
      icon: Truck,
      title: "Ücretsiz Kargo",
      description: "150₺ ve üzeri alışverişlerde"
    },
    {
      icon: Shield,
      title: "Güvenli Ödeme",
      description: "256-bit SSL şifrelemeli"
    },
    {
      icon: Award,
      title: "Kalite Garantisi",
      description: "Orijinal ürün güvencesi"
    },
    {
      icon: CreditCard,
      title: "Kolay İade",
      description: "14 gün içinde ücretsiz"
    }
  ];

  return (
    <footer className={`bg-card text-card-foreground ${className}`}>
      {/* Features Section */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Contact */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Aspaio Oz</span>
              </Link>
              <p className="text-muted-foreground mt-3 max-w-md">
                Premium e-ticaret deneyimi sunan, kaliteli ürünleri uygun fiyatlarla buluşturan güvenilir alışveriş platformu.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">İletişim</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+90 (212) 555 0123</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">info@aspaio.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">İstanbul, Türkiye</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Sosyal Medya</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 ${social.color}`}
                      aria-label={social.label}
                    >
                      <IconComponent className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Ürünler</h4>
            <ul className="space-y-2">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Hesap</h4>
            <ul className="space-y-2">
              {accountLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Destek</h4>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Kampanyalardan Haberdar Olun</h4>
              <p className="text-sm text-muted-foreground">
                İndirimler, yeni ürünler ve özel tekliflerden ilk siz haberdar olun.
              </p>
            </div>
            <div>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Aspaio Oz. Tüm hakları saklıdır.
            </div>
            
            <div className="flex items-center gap-6">
              {/* Legal Links */}
              <div className="flex items-center gap-4">
                {legalLinks.slice(0, 3).map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              {/* Made with love */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-red-500 fill-current" />
                <span>in Turkey</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}