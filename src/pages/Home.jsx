import { Link } from 'react-router-dom';
import { 
  BoltIcon, 
  CubeIcon, 
  SparklesIcon,
  DocumentTextIcon,
  PhotoIcon,
  CursorArrowRaysIcon
} from '../components/Icons';

const features = [
  {
    title: 'Actions & useActionState',
    path: '/actions',
    icon: BoltIcon,
    description: 'Handle form submissions and async operations with the new Actions API',
    highlights: [
      'Automatic pending states',
      'Error handling built-in',
      'Progressive enhancement',
      'Server and client actions'
    ],
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'use() Hook',
    path: '/use-hook',
    icon: CubeIcon,
    description: 'Read resources like Promises and Context directly in render',
    highlights: [
      'Suspend on promises',
      'Read context values',
      'Conditional usage allowed',
      'Simplified data fetching'
    ],
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'useOptimistic',
    path: '/optimistic',
    icon: SparklesIcon,
    description: 'Create instant UI feedback while async operations complete',
    highlights: [
      'Optimistic updates',
      'Automatic rollback',
      'Better UX',
      'Reduced loading states'
    ],
    color: 'from-pink-500 to-pink-600'
  },
  {
    title: 'Document Metadata',
    path: '/metadata',
    icon: DocumentTextIcon,
    description: 'Manage document title and meta tags natively in components',
    highlights: [
      'Native <title> support',
      'Meta tags in components',
      'Automatic deduplication',
      'SEO improvements'
    ],
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Asset Loading',
    path: '/assets',
    icon: PhotoIcon,
    description: 'Preload and manage stylesheets, scripts, and other assets',
    highlights: [
      'Resource preloading',
      'Stylesheet priorities',
      'Script async loading',
      'Better performance'
    ],
    color: 'from-orange-500 to-orange-600'
  },
  {
    title: 'ref as Prop',
    path: '/ref-prop',
    icon: CursorArrowRaysIcon,
    description: 'Pass refs directly as props without forwardRef wrapper',
    highlights: [
      'Simpler API',
      'No forwardRef needed',
      'Better TypeScript support',
      'Cleaner code'
    ],
    color: 'from-indigo-500 to-indigo-600'
  }
];

function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          React 19.2 
        </h1>
        <p className="text-xl text-gray-400 mb-6 max-w-3xl">
          Explore the latest features introduced in React 19.2 through interactive 
          e-commerce examples. Each demo showcases real-world use cases with mock data.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-sm text-gray-200">React Version</div>
            <div className="text-2xl font-bold">19.2</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-sm text-gray-200">Features</div>
            <div className="text-2xl font-bold">{features.length}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-sm text-gray-200">Demo Type</div>
            <div className="text-2xl font-bold">E-commerce</div>
          </div>
        </div>
      </div>

      {/* What's New Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What's New in React 19.2?
        </h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            React 19.2 introduces several powerful features that simplify common patterns 
            and improve developer experience:
          </p>
          <ul className="space-y-2">
            <li>
              <strong>Actions API:</strong> A new paradigm for handling async operations 
              with automatic state management
            </li>
            <li>
              <strong>use() Hook:</strong> Read promises and context with more flexibility 
              than traditional hooks
            </li>
            <li>
              <strong>Optimistic Updates:</strong> Built-in support for instant UI feedback 
              during async operations
            </li>
            <li>
              <strong>Document Metadata:</strong> Native support for managing title and 
              meta tags in components
            </li>
            <li>
              <strong>Asset Loading:</strong> Better control over resource loading and 
              performance optimization
            </li>
            <li>
              <strong>Simplified Refs:</strong> No more forwardRef wrapper needed for 
              passing refs to components
            </li>
          </ul>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.path}
            to={feature.path}
            className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className={`bg-gradient-to-r ${feature.color} p-6`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-white/90 text-sm">
                {feature.description}
              </p>
            </div>
            
            <div className="p-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Key Highlights:
              </h4>
              <ul className="space-y-2">
                {feature.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                View Demo
                <span className="inline-block group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Getting Started Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Getting Started
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mb-3">
              1
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Explore Features
            </h3>
            <p className="text-sm text-gray-600">
              Click on any feature card above to see interactive demos with real e-commerce examples.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mb-3">
              2
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Try It Out
            </h3>
            <p className="text-sm text-gray-600">
              Interact with each demo to understand how the feature works in practice.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mb-3">
              3
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Read the Code
            </h3>
            <p className="text-sm text-gray-600">
              Check the implementation details to learn how to use these features in your projects.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="text-blue-600 flex-shrink-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">
              Note about this demo
            </h4>
            <p className="text-sm text-blue-700">
              All data is mocked and stored in memory. Actions and API calls simulate 
              real-world scenarios with artificial delays to demonstrate async behavior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;