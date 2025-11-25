'use client';

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "../../components/cart/cart-summary";

export default function CartPage() {
    const router = useRouter();
    const { items, isEmpty } = useCart();

    const handleBackClick = () => {
        router.back();
    };

    const handleContinueShopping = () => {
        router.push('/products');
    };

    const handleCheckout = () => {
        router.push('/checkout');
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            {/* Back Button */}
            <div className="mb-6">
                <Button
                    onClick={handleBackClick}
                    variant="ghost"
                    className="text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Geri
                </Button>
            </div>

            <h1 className="text-3xl font-bold text-neutral-900 mb-6">Sepetim</h1>
         
            {isEmpty ? (
                /* Empty Cart State */
                <div className="flex flex-col items-center justify-center py-16">
                    <ShoppingBag className="w-24 h-24 text-neutral-300 mb-6" />
                    <h2 className="text-2xl font-medium text-neutral-700 mb-3">
                        Sepetiniz boş
                    </h2>
                    <p className="text-neutral-500 text-center mb-8 max-w-md">
                        Hoşunuza giden ürünleri sepete ekleyerek alışverişe başlayın
                    </p>
                    <Button 
                        onClick={handleContinueShopping}
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
                    >
                        Alışverişe Başla
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-1">
                        <Card className="bg-white border border-neutral-200">
                            <CardContent className="p-0">
                                <div className="divide-y divide-neutral-200">
                                    {items.map((item) => (
                                        <CartItem 
                                            key={item.id} 
                                            item={item}
                                            size="lg"
                                            variant="detailed"
                                            showQuantityControls={true}
                                            showRemove={true}
                                            className="border-0"
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Continue Shopping */}
                        <div className="mt-6">
                            <Button 
                                variant="outline" 
                                onClick={handleContinueShopping}
                                className="border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                            >
                                Alışverişe Devam Et
                            </Button>
                        </div>
                    </div>

                    {/* Cart Summary - Sepet Özeti */}
                    <div className="lg:col-span-1">
                        <CartSummary />
                    </div>
                </div>
            )}
        </div>
    );
}