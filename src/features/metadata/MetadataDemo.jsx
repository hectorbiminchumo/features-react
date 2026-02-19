import { useState } from 'react';
import FeatureCard from '../../components/FeatureCard';
import { DocumentTextIcon } from '../../components/Icons';
import ProductMetadata from './ProductMetadata';
import CategoryMetadata from './CategoryMetadata';
import DynamicMetadata from './DynamicMetadata';

function MetadataDemo() {
  return (
    <div className="space-y-8">
      <FeatureCard
        title="Document Metadata"
        description="Manage document title and meta tags natively in components"
        icon={DocumentTextIcon}
      >
        <div className="space-y-6">
          {/* Explanation */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">
              What is Document Metadata in React 19.2?
            </h3>
            <div className="text-sm text-green-800 space-y-2">
              <p>
                React 19.2 now supports rendering <code className="bg-green-100 px-1 rounded">&lt;title&gt;</code>, 
                <code className="bg-green-100 px-1 rounded"> &lt;meta&gt;</code>, and 
                <code className="bg-green-100 px-1 rounded"> &lt;link&gt;</code> tags 
                directly in components without needing third-party libraries like react-helmet.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Native <code className="bg-green-100 px-1 rounded">&lt;title&gt;</code> tag support in components</li>
                <li>Meta tags for SEO (description, keywords, Open Graph)</li>
                <li>Automatic deduplication of duplicate tags</li>
                <li>Better SEO and social media sharing</li>
              </ul>
            </div>
          </div>

          {/* Comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ Old Way (React Helmet)</h4>
              <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
{`import { Helmet } from 'react-helmet';

function Product() {
  return (
    <>
      <Helmet>
        <title>Product Name</title>
        <meta name="description" 
              content="..." />
      </Helmet>
      <div>Content</div>
    </>
  );
}`}
              </pre>
              <p className="text-xs text-red-700 mt-2">
                Required external library
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ New Way (React 19.2)</h4>
              <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
{`function Product() {
  return (
    <>
      <title>Product Name</title>
      <meta name="description" 
            content="..." />
      <div>Content</div>
    </>
  );
}`}
              </pre>
              <p className="text-xs text-green-700 mt-2">
                Native React support, no library needed!
              </p>
            </div>
          </div>

          {/* Current Page Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">
              📄 Current Page Metadata
            </h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Title:</strong> {document.title}</p>
              <p><strong>Description:</strong> {
                document.querySelector('meta[name="description"]')?.content || 'Not set'
              }</p>
              <p className="text-xs mt-2 opacity-75">
                Open your browser's DevTools and check the <code className="bg-blue-100 px-1 rounded">&lt;head&gt;</code> section 
                to see metadata changes in real-time as you interact with the demos below.
              </p>
            </div>
          </div>

          {/* Demo 1: Product Page Metadata */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 1: Product Page Metadata
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Select a product to see how the page title and meta description update 
              automatically. Check your browser tab title!
            </p>
            <ProductMetadata />
          </div>

          {/* Demo 2: Category Metadata */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 2: Category Page Metadata
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Switch between categories to see dynamic metadata updates including 
              Open Graph tags for social media sharing.
            </p>
            <CategoryMetadata />
          </div>

          {/* Demo 3: Dynamic SEO Metadata */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 3: Custom Metadata Builder
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Build your own metadata configuration and see it applied in real-time. 
              This demonstrates how you can dynamically control all aspects of page metadata.
            </p>
            <DynamicMetadata />
          </div>

          {/* Code Example */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Code Example:</h4>
            <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`// Basic title and description
function ProductPage({ product }) {
  return (
    <>
      <title>{product.name} - My Store</title>
      <meta name="description" content={product.description} />
      
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
    </>
  );
}

// Open Graph tags for social media
function ProductWithOG({ product }) {
  return (
    <>
      <title>{product.name}</title>
      <meta name="description" content={product.description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="product" />
      <meta property="og:title" content={product.name} />
      <meta property="og:description" content={product.description} />
      <meta property="og:image" content={product.image} />
      <meta property="og:url" content={window.location.href} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={product.name} />
      <meta name="twitter:description" content={product.description} />
      <meta name="twitter:image" content={product.image} />
      
      <div>{/* Product content */}</div>
    </>
  );
}

// Conditional metadata
function SearchPage({ query, results }) {
  const title = query 
    ? \`Search results for "\${query}"\`
    : 'Search Products';
    
  return (
    <>
      <title>{title}</title>
      <meta name="description" 
            content={\`Found \${results.length} products\`} />
      <meta name="robots" content="noindex" />
      
      <div>{/* Search results */}</div>
    </>
  );
}

// Deduplication - React automatically handles duplicates
function App() {
  return (
    <>
      <title>My App</title>  {/* This will be used */}
      <meta name="description" content="Main description" />
      
      <ProductPage product={product} />
      {/* ProductPage's title overwrites the above */}
    </>
  );
}`}
            </pre>
          </div>

          {/* Supported Tags */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Supported Metadata Tags:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Basic Tags:</h5>
                <ul className="space-y-1 text-gray-700">
                  <li><code className="bg-gray-200 px-1 rounded text-xs">&lt;title&gt;</code> - Page title</li>
                  <li><code className="bg-gray-200 px-1 rounded text-xs">&lt;meta name="description"&gt;</code> - Page description</li>
                  <li><code className="bg-gray-200 px-1 rounded text-xs">&lt;meta name="keywords"&gt;</code> - SEO keywords</li>
                  <li><code className="bg-gray-200 px-1 rounded text-xs">&lt;meta name="author"&gt;</code> - Author info</li>
                  <li><code className="bg-gray-200 px-1 rounded text-xs">&lt;link rel="canonical"&gt;</code> - Canonical URL</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Social Media Tags:</h5>
                <ul className="space-y-1 text-gray-700">
                  <li><code className="bg-gray-200 px-1 rounded text-xs">&lt;meta property="og:*"&gt;</code> - Open Graph</li>
                  <li><code className="bg-gray-200 px-1 rounded text-xs">&lt;meta name="twitter:*"&gt;</code> - Twitter Cards</li>
                  <li><code className="bg-gray-200 px-1 rounded text-xs">&lt;meta name="robots"&gt;</code> - Crawler instructions</li>
                  <li><code className="bg-gray-200 px-1 rounded text-xs">&lt;link rel="icon"&gt;</code> - Favicon</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ Benefits</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• No external library needed</li>
                <li>• Automatic tag deduplication</li>
                <li>• Better SEO out of the box</li>
                <li>• Improved social media sharing</li>
                <li>• Simpler component code</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">🎯 Use Cases</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• E-commerce product pages</li>
                <li>• Blog posts and articles</li>
                <li>• Dynamic landing pages</li>
                <li>• Search results pages</li>
                <li>• User profile pages</li>
              </ul>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">
              ⚠️ Important Notes
            </h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Tags are hoisted to <code className="bg-yellow-100 px-1 rounded">&lt;head&gt;</code> automatically</li>
              <li>• Last matching tag wins (automatic deduplication)</li>
              <li>• Changes update in real-time without page reload</li>
              <li>• Works with both client and server rendering</li>
              <li>• Consider using canonical URLs for duplicate content</li>
            </ul>
          </div>
        </div>
      </FeatureCard>
    </div>
  );
}

export default MetadataDemo;