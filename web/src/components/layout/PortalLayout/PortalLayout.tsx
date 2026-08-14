import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PortalSidebar } from './PortalSidebar';
import { PortalTopbar } from './PortalTopbar';

export const PortalLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800">
      <PortalSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 md:ml-[260px] min-w-0 flex flex-col">
        <PortalTopbar onOpenMenu={openSidebar} />
        <main className="p-4 sm:p-6 lg:p-8 flex-1" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
