import { useState } from 'react';
import { mockProducts, mockCategories } from '../../data/mockProducts';

function CategoryMetadata() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? mockProducts
    : mockProducts.filter(p => p.category === selectedCategory);

  const categoryDescriptions = {
    'All': 'Browse our complete collection of premium products across all categories.',
    'Electronics': 'Discover the latest in consumer electronics, from headphones to smartwatches.',
    'Accessories': 'Stylish accessories to complement your lifestyle.',
    'Sports': 'Premium sports equipment and fitness gear for active lifestyles.',
    'Home': 'Quality home appliances and essentials for modern living.'
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      {/* Category-specific metadata */}
      <>
        <title>{selectedCategory} Category - React 19.2 Demo Store</title>
        <meta name="description" content={categoryDescriptions[selectedCategory]} />
        <meta name="keywords" content={`${selectedCategory}, products, online shopping, e-commerce`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${selectedCategory} Products`} />
        <meta property="og:description" content={categoryDescriptions[selectedCategory]} />
        <meta property="og:url" content={`https://demo.store/category/${selectedCategory.toLowerCase()}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${selectedCategory} Products`} />
        <meta name="twitter:description" content={categoryDescriptions[selectedCategory]} />
        
        {/* Robots */}
        <meta name="robots" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://demo.store/category/${selectedCategory.toLowerCase()}`} />
      </>

      <h4 className="font-semibold text-gray-900 mb-4">Browse by Category</h4>

      {/* Category Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {mockCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === category
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Category Info Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <h5 className="font-bold text-xl text-gray-900 mb-2">
          {selectedCategory} Category
        </h5>
        <p className="text-gray-600 mb-4">
          {categoryDescriptions[selectedCategory]}
        </p>
        <p className="text-sm text-gray-500">
          Showing {filteredProducts.length} product(s)
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg p-3"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover rounded mb-2"
            />
            <h6 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
              {product.name}
            </h6>
            <p className="text-xs text-gray-600 mb-1">{product.category}</p>
            <p className="font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Metadata Display */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h5 className="font-semibold text-gray-900 mb-3">
          Current Page Metadata:
        </h5>
        <div className="space-y-2 text-xs">
          <div>
            <span className="font-semibold text-gray-700">Title:</span>
            <code className="ml-2 bg-gray-100 px-2 py-1 rounded">
              {selectedCategory} Category - React 19.2 Demo Store
            </code>
          </div>
          
          <div>
            <span className="font-semibold text-gray-700">Description:</span>
            <p className="mt-1 text-gray-600 bg-gray-50 p-2 rounded">
              {categoryDescriptions[selectedCategory]}
            </p>
          </div>
          
          <div>
            <span className="font-semibold text-gray-700">Canonical URL:</span>
            <code className="ml-2 bg-gray-100 px-2 py-1 rounded break-all">
              https://demo.store/category/{selectedCategory.toLowerCase()}
            </code>
          </div>

          <div>
            <span className="font-semibold text-gray-700">Robots:</span>
            <code className="ml-2 bg-gray-100 px-2 py-1 rounded">
              index, follow
            </code>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-4 bg-green-50 border border-green-200 rounded p-3 text-xs text-green-800">
        <strong>🔍 SEO Tip:</strong> Each category page has unique metadata including 
        canonical URLs to prevent duplicate content issues. This improves search engine 
        rankings and social media sharing.
      </div>
    </div>
  );
}

export default CategoryMetadata;