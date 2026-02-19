import { useState } from 'react';

function StylesheetPriority() {
  const [theme, setTheme] = useState('default');
  const [loadingOrder, setLoadingOrder] = useState([]);

  const themes = {
    default: {
      name: 'Default Theme',
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        background: '#ffffff',
        text: '#1f2937'
      }
    },
    dark: {
      name: 'Dark Theme',
      colors: {
        primary: '#60a5fa',
        secondary: '#a78bfa',
        background: '#1f2937',
        text: '#f9fafb'
      }
    },
    neon: {
      name: 'Neon Theme',
      colors: {
        primary: '#ec4899',
        secondary: '#06b6d4',
        background: '#0f172a',
        text: '#f0abfc'
      }
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setLoadingOrder([]);
    
    // Simulate loading order
    setTimeout(() => setLoadingOrder(prev => [...prev, 'high']), 100);
    setTimeout(() => setLoadingOrder(prev => [...prev, 'medium']), 300);
    setTimeout(() => setLoadingOrder(prev => [...prev, 'low']), 500);
  };

  const currentTheme = themes[theme];

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      {/* Simulated stylesheet links - these would be real in production */}
      {/* In a real app, these would load actual CSS files */}
      
      <h4 className="font-semibold text-gray-900 mb-4">Theme Selector</h4>

      {/* Theme Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(themes).map(([key, themeData]) => (
          <button
            key={key}
            onClick={() => handleThemeChange(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              theme === key
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {themeData.name}
          </button>
        ))}
      </div>

      {/* Theme Preview */}
      <div
        className="rounded-lg p-6 mb-6 transition-all duration-300"
        style={{
          backgroundColor: currentTheme.colors.background,
          color: currentTheme.colors.text,
          border: `2px solid ${currentTheme.colors.primary}`
        }}
      >
        <h3 className="text-2xl font-bold mb-4" style={{ color: currentTheme.colors.primary }}>
          {currentTheme.name} Preview
        </h3>
        <p className="mb-4">
          This is how your content would look with the selected theme. 
          Notice how the colors change dynamically.
        </p>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded font-medium"
            style={{
              backgroundColor: currentTheme.colors.primary,
              color: '#ffffff'
            }}
          >
            Primary Button
          </button>
          <button
            className="px-4 py-2 rounded font-medium"
            style={{
              backgroundColor: currentTheme.colors.secondary,
              color: '#ffffff'
            }}
          >
            Secondary Button
          </button>
        </div>
      </div>

      {/* Loading Order Visualization */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <h5 className="font-semibold text-gray-900 mb-3">
          Stylesheet Loading Order:
        </h5>
        <div className="space-y-2">
          <div className={`flex items-center gap-3 p-3 rounded transition-all ${
            loadingOrder.includes('high')
              ? 'bg-red-50 border border-red-200'
              : 'bg-gray-50 border border-gray-200 opacity-50'
          }`}>
            <div className={`w-3 h-3 rounded-full ${
              loadingOrder.includes('high') ? 'bg-red-500 animate-pulse' : 'bg-gray-300'
            }`} />
            <div className="flex-1">
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                &lt;link rel="stylesheet" href="/theme-critical.css" precedence="high" /&gt;
              </code>
              <p className="text-xs text-gray-600 mt-1">
                Critical styles - layout, typography, brand colors
              </p>
            </div>
            {loadingOrder.includes('high') && (
              <span className="text-xs font-semibold text-red-700">✓ Loaded</span>
            )}
          </div>

          <div className={`flex items-center gap-3 p-3 rounded transition-all ${
            loadingOrder.includes('medium')
              ? 'bg-yellow-50 border border-yellow-200'
              : 'bg-gray-50 border border-gray-200 opacity-50'
          }`}>
            <div className={`w-3 h-3 rounded-full ${
              loadingOrder.includes('medium') ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'
            }`} />
            <div className="flex-1">
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                &lt;link rel="stylesheet" href="/theme-components.css" precedence="medium" /&gt;
              </code>
              <p className="text-xs text-gray-600 mt-1">
                Component styles - cards, buttons, forms
              </p>
            </div>
            {loadingOrder.includes('medium') && (
              <span className="text-xs font-semibold text-yellow-700">✓ Loaded</span>
            )}
          </div>

          <div className={`flex items-center gap-3 p-3 rounded transition-all ${
            loadingOrder.includes('low')
              ? 'bg-green-50 border border-green-200'
              : 'bg-gray-50 border border-gray-200 opacity-50'
          }`}>
            <div className={`w-3 h-3 rounded-full ${
              loadingOrder.includes('low') ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
            }`} />
            <div className="flex-1">
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                &lt;link rel="stylesheet" href="/theme-animations.css" precedence="low" /&gt;
              </code>
              <p className="text-xs text-gray-600 mt-1">
                Optional styles - animations, transitions, enhancements
              </p>
            </div>
            {loadingOrder.includes('low') && (
              <span className="text-xs font-semibold text-green-700">✓ Loaded</span>
            )}
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h5 className="font-semibold text-gray-900 mb-2">Implementation:</h5>
        <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
{`function ThemeLoader({ theme }) {
  return (
    <>
      {/* High Priority - Critical Styles */}
      <link
        rel="stylesheet"
        href={\`/themes/\${theme}/critical.css\`}
        precedence="high"
      />
      
      {/* Medium Priority - Component Styles */}
      <link
        rel="stylesheet"
        href={\`/themes/\${theme}/components.css\`}
        precedence="medium"
      />
      
      {/* Low Priority - Optional Enhancements */}
      <link
        rel="stylesheet"
        href={\`/themes/\${theme}/animations.css\`}
        precedence="low"
      />
    </>
  );
}`}
        </pre>
      </div>

      {/* Info Box */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800">
        <strong>💡 How it works:</strong> When you switch themes, stylesheets load in 
        priority order (high → medium → low). High priority styles appear first, ensuring 
        users see critical styling immediately without flash of unstyled content (FOUC).
      </div>
    </div>
  );
}

export default StylesheetPriority;