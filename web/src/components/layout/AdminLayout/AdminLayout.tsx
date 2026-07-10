import { Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  return (
    <div>
      <header>AdminLayout Header</header>
      <main>
        <Outlet />
      </main>
      <footer>AdminLayout Footer</footer>
    </div>
  );
};
