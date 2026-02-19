import FeatureCard from '../../components/FeatureCard';
import { CubeIcon } from '../../components/Icons';
import ProductLoader from './ProductLoader';
import CategoryLoader from './CategoryLoader';
import ContextExample from './ContextExample';

function UseHookDemo() {
  return (
    <div className="space-y-8">
      <FeatureCard
        title="use() Hook"
        description="Read resources like Promises and Context directly in render"
        icon={CubeIcon}
      >
        <div className="space-y-6">
          {/* Explanation */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">
              What is the use() Hook?
            </h3>
            <div className="text-sm text-purple-800 space-y-2">
              <p>
                The <code className="bg-purple-100 px-1 rounded">use()</code> hook is a new React 19.2 
                feature that allows you to read the value of a resource like a Promise or Context.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Suspend on promises until they resolve</li>
                <li>Read context values without useContext</li>
                <li>Can be used conditionally (unlike other hooks)</li>
                <li>Integrates with Suspense for loading states</li>
              </ul>
            </div>
          </div>

          {/* Key Differences */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ Old Way</h4>
              <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
{`// Cannot be conditional
const context = useContext(MyContext);

// Need useEffect for promises
const [data, setData] = useState(null);
useEffect(() => {
  fetchData().then(setData);
}, []);`}
              </pre>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ New Way</h4>
              <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
{`// Can be conditional!
if (condition) {
  const context = use(MyContext);
}

// Direct promise reading
const data = use(fetchData());`}
              </pre>
            </div>
          </div>

          {/* Demo 1: Loading Products with Promises */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 1: Loading Products (Promise)
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              This demo shows how to use <code className="bg-gray-100 px-1 rounded">use()</code> with 
              promises to load product data. Notice how we don't need useEffect or useState.
            </p>
            <ProductLoader />
          </div>

          {/* Demo 2: Loading by Category */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 2: Conditional use() with Categories
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              This demonstrates conditional usage of the <code className="bg-gray-100 px-1 rounded">use()</code> hook, 
              which is NOT possible with traditional hooks like useEffect or useContext.
            </p>
            <CategoryLoader />
          </div>

          {/* Demo 3: Context Reading */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Demo 3: Reading Context with use()
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              The <code className="bg-gray-100 px-1 rounded">use()</code> hook can also read Context values, 
              providing an alternative to useContext that can be used conditionally.
            </p>
            <ContextExample />
          </div>

          {/* Code Example */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Code Example:</h4>
            <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`import { use, Suspense } from 'react';

// Promise-based data fetching
function ProductList() {
  // use() suspends until promise resolves
  const products = use(fetchProducts());
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Conditional usage (NOT possible with useEffect!)
function FilteredProducts({ category }) {
  let products;
  
  if (category) {
    // Conditionally use the hook
    products = use(fetchProductsByCategory(category));
  } else {
    products = use(fetchAllProducts());
  }
  
  return <ProductGrid products={products} />;
}

// Reading Context
function UserProfile() {
  // Alternative to useContext
  const user = use(UserContext);
  
  return <div>Welcome, {user.name}!</div>;
}

// Wrap with Suspense for loading states
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductList />
    </Suspense>
  );
}`}
            </pre>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ Benefits</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Can be used conditionally (breaks rules of hooks)</li>
                <li>• Simpler data fetching patterns</li>
                <li>• Works seamlessly with Suspense</li>
                <li>• No manual loading/error state management</li>
                <li>• Cleaner component code</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">🎯 Use Cases</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Data fetching without useEffect</li>
                <li>• Reading context conditionally</li>
                <li>• Streaming server components data</li>
                <li>• Complex async data dependencies</li>
              </ul>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">
              ⚠️ Important Notes
            </h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Must be wrapped in <code className="bg-yellow-100 px-1 rounded">&lt;Suspense&gt;</code> boundary when using with promises</li>
              <li>• Promises should be cached/memoized to avoid infinite loops</li>
              <li>• Use with Error Boundaries for error handling</li>
              <li>• Not a replacement for all useEffect usage</li>
            </ul>
          </div>
        </div>
      </FeatureCard>
    </div>
  );
}

export default UseHookDemo;