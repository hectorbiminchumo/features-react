import FeatureCard from '../../components/FeatureCard';
import { WindowIcon } from '../../components/Icons';
import TabsExample from './TabsExample';
import ProductPrerender from './ProductPrerender';

function ActivityDemo() {
  return (
    <div className="space-y-8">
      <FeatureCard
        title="Activity"
        description="Hide and show UI while preserving component state"
        icon={WindowIcon}
      >
        <div className="space-y-6">
          {/* Explanation */}
          <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
            <h3 className="font-semibold text-violet-900 mb-2">
              What is {'<Activity>'} in React 19.2?
            </h3>
            <div className="text-sm text-violet-800 space-y-2">
              <p>
                <code className="bg-violet-100 px-1 rounded">{'<Activity>'}</code> lets you hide parts 
                of your UI <strong>without destroying their state</strong>. Unlike conditional rendering 
                (<code className="bg-violet-100 px-1 rounded">{'isVisible && <Component />'}</code>), 
                Activity preserves React state, DOM state, and scroll position.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Two modes: <code className="bg-violet-100 px-1 rounded">visible</code> and <code className="bg-violet-100 px-1 rounded">hidden</code></li>
                <li>Hidden components keep their state in memory</li>
                <li>Effects are cleaned up when hidden, restored when visible</li>
                <li>Uses CSS <code className="bg-violet-100 px-1 rounded">display: none</code> under the hood</li>
                <li>Perfect for tabs, modals, and pre-rendering</li>
              </ul>
            </div>
          </div>

          {/* Comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ Old Way (Conditional Rendering)</h4>
              <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
{`// State is DESTROYED when hidden
{activeTab === 'cart' && (
  <CartPage />
)}

// When user switches tabs:
// - Component unmounts
// - All state is lost
// - Scroll position resets
// - Form inputs cleared
// - Must re-fetch data`}
              </pre>
              <p className="text-xs text-red-700 mt-2">
                State lost on every tab switch
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ New Way (Activity)</h4>
              <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
{`// State is PRESERVED when hidden
<Activity mode={
  activeTab === 'cart' 
    ? 'visible' 
    : 'hidden'
}>
  <CartPage />
</Activity>

// When user switches tabs:
// ✅ State preserved
// ✅ Scroll position kept
// ✅ Form inputs intact
// ✅ No re-fetch needed`}
              </pre>
              <p className="text-xs text-green-700 mt-2">
                State preserved, instant switch
              </p>
            </div>
          </div>

          {/* Demo 1: Tabs with State Preservation */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 1: Tabbed Interface with State Preservation
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Switch between tabs and notice how each tab remembers its state. 
              Try typing in inputs, scrolling, or interacting — then switch tabs and come back.
            </p>
            <TabsExample />
          </div>

          {/* Demo 2: Product Pre-rendering */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 2: Product Detail Pre-rendering
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Activity can pre-render content in the background. Click a product to see 
              instant transitions — the detail view is already rendered but hidden!
            </p>
            <ProductPrerender />
          </div>

          {/* Code Example */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Code Examples:</h4>
            <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`// 1. Basic Activity usage
import { Activity } from 'react';

function TabLayout({ activeTab }) {
  return (
    <div>
      <Activity mode={activeTab === 'home' ? 'visible' : 'hidden'}>
        <HomePage />
      </Activity>
      <Activity mode={activeTab === 'cart' ? 'visible' : 'hidden'}>
        <CartPage />
      </Activity>
      <Activity mode={activeTab === 'profile' ? 'visible' : 'hidden'}>
        <ProfilePage />
      </Activity>
    </div>
  );
}

// 2. Pre-rendering upcoming content
function ProductList({ products, selectedId }) {
  return (
    <div>
      {products.map(product => (
        <Activity 
          key={product.id}
          mode={product.id === selectedId ? 'visible' : 'hidden'}
        >
          <ProductDetail product={product} />
        </Activity>
      ))}
    </div>
  );
}

// 3. Activity vs Conditional Rendering
// Conditional: unmounts = state lost
{show && <ExpensiveComponent />}

// Activity: hides = state preserved
<Activity mode={show ? 'visible' : 'hidden'}>
  <ExpensiveComponent />
</Activity>`}
            </pre>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">
              ⚠️ Important Notes
            </h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Hidden Activity components use <code className="bg-yellow-100 px-1 rounded">display: none</code> — DOM stays in page</li>
              <li>• Effects are <strong>cleaned up</strong> when hidden, <strong>re-created</strong> when visible</li>
              <li>• Hidden components still consume memory (state + DOM)</li>
              <li>• Use for content users will likely revisit (tabs, back navigation)</li>
              <li>• Don't use for content that won't be shown again (avoid memory waste)</li>
              <li>• Future React versions may add more modes beyond visible/hidden</li>
            </ul>
          </div>
        </div>
      </FeatureCard>
    </div>
  );
}

export default ActivityDemo;