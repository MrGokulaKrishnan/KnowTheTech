import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { LoadingState } from '@/components/common/LoadingState';

// Lazy-loaded route chunks
const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })));
const Products = lazy(() => import('@/pages/Products').then(m => ({ default: m.Products })));
const ProductDetail = lazy(() => import('@/pages/ProductDetail').then(m => ({ default: m.ProductDetail })));
const Ecosystem = lazy(() => import('@/pages/Ecosystem').then(m => ({ default: m.Ecosystem })));
const About = lazy(() => import('@/pages/About').then(m => ({ default: m.About })));
const Author = lazy(() => import('@/pages/Author').then(m => ({ default: m.Author })));
const Contact = lazy(() => import('@/pages/Contact').then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })));

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />

        {/* Ambient atmospheric lighting */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[140px]" />
          <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px]" />
          <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 subtle-grid opacity-15" />
        </div>

        {/* Layout Shell */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-sky-500 text-white rounded-lg font-mono text-xs font-semibold shadow-lg focus:outline-none"
          >
            Skip to main content
          </a>

          <Navbar />

          <main id="main-content" className="flex-grow">
            <Suspense fallback={<LoadingState />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route path="/ecosystem" element={<Ecosystem />} />
                <Route path="/about" element={<About />} />
                <Route path="/author" element={<Author />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
