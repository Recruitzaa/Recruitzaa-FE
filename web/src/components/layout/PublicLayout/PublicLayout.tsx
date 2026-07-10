import { Outlet } from 'react-router-dom';
import { UtilityBar } from '../UtilityBar/UtilityBar';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';

export const PublicLayout = () => {
  return (
    <div className="app-shell">
      <UtilityBar />
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
