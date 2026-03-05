import { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  HomeIcon,
  BoltIcon,
  CubeIcon,
  SparklesIcon,
  DocumentTextIcon,
  PhotoIcon,
  CursorArrowRaysIcon,
  WindowIcon,
  SignalIcon
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
  // {
  //   name: 'ref as Prop',
  //   path: '/ref-prop',
  //   icon: CursorArrowRaysIcon,
  //   description: 'New ref pattern'
  // },
  {
    name: 'Activity',
    path: '/activity',
    icon: WindowIcon,
    description: 'Hide/show UI preserving state'
  },
  {
    name: 'useEffectEvent',
    path: '/effect-event',
    icon: SignalIcon,
    description: 'Separate events from effects'
  }
];

const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const closeSidebar = () => setSidebarOpen(false);

  // Close sidebar when switching to desktop
  useEffect(() => {
    if (!isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const showSidebar = isMobile ? sidebarOpen : true;

  return (
    <div className="flex h-screen bg-gray-50">

      {/* ============================================ */}
      {/* Mobile Header                                */}
      {/* ============================================ */}
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">React 19.2</h1>
          <div className="w-10" />
        </header>
      )}

      {/* ============================================ */}
      {/* Overlay - mobile only, when sidebar is open  */}
      {/* ============================================ */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={closeSidebar}
        />
      )}

      {/* ============================================ */}
      {/* Sidebar                                      */}
      {/* ============================================ */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-80 bg-white border-r border-gray-200
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">React 19.2</h1>
            <p className="text-sm text-gray-600 mt-1">Feature Demonstrations</p>
          </div>
          {/* Close button - mobile only */}
          {isMobile && (
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => isMobile && closeSidebar()}
                  className={({ isActive }) =>
                    `flex items-start gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400'
                        }`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{item.name}</div>
                        <div className={`text-xs mt-0.5 ${isActive ? 'text-blue-100' : 'text-gray-500'
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

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              Interactive demo showcasing React 19.2 features with e-commerce examples.
            </p>
          </div>
        </div>
      </aside>

      {/* ============================================ */}
      {/* Main Content                                 */}
      {/* ============================================ */}
      <main className={`flex-1 overflow-y-auto min-w-0 ${isMobile ? 'pt-14' : 'ml-80'}`}>
        <div className="max-w-7xl mx-auto px-3 py-4 sm:p-6 lg:p-8 overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
