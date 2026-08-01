import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import useVisitTracking from '../hooks/useVisitTracking';

const Layout = () => {
  const { pathname } = useLocation();
  useVisitTracking();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" />
      <Header />
      <main className="flex-1 pt-[64px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
