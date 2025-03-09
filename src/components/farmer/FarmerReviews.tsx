
import React from 'react';
import { ThumbsUp, User, Star } from 'lucide-react';
import { FarmerReview } from '@/types/farmer';

interface FarmerReviewsProps {
  reviews: FarmerReview[];
}

const FarmerReviews: React.FC<FarmerReviewsProps> = ({ reviews }) => {
  if (reviews.length === 0) return null;
  
  return (
    <div className="border-t border-border p-6">
      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <ThumbsUp className="h-5 w-5 mr-2 text-primary" />
        Customer Reviews
      </h4>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-secondary/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="font-medium text-foreground">{review.name}</span>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                  />
                ))}
              </div>
            </div>
            <p className="text-foreground mb-1">{review.comment}</p>
            <div className="text-sm text-muted-foreground">{review.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerReviews;
