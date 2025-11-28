import { useState } from 'react';
import type { ReactNode } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar */}
      <div className={`${sidebarOpen ? 'fixed inset-0 z-40' : 'hidden'} md:hidden`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -ml-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold text-gray-900">할일 관리</h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              <a
                href="/todos"
                className="flex items-center px-4 py-2 text-base font-medium rounded-lg bg-blue-50 text-blue-700"
              >
                할일 목록
              </a>
              <a
                href="/completed"
                className="flex items-center px-4 py-2 text-base font-medium rounded-lg text-gray-700 hover:bg-gray-100"
              >
                완료된 할일
              </a>
              <a
                href="/settings"
                className="flex items-center px-4 py-2 text-base font-medium rounded-lg text-gray-700 hover:bg-gray-100"
              >
                설정
              </a>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-700 font-medium">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                <button
                  onClick={handleLogout}
                  className="text-xs font-medium text-gray-500 hover:text-gray-700"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-gray-900">할일 관리</h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                <a
                  href="/todos"
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-blue-50 text-blue-700"
                >
                  할일 목록
                </a>
                <a
                  href="/completed"
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  완료된 할일
                </a>
                <a
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  설정
                </a>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-700 font-medium">
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                  <button
                    onClick={handleLogout}
                    className="text-xs font-medium text-gray-500 hover:text-gray-700"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              className="text-gray-500 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">할일 관리</h1>
            <div className="w-6"></div> {/* Spacer for alignment */}
          </div>
        </header>

        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;