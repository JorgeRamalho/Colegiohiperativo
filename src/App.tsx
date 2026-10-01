import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import SportsPage from './pages/SportsPage';
import EnrollmentPage from './pages/EnrollmentPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import UserPortalPage from './pages/UserPortalPage';
import AdminEnrollmentsPage from './pages/AdminEnrollmentsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="index.html" element={<Navigate to="/" replace />} />
            <Route index element={<HomePage />} />
            <Route path="sobre" element={<AboutPage />} />
            <Route path="cursos" element={<CoursesPage />} />
            <Route path="esportes" element={<SportsPage />} />
            <Route path="matricula" element={<EnrollmentPage />} />
            <Route path="contato" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="cadastro" element={<RegisterPage />} />
            <Route path="confirmar-email" element={<ConfirmEmailPage />} />
            <Route path="portal" element={<UserPortalPage />} />
            <Route path="admin/matriculas" element={<AdminEnrollmentsPage />} />
            <Route path="politica-privacidade" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
