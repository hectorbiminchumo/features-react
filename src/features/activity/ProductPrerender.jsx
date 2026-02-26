import { Activity, useState, useEffect } from 'react';
import { mockProducts } from '../../data/mockProducts';

// Simulates a "heavy" product detail component
function ProductDetail({ product }) {
  const [loadTime] = useState(() => Date.now());
  const [imageLoaded, setImageLoaded] = useState(false);

  // Simulate image loading
  useEffect(() => {
    const timer = setTimeout(() => setImageLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-lg border p-4 space-y-3">
      <div className="flex items-start gap-4">
        {/* Product Image Placeholder */}
        <div className={`w-24 h-24 rounded-lg flex items-center justify-center text-3xl transition-all ${
          imageLoaded ? 'bg-gray-100' : 'bg-gray-200 animate-pulse'
        }`}>
          {imageLoaded ? '📦' : '⏳'}
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{product.name}</h4>
          <p className="text-primary font-bold text-lg">${product.price.toFixed(2)}</p>
          <p className="text-xs text-gray-500">{product.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-0.5 rounded ${
              product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
            <span className="text-xs text-gray-400">
              Category: {product.category}
            </span>
          </div>
        </div>
      </div>

      {/* Pre-render indicator */}
      <div className="bg-violet-50 border border-violet-200 rounded p-2 text-xs text-violet-700">
        🔍 This component was <strong>pre-rendered</strong> at {new Date(loadTime).toLocaleTimeString()}.
        {imageLoaded 
          ? ' Image is ready — transition was instant!'
          : ' Image still loading in the background...'}
      </div>

      {/* Product Actions */}
      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 bg-primary text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
          Add to Cart
        </button>
        <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors text-white">
          ♡ Wishlist
        </button>
      </div>
    </div>
  );
}

function ProductPrerender() {
  const products = mockProducts.slice(0, 4);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-4">
      <div className="bg-violet-50 border border-violet-200 rounded p-3 text-xs text-violet-800">
        <strong>💡 How this works:</strong> All 4 product details are rendered with{' '}
        <code className="bg-violet-100 px-1 rounded">{'<Activity mode="hidden">'}</code> when the page loads. 
        When you click a product, React just switches from <code className="bg-violet-100 px-1 rounded">hidden</code> to{' '}
        <code className="bg-violet-100 px-1 rounded">visible</code> — no re-rendering needed!
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {products.map(product => (
          <button
            key={product.id}
            onClick={() => setSelectedId(
              selectedId === product.id ? null : product.id
            )}
            className={`p-3 rounded-lg border-2 text-left transition-all ${
              selectedId === product.id
                ? 'border-primary bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="text-2xl mb-2">📦</div>
            <p className="font-medium text-sm truncate text-white">{product.name}</p>
            <p className="text-primary text-sm font-bold text-white">${product.price.toFixed(2)}</p>
          </button>
        ))}
      </div>

      {/* Pre-rendered Product Details (all rendered, only selected visible) */}
      {products.map(product => (
        <Activity
          key={product.id}
          mode={selectedId === product.id ? 'visible' : 'hidden'}
        >
          <ProductDetail product={product} />
        </Activity>
      ))}

      {!selectedId && (
        <p className="text-center text-sm text-gray-500 py-4">
          👆 Click a product to see its pre-rendered detail view
        </p>
      )}
    </div>
  );
}

export default ProductPrerender;