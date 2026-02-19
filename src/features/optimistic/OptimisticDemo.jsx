import { useOptimistic, useState, useActionState } from 'react';
import FeatureCard from '../../components/FeatureCard';
import { SparklesIcon } from '../../components/Icons';
import ProductReviews from './ProductReviews';
import LikeButton from './LikeButton';
import CartQuantity from './CartQuantity';

function OptimisticDemo() {
  return (
    <div className="space-y-8">
      <FeatureCard
        title="useOptimistic"
        description="Create instant UI feedback while async operations complete"
        icon={SparklesIcon}
      >
        <div className="space-y-6">
          {/* Explanation */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
            <h3 className="font-semibold text-pink-900 mb-2">
              What is useOptimistic?
            </h3>
            <div className="text-sm text-pink-800 space-y-2">
              <p>
                <code className="bg-pink-100 px-1 rounded">useOptimistic</code> allows you to 
                show an optimistic state while an async action is in progress. If the action 
                fails, React automatically reverts to the previous state.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Instant UI feedback (no waiting for server)</li>
                <li>Automatic rollback on errors</li>
                <li>Better perceived performance</li>
                <li>Reduced loading states</li>
              </ul>
            </div>
          </div>

          {/* Comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ Without useOptimistic</h4>
              <div className="space-y-2 text-sm text-red-800">
                <p>1. User clicks "Like"</p>
                <p>2. Show loading spinner</p>
                <p>3. Wait for server response (1-2 seconds)</p>
                <p>4. Update UI</p>
                <p className="font-semibold pt-2">Result: Slow, janky experience</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ With useOptimistic</h4>
              <div className="space-y-2 text-sm text-green-800">
                <p>1. User clicks "Like"</p>
                <p>2. UI updates INSTANTLY</p>
                <p>3. Server request happens in background</p>
                <p>4. If error, automatically rollback</p>
                <p className="font-semibold pt-2">Result: Fast, smooth experience</p>
              </div>
            </div>
          </div>

          {/* Demo 1: Like Button */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 1: Like Button with Optimistic Updates
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Click the like button and notice how the UI updates immediately, even though 
              the server request takes 1 second. Try clicking rapidly!
            </p>
            <LikeButton />
          </div>

          {/* Demo 2: Cart Quantity */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 2: Shopping Cart Quantity
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Update cart quantities with instant feedback. The UI updates immediately 
              while the server processes the request.
            </p>
            <CartQuantity />
          </div>

          {/* Demo 3: Product Reviews */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 3: Product Reviews (Complex Example)
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Submit a product review and see it appear instantly in the list. 
              The review shows a "pending" state until the server confirms.
            </p>
            <ProductReviews />
          </div>

          {/* Code Example */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Code Example:</h4>
            <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`import { useOptimistic, useActionState } from 'react';

function LikeButton({ productId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  
  // useOptimistic creates an optimistic version of state
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (currentLikes, newLikes) => newLikes
  );

  async function likeAction() {
    // Immediately update UI (optimistic)
    addOptimisticLike(likes + 1);
    
    try {
      // Server request happens in background
      const result = await api.likeProduct(productId);
      setLikes(result.likes);  // Update with real data
    } catch (error) {
      // On error, React automatically reverts to 'likes'
      console.error('Like failed:', error);
    }
  }

  return (
    <button onClick={likeAction}>
      ❤️ {optimisticLikes} likes
    </button>
  );
}

// With forms and useActionState
function AddReviewForm({ productId }) {
  const [reviews, setReviews] = useState([]);
  
  const [optimisticReviews, addOptimisticReview] = useOptimistic(
    reviews,
    (currentReviews, newReview) => [...currentReviews, newReview]
  );

  async function submitReview(prevState, formData) {
    const review = {
      id: Date.now(),
      text: formData.get('text'),
      pending: true  // Mark as pending
    };
    
    // Show review immediately
    addOptimisticReview(review);
    
    try {
      const savedReview = await api.addReview(productId, review);
      setReviews(prev => [...prev, savedReview]);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  const [state, formAction] = useActionState(submitReview, {});

  return (
    <div>
      <form action={formAction}>
        <textarea name="text" />
        <button type="submit">Submit Review</button>
      </form>
      
      <div>
        {optimisticReviews.map(review => (
          <div key={review.id}>
            {review.text}
            {review.pending && <span>⏳ Sending...</span>}
          </div>
        ))}
      </div>
    </div>
  );
}`}
            </pre>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ Benefits</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Instant UI feedback</li>
                <li>• Automatic error rollback</li>
                <li>• Better perceived performance</li>
                <li>• Reduced loading states</li>
                <li>• Smoother user experience</li>
              </ul>
            </div>

            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <h4 className="font-semibold text-pink-900 mb-2">🎯 Use Cases</h4>
              <ul className="text-sm text-pink-800 space-y-1">
                <li>• Like/upvote buttons</li>
                <li>• Adding items to cart</li>
                <li>• Posting comments/reviews</li>
                <li>• Updating quantities</li>
                <li>• Any user-initiated mutation</li>
              </ul>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">
              ⚠️ Important Notes
            </h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Optimistic state automatically reverts on component unmount or error</li>
              <li>• Best used with idempotent operations</li>
              <li>• Always handle errors gracefully</li>
              <li>• Consider showing "pending" indicators for clarity</li>
              <li>• Don't use for critical operations that must succeed</li>
            </ul>
          </div>
        </div>
      </FeatureCard>
    </div>
  );
}

export default OptimisticDemo;