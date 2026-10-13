import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Services from './components/Services';
import Explore from './components/Explore';
import Specialists from './components/Specialists';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import TreatmentsPage from './components/TreatmentsPage';
import DoctorsPage from './components/DoctorsPage';
import ReviewsPage from './components/ReviewsPage';
import GalleryPage from './components/GalleryPage';
import BookAppointmentPage from './components/BookAppointmentPage';
import DentalChatbot from './components/DentalChatbot';
import PageLoader from './components/PageLoader';

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
      <AboutPage />
      <Footer />
    </>
  );
}

function TreatmentsPageWrapper() {
  return (
    <>
      <Navbar />
      <TreatmentsPage />
      <Footer />
    </>
  );
}

function DoctorsPageWrapper() {
  return (
    <>
      <Navbar />
      <DoctorsPage />
      <Footer />
    </>
  );
}

function GalleryPageWrapper() {
  return (
    <>
      <Navbar />
      <GalleryPage />
      <Footer />
    </>
  );
}

function ReviewsPageWrapper() {
  return (
    <>
      <Navbar />
      <ReviewsPage />
      <Footer />
    </>
  );
}

function BookingPageWrapper() {
  return (
    <>
      <Navbar />
      <BookAppointmentPage />
      <Footer />
    </>
  );
}

function App() {
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);

  return (
    <div className="App">
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
        <Route path="*" element={<HomePage />} />
      </Routes>
      <DentalChatbot isReady={isLoaderFinished} />
    </div>
  );
}

export default App;
