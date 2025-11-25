'use client';

import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Flag, Filter, ChevronDown, User, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Product } from '@/types';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  createdAt: Date;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  images?: string[];
  pros?: string[];
  cons?: string[];
}

export interface ProductReviewsProps {
  product: Product;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
  allowReviewSubmission?: boolean;
  showReviewForm?: boolean;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  product,
  className = '',
  variant = 'default',
  allowReviewSubmission = true,
  showReviewForm = false
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(showReviewForm);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    content: '',
    pros: '',
    cons: ''
  });

  // Mock reviews data - in real app this would come from API
  const reviews: Review[] = [
    {
      id: '1',
      userId: '1',
      userName: 'Sarah Johnson',
      userAvatar: 'https://i.pravatar.cc/150?u=sarah',
      rating: 5,
      title: 'Excellent quality and fast delivery!',
      content: 'I\'m really impressed with this product. The build quality is outstanding and it arrived much faster than expected. Highly recommend!',
      createdAt: new Date('2024-11-10'),
      verified: true,
      helpful: 12,
      notHelpful: 1,
      pros: ['Great build quality', 'Fast shipping', 'Easy to use'],
      cons: ['Price could be lower']
    },
    {
      id: '2',
      userId: '2',
      userName: 'Michael Chen',
      userAvatar: 'https://i.pravatar.cc/150?u=michael',
      rating: 4,
      title: 'Good product with minor issues',
      content: 'Overall satisfied with the purchase. Works as described, though there are some minor design flaws. Customer service was helpful when I had questions.',
      createdAt: new Date('2024-11-08'),
      verified: true,
      helpful: 8,
      notHelpful: 2,
      pros: ['Good performance', 'Helpful customer service'],
      cons: ['Minor design issues', 'Instructions could be clearer']
    },
    {
      id: '3',
      userId: '3',
      userName: 'Emma Wilson',
      userAvatar: 'https://i.pravatar.cc/150?u=emma',
      rating: 5,
      title: 'Perfect for my needs',
      content: 'This is exactly what I was looking for. The features are well thought out and the product feels premium. Worth every penny!',
      createdAt: new Date('2024-11-05'),
      verified: false,
      helpful: 15,
      notHelpful: 0,
      pros: ['Perfect features', 'Premium feel', 'Great value'],
      cons: []
    }
  ];

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
  }));

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => filterRating ? review.rating === filterRating : true)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'highest': return b.rating - a.rating;
        case 'lowest': return a.rating - b.rating;
        case 'helpful': return b.helpful - a.helpful;
        default: return 0;
      }
    });

  // Handle review submission
  const handleSubmitReview = () => {
    if (newReview.rating > 0 && newReview.title && newReview.content) {
      // In real app, this would submit to API
      console.log('Submitting review:', newReview);
      setShowForm(false);
      setNewReview({ rating: 0, title: '', content: '', pros: '', cons: '' });
    }
  };

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`product-reviews ${className}`}>
      {/* Reviews Summary */}
      <Card className="mb-6 shadow-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Star className="w-5 h-5 text-brand" />
            Customer Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-bold">{product.rating}</div>
                <div>
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-neutral-600">
                    Based on {product.reviewCount} reviews
                  </div>
                </div>
              </div>

              {/* Write Review Button */}
              {allowReviewSubmission && (
                <Button
                  onClick={() => setShowForm(!showForm)}
                  variant="outline"
                  className="w-full border-brand text-brand hover:bg-brand hover:text-white transition-all duration-300 ease-brand-ease"
                >
                  Write a Review
                </Button>
              )}
            </div>

            {/* Rating Distribution */}
            <div>
              <h4 className="font-medium mb-3">Rating Distribution</h4>
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-6 text-muted-foreground">{rating}★</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-warning rounded-full h-2 transition-all duration-500 ease-brand-ease"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showForm && allowReviewSubmission && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Write Your Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Rating Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="text-2xl hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newReview.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-neutral-300 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Review Title</label>
              <Input
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                placeholder="Summarize your experience"
                maxLength={100}
              />
            </div>

            {/* Review Content */}
            <div>
              <label className="block text-sm font-medium mb-2">Your Review</label>
              <textarea
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                placeholder="Tell us about your experience with this product"
                className="w-full p-3 border border-neutral-200 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                maxLength={500}
              />
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Pros (Optional)</label>
                <Input
                  value={newReview.pros}
                  onChange={(e) => setNewReview({ ...newReview, pros: e.target.value })}
                  placeholder="What did you like?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cons (Optional)</label>
                <Input
                  value={newReview.cons}
                  onChange={(e) => setNewReview({ ...newReview, cons: e.target.value })}
                  placeholder="What could be improved?"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleSubmitReview} 
                className="flex-1 bg-brand hover:bg-brand-dark text-white transition-all duration-300 ease-brand-ease"
              >
                Submit Review
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="border-border hover:border-brand hover:text-brand transition-colors"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews Controls */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Sort By */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-white border border-neutral-200 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>

            {/* Filter by Rating */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Filter:</label>
              <select
                value={filterRating || ''}
                onChange={(e) => setFilterRating(e.target.value ? parseInt(e.target.value) : null)}
                className="bg-white border border-neutral-200 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-neutral-500">No reviews match your current filter.</p>
            </CardContent>
          </Card>
        ) : (
          filteredReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      {review.userAvatar ? (
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.userName}</span>
                        {review.verified && (
                          <div className="flex items-center gap-1 text-green-600 text-xs">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified Purchase
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-neutral-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span>•</span>
                        <span>{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm">
                    <Flag className="w-4 h-4" />
                  </Button>
                </div>

                {/* Review Content */}
                <div className="space-y-3">
                  <h4 className="font-semibold">{review.title}</h4>
                  <p className="text-neutral-700 leading-relaxed">{review.content}</p>

                  {/* Pros and Cons */}
                  {(review.pros?.length || review.cons?.length) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {review.pros && review.pros.length > 0 && (
                        <div>
                          <h5 className="font-medium text-green-700 mb-2">Pros:</h5>
                          <ul className="text-sm space-y-1">
                            {review.pros.map((pro, index) => (
                              <li key={index} className="flex items-center gap-2 text-green-600">
                                <span>+</span> {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {review.cons && review.cons.length > 0 && (
                        <div>
                          <h5 className="font-medium text-red-700 mb-2">Cons:</h5>
                          <ul className="text-sm space-y-1">
                            {review.cons.map((con, index) => (
                              <li key={index} className="flex items-center gap-2 text-red-600">
                                <span>-</span> {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Review Actions */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-100">
                  <span className="text-sm text-neutral-600">Was this helpful?</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {review.helpful}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="w-4 h-4 mr-1" />
                      {review.notHelpful}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Load More Button */}
      {filteredReviews.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;