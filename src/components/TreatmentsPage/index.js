import './index.css';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const WHATSAPP_NUMBER = '917799234108';

const treatmentsData = [
  {
    id: 'rct',
    number: '01',
    category: 'Restorative & Crowns',
    badge: 'Endodontics',
    title: 'Root Canal Treatment (RCT)',
    description: 'Advanced single-sitting microscopic therapy to relieve pain, eliminate deep infection, and preserve your natural tooth.',
    features: ['Single-Sitting', 'Microscopic 3D', 'Pain-Free'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/Microscopic Endodontics.jpg`,
    objectPosition: 'center 20%'
  },
  {
    id: 'crowns',
    number: '02',
    category: 'Restorative & Crowns',
    badge: 'Prosthodontics',
    title: 'Ceramic and Zirconia Crowns',
    description: 'Metal-free CAD/CAM monolithic zirconia and ceramic caps custom-milled for natural translucency and lifelong chewing strength.',
    features: ['CAD/CAM Zirconia', '100% Metal-Free', 'Lifelike Shade'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/Cosmetic & Aesthetic Dentistry.jpg`,
    objectPosition: 'center'
  },
  {
    id: 'implants',
    number: '03',
    category: 'Dental Implants & Surgery',
    badge: 'Oral Surgery',
    title: 'Dental Implants & Placements',
    description: 'Permanent biocompatible titanium root implants anchored with 3D surgical guidance to restore natural bite and aesthetics.',
    features: ['Guided 3D Surgery', 'Grade-4 Titanium', 'Lifetime Fit'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/services/dental-implants.webp`,
    objectPosition: 'center'
  },
  {
    id: 'replacement',
    number: '04',
    category: 'Restorative & Crowns',
    badge: 'Prosthodontics',
    title: 'Teeth Replacement (Fixed Bridges)',
    description: 'High-precision fixed dental bridges and modern prosthetics designed to bridge missing gaps and prevent tooth drifting.',
    features: ['Fixed Bridges', 'Zero Food Traps', 'Bite Restoration'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/images/implant-physiodispenser.jpg`,
    objectPosition: 'center 30%'
  },
  {
    id: 'children',
    number: '05',
    category: 'Gum & Preventive Care',
    badge: 'Pediatric Care',
    title: 'Special Care for Children’s Teeth',
    description: 'Gentle, anxiety-free pediatric dental care including cavity shields, fluoride coatings, and preventive habit guidance.',
    features: ['Child-Friendly', 'Cavity Shield', 'Gentle Fluoride'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/services/pediatric-care.webp`,
    objectPosition: 'center'
  },
  {
    id: 'wisdom-teeth',
    number: '06',
    category: 'Dental Implants & Surgery',
    badge: 'Oral Surgery',
    title: 'Extraction of Wisdom Teeth',
    description: 'Safe, atraumatic removal of impacted third molars under localized comfort anesthesia with fast-track recovery protocols.',
    features: ['CBCT 3D Mapping', 'Minimally Invasive', 'Rapid Healing'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/Implantology & Oral Surgery.jpg`,
    objectPosition: 'center 35%'
  },
  {
    id: 'dentures',
    number: '07',
    category: 'Restorative & Crowns',
    badge: 'Prosthodontics',
    title: 'Removable and BPS Dentures for Patients Without Teeth',
    description: 'Premium BPS biofunctional dentures providing superior suction stability, comfortable gum fit, and natural smile contours.',
    features: ['High Suction Fit', 'BPS Biofunctional', 'Comfortable Wear'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/images/dental-facilities.png`,
    objectPosition: 'center'
  },
  {
    id: 'laser-gum',
    number: '08',
    category: 'Gum & Preventive Care',
    badge: 'Periodontics',
    title: 'Laser Treatment for Gum Problems',
    description: 'Minimally invasive dental laser care to treat bleeding gums, eliminate deep pocket bacteria, and regenerate tissue without scalpels.',
    features: ['No Scalpel/Sutures', 'Laser Disinfection', 'Fast Healing'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/Periodontics & Laser Gum Care.jpg`,
    objectPosition: 'center 20%'
  },
  {
    id: 'jaw-joint',
    number: '09',
    category: 'Dental Implants & Surgery',
    badge: 'Specialist Care',
    title: 'Jaw Joint Treatment (TMJ)',
    description: 'Non-surgical clinical therapy for TMJ jaw clicking, joint discomfort, teeth grinding (bruxism), and bite muscular strain.',
    features: ['Custom Night Splints', 'TMJ Relief', 'Bite Alignment'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/explore_images/dental-team-reviewing-scans-compressed.webp`,
    objectPosition: 'center'
  },
  {
    id: 'whitening',
    number: '10',
    category: 'Cosmetic & Alignment',
    badge: 'Cosmetic Dentistry',
    title: 'Teeth Whitening',
    description: 'Clinical enamel-safe laser and LED brightening that safely lifts deep stains by up to 8 shades in a single 45-minute sitting.',
    features: ['Up to 8 Shades Whiter', 'Enamel-Safe', 'Instant 1-Hour'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/services/cosmetic-dentistry.webp`,
    objectPosition: 'center'
  },
  {
    id: 'braces',
    number: '11',
    category: 'Cosmetic & Alignment',
    badge: 'Orthodontics',
    title: 'Alignment of Teeth (Braces & Clear Aligners)',
    description: 'Virtually invisible clear aligners and modern ceramic braces to gently guide crowded or misaligned teeth into perfect balance.',
    features: ['Clear Aligners', 'Ceramic Brackets', 'Digital iTero Scan'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/services/orthodontics.webp`,
    objectPosition: 'center'
  },
  {
    id: 'scaling',
    number: '12',
    category: 'Gum & Preventive Care',
    badge: 'Preventive Care',
    title: 'Ultrasonic Scaling (Teeth Cleaning)',
    description: 'High-frequency ultrasonic vibration and air-polishing to remove plaque, stubborn calculus, and surface stains for fresh breath.',
    features: ['Gentle Ultrasonic', 'Tartar Defense', 'Air-Flow Polish'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/Preventive & Pediatric Care.jpg`,
    objectPosition: 'center 30%'
  },
  {
    id: 'digital-impressions',
    number: '13',
    category: 'Restorative & Crowns',
    badge: 'Digital Dentistry',
    title: '3D Digital Impressions & Intraoral Scanning',
    description: 'Say goodbye to uncomfortable putty trays. Our high-resolution 3D intraoral scanner maps your entire bite digitally in seconds with micron precision.',
    features: ['Zero Mess or Gagging', 'Real-time 3D Preview', 'Fast Custom Prosthetics'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/explore_images/intraoral-scanning-compressed.webp`,
    objectPosition: 'center'
  },
  {
    id: 'jaw-fractures',
    number: '14',
    category: 'Dental Implants & Surgery',
    badge: 'Maxillofacial Surgery',
    title: 'Jaw Fractures & Management',
    description: 'Emergency and planned clinical management of mandible and maxilla fractures, jaw trauma stabilization, and bite realignment by maxillofacial experts.',
    features: ['Trauma Management', 'Bite Realignment', 'Mini-Plate Fixation'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/images/fona-opg-xray.png`,
    objectPosition: 'center 35%'
  },
  {
    id: 'flap-surgery',
    number: '15',
    category: 'Gum & Preventive Care',
    badge: 'Periodontal Surgery',
    title: 'Periodontal Flap Surgery',
    description: 'Advanced micro-surgical gum procedure to cleanse deep tartar pockets, arrest persistent bone loss, and stimulate tissue regeneration with biocompatible grafts.',
    features: ['Pocket Elimination', 'Bone Regeneration', 'Stabilizes Loose Teeth'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/Periodontics & Laser Gum Care.jpg`,
    objectPosition: 'center 20%'
  },
  {
    id: 'dental-fillings',
    number: '16',
    category: 'Restorative & Crowns',
    badge: 'Restorative Care',
    title: 'Dental Fillings & Restorations (GIC, Composite & Modern Types)',
    description: 'Long-lasting cavity restorations using 4 modern filling varieties: Fluoride-releasing GIC (Glass Ionomer Cement), Tooth-Colored Composites, Inlays/Onlays, and Alignment sealing.',
    features: ['GIC (Glass Ionomer) Fillings', 'Aesthetic Composites', 'Inlays & Onlays', 'Cavity Shields'],
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/Microscopic Endodontics.jpg`,
    objectPosition: 'center 25%'
  }
];

const categories = [
  'All Treatments',
  'Restorative & Crowns',
  'Dental Implants & Surgery',
  'Gum & Preventive Care',
  'Cosmetic & Alignment'
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
        treatment.badge.toLowerCase().includes(q) ||
        treatment.features.some((f) => f.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getWhatsAppUrl = (treatmentTitle) => {
    const text = `Hello Ma Dental Clinic, I would like to enquire about ${treatmentTitle}.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

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
        {/* Hero Section with Clinical Assurances */}
        <section className="treatments-hero">
          <div className="hero-kicker-row">
            <span className="section-kicker">✦ Comprehensive Clinical Care</span>
            <span className="hero-patient-count">{treatmentsData.length} Specialized Treatments</span>
          </div>

          <div className="hero-row">
            <div className="hero-main-copy">
              <h1>Advanced Dental Treatments &amp; Specialized Care</h1>
              <p>
                Experience world-class dental expertise tailored to your comfort. From painless root canals and guided dental implants to ceramic crowns and laser gum therapy, our specialized MDS doctors ensure long-lasting oral health and confident smiles.
              </p>
            </div>

            {/* Clinical Trust Strip Badges */}
            <div className="hero-trust-cards">
              <div className="trust-card-mini">
                <span className="trust-mini-icon">🛡️</span>
                <div>
                  <strong>Class-B Sterilization</strong>
                  <small>100% Hospital Protocol</small>
                </div>
              </div>
              <div className="trust-card-mini">
                <span className="trust-mini-icon">🔬</span>
                <div>
                  <strong>3D Digital CBCT</strong>
                  <small>Sub-mm Precision</small>
                </div>
              </div>
              <div className="trust-card-mini">
                <span className="trust-mini-icon">👨‍⚕️</span>
                <div>
                  <strong>MDS Specialists</strong>
                  <small>Multi-Discipline Team</small>
                </div>
              </div>
              <div className="trust-card-mini">
                <span className="trust-mini-icon">🕊️</span>
                <div>
                  <strong>Painless Protocol</strong>
                  <small>Gentle Dental Care</small>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Search & Category Filter Controls */}
          <div className="treatments-controls-card">
            <div className="treatment-search-box">
              <span className="search-icon" aria-hidden="true">🔍</span>
              <input
                type="text"
                placeholder="Search treatments (e.g., Root Canal, Implants, Crowns, Braces, Laser...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search treatments"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="category-bar">
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
                    className={`filter ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category} <span className="filter-count">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Dynamic Status Row */}
        <div className="treatments-status-row">
          <span>
            Showing <strong>{filteredTreatments.length}</strong> of {treatmentsData.length} specialized dental treatments
          </span>
          {(selectedCategory !== 'All Treatments' || searchQuery) && (
            <button
              type="button"
              className="reset-filters-btn"
              onClick={() => {
                setSelectedCategory('All Treatments');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Treatments Grid: Edge-to-Edge Aligned Cards */}
        <section className="treatment-grid" aria-label="Dental treatments catalogue">
          {filteredTreatments.length > 0 ? (
            filteredTreatments.map((card) => (
              <article className="treatment-card" key={card.id}>
                {/* Photo Header: Full-width Edge-to-Edge Aligned */}
                <div className="treatment-image-wrap">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    style={{ objectPosition: card.objectPosition || 'center' }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `${process.env.PUBLIC_URL || ''}/Assets/services/cosmetic-dentistry.webp`;
                    }}
                  />
                  <div className="treatment-image-overlay" />
                  <span className="card-badge-pill">{card.badge}</span>
                  <span className="card-index-pill">#{card.number}</span>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <div className="card-category-sub">{card.category}</div>
                  <h3 className="treatment-card-title">{card.title}</h3>
                  <p className="treatment-card-desc">{card.description}</p>

                  {/* Inline Horizontal Chips */}
                  <div className="treatment-chips-row">
                    {card.features.map((feature) => (
                      <span key={feature} className="treatment-mini-chip">
                        <span className="chip-check" aria-hidden="true">✓</span>
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Compact Side-by-Side Action Footer */}
                  <div className="card-footer">
                    <Link to="/book-appointment" className="treatment-book-btn">
                      Book Consultation <span aria-hidden="true">&rarr;</span>
                    </Link>
                    <a
                      href={getWhatsAppUrl(card.title)}
                      target="_blank"
                      rel="noreferrer"
                      className="treatment-wa-btn"
                      title={`WhatsApp enquiry for ${card.title}`}
                    >
                      <span className="wa-icon" aria-hidden="true">💬</span> WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="no-treatments-found">
              <div className="no-results-icon" aria-hidden="true">🔍</div>
              <h3>No treatments matched your search</h3>
              <p>We could not find any treatment matching "{searchQuery}". Try a different keyword or reset filters.</p>
              <button
                type="button"
                className="reset-search-btn"
                onClick={() => {
                  setSelectedCategory('All Treatments');
                  setSearchQuery('');
                }}
              >
                Show All 12 Treatments
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
              href="https://wa.me/917799234108?text=Hello%20Doctor%2C%20I%20would%20like%20to%20consult%20regarding%20dental%20treatment."
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
