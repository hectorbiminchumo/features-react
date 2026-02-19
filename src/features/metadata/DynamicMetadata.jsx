import { useState } from 'react';

function DynamicMetadata() {
  const [config, setConfig] = useState({
    title: 'Custom Page Title',
    description: 'This is a custom page description that you can modify.',
    keywords: 'react, metadata, seo',
    author: 'Your Name',
    ogType: 'website',
    robots: 'index, follow'
  });

  const [isApplied, setIsApplied] = useState(false);

  const handleChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setIsApplied(false);
  };

  const applyMetadata = () => {
    setIsApplied(true);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      {/* Apply metadata when button is clicked */}
      {isApplied && (
        <>
          <title>{config.title}</title>
          <meta name="description" content={config.description} />
          <meta name="keywords" content={config.keywords} />
          <meta name="author" content={config.author} />
          <meta name="robots" content={config.robots} />
          
          <meta property="og:type" content={config.ogType} />
          <meta property="og:title" content={config.title} />
          <meta property="og:description" content={config.description} />
          
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={config.title} />
          <meta name="twitter:description" content={config.description} />
        </>
      )}

      <h4 className="font-semibold text-gray-900 mb-4">
        Build Your Own Metadata
      </h4>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Page Title
            </label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter page title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description
            </label>
            <textarea
              value={config.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Enter meta description"
            />
            <p className="text-xs text-gray-500 mt-1">
              {config.description.length} characters (recommended: 150-160)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keywords
            </label>
            <input
              type="text"
              value={config.keywords}
              onChange={(e) => handleChange('keywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              value={config.author}
              onChange={(e) => handleChange('author', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Author name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Open Graph Type
            </label>
            <select
              value={config.ogType}
              onChange={(e) => handleChange('ogType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="website">Website</option>
              <option value="article">Article</option>
              <option value="product">Product</option>
              <option value="profile">Profile</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Robots
            </label>
            <select
              value={config.robots}
              onChange={(e) => handleChange('robots', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="index, follow">Index, Follow</option>
              <option value="noindex, follow">NoIndex, Follow</option>
              <option value="index, nofollow">Index, NoFollow</option>
              <option value="noindex, nofollow">NoIndex, NoFollow</option>
            </select>
          </div>

          <button
            onClick={applyMetadata}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Apply Metadata
          </button>

          {isApplied && (
            <div className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-800">
              ✅ Metadata applied! Check your browser tab and DevTools.
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-3">Preview</h5>
            
            {/* Google Search Preview */}
            <div className="mb-4">
              <h6 className="text-xs font-semibold text-gray-600 mb-2">
                Google Search Result:
              </h6>
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <div className="text-blue-600 text-sm mb-1">
                  {config.title}
                </div>
                <div className="text-xs text-green-700 mb-1">
                  https://demo.store/page
                </div>
                <div className="text-xs text-gray-600">
                  {config.description.substring(0, 160)}
                  {config.description.length > 160 && '...'}
                </div>
              </div>
            </div>

            {/* Social Media Preview */}
            <div>
              <h6 className="text-xs font-semibold text-gray-600 mb-2">
                Social Media Card:
              </h6>
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <div className="bg-gray-200 h-32 rounded mb-2 flex items-center justify-center text-gray-500 text-xs">
                  OG Image Preview
                </div>
                <div className="font-semibold text-sm text-gray-900 mb-1">
                  {config.title}
                </div>
                <div className="text-xs text-gray-600">
                  {config.description.substring(0, 100)}
                  {config.description.length > 100 && '...'}
                </div>
              </div>
            </div>
          </div>

          {/* Generated Code */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-2">
              Generated Code:
            </h5>
            <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
{`<>
  <title>${config.title}</title>
  <meta name="description" 
        content="${config.description}" />
  <meta name="keywords" 
        content="${config.keywords}" />
  <meta name="author" 
        content="${config.author}" />
  <meta name="robots" 
        content="${config.robots}" />
  
  <meta property="og:type" 
        content="${config.ogType}" />
  <meta property="og:title" 
        content="${config.title}" />
  <meta property="og:description" 
        content="${config.description}" />
</>`}
            </pre>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-purple-50 border border-purple-200 rounded p-3 text-xs text-purple-800">
        <strong>🎨 Try this:</strong> Modify the fields above and click "Apply Metadata" 
        to see the changes in real-time. Check your browser's DevTools to see the 
        actual <code className="bg-purple-100 px-1 rounded">&lt;meta&gt;</code> tags being updated!
      </div>
    </div>
  );
}

export default DynamicMetadata;