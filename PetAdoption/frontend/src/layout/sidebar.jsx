import React, { useState } from 'react';
import logo from '../assets/Pawzio.png';

const Sidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="grid grid-cols-8 w-dvw h-dvh bg-back-50">
      {/* Sidebar */}
      <div className={`h-full overflow-y-auto ${collapsed ? 'col-span-1 lg:col-span-1' : 'col-span-1'}`}>
        <div className="p-2 h-full w-full flex flex-col bg-white dark:bg-gray-900 border-r border-r-gray-200">
          
          {/* Toggle button
          <div className="flex justify-end px-2 mb-2">
            <button
              className="text-xl font-bold px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
              onClick={() => setCollapsed(!collapsed)}
            >
              =
            </button>
          </div> */}

          {/* Logo */}
          <a href="/admin/" className="mb-4">
            <div className="flex justify-start items-center gap-2 py-2 px-4 cursor-pointer">
              <img src={logo} alt="Logo" className="w-9 h-9" />
              {!collapsed && (
                <span className="font-bold text-lg text-ellipsis overflow-hidden max-w-full">Pawzio</span>
              )}
            </div>
          </a>

          <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden flex-grow justify-between">
            {/* Main Menu */}
            <div className="flex flex-col space-y-1">
              <div className={`px-5 pt-2 ${collapsed ? 'hidden' : 'block'}`}>
                <div className="text-xs font-bold tracking-wide text-gray-600">MAIN MENU</div>
              </div>

              {[
                { href: '/admin/', label: 'Dashboard', icon: '🏠' },
                { href: '/admin/pets', label: 'Manage Pets', icon: '🐾' },
                { href: '/admin/adopted', label: 'Adopted Details', icon: '✅' },
                { href: '/admin/customers', label: 'Customers', icon: '👤' },
                { href: '/admin/feedback', label: 'Feedback', icon: '💬' },
                { href: '/admin/contact', label: 'Contact', icon: '✉️' },
                { href: '/admin/manage', label: 'Manage', icon: '⚙️' },
              ].map(({ href, label, icon }) => (
                <a
                  key={href}
                  className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5 lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer hover:bg-gray-50"
                  href={href}
                >
                  <span className="inline-flex justify-center items-center ml-3.5">{icon}</span>
                  {!collapsed && (
                    <span className="ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">{label}</span>
                  )}
                </a>
              ))}
            </div>

            {/* Settings Section */}
            <div className="flex flex-col space-y-1 pb-4">
              <div className={`px-5 pt-4 ${collapsed ? 'hidden' : 'block'}`}>
                <div className="text-xs font-bold tracking-wide text-gray-600">SETTINGS</div>
              </div>

              <a
                className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5 lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer hover:bg-gray-50"
                href="/admin/profile"
              >
                <span className="inline-flex justify-center items-center ml-3.5">👤</span>
                {!collapsed && (
                  <span className="ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">Profile</span>
                )}
              </a>

              <a
                className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5 lg:pr-6 font-semibold text-red-400 hover:text-red-600 cursor-pointer hover:bg-gray-50"
                href="/admin/logout"
              >
                <span className="inline-flex justify-center items-center ml-3.5">🚪</span>
                {!collapsed && (
                  <span className="ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">Logout</span>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-7 overflow-y-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
