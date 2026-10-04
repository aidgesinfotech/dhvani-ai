import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import { PublicLayout } from './layouts/PublicLayout';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { CollaboratePage } from './pages/CollaboratePage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PageLoader } from './components/ui/SectionHeading';

/* Admin CMS is code-split so public visitors never download it. */
const AdminLayout = lazy(() => import('./layouts/AdminLayout').then((m) => ({ default: m.AdminLayout })));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then((m) => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const AdminPages = lazy(() => import('./pages/admin/AdminPages').then((m) => ({ default: m.AdminPages })));
const AdminPageEdit = lazy(() => import('./pages/admin/AdminPageEdit').then((m) => ({ default: m.AdminPageEdit })));
const AdminServices = lazy(() => import('./pages/admin/AdminServices').then((m) => ({ default: m.AdminServices })));
const AdminPosts = lazy(() => import('./pages/admin/AdminPosts').then((m) => ({ default: m.AdminPosts })));
const AdminProcess = lazy(() => import('./pages/admin/AdminProcess').then((m) => ({ default: m.AdminProcess })));
const AdminStats = lazy(() => import('./pages/admin/AdminStats').then((m) => ({ default: m.AdminStats })));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials').then((m) => ({ default: m.AdminTestimonials })));
const AdminFaqs = lazy(() => import('./pages/admin/AdminFaqs').then((m) => ({ default: m.AdminFaqs })));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings').then((m) => ({ default: m.AdminSettings })));
const AdminLeads = lazy(() => import('./pages/admin/AdminLeads').then((m) => ({ default: m.AdminLeads })));
const AdminLegalPage = lazy(() => import('./pages/admin/AdminLegalPage').then((m) => ({ default: m.AdminLegalPage })));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteProvider>
        <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/collaborate-with-us" element={<CollaboratePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<LegalPage slug="privacy-policy" />} />
            <Route path="/terms-of-service" element={<LegalPage slug="terms-of-service" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="pages" element={<AdminPages />} />
            <Route path="pages/:id" element={<AdminPageEdit />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="process" element={<AdminProcess />} />
            <Route path="stats" element={<AdminStats />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="faqs" element={<AdminFaqs />} />
            <Route path="privacy-policy" element={<AdminLegalPage slug="privacy-policy" label="Privacy Policy" />} />
            <Route path="terms-of-service" element={<AdminLegalPage slug="terms-of-service" label="Terms of Service" />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
        </Suspense>
      </SiteProvider>
    </BrowserRouter>
  );
}
