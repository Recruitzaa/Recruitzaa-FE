import { Outlet } from 'react-router-dom';

export const PortalLayout = () => {
  return (
    <div>
      <header>PortalLayout Header</header>
      <main>
        <Outlet />
      </main>
      <footer>PortalLayout Footer</footer>
    </div>
  );
};
