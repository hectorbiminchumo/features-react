import { useActionState } from 'react';
import { ShoppingCartIcon, StarIcon } from '../../components/Icons';
import { api } from '../../data/mockProducts';

function ProductCard({ product, onAddToCart }) {
  // Action function for adding to cart
  async function addToCartAction(prevState, formData) {
    const quantity = parseInt(formData.get('quantity'));
    
    // Check stock
    if (quantity > product.stock) {
      return {
        success: false,
        message: `Only ${product.stock} items available`
      };
    }

    try {
      // Simulate API call with delay
      await api.addToCart(product.id, quantity);
      
      // Update parent component's cart
      onAddToCart(product, quantity);
      
      return {
        success: true,
        message: 'Added to cart successfully!'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add to cart'
      };
    }
  }

  // useActionState hook - React 19.2 feature
  const [state, formAction, isPending] = useActionState(
    addToCartAction,
    { success: false, message: '' }
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow max-w-xs mx-auto">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-xs text-gray-500">{product.category}</p>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className="w-4 h-4 text-yellow-400"
              filled={i < Math.floor(product.rating)}
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Price and Stock */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className={`text-xs font-medium ${
            product.stock > 10 ? 'text-green-600' : 
            product.stock > 0 ? 'text-orange-600' : 'text-red-600'
          }`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Add to Cart Form - Using Actions */}
        <form action={formAction} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="number"
              name="quantity"
              min="1"
              max={product.stock}
              defaultValue="1"
              disabled={product.stock === 0 || isPending}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={product.stock === 0 || isPending}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <ShoppingCartIcon className="w-4 h-4" />
              <span>
                {isPending ? 'Adding...' : 'Add to Cart'}
              </span>
            </button>
          </div>

          {/* Status Message */}
          {state.message && (
            <div className={`text-xs p-2 rounded ${
              state.success 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {state.message}
            </div>
          )}
        </form>

        {/* Pending State Indicator */}
        {isPending && (
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
            <div className="animate-spin rounded-full h-3 w-3 border-2 border-primary border-t-transparent" />
            <span>Processing...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;