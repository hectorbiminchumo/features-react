import { useState } from 'react';
import FeatureCard from '../../components/FeatureCard';
import { PhotoIcon } from '../../components/Icons';
import StylesheetPriority from './StylesheetPriority';
import ScriptLoading from './ScriptLoading';
import ResourcePreloading from './ResourcePreloading';

function AssetsDemo() {
  return (
    <div className="space-y-8">
      <FeatureCard
        title="Asset Loading"
        description="Preload and manage stylesheets, scripts, and other assets"
        icon={PhotoIcon}
      >
        <div className="space-y-6">
          {/* Explanation */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-2">
              What is Asset Loading in React 19.2?
            </h3>
            <div className="text-sm text-orange-800 space-y-2">
              <p>
                React 19.2 provides native support for managing external resources like 
                stylesheets, scripts, fonts, and images with better control over loading 
                priority and timing.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Preload critical resources for better performance</li>
                <li>Control stylesheet loading priority</li>
                <li>Manage async/defer script loading</li>
                <li>Optimize font loading with preconnect</li>
              </ul>
            </div>
          </div>

          {/* Comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ Old Way</h4>
              <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
{`// Manual manipulation
useEffect(() => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'styles.css';
  document.head.appendChild(link);
  
  return () => {
    document.head.removeChild(link);
  };
}, []);`}
              </pre>
              <p className="text-xs text-red-700 mt-2">
                Manual DOM manipulation, no priority control
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ New Way (React 19.2)</h4>
              <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
{`function Component() {
  return (
    <>
      <link 
        rel="stylesheet" 
        href="styles.css"
        precedence="high" />
      <div>Content</div>
    </>
  );
}`}
              </pre>
              <p className="text-xs text-green-700 mt-2">
                Declarative, automatic priority management
              </p>
            </div>
          </div>

          {/* Asset Types Overview */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Supported Asset Types:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="bg-white p-3 rounded border border-gray-200">
                  <h5 className="font-semibold text-gray-800 mb-1">Stylesheets</h5>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded block">
                    &lt;link rel="stylesheet" href="..." precedence="high" /&gt;
                  </code>
                  <p className="text-xs text-gray-600 mt-1">
                    With priority control (high, medium, low)
                  </p>
                </div>

                <div className="bg-white p-3 rounded border border-gray-200">
                  <h5 className="font-semibold text-gray-800 mb-1">Scripts</h5>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded block">
                    &lt;script src="..." async /&gt;
                  </code>
                  <p className="text-xs text-gray-600 mt-1">
                    With async/defer support
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="bg-white p-3 rounded border border-gray-200">
                  <h5 className="font-semibold text-gray-800 mb-1">Preloading</h5>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded block">
                    &lt;link rel="preload" href="..." as="font" /&gt;
                  </code>
                  <p className="text-xs text-gray-600 mt-1">
                    Fonts, images, and other resources
                  </p>
                </div>

                <div className="bg-white p-3 rounded border border-gray-200">
                  <h5 className="font-semibold text-gray-800 mb-1">Preconnect</h5>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded block">
                    &lt;link rel="preconnect" href="..." /&gt;
                  </code>
                  <p className="text-xs text-gray-600 mt-1">
                    External domains (CDNs, APIs)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Demo 1: Stylesheet Priority */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 1: Stylesheet Loading with Priority
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Load different theme stylesheets with priority control. High priority 
              styles load first, ensuring critical styling appears immediately.
            </p>
            <StylesheetPriority />
          </div>

          {/* Demo 2: Script Loading */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 2: External Script Loading
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Load external scripts (analytics, charts, etc.) with async/defer control. 
              Scripts load without blocking the main thread.
            </p>
            <ScriptLoading />
          </div>

          {/* Demo 3: Resource Preloading */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 3: Resource Preloading & Preconnect
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Preload fonts, images, and establish connections to external domains 
              for faster resource loading.
            </p>
            <ResourcePreloading />
          </div>

          {/* Code Example */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Code Examples:</h4>
            <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`// 1. Stylesheet with Priority
function CriticalStyles() {
  return (
    <>
      <link 
        rel="stylesheet" 
        href="/critical.css"
        precedence="high"  // Loads first
      />
      <link 
        rel="stylesheet" 
        href="/theme.css"
        precedence="medium"  // Loads second
      />
      <link 
        rel="stylesheet" 
        href="/optional.css"
        precedence="low"  // Loads last
      />
    </>
  );
}

// 2. Async Script Loading
function Analytics() {
  return (
    <script 
      src="https://analytics.example.com/script.js"
      async  // Loads asynchronously
    />
  );
}

// 3. Deferred Script (executes after page load)
function NonCriticalScript() {
  return (
    <script 
      src="/optional-features.js"
      defer
    />
  );
}

// 4. Preload Font
function FontPreload() {
  return (
    <link
      rel="preload"
      href="/fonts/custom-font.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
  );
}

// 5. Preload Image
function HeroImage() {
  return (
    <>
      <link
        rel="preload"
        href="/images/hero.jpg"
        as="image"
      />
      <img src="/images/hero.jpg" alt="Hero" />
    </>
  );
}

// 6. Preconnect to External Domain
function CDNPreconnect() {
  return (
    <>
      <link rel="preconnect" href="https://cdn.example.com" />
      <link rel="dns-prefetch" href="https://cdn.example.com" />
    </>
  );
}

// 7. Conditional Loading
function ThemeLoader({ darkMode }) {
  return (
    <link
      rel="stylesheet"
      href={darkMode ? '/dark-theme.css' : '/light-theme.css'}
      precedence="high"
    />
  );
}

// 8. Multiple Resources
function ProductPage() {
  return (
    <>
      {/* Preconnect to image CDN */}
      <link rel="preconnect" href="https://images.cdn.com" />
      
      {/* Preload critical font */}
      <link
        rel="preload"
        href="/fonts/brand.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* High priority styles */}
      <link
        rel="stylesheet"
        href="/product-page.css"
        precedence="high"
      />
      
      {/* Async analytics */}
      <script src="https://analytics.com/tracker.js" async />
      
      <div>Product content...</div>
    </>
  );
}`}
            </pre>
          </div>

          {/* Precedence Levels */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">
              Stylesheet Precedence Levels:
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3 bg-white p-3 rounded border border-gray-200">
                <span className="font-bold text-red-600 flex-shrink-0">HIGH</span>
                <div>
                  <p className="font-semibold text-gray-900">Critical Styles</p>
                  <p className="text-xs text-gray-600">
                    Above-the-fold content, layout, brand colors. 
                    Loads and applies first.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3 rounded border border-gray-200">
                <span className="font-bold text-yellow-600 flex-shrink-0">MEDIUM</span>
                <div>
                  <p className="font-semibold text-gray-900">Theme Styles</p>
                  <p className="text-xs text-gray-600">
                    Component styles, themes, secondary content. 
                    Loads after high priority.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3 rounded border border-gray-200">
                <span className="font-bold text-green-600 flex-shrink-0">LOW</span>
                <div>
                  <p className="font-semibold text-gray-900">Optional Styles</p>
                  <p className="text-xs text-gray-600">
                    Below-the-fold content, animations, enhancements. 
                    Loads last, won't block rendering.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ Benefits</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Better performance optimization</li>
                <li>• Priority-based resource loading</li>
                <li>• Automatic deduplication</li>
                <li>• Declarative syntax</li>
                <li>• No manual DOM manipulation</li>
              </ul>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-900 mb-2">🎯 Use Cases</h4>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Critical CSS loading</li>
                <li>• Theme switching</li>
                <li>• Analytics/tracking scripts</li>
                <li>• Font optimization</li>
                <li>• CDN resource preconnection</li>
              </ul>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">
              ⚠️ Important Notes
            </h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Use <code className="bg-yellow-100 px-1 rounded">precedence</code> for stylesheets to control load order</li>
              <li>• Preload only truly critical resources (fonts, hero images)</li>
              <li>• Use <code className="bg-yellow-100 px-1 rounded">async</code> for scripts that don't depend on DOM</li>
              <li>• Use <code className="bg-yellow-100 px-1 rounded">defer</code> for scripts that need full DOM</li>
              <li>• Preconnect to external domains you'll fetch from</li>
              <li>• Don't over-preload - it can hurt performance</li>
            </ul>
          </div>
        </div>
      </FeatureCard>
    </div>
  );
}

export default AssetsDemo;