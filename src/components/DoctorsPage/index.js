import './index.css';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  'All Specialists',
  'Oral Surgery',
  'Orthodontics',
  'Periodontics',
  'Pediatric',
  'Cosmetic'
];

const doctors = [
  {
    name: 'Dr. B. Bhanu Prakash Reddy',
    degree: 'M.D.S. • Cosmetic Dental Surgeon',
    description: 'Specializing in complex full-mouth rehabilitation, bone grafting, and advanced implant procedures with gentle surgical techniques.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/dr-bhanu-enhanced.png`,
    category: 'Cosmetic',
    categories: ['Cosmetic', 'Oral Surgery'],
    years: '14 Yrs Exp',
    specialty: 'Cosmetic Dental Surgeon',
    rating: '4.97',
    reviewCount: '312',
    languages: ['English', 'Telugu'],
    location: 'Mon, Wed, Fri'
  },
  {
    name: 'Dr. M. Hemadri',
    degree: 'M.D.S. • Orthodontist',
    description: 'Expert in clear aligner therapy (Invisible Diamond Provider) and interceptive orthodontics tailored for teens and adult smile enhancements.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/doctor-3-enhanced.png`,
    category: 'Orthodontics',
    categories: ['Orthodontics', 'Pediatric'],
    years: '11 Yrs Exp',
    specialty: 'Orthodontics',
    rating: '5.0',
    reviewCount: '428',
    languages: ['English', 'Telugu'],
    location: 'Tue, Thu, Sat'
  },
  {
    name: 'Dr. G. Rishitha Reddy',
    degree: 'M.D.S. • Periodontist & Implantologist',
    description: 'Internationally recognized for porcelain veneers, smile makeovers, and minimally invasive aesthetic enhancements that look naturally radiant.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/doctor-2-enhanced.png`,
    category: 'Periodontics',
    categories: ['Periodontics', 'Cosmetic'],
    years: '12 Yrs Exp',
    specialty: 'Periodontics & Implantology',
    rating: '4.98',
    reviewCount: '388',
    languages: ['English', 'Telugu'],
    location: 'Mon, Wed, Thu'
  },
  {
    name: 'Dr. Y. Shanti Priya',
    degree: 'B.D.S. • Cosmetic Dental Surgeon',
    description: 'Focused on gentle preventive dentistry, painless restorations, and making dental visits fun and anxiety-free for all ages.',
    image: `${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/doctor-1-enhanced.png`,
    category: 'Pediatric',
    categories: ['Pediatric', 'Endodontics', 'Cosmetic'],
    years: '8 Yrs Exp',
    specialty: 'Dental Surgeon & Pediatric Care',
    rating: '4.96',
    reviewCount: '265',
    languages: ['English', 'Telugu'],
    location: 'Tue, Wed, Fri'
  }
];

const testimonials = [
  {
    quote: 'Dr. Michael Evans handled my complex implant rehabilitation with such astonishing calmness. I had severe dental anxiety from childhood, but his team made every surgical phase 100% painless.',
    author: 'Marcus R.',
    role: 'Full-Mouth Implant Patient',
    time: '2 weeks ago',
    initials: 'MR'
  },
  {
    quote: 'Dr. Sarah Chen’s digital 3D planning for my Invisalign was mind-blowing. In just 9 months, my severe crowding was entirely corrected with zero discomfort.',
    author: 'Helena Lindqvist',
    role: 'Invisalign Diamond Case',
    time: '1 month ago',
    initials: 'HL'
  },
  {
    quote: 'Dr. David Kim designed custom porcelain veneers that look completely natural. People tell me I look revitalized, not artificially capped.',
    author: 'Julian Thorne',
    role: 'Cosmetic Smile Design',
    time: '3 weeks ago',
    initials: 'JT'
  }
];

function DoctorsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Specialists');
  const [searchValue, setSearchValue] = useState('');

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesCategory =
        selectedCategory === 'All Specialists' ||
        doctor.category === selectedCategory ||
        (doctor.categories && doctor.categories.includes(selectedCategory));
      const haystack = `${doctor.name} ${doctor.degree} ${doctor.specialty} ${doctor.category}`.toLowerCase();
      const matchesSearch = haystack.includes(searchValue.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchValue, selectedCategory]);

  const handleAskConcierge = () => {
    if (typeof window !== 'undefined') {
      if (typeof window.openDentalChatbot === 'function') {
        window.openDentalChatbot({
          prompt: 'Not sure which specialist I need',
          reply: 'Hello! I can guide you to the right dental specialist. Are you looking for Dental Implants, Braces / Aligners, Root Canal Treatment, Gum Therapy, or Cosmetic Care?'
        });
      } else {
        window.dispatchEvent(
          new CustomEvent('open-dental-chatbot', {
            detail: {
              prompt: 'Not sure which specialist I need',
              reply: 'Hello! I can guide you to the right dental specialist. Are you looking for Dental Implants, Braces / Aligners, Root Canal Treatment, Gum Therapy, or Cosmetic Care?'
            }
          })
        );
      }
    }
  };

  return (
    <div className="doctors-shell">
      <main className="doctors-page">
        <section className="doctors-header-block">
          <div className="doctors-heading-wrap">
            <span className="section-kicker">• EXPERT TEAM</span>
            <h1>Meet Our Specialists</h1>
            <p>
              Our team of highly qualified dental professionals combines years of clinical excellence
              with ongoing education to provide you with the most advanced care possible.
            </p>
          </div>

          <div className="doctors-summary-card">
            <div className="summary-item">
              <span className="summary-icon"></span>
              <div>
                <strong>100%</strong>
                <span>Board Certified</span>
              </div>
            </div>
            <div className="summary-item">
              <span className="summary-icon"></span>
              <div>
                <strong>60+ Yrs</strong>
                <span>Combined Practice</span>
              </div>
            </div>
          </div>
        </section>

        <section className="doctors-controls" aria-label="Doctor search and filter controls">
          <label className="search-box" htmlFor="doctor-search">
            <span className="search-icon">⌕</span>
            <input
              id="doctor-search"
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search doctor by name or specialty..."
            />
          </label>

          <div className="filter-select" role="button" tabIndex={0} aria-label="Specialty filter">
            <span className="select-icon">▣</span>
            <span>All Medical Sanatories</span>
            <span className="caret">▾</span>
          </div>
        </section>

        <div className="category-pills" aria-label="Doctor categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? 'category-pill active' : 'category-pill'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <section className="doctors-grid" aria-live="polite">
          {filteredDoctors.map((doctor) => (
            <article className="doctor-card" key={doctor.name}>
              <div className="doctor-card__image">
                <img src={doctor.image} alt={doctor.name} />
                <span className="doctor-card__rating">
                  <span className="rating-star">★</span> {doctor.rating} ({doctor.reviewCount})
                </span>
              </div>

              <div className="doctor-card__body">
                <div className="doctor-card__tag-row">
                  <span className="doctor-card__focus">{doctor.specialty}</span>
                  <span className="doctor-card__exp">{doctor.years}</span>
                </div>
                <h3>{doctor.name}</h3>
                <p className="doctor-degree">{doctor.degree}</p>
                <p className="doctor-description">{doctor.description}</p>

                <div className="doctor-meta">
                  <span>🌐 {doctor.languages[0]}</span>
                  <span>📍 {doctor.location}</span>
                </div>

                <Link to="/book-appointment" className="book-btn">
                  Book Consultation <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="reviews-panel">
          <div className="reviews-header">
            <div className="reviews-title-wrap">
              <span className="section-kicker">• REAL STORIES, REAL RELIEF</span>
              <h2>Life-Changing Smiles</h2>
              <p>Discover why our patients consistently entrust our clinical team with their most intricate treatments.</p>
            </div>

            <div className="rating-summary">
              <div className="rating-score">4.9</div>
              <div className="rating-text">
                <span className="stars">★★★★★</span>
                <span>2,000+ Verified Patients</span>
                <span>Google &amp; Healthcare Top Tier</span>
              </div>
            </div>
          </div>

          <div className="review-cards">
            {testimonials.map((testimonial) => (
              <article className="review-card" key={testimonial.author}>
                <div className="review-topline">
                  <span className="stars">★★★★★</span>
                  <span className="review-time">{testimonial.time}</span>
                </div>

                <p className="review-quote">“{testimonial.quote}”</p>

                <div className="review-author-row">
                  <div className="avatar">{testimonial.initials}</div>
                  <div>
                    <strong>{testimonial.author}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-banner">
          <div className="cta-copy">
            <span className="section-kicker light">• UNCERTAIN OF PROCEDURE?</span>
            <h3>Not sure which specialist you need?</h3>
          </div>

          <div className="cta-actions">
            <Link to="/book-appointment" className="primary-cta">Book Consultation</Link>
            <button type="button" className="secondary-cta" onClick={handleAskConcierge}>Ask Concierge</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DoctorsPage;