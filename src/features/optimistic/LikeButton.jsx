import { useOptimistic, useState } from 'react';
import { mockProducts } from '../../data/mockProducts';

// Simulate API call
async function likeProduct(productId) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate occasional error (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Network error. Please try again.');
  }
  
  return { success: true };
}

function ProductLikeCard({ product }) {
  const [likes, setLikes] = useState(product.reviews || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(null);

  // useOptimistic for likes count
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (currentLikes, increment) => currentLikes + increment
  );

  // useOptimistic for liked state
  const [optimisticIsLiked, setOptimisticIsLiked] = useOptimistic(
    isLiked,
    (current, newValue) => newValue
  );

  async function handleLike() {
    setError(null);
    
    const increment = optimisticIsLiked ? -1 : 1;
    const newLikedState = !optimisticIsLiked;
    
    // Optimistically update UI immediately
    addOptimisticLike(increment);
    setOptimisticIsLiked(newLikedState);

    try {
      // Server request happens in background
      await likeProduct(product.id);
      
      // Update real state after server confirms
      setLikes(prev => prev + increment);
      setIsLiked(newLikedState);
    } catch (err) {
      // On error, React automatically reverts optimistic state
      setError(err.message);
      
      // Error message will auto-clear after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex gap-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 object-cover rounded"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
          <p className="text-sm text-gray-600 mb-3">{product.category}</p>
          
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              optimisticIsLiked
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-xl">{optimisticIsLiked ? '❤️' : '🤍'}</span>
            <span>{optimisticLikes} likes</span>
          </button>

          {error && (
            <div className="mt-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Pending Indicator */}
      {likes !== optimisticLikes && (
        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-2 text-xs text-gray-600">
          <div className="animate-spin rounded-full h-3 w-3 border-2 border-gray-400 border-t-transparent"></div>
          <span>Syncing with server...</span>
        </div>
      )}
    </div>
  );
}

function LikeButton() {
  const products = mockProducts.slice(0, 3);

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="space-y-4">
        {products.map(product => (
          <ProductLikeCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800">
        <strong>Try this:</strong> Click like multiple times rapidly. Notice how the UI 
        updates instantly without waiting for the server. The optimistic state automatically 
        reverts if an error occurs (10% chance simulated).
      </div>
    </div>
  );
}

export default LikeButton;