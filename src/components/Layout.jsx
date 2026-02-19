import { Outlet, NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  BoltIcon, 
  CubeIcon, 
  SparklesIcon,
  DocumentTextIcon,
  PhotoIcon,
  CursorArrowRaysIcon
} from './Icons';

const navigationItems = [
  {
    name: 'Home',
    path: '/',
    icon: HomeIcon,
    description: 'Overview of React 19.2 features'
  },
  {
    name: 'Actions & useActionState',
    path: '/actions',
    icon: BoltIcon,
    description: 'Form handling with actions'
  },
  {
    name: 'use() Hook',
    path: '/use-hook',
    icon: CubeIcon,
    description: 'Reading promises and context'
  },
  {
    name: 'useOptimistic',
    path: '/optimistic',
    icon: SparklesIcon,
    description: 'Optimistic UI updates'
  },
  {
    name: 'Document Metadata',
    path: '/metadata',
    icon: DocumentTextIcon,
    description: 'Managing title and meta tags'
  },
  {
    name: 'Asset Loading',
    path: '/assets',
    icon: PhotoIcon,
    description: 'Preloading stylesheets and scripts'
  },
  {
    name: 'ref as Prop',
    path: '/ref-prop',
    icon: CursorArrowRaysIcon,
    description: 'New ref pattern'
  }
];

function Layout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">React 19.2</h1>
          <p className="text-sm text-gray-600 mt-1">Feature Demonstrations</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-start gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{item.name}</div>
                        <div className={`text-xs mt-0.5 ${
                          isActive ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-6 border-t border-gray-200 mt-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">
              About this Demo
            </h3>
            <p className="text-xs text-blue-700">
              This application showcases the new features introduced in React 19.2 
              using an e-commerce example with mock data.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;