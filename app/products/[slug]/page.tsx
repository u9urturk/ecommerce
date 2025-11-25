'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductImages from '@/components/product/product-images';
import ProductDetail from '@/components/product/product-detail';
import ProductReviews from '@/components/product/product-reviews';
import { generateImageUrl } from '@/lib/utils';
import type { Product } from '@/types';
import { useCart } from '@/contexts/cart-context';

interface ProductDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
    const router = useRouter();
    const resolvedParams = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addItem } = useCart()
    // Mock product data - in real app this would be fetched from API
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);

                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock product data based on slug
                const mockProduct: Product = {
                    id: resolvedParams.slug,
                    name: "Premium Wireless Gaming Headset",
                    description: "Experience immersive gaming with our premium wireless gaming headset. Featuring high-fidelity 7.1 surround sound, ultra-low latency connectivity, and comfortable memory foam ear cushions for extended gaming sessions.",
                    price: 199.99,
                    originalPrice: 299.99,
                    images: [
                        {
                            id: "img1",
                            url: generateImageUrl(800, 800, 'headset'),
                            alt: "Premium Gaming Headset - Front View",
                            isPrimary: true
                        },
                        {
                            id: "img2",
                            url: generateImageUrl(800, 800, 'audio'),
                            alt: "Premium Gaming Headset - Side View",
                            isPrimary: false
                        },
                        {
                            id: "img3",
                            url: generateImageUrl(800, 800, 'technology'),
                            alt: "Premium Gaming Headset - Back View",
                            isPrimary: false
                        },
                        {
                            id: "img4",
                            url: generateImageUrl(800, 800, 'electronics'),
                            alt: "Premium Gaming Headset - Detail View",
                            isPrimary: false
                        }
                    ],
                    category: {
                        id: "gaming",
                        name: "Gaming",
                        slug: "gaming"
                    },
                    brand: "AudioTech Pro",
                    inStock: true,
                    stockQuantity: 24,
                    rating: 4.7,
                    reviewCount: 342,
                    tags: ["gaming", "wireless", "headset", "7.1-surround"],
                    createdAt: new Date('2024-10-15'),
                    updatedAt: new Date('2024-11-10')
                };

                setProduct(mockProduct);
                setError(null);
            } catch (err) {
                setError('Failed to load product details');
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [resolvedParams.slug]);

    // Handle actions
    const handleAddToCart = (product: Product, quantity: number) => {
        console.log(`Added ${quantity} of product ${product.id} to cart`);
        addItem(product, quantity);
    };

    const handleAddToWishlist = (productId: string) => {
        console.log(`Added product ${productId} to wishlist`);
        // In real app, this would update wishlist state/API
    };

    const handleShare = (product: Product) => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href
            });
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            console.log('Product URL copied to clipboard');
        }
    };

    const handleBackClick = () => {
        router.back();
    };

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
                    <p className="text-muted-foreground mb-6">{error}</p>
                    <Button
                        onClick={handleBackClick}
                        variant="outline"
                        className="border-border hover:border-brand hover:text-brand transition-all duration-300 ease-brand-ease"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    // Loading state is handled by loading.tsx
    if (loading || !product) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button & Actions */}
                <div className="flex items-center justify-between mb-8">
                    <Button
                        variant="outline"
                        onClick={handleBackClick}
                        className="flex items-center gap-2 border-border hover:border-brand hover:text-brand transition-all duration-300 ease-brand-ease"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Products
                    </Button>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShare(product)}
                            className="flex items-center gap-2 border-border hover:border-brand hover:text-brand transition-all duration-300 ease-brand-ease"
                        >
                            <Share2 className="w-4 h-4" />
                            Share
                        </Button>
                    </div>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Product Images */}
                    <div>
                        <ProductImages
                            images={product.images}
                            productName={product.name}
                            variant="gallery"
                            allowZoom={true}
                            allowFullscreen={true}
                        />
                    </div>

                    {/* Product Details */}
                    <div>
                        <ProductDetail
                            product={product}
                            onAddToCart={handleAddToCart}
                            onAddToWishlist={handleAddToWishlist}
                            onShare={handleShare}
                        />
                    </div>
                </div>

                {/* Product Reviews */}
                <div className="mb-8">
                    <ProductReviews
                        product={product}
                        allowReviewSubmission={true}
                        variant="detailed"
                    />
                </div>

                {/* Related Products Section Placeholder */}
                <div className="bg-card rounded-lg p-8 text-center border border-border shadow-card">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                        Related Products
                    </h3>
                    <p className="text-muted-foreground">
                        Related products section will be implemented here
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;