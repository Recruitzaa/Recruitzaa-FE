import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';

export const AdminLayout = () => {
  console.log("AdminLayout rendering!");
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-surface)' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
        <AdminTopbar />
        <main style={{ padding: '2rem', flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
