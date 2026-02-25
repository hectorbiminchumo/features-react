import { useOptimistic, useState, useTransition } from 'react';
import { mockProducts } from '../../data/mockProducts';

// Simulate API call
async function likeProduct(productId) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (Math.random() < 0.1) {
    throw new Error('Network error. Please try again.');
  }
  
  return { success: true };
}

function ProductLikeCard({ product }) {
  // Real server state
  const [serverState, setServerState] = useState({
    likes: product.reviews || 0,
    isLiked: false
  });
  
  const [error, setError] = useState(null);
  
  // useTransition is required for useOptimistic updates
  const [isPending, startTransition] = useTransition();

  // Optimistic state - updates instantly
  const [optimisticState, setOptimisticState] = useOptimistic(
    serverState,
    (current, newState) => newState
  );

  async function handleLike() {
    setError(null);
    
    // Calculate new state
    const newIsLiked = !optimisticState.isLiked;
    const newLikes = newIsLiked 
      ? optimisticState.likes + 1 
      : optimisticState.likes - 1;
    
    const newState = {
      likes: newLikes,
      isLiked: newIsLiked
    };
    
    // Wrap optimistic update in transition
    startTransition(async () => {
      // Update UI immediately (optimistic)
      setOptimisticState(newState);
      
      try {
        // Server processes in background
        await likeProduct(product.id);
        
        // Update real state after confirmation
        setServerState(newState);
      } catch (err) {
        // React automatically reverts to serverState on error
        setError(err.message);
        setTimeout(() => setError(null), 3000);
      }
    });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-16 w-2xs">
      <div className="flex flex-col items-center gap-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 object-cover rounded"
        />
        <div className="flex flex-col items-center">
          <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
          <p className="text-sm text-gray-600 mb-3">{product.category}</p>
          
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              optimisticState.isLiked
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-xl">{optimisticState.isLiked ? '❤️' : '🤍'}</span>
            <span>{optimisticState.likes} likes</span>
          </button>

          {error && (
            <div className="mt-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Pending indicator */}
      {isPending && (
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
      <div className="flex flex-col items-center space-y-4 ">
        {products.map(product => (
          <ProductLikeCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800">
        <strong>⚡ Try this:</strong> Click like and observe:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>The number changes INSTANTLY</strong> (doesn't wait for server)</li>
          <li>The icon changes immediately: 🤍 → ❤️</li>
          <li>"Syncing..." appears while server confirms (1.5s)</li>
          <li>You can make multiple rapid clicks</li>
          <li>If it fails (10% probability), the number automatically reverts</li>
        </ul>
      </div>
    </div>
  );
}

export default LikeButton;