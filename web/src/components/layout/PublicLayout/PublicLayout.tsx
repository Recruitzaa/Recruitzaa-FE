import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  return (
    <div>
      <header>PublicLayout Header</header>
      <main>
        <Outlet />
      </main>
      <footer>PublicLayout Footer</footer>
    </div>
  );
};
