import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './layout/footer';
import Navbar from './layout/navbar';
import About from './pages/customerpages/about';
import HomePage from './pages/customerpages/homepage';
import Contact from './pages/customerpages/contact';
import Login from './pages/customerpages/login';
import Register from './pages/customerpages/register';
import Sidebar from './layout/sidebar';
import Dashboard from './pages/adminpages/dashboard';
import ManagePets from './pages/adminpages/homepage';
import AdoptPets from './pages/customerpages/AdoptPets';
import Manage from './pages/adminpages/manage';
import Logout from './layout/logout';
import { useEffect, useState } from 'react';
import ManageFeedback from './pages/adminpages/managefeedback';
import ContactInfo from './pages/adminpages/contactinfo';
import Customer from './pages/adminpages/customer';
import Adopted from './pages/adminpages/adopted';
import UserProfile from './pages/customerpages/userprofile';
import AdminProfile from './pages/adminpages/profile';

function App() {
  const location = useLocation();

  const getInitialLoginState = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  };

  const [isLoggedIn, setIsLoggedIn] = useState(getInitialLoginState);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('isLoggedIn');
    }
  }, [isLoggedIn]);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const hideLayout = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && !isAdminRoute && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      )}

      {!hideLayout && !isAdminRoute && <div className="h-[64px]" />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adopt" element={<AdoptPets />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />

          {isAdminRoute && (
            <Route path="/admin/*" element={
              <Sidebar>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/pets" element={<ManagePets />} />
                  <Route path="/manage" element={<Manage />} />
                  <Route path="/feedback" element={<ManageFeedback />} />
                  <Route path="/contact" element={<ContactInfo />} />
                  <Route path="/customers" element={<Customer />} />
                  <Route path="/adopted" element={<Adopted />} />
                  <Route path="/profile" element={<AdminProfile />} />
                  <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
                </Routes>
              </Sidebar>
            } />
          )}
        </Routes>
      </main>

      {!hideLayout && !isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
