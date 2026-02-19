import { use, Suspense, useState } from 'react';
import { api, mockCategories } from '../../data/mockProducts';

// Cache for category-based promises
const categoryCache = new Map();

function getProductsByCategory(category) {
  const key = category || 'all';
  if (!categoryCache.has(key)) {
    const promise = category 
      ? api.getProducts().then(products => 
          products.filter(p => p.category === category)
        )
      : api.getProducts();
    categoryCache.set(key, promise);
  }
  return categoryCache.get(key);
}

// Component demonstrating CONDITIONAL use() - NOT possible with useEffect!
function CategoryProductList({ selectedCategory }) {
  let products;

  // This is the key feature: use() can be used conditionally!
  if (selectedCategory && selectedCategory !== 'All') {
    products = use(getProductsByCategory(selectedCategory));
  } else {
    products = use(getProductsByCategory(null));
  }

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-600 mb-2">
        Showing {products.length} product(s) 
        {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
      </div>
      
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <h5 className="font-semibold text-gray-900 text-sm">{product.name}</h5>
            <p className="text-xs text-gray-500">{product.category}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-primary">${product.price.toFixed(2)}</p>
            <p className="text-xs text-gray-500">{product.stock} in stock</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CategoryLoading() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
      <p className="ml-3 text-gray-600">Loading category products...</p>
    </div>
  );
}

function CategoryLoader() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [refresh, setRefresh] = useState(0);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Clear cache for fresh data
    categoryCache.clear();
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h4 className="font-semibold text-gray-900 mb-4">Filter by Category</h4>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {mockCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product List with Suspense */}
      <Suspense fallback={<CategoryLoading />}>
        <CategoryProductList 
          selectedCategory={selectedCategory} 
          key={`${selectedCategory}-${refresh}`}
        />
      </Suspense>

      {/* Explanation */}
      <div className="mt-4 bg-purple-50 border border-purple-200 rounded p-3">
        <p className="text-xs text-purple-900 font-semibold mb-1">
          💡 Conditional Hook Usage
        </p>
        <p className="text-xs text-purple-800">
          Notice how <code className="bg-purple-100 px-1 rounded">use()</code> is called 
          conditionally based on the selected category. This violates the traditional "Rules of Hooks" 
          but is allowed with <code className="bg-purple-100 px-1 rounded">use()</code>!
        </p>
        <pre className="mt-2 text-xs bg-white p-2 rounded overflow-x-auto">
{`if (selectedCategory !== 'All') {
  products = use(getProductsByCategory(selectedCategory));
} else {
  products = use(getProductsByCategory(null));
}`}
        </pre>
      </div>
    </div>
  );
}

export default CategoryLoader;