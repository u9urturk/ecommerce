'use client';

import CardNav from "@/components/layout/card-nav";
import HeroSection from "@/components/layout/hero-section";
import BestSeller from "@/components/layout/best-seller";
import OfferSection from "@/components/layout/offer-section";
import { useCart } from "@/contexts/cart-context";

export default function Home() {
    const { totalItems } = useCart();
    console.log(totalItems);
    const items = [
        {
            label: "Products", 
            bgColor: "hsl(var(--primary))",
            textColor: "hsl(var(--primary-foreground))",
            links: [
                { label: "All Products", href: "/products", ariaLabel: "View All Products" },
                { label: "Categories", href: "/products/category", ariaLabel: "Product Categories" },
                { label: "Featured", href: "/products/featured", ariaLabel: "Featured Products" }
            ]
        },
        {
            label: "Shopping",
            bgColor: "hsl(var(--secondary))",
            textColor: "hsl(var(--secondary-foreground))",
            links: [
                { label: "Cart", href: "/cart", ariaLabel: "Shopping Cart" },
                { label: "Wishlist", href: "/account/wishlist", ariaLabel: "Your Wishlist" },
                { label: "Orders", href: "/account/orders", ariaLabel: "Your Orders" }
            ]
        },
        {
            label: "Account",
            bgColor: "hsl(var(--accent))",
            textColor: "hsl(var(--accent-foreground))",
            links: [
                { label: "Profile", href: "/account/profile", ariaLabel: "Your Profile" },
                { label: "Login", href: "/login", ariaLabel: "Login" },
                { label: "Register", href: "/register", ariaLabel: "Register" }
            ]
        }
    ];

    return (
        <>
            {/* Navigation */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
                <CardNav
                    logo="/aspaio.svg"
                    logoAlt="Aspaio Oz Logo"
                    items={items}
                    variant="minimal"
                    cartItemsCount={totalItems}
                    ease="power3.out"
                    autoHide={true}
                    hideDelay={2000}
                    showOnTop={true}
                />
            </div>

            {/* Hero Section */}
            <HeroSection
                title="Welcome to Aspaio Oz"
                subtitle="Premium E-Commerce Experience"
                description="Discover amazing products and enjoy a seamless shopping experience with our curated collection of high-quality items."
                primaryButtonText="Shop Now"
                secondaryButtonText="Learn More"
                primaryButtonLink="/products"
                secondaryButtonLink="/about"
                showStats={true}
                showFeaturedCategories={true}
                className="pt-40"
            />

            {/* Best Seller Section */}
            <BestSeller
                variant="compact"
                showTitle={true}
            />

            {/* Offer Section - Flash Sale */}
            <OfferSection
                variant="default"
                showTitle={true}
                timeLimit="23:45:30"
            />
        </>
    );
}