'use client';

import React, { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate newsletter subscription
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Newsletter subscription:', email);
      setEmail('');
      // Here you would typically call your newsletter API
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-posta adresiniz"
        required
        disabled={isLoading}
        className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
      />
      <button 
        type="submit"
        disabled={isLoading || !email}
        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Gönderiliyor...' : 'Abone Ol'}
      </button>
    </form>
  );
}