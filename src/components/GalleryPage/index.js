import './index.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  'All Photos',
  'Doctors & Team',
  'Clinic & Facilities',
  'Advanced Equipment'
];

const FEATURED_DOCTOR = {
  name: 'Dr. T. Bhanu Prakash Reddy',
  role: 'Chief Dental Surgeon & Implantologist',
  badge: 'Lead Dentist',
  image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/dr-bhanu-enhanced.png`,
  description: 'Specializing in complex full-mouth dental implants, aesthetic smile makeovers, and gentle oral surgery.'
};

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Dr. Y. Shanti Priya',
    category: 'Doctors & Team',
    role: 'Cosmetic & Pediatric',
    image: `${process.env.PUBLIC_URL || ''}/Assets/specialists_images/Group 1000003419.png`,
    badge: 'DOCTOR',
    iconType: 'tooth',
    description: 'Experienced dental surgeon dedicated to gentle family, cosmetic and pediatric dental care.'
  },
  {
    id: 2,
    title: 'Dr. G. Rishitha Reddy',
    category: 'Doctors & Team',
    role: 'Periodontics & Implants',
    image: `${process.env.PUBLIC_URL || ''}/Assets/specialists_images/Background.png`,
    badge: 'DOCTOR',
    iconType: 'tooth',
    description: 'Specialist in minimally invasive gum therapies, bone grafting, and dental implants.'
  },
  {
    id: 99,
    title: 'Dr. Mounika Pothireddy',
    category: 'Doctors & Team',
    role: 'Hygiene Consultant',
    image: `${process.env.PUBLIC_URL || ''}/Assets/specialists_images/Background (1).png`,
    badge: 'DOCTOR',
    iconType: 'shield',
    description: 'Specialist in preventive oral hygiene, patient education, and anxiety-free gentle smile care.'
  },
  {
    id: 3,
    title: 'Dr. M. Hemadri',
    category: 'Doctors & Team',
    role: 'Orthodontics & Aligners',
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/doctor-3-enhanced.png`,
    badge: 'DOCTOR',
    iconType: 'braces',
    description: 'Expert in invisible clear aligner treatments and precision orthodontic bracket therapy.'
  },
  {
    id: 4,
    title: 'Ma Dental Team',
    category: 'Doctors & Team',
    role: 'Specialists & Staff',
    image: `${process.env.PUBLIC_URL || ''}/grp_image/IMG_6855.PNG`,
    badge: 'TEAM',
    iconType: 'shield',
    description: 'Our dedicated clinical team of dental surgeons, specialists, and compassionate support staff.'
  },
  {
    id: 5,
    title: 'Operatory Suite',
    category: 'Clinic & Facilities',
    role: 'Ergonomic Treatment',
    image: `${process.env.PUBLIC_URL || ''}/Assets/images/clinic-operatory.png`,
    badge: 'FACILITY',
    iconType: 'clinic',
    description: 'Spacious, sterile clinical operatory equipped with state-of-the-art dental chairs.'
  },
  {
    id: 6,
    title: 'FONA 3D X-Ray',
    category: 'Advanced Equipment',
    role: 'Panoramic OPG Suite',
    image: `${process.env.PUBLIC_URL || ''}/Assets/images/fona-opg-xray.png`,
    badge: 'EQUIPMENT',
    iconType: 'scanner',
    description: 'Ultra-low radiation 3D panoramic imaging for precise dental diagnosis.'
  },
  {
    id: 7,
    title: 'Digital RVG',
    category: 'Advanced Equipment',
    role: 'Chairside Sensor',
    image: `${process.env.PUBLIC_URL || ''}/Assets/images/digital-rvg-sensor.png`,
    badge: 'EQUIPMENT',
    iconType: 'tech',
    description: 'Instant high-definition chairside digital X-rays with maximum patient safety.'
  },
  {
    id: 8,
    title: 'Class-B Autoclave',
    category: 'Clinic & Facilities',
    role: 'Sterilization Unit',
    image: `${process.env.PUBLIC_URL || ''}/Assets/images/sterilization-autoclave.png`,
    badge: 'FACILITY',
    iconType: 'shield',
    description: 'Hospital-grade sterilization units ensuring 100% instrument safety and hygiene.'
  },
  {
    id: 9,
    title: 'Clinic Lounge',
    category: 'Clinic & Facilities',
    role: 'Consultation Suite',
    image: `${process.env.PUBLIC_URL || ''}/Assets/images/dental-facilities.png`,
    badge: 'FACILITY',
    iconType: 'clinic',
    description: 'Welcoming consultation lounge designed for patient comfort and calm care.'
  },
  {
    id: 10,
    title: 'Physiodispenser',
    category: 'Advanced Equipment',
    role: 'Implant Motor',
    image: `${process.env.PUBLIC_URL || ''}/Assets/images/implant-physiodispenser.jpg`,
    badge: 'EQUIPMENT',
    iconType: 'tech',
    description: 'Micro-precision motor systems for controlled, painless dental implant placement.'
  },
  {
    id: 11,
    title: 'Intraoral Scanner',
    category: 'Advanced Equipment',
    role: '3D Color Scanner',
    image: `${process.env.PUBLIC_URL || ''}/Assets/explore_images/intraoral-scanning-compressed.webp`,
    badge: 'EQUIPMENT',
    iconType: 'scanner',
    description: 'No messy impression putty—high-accuracy 3D digital impressions in minutes.'
  },
  {
    id: 12,
    title: 'Scan Review Suite',
    category: 'Advanced Equipment',
    role: 'Diagnosis Station',
    image: `${process.env.PUBLIC_URL || ''}/Assets/explore_images/dental-team-reviewing-scans-compressed.webp`,
    badge: 'EQUIPMENT',
    iconType: 'tech',
    description: 'High-definition digital diagnosis and smile makeover simulation workstation.'
  }
];

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All Photos');
  const [modalItem, setModalItem] = useState(null);

  const displayedItems = activeCategory === 'All Photos'
    ? GALLERY_ITEMS.slice(0, 8)
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const renderCardIcon = (iconType) => {
    switch (iconType) {
      case 'braces':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M4 12h16M7 8v8M12 7v10M17 8v8" />
            <circle cx="7" cy="12" r="2" fill="currentColor" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <circle cx="17" cy="12" r="2" fill="currentColor" />
          </svg>
        );
      case 'clinic':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h6M9 14h6M9 18h6" />
          </svg>
        );
      case 'scanner':
      case 'tech':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        );
      case 'shield':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        );
      case 'tooth':
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M12 2C8.5 2 7 4 7 6.5c0 2 .5 4 1 6.5.5 2.5 1 5 1.5 7 .5 2 2 2 2.5 0 .5-2 1-5 1.5-7 .5-2.5 1-4.5 1-6.5C14.5 4 13 2 12 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="gallery-poster-wrapper">
      <div className="gallery-poster-container">
        {/* TOP BRAND HEADER (MATCHING REFERENCE POSTER ARCHITECTURE) */}
        <header className="gallery-poster-header">
          <div className="gallery-header-left">
            <span className="gallery-kicker">MEET OUR EXPERTS &amp; CLINIC</span>
            <h1 className="gallery-main-title">Our Dedicated Doctors &amp; Gallery</h1>
            <p className="gallery-subtitle">
              A team of experienced and compassionate professionals, committed to providing the best dental care for you and your family.
            </p>
          </div>

          <div className="gallery-header-right">
            <div className="gallery-script-accent">
              <span>Healthy Smiles</span>
              <span className="script-second-line">
                Start Here
                <svg className="script-tooth-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2C8.5 2 7 4 7 6.5c0 2 .5 4 1 6.5.5 2.5 1 5 1.5 7 .5 2 2 2 2.5 0 .5-2 1-5 1.5-7 .5-2.5 1-4.5 1-6.5C14.5 4 13 2 12 2z" />
                </svg>
              </span>
            </div>
          </div>
        </header>

        {/* CATEGORY FILTER PILLS (FROM REFERENCE) */}
        <nav className="gallery-pills-row" aria-label="Gallery category filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`gallery-pill-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* MAIN POSTER BODY: LEFT FEATURED COLUMN + RIGHT 8-CARD GRID */}
        <div className="gallery-master-grid">
          {/* LEFT COLUMN: FEATURED LEAD DOCTOR CARD & HIGHLIGHT CARD */}
          <div className="gallery-left-column">
            {/* 1. LARGE FEATURED CARD (MATCHING REFERENCE POSTER) */}
            <article
              className="featured-doctor-card"
              onClick={() => setModalItem({
                title: FEATURED_DOCTOR.name,
                role: FEATURED_DOCTOR.role,
                image: FEATURED_DOCTOR.image,
                category: 'Lead Specialist',
                description: FEATURED_DOCTOR.description
              })}
            >
              <div className="featured-image-box">
                <img
                  src={FEATURED_DOCTOR.image}
                  alt={FEATURED_DOCTOR.name}
                  className="featured-photo"
                />
                <span className="lead-dentist-tag">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="tag-tooth-icon">
                    <path d="M12 2C8.5 2 7 4 7 6.5c0 2 .5 4 1 6.5.5 2.5 1 5 1.5 7 .5 2 2 2 2.5 0 .5-2 1-5 1.5-7 .5-2.5 1-4.5 1-6.5C14.5 4 13 2 12 2z" />
                  </svg>
                  {FEATURED_DOCTOR.badge}
                </span>

                {/* BOTTOM WAVE OVERLAY WITH TITLE & CTA */}
                <div className="featured-bottom-wave-overlay">
                  <div className="featured-meta">
                    <h3 className="featured-name">{FEATURED_DOCTOR.name}</h3>
                    <p className="featured-role">{FEATURED_DOCTOR.role}</p>
                    <Link
                      to="/book-appointment"
                      className="featured-profile-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Book Consultation &rarr;
                    </Link>
                  </div>
                  <div className="featured-tooth-watermark" aria-hidden="true">
                    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M30,15 C20,15 12,25 15,45 C18,65 24,85 36,92 C42,95 46,85 49,70 C50,65 52,65 53,70 C56,85 60,95 66,92 C78,85 84,65 87,45 C90,25 82,15 72,15 C60,15 54,26 51,26 C48,26 42,15 30,15 Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>

            {/* 2. HIGHLIGHT CARD (MATCHING REFERENCE POSTER) */}
            <div className="gallery-highlight-card">
              <div className="highlight-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="highlight-tooth-svg">
                  <path d="M12 2C8.5 2 7 4 7 6.5c0 2 .5 4 1 6.5.5 2.5 1 5 1.5 7 .5 2 2 2 2.5 0 .5-2 1-5 1.5-7 .5-2.5 1-4.5 1-6.5C14.5 4 13 2 12 2z" />
                </svg>
                <span className="sparkle-dot sparkle-top">✦</span>
                <span className="sparkle-dot sparkle-bottom">✦</span>
              </div>
              <div className="highlight-text-block">
                <h4>Expert Care. Personalized Attention.</h4>
                <p>
                  Our team works together to ensure you receive the highest standard of personalized dental care.
                </p>
                <div className="highlight-script-signature">
                  Your Smile, Our Priority
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 2x4 GRID (8 CARDS, MATCHING REFERENCE POSTER) */}
          <div className="gallery-right-grid">
            {displayedItems.map((item) => (
              <article
                key={item.id}
                className="gallery-card"
                onClick={() => setModalItem(item)}
              >
                <div className="gallery-card-image-box">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-card-photo"
                    loading="lazy"
                  />
                </div>

                <div className="gallery-card-footer">
                  <div className="card-info">
                    <h4 className="card-title">{item.title}</h4>
                    <span className="card-role">{item.role}</span>
                  </div>
                  <div className="card-icon-pill" title={item.category}>
                    {renderCardIcon(item.iconType)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* BOTTOM POSTER FOOTER CTA */}
        <footer className="gallery-bottom-cta">
          <div className="bottom-cta-text">
            <h3>Experience World-Class Dental Excellence in Person</h3>
            <p>Visit our modern facilities across Pileru, Tirupati, Bangalore, Hyderabad &amp; Chennai.</p>
          </div>
          <Link to="/book-appointment" className="bottom-book-btn">
            Book Your Appointment Today &rarr;
          </Link>
        </footer>
      </div>

      {/* LIGHTBOX MODAL ZOOM */}
      {modalItem && (
        <div
          className="gallery-modal-backdrop"
          onClick={() => setModalItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="gallery-modal-close"
              onClick={() => setModalItem(null)}
              aria-label="Close image popup"
            >
              ✕
            </button>
            <div className="modal-img-container">
              <img
                src={modalItem.image}
                alt={modalItem.title}
                className="modal-full-img"
              />
            </div>
            <div className="modal-details">
              <span className="modal-badge">{modalItem.category || 'Clinical Showcase'}</span>
              <h3>{modalItem.title}</h3>
              <p className="modal-role">{modalItem.role}</p>
              <p className="modal-desc">{modalItem.description}</p>
              <div className="modal-actions">
                <Link
                  to="/book-appointment"
                  className="modal-book-btn"
                  onClick={() => setModalItem(null)}
                >
                  Book Appointment with Specialist &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;

