'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, BarChart2, Users, Moon, Sun, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

const navItems = [
  { name: 'Dashboard', icon: <Home size={24} />, href: '/dashboard' },
  { name: 'Analytics', icon: <BarChart2 size={24} />, href: '/analytics' },
  { name: 'Users', icon: <Users size={24} />, href: '/users' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isDark, setIsDark] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  // Handler for logout
  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push('/login');
  };

  return (
    <div
      onClick={toggleSidebar}
      className={clsx(
        'h-screen bg-white dark:bg-gray-900 text-black dark:text-white shadow-md transition-all duration-300 ease-in-out',
        'rounded-xl ml-3 p-4 flex flex-col justify-between',
        isExpanded ? 'w-64' : 'w-20'
      )}
    >
      {/* Top Section */}
      <div>
        <h1
          className={clsx(
            'text-2xl font-bold mb-8 transition-all duration-300 whitespace-nowrap',
            isExpanded ? 'opacity-100' : 'opacity-0'
          )}
        >
          ADmyBRAND
        </h1>

        <nav className="flex flex-col gap-6">
          {navItems.map((item, index) => {
            // Highlight if current pathname matches start of href (to handle subroutes)
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={index}
                href={item.href}
                className={clsx(
                  'flex items-center gap-4 text-[18px] font-medium transition-all duration-300 hover:text-blue-500 hover:scale-105',
                  isActive && 'text-blue-600 dark:text-blue-400 font-semibold'
                )}
              >
                <div className="min-w-[24px]">{item.icon}</div>
                <span
                  className={clsx(
                    'transition-opacity duration-300',
                    isExpanded ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4 mb-2">
        {/* Logout Button */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleLogout(e);
          }}
          className="transition-all cursor-pointer"
        >
          <Button
            variant="outline"
            className={clsx(
              'w-full flex items-center justify-center gap-3 rounded-full text-[17px] py-3 px-4',
              !isExpanded && 'justify-center px-0'
            )}
          >
            <LogOut size={22} />
            {isExpanded && <span>Logout</span>}
          </Button>
        </div>

        {/* Dark Mode Toggle */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleTheme();
          }}
          className="transition-all cursor-pointer"
        >
          <Button
            variant="outline"
            className={clsx(
              'w-full flex items-center justify-center gap-3 rounded-full text-[17px] py-3 px-4',
              !isExpanded && 'justify-center px-0'
            )}
          >
            {isDark ? <Sun size={22} /> : <Moon size={22} />}
            {isExpanded && <span>Toggle Theme</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}
