import './index.css';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const WHATSAPP_NUMBER = '917799234108';

const treatmentsData = [
  {
    id: 'rct',
    number: '01',
    category: 'Endodontics (Root Canal)',
    title: 'Root Canal Treatment (RCT)',
    description: "Precision microscopic root disinfection and warm bioactive obturation to permanently resolve pulpal infection while preserving the tooth's natural root architecture.",
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/Microscopic Endodontics.jpg`
  },
  {
    id: 'crowns',
    number: '02',
    category: 'Cosmetic Dentistry',
    title: 'Ceramic & Zirconia Crowns',
    description: 'Custom multi-layered monolithic restorations crafted to flawlessly mirror natural enamel translucency, structural flexure, and optimal chewing resistance.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/Cosmetic & Aesthetic Dentistry.jpg`
  },
  {
    id: 'implants',
    number: '03',
    category: 'Implantology & Oral Surgery',
    title: 'Dental Implants',
    description: '3D computer-guided osseointegration delivering permanent, natural-feeling tooth replacements that preserve bone density and youthful facial symmetry.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/services/dental-implants.webp`
  },
  {
    id: 'replacement',
    number: '04',
    category: 'Cosmetic Dentistry',
    title: 'Teeth Replacement',
    description: 'Holistic full-arch and bridge reconstructions that seamlessly restore full bite mechanics, confident phonetic articulation, and lifelike aesthetics.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/images/implant-physiodispenser.jpg`
  },
  {
    id: 'children',
    number: '05',
    category: 'Pediatric & Preventive Care',
    title: "Special Care for Children's Teeth",
    description: 'Gentle, anxiety-free developmental dentistry focusing on remineralization, airway development, and positive oral habits in an unhurried sanctuary.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/services/pediatric-care.webp`
  },
  {
    id: 'wisdom-teeth',
    number: '06',
    category: 'Implantology & Oral Surgery',
    title: 'Extraction of Wisdom Teeth',
    description: 'Atraumatic, minimally invasive surgical removal utilizing 3D CBCT navigation and PRF autologous healing for rapid, painless tissue recovery.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/Implantology & Oral Surgery.jpg`
  },
  {
    id: 'dentures',
    number: '07',
    category: 'Cosmetic Dentistry',
    title: 'Removable & BPS Dentures',
    description: 'Biofunctional Prosthetic System (BPS) engineering offering exceptional suction, stable chewing dynamics, and lifelike individualized gum aesthetics.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/images/dental-facilities.png`
  },
  {
    id: 'laser-gum',
    number: '08',
    category: 'Periodontics & Gum Care',
    title: 'Laser Treatment for Gum Problems',
    description: 'Targeted photonic therapy that sterilizes deep periodontal pockets, eradicates harmful bacteria, and stimulates natural tissue regeneration without sutures.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/Periodontics & Laser Gum Care.jpg`
  },
  {
    id: 'tmj',
    number: '09',
    category: 'Implantology & Oral Surgery',
    title: 'Jaw Joint Treatment (TMJ / TMD)',
    description: 'Neuromuscular diagnostic deprogramming and customized physiological splint orthotics to relieve jaw tension, clenching pain, and chronic facial headaches.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/explore_images/dental-team-reviewing-scans-compressed.webp`
  },
  {
    id: 'whitening',
    number: '10',
    category: 'Cosmetic Dentistry',
    title: 'Teeth Whitening',
    description: 'pH-balanced, biological oxygenation therapies that brighten enamel multiple shades without abrasive micro-scratching or post-procedure dentin sensitivity.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/services/cosmetic-dentistry.webp`
  },
  {
    id: 'braces',
    number: '11',
    category: 'Orthodontics & Clear Aligners',
    title: 'Alignment of Teeth (Braces)',
    description: 'Ultra-low profile sapphire and ceramic self-ligating brackets engineered for controlled tooth biomechanics and immaculate long-term arch harmonization.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/services/orthodontics.webp`
  },
  {
    id: 'scaling',
    number: '12',
    category: 'Periodontics & Gum Care',
    title: 'Ultrasonic Scaling',
    description: 'Piezoelectric acoustic micro-vibrations and warm guided biofilm therapy to gently dislodge calculus and bacterial stains while protecting root surfaces.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/Preventive & Pediatric Care.jpg`
  },
  {
    id: 'gic-filling',
    number: '13',
    category: 'Cosmetic Dentistry',
    title: 'GIC Filling (Glass Ionomer)',
    description: 'Biocompatible glass-hybrid restorations that continuously release essential minerals to remineralize affected dentin and prevent recurrent margins.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/images/digital-rvg-sensor.png`
  },
  {
    id: 'flap-surgery',
    number: '14',
    category: 'Periodontics & Gum Care',
    title: 'Flap Surgery (Periodontal)',
    description: 'Micro-surgical access for deep subgingival debridement, bone contouring, and regenerative biologics to rescue compromised periodontal foundations.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/Periodontics & Laser Gum Care.jpg`
  },
  {
    id: 'clear-aligners',
    number: '15',
    category: 'Orthodontics & Clear Aligners',
    title: 'Clear Aligners',
    description: 'Virtually invisible multi-layered polyurethane aligners engineered via digital motion forecasting to guide teeth smoothly into harmonious alignment.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/Orthodontics & Clear Aligners.jpg`
  }
];

const categories = [
  'All Treatments',
  'Cosmetic Dentistry',
  'Orthodontics & Clear Aligners',
  'Implantology & Oral Surgery',
  'Endodontics (Root Canal)',
  'Periodontics & Gum Care',
  'Pediatric & Preventive Care'
];

