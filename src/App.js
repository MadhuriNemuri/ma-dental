import './App.css';
import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Services from './components/Services';
import Explore from './components/Explore';
import Specialists from './components/Specialists';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import ScrollToTop from './components/ScrollToTop';

// Code-splitting via React.lazy to minimize bundle size, speed up FCP/LCP, and eliminate TBT
const AboutPage = lazy(() => import('./components/AboutPage'));
const TreatmentsPage = lazy(() => import('./components/TreatmentsPage'));
const DoctorsPage = lazy(() => import('./components/DoctorsPage'));
const ReviewsPage = lazy(() => import('./components/ReviewsPage'));
const GalleryPage = lazy(() => import('./components/GalleryPage'));
const BookAppointmentPage = lazy(() => import('./components/BookAppointmentPage'));
const DentalChatbot = lazy(() => import('./components/DentalChatbot'));

function RouteLoadingFallback() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: 32,
          height: 32,
          border: '3px solid #eef2f6',
          borderTopColor: '#2f39a9',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite'
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <OurStory />
      <Services />
      <Explore />
      <Specialists />
      <Testimonials />
      <Footer />
    </>
  );
}

function AboutPageWrapper() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<RouteLoadingFallback />}>
        <AboutPage />
      </Suspense>
      <Footer />
    </>
  );
}

function TreatmentsPageWrapper() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<RouteLoadingFallback />}>
        <TreatmentsPage />
      </Suspense>
      <Footer />
    </>
  );
}

function DoctorsPageWrapper() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<RouteLoadingFallback />}>
        <DoctorsPage />
      </Suspense>
      <Footer />
    </>
  );
}

function GalleryPageWrapper() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<RouteLoadingFallback />}>
        <GalleryPage />
      </Suspense>
      <Footer />
    </>
  );
}

function ReviewsPageWrapper() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<RouteLoadingFallback />}>
        <ReviewsPage />
      </Suspense>
      <Footer />
    </>
  );
}

function BookingPageWrapper() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<RouteLoadingFallback />}>
        <BookAppointmentPage />
      </Suspense>
      <Footer />
    </>
  );
}

function App() {
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);

  return (
    <div className="App">
      <ScrollToTop />
      {!isLoaderFinished && (
        <PageLoader onFinish={() => setIsLoaderFinished(true)} />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPageWrapper />} />
        <Route path="/treatments" element={<TreatmentsPageWrapper />} />
        <Route path="/doctors" element={<DoctorsPageWrapper />} />
        <Route path="/gallery" element={<GalleryPageWrapper />} />
        <Route path="/reviews" element={<ReviewsPageWrapper />} />
        <Route path="/contact" element={<Navigate to="/book-appointment" replace />} />
        <Route path="/book-appointment" element={<BookingPageWrapper />} />
        <Route path="/chatbot" element={<Navigate to="/doctors" replace state={{ openChatbot: true }} />} />
        <Route path="/concierge" element={<Navigate to="/doctors" replace state={{ openChatbot: true }} />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Suspense fallback={null}>
        <DentalChatbot isReady={isLoaderFinished} />
      </Suspense>
    </div>
  );
}

export default App;
