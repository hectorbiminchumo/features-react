import { useOptimistic, useActionState, useState } from 'react';
import { StarIcon } from '../../components/Icons';
import { mockProducts } from '../../data/mockProducts';

// Simulate API call
async function submitReview(productId, review) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (Math.random() < 0.2) {
    throw new Error('Failed to submit review. Please try again.');
  }
  
  return {
    ...review,
    id: Date.now(),
    date: new Date().toISOString(),
    verified: true
  };
}

function ReviewItem({ review }) {
  return (
    <div className={`bg-white border rounded-lg p-4 ${
      review.pending ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
    }`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900">{review.user}</span>
            {review.verified && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                ✓ Verified
              </span>
            )}
            {review.pending && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded flex items-center gap-1">
                <div className="animate-spin rounded-full h-2 w-2 border-2 border-blue-700 border-t-transparent"></div>
                Pending
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className="w-4 h-4 text-yellow-400"
                filled={i < review.rating}
              />
            ))}
          </div>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(review.date).toLocaleDateString()}
        </span>
      </div>
      <p className={`text-sm ${
        review.pending ? 'text-gray-600 italic' : 'text-gray-700'
      }`}>
        {review.comment}
      </p>
    </div>
  );
}

function ProductReviews() {
  const product = mockProducts[0];
  
  const initialReviews = [
    {
      id: 1,
      user: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent product! Highly recommended.',
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
      verified: true
    },
    {
      id: 2,
      user: 'Mike Chen',
      rating: 4,
      comment: 'Good quality, fast delivery.',
      date: new Date(Date.now() - 86400000 * 5).toISOString(),
      verified: true
    }
  ];

  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(5);

  // useOptimistic for reviews list
  const [optimisticReviews, addOptimisticReview] = useOptimistic(
    reviews,
    (currentReviews, newReview) => [newReview, ...currentReviews]
  );

  // Action for submitting review
  async function submitReviewAction(prevState, formData) {
    const comment = formData.get('comment')?.trim();
    const userName = formData.get('userName')?.trim();

    if (!comment || comment.length < 10) {
      return {
        success: false,
        message: 'Review must be at least 10 characters long'
      };
    }

    if (!userName || userName.length < 2) {
      return {
        success: false,
        message: 'Please enter your name'
      };
    }

    // Create optimistic review
    const optimisticReview = {
      id: `temp-${Date.now()}`,
      user: userName,
      rating: rating,
      comment: comment,
      date: new Date().toISOString(),
      pending: true,  // Mark as pending
      verified: false
    };

    // Add optimistic review immediately
    addOptimisticReview(optimisticReview);

    try {
      // Submit to server
      const savedReview = await submitReview(product.id, {
        user: userName,
        rating: rating,
        comment: comment
      });

      // Update with real data
      setReviews(prev => [savedReview, ...prev]);
      setRating(5);

      return {
        success: true,
        message: 'Review submitted successfully!'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  const [state, formAction, isPending] = useActionState(
    submitReviewAction,
    { success: false, message: '' }
  );

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      {/* Product Info */}
      <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 object-cover rounded"
        />
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className="w-4 h-4 text-yellow-400"
                  filled={i < Math.floor(product.rating)}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({optimisticReviews.length} reviews)
            </span>
          </div>
          <p className="text-sm text-gray-600">{product.description}</p>
        </div>
      </div>

      {/* Review Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Write a Review</h4>
        
        <form action={formAction} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="userName"
              disabled={isPending}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
            />
          </div>

          {/* Rating Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  disabled={isPending}
                  className="transition-transform hover:scale-110 disabled:cursor-not-allowed"
                >
                  <StarIcon
                    className="w-8 h-8 text-yellow-400"
                    filled={star <= rating}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Review
            </label>
            <textarea
              name="comment"
              rows="4"
              disabled={isPending}
              placeholder="Share your experience with this product..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none disabled:bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isPending ? 'Submitting...' : 'Submit Review'}
          </button>

          {/* Status Message */}
          {state.message && (
            <div className={`text-sm p-3 rounded ${
              state.success
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {state.message}
            </div>
          )}
        </form>
      </div>

      {/* Reviews List */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">
          Customer Reviews ({optimisticReviews.length})
        </h4>
        <div className="space-y-3">
          {optimisticReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-6 bg-pink-50 border border-pink-200 rounded p-3 text-xs text-pink-800">
        <strong>Watch carefully:</strong> When you submit a review, it appears 
        immediately at the top with a "Pending" badge. After ~1.5 seconds, 
        it either gets confirmed (verified badge) or fails (20% chance). 
        On failure, the review automatically disappears!
      </div>
    </div>
  );
}

export default ProductReviews;