const steps = [
  {
    number: '01',
    title: '3D Digital Assessment',
    text: 'High-definition intraoral 3D scanning and low-radiation CBCT diagnostics to evaluate your dental structure with sub-millimeter precision.',
    foot: 'Sub-millimeter mapping'
  },
  {
    number: '02',
    title: 'Tailored Treatment Plan',
    text: 'Clear, transparent discussion of your diagnosis with full visual previews and step-by-step guidance from our senior specialists.',
    foot: 'Digital smile preview'
  },
  {
    number: '03',
    title: 'Gentle & Painless Care',
    text: 'Treatment delivered with localized computerized anesthesia, micro-instruments, and relaxing ambient surrounds for complete comfort.',
    foot: 'Anxiety-free protocol'
  },
  {
    number: '04',
    title: 'Follow-Up & Maintenance',
    text: 'Long-term preventive follow-ups, warranty protection, and dedicated post-care support to keep your smile radiant and healthy.',
    foot: 'Structural warranty'
  }
];

function TreatmentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Treatments');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTreatments = useMemo(() => {
    return treatmentsData.filter((treatment) => {
      const matchesCategory =
        selectedCategory === 'All Treatments' || treatment.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        treatment.title.toLowerCase().includes(q) ||
        treatment.description.toLowerCase().includes(q) ||
        treatment.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="treatments-shell">
      {/* Top Breadcrumb */}
      <div className="page-breadcrumb treatments-breadcrumb">
        <span className="crumb-icon">⌂</span>
        <Link to="/" className="crumb-link">Home</Link>
        <span className="crumb-separator">/</span>
        <span className="crumb-current">Treatments</span>
      </div>

      <main className="treatments-page">
        {/* Header & Controls Section */}
        <section className="treatments-header-section">
          <div className="treatment-pill-badge">
            <span className="treatment-pill-dot" />
            COMPREHENSIVE CLINICAL CARE
          </div>

          <div className="treatments-hero-row">
            <div className="treatments-hero-copy">
              <h1 className="treatments-main-title">
                Advanced Dental Treatments &amp; Services
              </h1>
              <p className="treatments-main-subtitle">
                From preventive maintenance and biomimetic cosmetic makeovers to complex
                surgical reconstructions, our specialists leverage cutting-edge digital
                diagnostics to deliver painless, enduring clinical results.
              </p>
            </div>

            <div className="price-transparency-card">
              <div className="price-transparency-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="price-transparency-text">
                <div className="price-transparency-title">
                  Price Transparency
                  <svg className="check-badge-svg" width="16" height="16" viewBox="0 0 20 20" fill="#10b981">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="price-transparency-sub">
                  Zero hidden fees &bull; 0% APR available
                </div>
              </div>
            </div>
          </div>

          <div className="treatments-controls-row">
            <div className="treatment-search-box">
              <svg className="search-icon-svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search procedures, symptoms, implants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search procedures"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="treatment-categories-bar" role="tablist">
              {categories.map((category) => {
                const count =
                  category === 'All Treatments'
                    ? treatmentsData.length
                    : treatmentsData.filter((t) => t.category === category).length;
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    className={`treatment-cat-pill ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'All Treatments' ? `All Treatments (${count})` : category}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 15 Treatments Grid */}
        <section className="treatments-cards-grid" aria-label="Dental treatments catalogue">
          {filteredTreatments.length > 0 ? (
            filteredTreatments.map((treatment) => (
              <article className="treatment-item-card" key={treatment.id}>
                <div className="treatment-card-media">
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `${process.env.PUBLIC_URL || ''}/Assets/services/cosmetic-dentistry.webp`;
                    }}
                  />
                </div>

                <div className="treatment-card-content">
                  <span className="treatment-num-label">TREATMENT {treatment.number}</span>
                  <h2 className="treatment-card-name">{treatment.title}</h2>
                  <p className="treatment-card-desc">{treatment.description}</p>
                  <Link to="/book-appointment" className="treatment-card-cta">
                    <span>BOOK APPOINTMENT</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="no-treatments-container">
              <p>No treatments found matching &ldquo;{searchQuery}&rdquo;.</p>
              <button
                type="button"
                className="reset-search-pill"
                onClick={() => {
                  setSelectedCategory('All Treatments');
                  setSearchQuery('');
                }}
              >
                Show All Treatments
              </button>
            </div>
          )}
        </section>

        {/* Precision Treatment Journey */}
        <section className="journey-section compact-journey">
          <div className="journey-heading">
            <span className="section-kicker">✦ Predictable Clinical Workflows</span>
            <h2>Your Precision Treatment Journey</h2>
            <p>A transparent four-step rhythm from first consultation to confident follow-up.</p>
          </div>

          <div className="journey-badge">
            <span className="badge-icon">✦</span>
            Powered by 3D CBCT, iTero Optical Scanners &amp; Class-B Autoclaves
          </div>

          <div className="journey-grid">
            {steps.map((step) => (
              <article className="step-card" key={step.number}>
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <div className="step-foot">{step.foot}</div>
              </article>
            ))}
          </div>
        </section>

        {/* Dental Concierge Strip */}
        <section className="consult-strip">
          <div className="consult-copy">
            <span className="section-kicker">✦ Dental Concierge &amp; Triage</span>
            <h2>Not sure where to begin?</h2>
            <p>Start with a calm conversation and our clinical care coordinator will guide you to the right specialist.</p>
          </div>

          <div className="consult-actions">
            <Link to="/book-appointment" className="reserve-btn">
              Book Consultation <span aria-hidden="true">&rarr;</span>
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Doctor, I would like to consult regarding dental treatment.')}`}
              target="_blank"
              rel="noreferrer"
              className="call-btn"
            >
              <span className="wa-icon" aria-hidden="true">💬</span> WhatsApp: +91 77992 34108
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TreatmentsPage;
