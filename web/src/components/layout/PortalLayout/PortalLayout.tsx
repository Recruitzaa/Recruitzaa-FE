import { Outlet } from 'react-router-dom';
import { PortalSidebar } from './PortalSidebar';
import { PortalTopbar } from './PortalTopbar';

export const PortalLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <PortalSidebar />
      <div className="flex-1 ml-[260px] flex flex-col">
        <PortalTopbar />
        <main className="p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
