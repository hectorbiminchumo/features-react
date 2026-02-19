import { useState } from 'react';

function ResourcePreloading() {
  const [preloadedResources, setPreloadedResources] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState(null);

  const resources = [
    {
      id: 'font-primary',
      name: 'Primary Font (Woff2)',
      type: 'font',
      url: '/fonts/brand-font.woff2',
      size: '32 KB',
      description: 'Critical brand font used throughout the site',
      impact: 'Prevents text flash (FOIT)',
      code: '<link rel="preload" href="/fonts/brand-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />'
    },
    {
      id: 'hero-image',
      name: 'Hero Image',
      type: 'image',
      url: '/images/hero-banner.jpg',
      size: '180 KB',
      description: 'Above-the-fold hero image',
      impact: 'Faster LCP (Largest Contentful Paint)',
      code: '<link rel="preload" href="/images/hero-banner.jpg" as="image" />'
    },
    {
      id: 'critical-css',
      name: 'Critical CSS',
      type: 'style',
      url: '/css/critical.css',
      size: '12 KB',
      description: 'Critical above-the-fold styles',
      impact: 'Faster First Paint',
      code: '<link rel="preload" href="/css/critical.css" as="style" />'
    }
  ];

  const preconnects = [
    {
      id: 'cdn-images',
      name: 'Image CDN',
      url: 'https://images.cdn.example.com',
      description: 'Establishes connection to image CDN',
      impact: 'Faster image loading',
      code: '<link rel="preconnect" href="https://images.cdn.example.com" />'
    },
    {
      id: 'api-server',
      name: 'API Server',
      url: 'https://api.example.com',
      description: 'Preconnect to API endpoint',
      impact: 'Faster API requests',
      code: '<link rel="preconnect" href="https://api.example.com" />'
    },
    {
      id: 'analytics',
      name: 'Analytics Domain',
      url: 'https://analytics.example.com',
      description: 'DNS prefetch for analytics',
      impact: 'Reduces DNS lookup time',
      code: '<link rel="dns-prefetch" href="https://analytics.example.com" />'
    }
  ];

  const simulatePreload = (resourceId) => {
    const resource = resources.find(r => r.id === resourceId);
    const loadTime = Math.random() * 1000 + 500; // 0.5-1.5 seconds

    // Simulate loading
    setTimeout(() => {
      setPreloadedResources(prev => [...prev, resourceId]);
      
      // Simulate performance improvement
      if (resource.type === 'font') {
        setPerformanceMetrics(prev => ({
          ...prev,
          fontLoadTime: `${(loadTime / 1000).toFixed(2)}s`,
          foit: 'Prevented ✓'
        }));
      } else if (resource.type === 'image') {
        setPerformanceMetrics(prev => ({
          ...prev,
          lcpTime: `${(loadTime / 1000).toFixed(2)}s`,
          lcpImprovement: '-40%'
        }));
      } else if (resource.type === 'style') {
        setPerformanceMetrics(prev => ({
          ...prev,
          firstPaint: `${(loadTime / 1000).toFixed(2)}s`,
          renderBlocking: 'Reduced ✓'
        }));
      }
    }, loadTime);
  };

  const isPreloaded = (id) => preloadedResources.includes(id);

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      {/* Preload Resources Section */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-4">Preload Critical Resources</h4>
        
        <div className="space-y-3 mb-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className={`bg-white border-2 rounded-lg p-4 transition-all ${
                isPreloaded(resource.id)
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="font-semibold text-gray-900">{resource.name}</h5>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      resource.type === 'font' ? 'bg-purple-100 text-purple-700' :
                      resource.type === 'image' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {resource.type.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">{resource.size}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{resource.description}</p>
                  <p className="text-xs text-gray-500 mb-3">
                    <strong>Impact:</strong> {resource.impact}
                  </p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded block break-all">
                    {resource.code}
                  </code>
                </div>
                
                <div className="ml-4">
                  {isPreloaded(resource.id) ? (
                    <div className="text-center">
                      <div className="flex items-center gap-2 text-green-600 mb-1">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm font-semibold">Preloaded</span>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => simulatePreload(resource.id)}
                      className="text-sm bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors whitespace-nowrap"
                    >
                      Preload
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Metrics */}
        {performanceMetrics && Object.keys(performanceMetrics).length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6">
            <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>⚡</span>
              Performance Improvements
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {performanceMetrics.fontLoadTime && (
                <div className="bg-white rounded p-3">
                  <div className="text-sm font-bold text-purple-600">{performanceMetrics.fontLoadTime}</div>
                  <div className="text-xs text-gray-600">Font Load Time</div>
                </div>
              )}
              {performanceMetrics.foit && (
                <div className="bg-white rounded p-3">
                  <div className="text-sm font-bold text-green-600">{performanceMetrics.foit}</div>
                  <div className="text-xs text-gray-600">FOIT Prevention</div>
                </div>
              )}
              {performanceMetrics.lcpTime && (
                <div className="bg-white rounded p-3">
                  <div className="text-sm font-bold text-blue-600">{performanceMetrics.lcpTime}</div>
                  <div className="text-xs text-gray-600">LCP Time</div>
                </div>
              )}
              {performanceMetrics.lcpImprovement && (
                <div className="bg-white rounded p-3">
                  <div className="text-sm font-bold text-green-600">{performanceMetrics.lcpImprovement}</div>
                  <div className="text-xs text-gray-600">LCP Improvement</div>
                </div>
              )}
              {performanceMetrics.firstPaint && (
                <div className="bg-white rounded p-3">
                  <div className="text-sm font-bold text-blue-600">{performanceMetrics.firstPaint}</div>
                  <div className="text-xs text-gray-600">First Paint</div>
                </div>
              )}
              {performanceMetrics.renderBlocking && (
                <div className="bg-white rounded p-3">
                  <div className="text-sm font-bold text-green-600">{performanceMetrics.renderBlocking}</div>
                  <div className="text-xs text-gray-600">Render Blocking</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Preconnect Section */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Preconnect to External Domains</h4>
        
        <div className="space-y-3 mb-6">
          {preconnects.map((preconnect) => (
            <div
              key={preconnect.id}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 mb-2">{preconnect.name}</h5>
                  <p className="text-sm text-gray-600 mb-1">{preconnect.description}</p>
                  <p className="text-xs text-gray-500 mb-3">
                    <strong>Impact:</strong> {preconnect.impact}
                  </p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded block break-all">
                    {preconnect.code}
                  </code>
                </div>
                <div className="ml-4">
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm font-semibold">Active</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Hints Comparison */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <h5 className="font-semibold text-gray-900 mb-3">Resource Hints Comparison:</h5>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-900">Hint</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-900">Purpose</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-900">When to Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-3 py-2">
                  <code className="bg-purple-100 text-purple-700 px-2 py-1 rounded">preload</code>
                </td>
                <td className="px-3 py-2 text-gray-700">
                  Fetch resource with high priority
                </td>
                <td className="px-3 py-2 text-gray-700">
                  Critical fonts, hero images, above-fold CSS
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <code className="bg-blue-100 text-blue-700 px-2 py-1 rounded">preconnect</code>
                </td>
                <td className="px-3 py-2 text-gray-700">
                  Establish early connection (DNS + TCP + TLS)
                </td>
                <td className="px-3 py-2 text-gray-700">
                  CDNs, APIs, external domains you'll fetch from
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <code className="bg-green-100 text-green-700 px-2 py-1 rounded">dns-prefetch</code>
                </td>
                <td className="px-3 py-2 text-gray-700">
                  Resolve DNS only (lighter than preconnect)
                </td>
                <td className="px-3 py-2 text-gray-700">
                  Analytics, social widgets, ads
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <code className="bg-orange-100 text-orange-700 px-2 py-1 rounded">prefetch</code>
                </td>
                <td className="px-3 py-2 text-gray-700">
                  Fetch for future navigation (low priority)
                </td>
                <td className="px-3 py-2 text-gray-700">
                  Next page resources, likely user actions
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete Code Example */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <h5 className="font-semibold text-gray-900 mb-2">Complete Implementation:</h5>
        <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
{`function OptimizedPage() {
  return (
    <>
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://images.cdn.example.com" />
      <link rel="preconnect" href="https://api.example.com" />
      <link rel="dns-prefetch" href="https://analytics.example.com" />
      
      {/* Preload critical font */}
      <link
        rel="preload"
        href="/fonts/brand-font.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Preload hero image (LCP) */}
      <link
        rel="preload"
        href="/images/hero-banner.jpg"
        as="image"
      />
      
      {/* Preload critical CSS */}
      <link
        rel="preload"
        href="/css/critical.css"
        as="style"
      />
      
      {/* High priority stylesheet */}
      <link
        rel="stylesheet"
        href="/css/critical.css"
        precedence="high"
      />
      
      {/* Page content */}
      <div>
        <h1 style={{ fontFamily: 'BrandFont' }}>
          Welcome to Our Site
        </h1>
        <img src="/images/hero-banner.jpg" alt="Hero" />
      </div>
    </>
  );
}`}
        </pre>
      </div>

      {/* Web Vitals Impact */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h5 className="font-semibold text-gray-900 mb-3">Impact on Core Web Vitals:</h5>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎨</span>
            <div>
              <p className="font-semibold text-gray-900">LCP (Largest Contentful Paint)</p>
              <p className="text-xs text-gray-600">
                Preload hero images and critical fonts → Faster LCP score
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="font-semibold text-gray-900">FCP (First Contentful Paint)</p>
              <p className="text-xs text-gray-600">
                Preload critical CSS and fonts → Faster initial render
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔄</span>
            <div>
              <p className="font-semibold text-gray-900">CLS (Cumulative Layout Shift)</p>
              <p className="text-xs text-gray-600">
                Preload fonts prevents FOIT/FOUT → Reduces layout shifts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3 text-xs text-yellow-800">
        <strong>⚠️ Best Practices:</strong>
        <ul className="mt-2 space-y-1 ml-4 list-disc">
          <li>Only preload 2-3 truly critical resources (diminishing returns)</li>
          <li>Always use <code className="bg-yellow-100 px-1 rounded">crossOrigin="anonymous"</code> for fonts</li>
          <li>Preconnect to domains you'll definitely fetch from</li>
          <li>Use dns-prefetch as fallback for older browsers</li>
          <li>Don't preload everything - it can hurt performance!</li>
        </ul>
      </div>
    </div>
  );
}

export default ResourcePreloading;