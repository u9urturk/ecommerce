my-oz/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                     # Ana sayfa
│   ├── loading.tsx                  # Global loading UI
│   ├── error.tsx                    # Global error UI
│   ├── not-found.tsx               # 404 sayfası
│   │
│   ├── (auth)/                     # Route groups
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── products/
│   │   ├── page.tsx                # Product listing
│   │   ├── [slug]/
│   │   │   ├── page.tsx           # Product detail
│   │   │   └── loading.tsx
│   │   ├── category/
│   │   │   └── [category]/
│   │   │       └── page.tsx
│   │   └── search/
│   │       └── page.tsx
│   │
│   ├── cart/
│   │   ├── page.tsx
│   │   └── checkout/
│   │       ├── page.tsx
│   │       ├── payment/
│   │       │   └── page.tsx
│   │       └── success/
│   │           └── page.tsx
│   │
│   ├── account/
│   │   ├── page.tsx               # User dashboard
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [orderId]/
│   │   │       └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   └── wishlist/
│   │       └── page.tsx
│   │
│   └── api/                       # API routes
│       ├── products/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       ├── cart/
│       │   └── route.ts
│       ├── auth/
│       │   └── route.ts
│       └── orders/
│           └── route.ts
│
├── components/                     # Global components
│   ├── ui/                        # Base UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── modal.tsx
│   │   └── index.ts
│   │
│   ├── layout/                    # Layout components  
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── navigation.tsx
│   │   └── card-nav.tsx
│   │
│   ├── product/                   # Product components
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   ├── product-detail.tsx
│   │   ├── product-images.tsx
│   │   └── product-reviews.tsx
│   │
│   ├── cart/                      # Cart components
│   │   ├── cart-item.tsx
│   │   ├── cart-summary.tsx
│   │   └── cart-drawer.tsx
│   │
│   └── forms/                     # Form components
│       ├── checkout-form.tsx
│       ├── login-form.tsx
│       └── contact-form.tsx
│
├── lib/                           # Utility functions
│   ├── utils.ts
│   ├── validations.ts
│   ├── constants.ts
│   ├── api.ts
│   └── auth.ts
│
├── hooks/                         # Custom React hooks
│   ├── use-cart.ts
│   ├── use-auth.ts
│   ├── use-products.ts
│   └── use-local-storage.ts
│
├── store/                         # State management
│   ├── cart-store.ts
│   ├── auth-store.ts
│   └── product-store.ts
│
├── types/                         # TypeScript definitions
│   ├── product.ts
│   ├── user.ts
│   ├── cart.ts
│   └── index.ts
│
└── public/
    ├── images/
    ├── icons/
    └── logos/