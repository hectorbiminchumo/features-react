import { useOptimistic, useState } from 'react';
import { mockProducts } from '../../data/mockProducts';

// Simulate API call
async function updateCartQuantity(productId, quantity) {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (Math.random() < 0.15) {
    throw new Error('Failed to update cart');
  }
  
  return { success: true, quantity };
}

function CartItem({ product: initialProduct }) {
  const [product, setProduct] = useState(initialProduct);
  const [error, setError] = useState(null);

  // useOptimistic for quantity
  const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
    product.cartQuantity || 1,
    (current, newQuantity) => newQuantity
  );

  async function handleUpdateQuantity(newQuantity) {
    if (newQuantity < 1 || newQuantity > product.stock) return;
    
    setError(null);
    
    // Optimistically update UI
    setOptimisticQuantity(newQuantity);

    try {
      // Server request
      await updateCartQuantity(product.id, newQuantity);
      
      // Update real state
      setProduct(prev => ({ ...prev, cartQuantity: newQuantity }));
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  }

  const isPending = product.cartQuantity !== optimisticQuantity;
  const total = (product.price * optimisticQuantity).toFixed(2);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex gap-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-20 object-cover rounded"
        />
        
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{product.name}</h4>
          <p className="text-sm text-gray-600 mb-2">
            ${product.price.toFixed(2)} each
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
              <button
                onClick={() => handleUpdateQuantity(optimisticQuantity - 1)}
                disabled={optimisticQuantity <= 1 || isPending}
                className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-200 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                −
              </button>
              
              <span className={`w-12 text-center font-semibold ${
                isPending ? 'text-blue-600' : 'text-gray-900'
              }`}>
                {optimisticQuantity}
              </span>
              
              <button
                onClick={() => handleUpdateQuantity(optimisticQuantity + 1)}
                disabled={optimisticQuantity >= product.stock || isPending}
                className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-200 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                +
              </button>
            </div>

            <div className="text-right flex-1">
              <p className="text-sm text-gray-600">Total:</p>
              <p className={`text-lg font-bold ${
                isPending ? 'text-blue-600' : 'text-gray-900'
              }`}>
                ${total}
              </p>
            </div>
          </div>

          {/* Stock info */}
          <p className="text-xs text-gray-500 mt-2">
            {product.stock} available in stock
          </p>

          {/* Pending indicator */}
          {isPending && (
            <div className="mt-2 flex items-center gap-2 text-xs text-blue-600">
              <div className="animate-spin rounded-full h-3 w-3 border-2 border-blue-600 border-t-transparent"></div>
              <span>Updating cart...</span>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2">
              ⚠️ {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CartQuantity() {
  const cartProducts = mockProducts.slice(0, 3).map(p => ({
    ...p,
    cartQuantity: 1
  }));

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="space-y-4">
        {cartProducts.map(product => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-4 bg-purple-50 border border-purple-200 rounded p-3 text-xs text-purple-800">
        <strong>Notice:</strong> When you change quantities, the total price updates 
        immediately while the server processes the change in the background. 
        If the update fails (15% chance), the quantity automatically reverts.
      </div>
    </div>
  );
}

export default CartQuantity;