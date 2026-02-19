import { useState } from 'react';
import { useEffect } from 'react';
import { mockProducts } from '../../data/mockProducts';
import { StarIcon } from '../../components/Icons';

function ProductMetadata() {
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setProductClicked(true);
  };

  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]);
  const [productClicked, setProductClicked] = useState(false);

  useEffect(() => {
    if (productClicked) {
      document.title = `${selectedProduct.name} - React 19.2 Demo Store`;
    } else {
      document.title = 'React 19.2 Features Demo';
    }
  }, [selectedProduct, productClicked]);

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      {/* Metadata tags (except <title>) */}
      {selectedProduct && (
        <>
          <meta name="description" content={selectedProduct.description} />
          <meta name="keywords" content={`${selectedProduct.category}, ${selectedProduct.name}, e-commerce`} />
          {/* Open Graph tags for social media */}
          <meta property="og:type" content="product" />
          <meta property="og:title" content={selectedProduct.name} />
          <meta property="og:description" content={selectedProduct.description} />
          <meta property="og:image" content={selectedProduct.image} />
          <meta property="og:price:amount" content={selectedProduct.price} />
          <meta property="og:price:currency" content="USD" />
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={selectedProduct.name} />
          <meta name="twitter:description" content={selectedProduct.description} />
          <meta name="twitter:image" content={selectedProduct.image} />
        </>
      )}

      <h4 className="font-semibold text-gray-900 mb-4">Select a Product</h4>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {mockProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => handleProductClick(product)}
            className={`text-left bg-white border-2 rounded-lg p-3 transition-all hover:shadow-md ${
              selectedProduct.id === product.id
                ? 'border-primary shadow-md'
                : 'border-gray-200'
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover rounded mb-2"
            />
            <h5 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
              {product.name}
            </h5>
            <p className="text-xs text-gray-600 mb-2">{product.category}</p>
            <p className="font-bold text-primary">${product.price.toFixed(2)}</p>
          </button>
        ))}
      </div>

      {/* Selected Product Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">
          Current Page Metadata:
        </h4>
        
        <div className="flex gap-4 mb-4 pb-4 border-b border-gray-200">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-24 h-24 object-cover rounded"
          />
          <div className="flex-1">
            <h5 className="font-bold text-lg text-gray-900 mb-1">
              {selectedProduct.name}
            </h5>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    filled={i < Math.floor(selectedProduct.rating)}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({selectedProduct.reviews})</span>
            </div>
            <p className="text-2xl font-bold text-primary">
              ${selectedProduct.price.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-semibold text-gray-700">Title:</span>
            <code className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
              {selectedProduct.name} - React 19.2 Demo Store
            </code>
          </div>
          
          <div>
            <span className="font-semibold text-gray-700">Description:</span>
            <p className="mt-1 text-gray-600 text-xs bg-gray-50 p-2 rounded">
              {selectedProduct.description}
            </p>
          </div>
          
          <div>
            <span className="font-semibold text-gray-700">Keywords:</span>
            <code className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
              {selectedProduct.category}, {selectedProduct.name}, e-commerce
            </code>
          </div>

          <div>
            <span className="font-semibold text-gray-700">Open Graph Image:</span>
            <code className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded break-all">
              {selectedProduct.image}
            </code>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800">
        <strong>💡 Check your browser tab:</strong> Notice how the page title changes 
        when you select different products. Open DevTools → Elements → <code className="bg-blue-100 px-1 rounded">&lt;head&gt;</code> to 
        see the metadata tags updating in real-time!
      </div>
    </div>
  );
}

export default ProductMetadata;