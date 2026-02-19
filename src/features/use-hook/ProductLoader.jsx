import { use, Suspense, useState } from 'react';
import { api } from '../../data/mockProducts';
import { StarIcon } from '../../components/Icons';

// Cache for promises to prevent infinite re-renders
const productCache = new Map();

function getProducts() {
  if (!productCache.has('all')) {
    productCache.set('all', api.getProducts());
  }
  return productCache.get('all');
}

// Component that uses the use() hook
function ProductListContent() {
  // use() hook suspends until promise resolves
  const products = use(getProducts());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{product.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-3 h-3 text-yellow-400"
                      filled={i < Math.floor(product.rating)}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>
              <p className="text-lg font-bold text-primary mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Loading component
function ProductsLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
      <p className="text-gray-600">Loading products...</p>
      <p className="text-xs text-gray-500 mt-1">
        (Simulated 800ms delay)
      </p>
    </div>
  );
}

// Main component with Suspense boundary
function ProductLoader() {
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => {
    // Clear cache and trigger re-render
    productCache.clear();
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-gray-900">Product Catalog</h4>
        <button
          onClick={handleRefresh}
          className="text-sm bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Refresh Data
        </button>
      </div>

      {/* Suspense boundary catches the suspension */}
      <Suspense fallback={<ProductsLoading />}>
        <ProductListContent key={refresh} />
      </Suspense>

      <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800">
        <strong>How it works:</strong> The <code className="bg-blue-100 px-1 rounded">use()</code> hook 
        reads the promise and suspends rendering until data is ready. 
        Suspense catches the suspension and shows the fallback.
      </div>
    </div>
  );
}

export default ProductLoader;