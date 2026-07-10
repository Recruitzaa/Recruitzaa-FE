import { Outlet } from 'react-router-dom';
import { PortalSidebar } from './PortalSidebar';
import { PortalTopbar } from './PortalTopbar';

export const PortalLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-surface)' }}>
      <PortalSidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
        <PortalTopbar />
        <main style={{ padding: '2rem', flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
