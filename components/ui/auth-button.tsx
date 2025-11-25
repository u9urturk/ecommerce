'use client';

import React from 'react';
import Link from 'next/link';
import { User, LogOut, Settings, ShoppingBag } from 'lucide-react';
import { useLoadingNavigation } from '@/contexts/loading-context';

interface AuthButtonProps {
  variant?: 'default' | 'compact' | 'icon';
  showDropdown?: boolean;
  className?: string;
}

// Mock user state - in a real app this would come from context/store
const mockUser = {
  isAuthenticated: false,
  name: 'Ahmet Yılmaz',
  email: 'ahmet@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80'
};

export const AuthButton: React.FC<AuthButtonProps> = ({
  variant = 'default',
  showDropdown = false,
  className = ''
}) => {
  const { navigateWithLoading } = useLoadingNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleLogin = () => {
    navigateWithLoading('/login', { message: 'Giriş sayfası yükleniyor...' });
  };

  const handleRegister = () => {
    navigateWithLoading('/register', { message: 'Kayıt sayfası yükleniyor...' });
  };

  const handleProfile = () => {
    navigateWithLoading('/account/profile', { message: 'Profil yükleniyor...' });
  };

  const handleLogout = () => {
    // In a real app, this would clear auth state and redirect
    console.log('Logout');
  };

  if (!mockUser.isAuthenticated) {
    // Not authenticated - show login/register buttons
    if (variant === 'icon') {
      return (
        <div className={`flex items-center gap-2 ${className}`}>
          <button
            onClick={handleLogin}
            className="p-2 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Giriş Yap"
          >
            <User className="h-4 w-4" />
          </button>
        </div>
      );
    }

    if (variant === 'compact') {
      return (
        <div className={`flex items-center gap-2 ${className}`}>
          <button
            onClick={handleLogin}
            className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Giriş
          </button>
          <button
            onClick={handleRegister}
            className="px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Üye Ol
          </button>
        </div>
      );
    }

    // Default variant
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <button
          onClick={handleLogin}
          className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary border border-border rounded-lg hover:border-primary transition-colors"
        >
          Giriş Yap
        </button>
        <button
          onClick={handleRegister}
          className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Üye Ol
        </button>
      </div>
    );
  }

  // Authenticated - show user menu
  if (variant === 'icon') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Hesap Menüsü"
        >
          <img 
            src={mockUser.avatar} 
            alt={mockUser.name}
            className="w-6 h-6 rounded-full object-cover"
          />
        </button>

        {isDropdownOpen && showDropdown && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50">
            <div className="p-3 border-b border-border">
              <p className="font-medium text-sm">{mockUser.name}</p>
              <p className="text-xs text-muted-foreground">{mockUser.email}</p>
            </div>
            <div className="py-1">
              <button
                onClick={handleProfile}
                className="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Profilim
              </button>
              <button
                onClick={() => navigateWithLoading('/account/orders', { message: 'Siparişler yükleniyor...' })}
                className="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center gap-2"
              >
                <ShoppingBag className="h-4 w-4" />
                Siparişlerim
              </button>
              <button
                onClick={() => navigateWithLoading('/account/settings', { message: 'Ayarlar yükleniyor...' })}
                className="w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Ayarlar
              </button>
              <hr className="my-1 border-border" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm hover:bg-accent text-destructive flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Çıkış Yap
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
        >
          <img 
            src={mockUser.avatar} 
            alt={mockUser.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm font-medium hidden sm:inline">
            {mockUser.name.split(' ')[0]}
          </span>
        </button>
      </div>
    );
  }

  // Default authenticated variant
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
      >
        <img 
          src={mockUser.avatar} 
          alt={mockUser.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="text-left hidden sm:block">
          <p className="text-sm font-medium">{mockUser.name}</p>
          <p className="text-xs text-muted-foreground">{mockUser.email}</p>
        </div>
      </button>

      {isDropdownOpen && showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-border">
            <p className="font-medium">{mockUser.name}</p>
            <p className="text-sm text-muted-foreground">{mockUser.email}</p>
          </div>
          <div className="py-2">
            <button
              onClick={handleProfile}
              className="w-full text-left px-4 py-3 text-sm hover:bg-accent flex items-center gap-3"
            >
              <User className="h-4 w-4" />
              Profilim
            </button>
            <button
              onClick={() => navigateWithLoading('/account/orders', { message: 'Siparişler yükleniyor...' })}
              className="w-full text-left px-4 py-3 text-sm hover:bg-accent flex items-center gap-3"
            >
              <ShoppingBag className="h-4 w-4" />
              Siparişlerim
            </button>
            <button
              onClick={() => navigateWithLoading('/account/settings', { message: 'Ayarlar yükleniyor...' })}
              className="w-full text-left px-4 py-3 text-sm hover:bg-accent flex items-center gap-3"
            >
              <Settings className="h-4 w-4" />
              Ayarlar
            </button>
            <hr className="my-2 border-border" />
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm hover:bg-accent text-destructive flex items-center gap-3"
            >
              <LogOut className="h-4 w-4" />
              Çıkış Yap
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthButton;