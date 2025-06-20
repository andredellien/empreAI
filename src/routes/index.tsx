import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import Dashboard from '../components/Dashboard';
import Businesses from '../pages/dashboard/Businesses';
import ContentGenerator from '../pages/dashboard/ContentGenerator';
import ImageGenerator from '../pages/dashboard/ImageGenerator';
import Settings from '../pages/dashboard/Settings';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

// Componente para rutas protegidas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

// Componente para la página de inicio
const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const handleRegisterClick = () => {
    // Implementar lógica para abrir el modal de registro
  };

  return (
    <>
      <Navbar />
      <Hero onRegisterClick={handleRegisterClick} />
      <Features />
      <Benefits />
      <Testimonials />
      <Pricing onRegisterClick={handleRegisterClick} />
      <CallToAction onRegisterClick={handleRegisterClick} />
      <Footer />
    </>
  );
};

// Componente para el layout del dashboard
const DashboardRoutes = () => (
  <DashboardLayout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/businesses" element={<Businesses />} />
      <Route path="/content" element={<ContentGenerator />} />
      <Route path="/images" element={<ImageGenerator />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </DashboardLayout>
);

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardRoutes />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes; 