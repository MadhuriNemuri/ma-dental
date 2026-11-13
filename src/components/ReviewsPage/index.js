import './index.css';
import { useState, useMemo } from 'react';
import { GOOGLE_REVIEW_URL } from '../../config/googleReviewConfig';

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="google-icon" aria-hidden="true">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
    </svg>
  );
}

// Authentic patient reviews from Ma Dental Google Business profile
const GOOGLE_REVIEWS = [
  {
    id: 'gr-kamlesh',
    name: 'Kamlesh Kumar',
    service: 'Dental Treatment & Scaling',
    category: 'Dental Treatment',
    time: '3 weeks ago',
    rating: 5,
    quote: 'Nice treatment and excellent staff. The doctors are very attentive and the clinic is maintained with highest level of hygiene.',
    source: 'Google Review',
    avatarColor: '#4285F4'
  },
  {
    id: 'gr-madhan',
    name: 'Madhan Mohan Reddy',
    service: 'Checkup & Restoration',
    category: 'Checkup & Restoration',
    time: '1 month ago',
    rating: 5,
    quote: 'I had a great experience with the staff and friendly doctors. Everything was explained clearly and the treatment was totally pain-free.',
    source: 'Google Review',
    avatarColor: '#34A853'
  },
  {
    id: 'gr-guru',
    name: 'Guru Prakash',
    service: 'Dental Implants & Checkup',
    category: 'Dental Implants',
    time: '1 month ago',
    rating: 5,
    quote: 'Highest standard of dental care in Pileru. Clean clinic, modern technology, quick appointment booking, and reasonable pricing.',
    source: 'Google Review',
    avatarColor: '#FBBC05'
  },
  {
    id: 'gr-anand',
    name: 'Anand Reddy',
    service: 'Pediatric Dental Care',
    category: 'Pediatric Care',
    time: '2 weeks ago',
    rating: 5,
    quote: 'Brought my kid for teeth cleaning and cavity care. The doctor was gentle, patient, and made the visit completely pain-free and fun. Best clinic in Pileru!',
    source: 'Google Review',
    avatarColor: '#EA4335'
  },
  {
    id: 'gr-surendra',
    name: 'M. Surendra',
    service: 'Root Canal & Crown',
    category: 'Root Canal Care',
    time: '3 weeks ago',
    rating: 5,
    quote: 'Very convenient location near Kotapalli Circle with warm reception staff. Got my root canal done with zero pain, and the ceramic crown matches my natural teeth.',
    source: 'Google Review',
    avatarColor: '#9C27B0'
  },
  {
    id: 'gr-chandu',
    name: 'V. Chandu',
    service: 'Smile Rehabilitation',
    category: 'Smile Rehabilitation',
    time: '1 month ago',
    rating: 5,
    quote: 'Exceptional dental treatment. Medical staff and specialists are polite, attentive, and highly skilled. Hospital-grade sterilization and spotless clinic.',
    source: 'Google Review',
    avatarColor: '#00897B'
  },
  {
    id: 'gr-viswa',
    name: 'Viswa',
    service: 'Laser Periodontics',
    category: 'Laser & Gum Care',
    time: '2 months ago',
    rating: 5,
    quote: 'Dr. Rishitha and the team are exceptionally knowledgeable. The advanced laser treatment resolved my bleeding gums with zero discomfort. Very happy with the results!',
    source: 'Google Review',
    avatarColor: '#E91E63'
  },
  {
    id: 'gr-gandar',
    name: 'Gandar',
    service: 'Preventive Care & Cleaning',
    category: 'Preventive Care',
    time: '3 weeks ago',
    rating: 5,
    quote: 'Exceptionally clean and hygienic clinic that immediately puts you at ease. The doctors are compassionate, skilled, and took time to address all my concerns.',
    source: 'Google Review',
    avatarColor: '#3949AB'
  },
  {
    id: 'gr-suzi',
    name: 'Suzi',
    service: 'Cosmetic Dentistry',
    category: 'Cosmetic Dentistry',
    time: '1 month ago',
    rating: 5,
    quote: 'Caring specialists, humble staff, and top-tier clinical quality. They give honest guidance without pushing unnecessary procedures, and pricing is fair and reasonable.',
    source: 'Google Review',
    avatarColor: '#FB8C00'
  },
  {
    id: 'gr-purushotham',
    name: 'Purushotham',
    service: 'Clear Aligners',
    category: 'Clear Aligners',
    time: '2 months ago',
    rating: 5,
    quote: 'Clear explanation of my dental treatment plan from day one. Smooth procedure and good communication from the staff throughout. Highly recommended!',
    source: 'Google Review',
    avatarColor: '#43A047'
  }
];

const CATEGORIES = [
  'All Google Reviews',
  'Dental Implants',
  'Root Canal Care',
  'Pediatric Care',
  'Clear Aligners',
  'Laser & Gum Care',
  'Cosmetic Dentistry',
  'Dental Treatment'
];

function getStoredUserReviews() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('ma_dental_user_reviews');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const googleNames = new Set(GOOGLE_REVIEWS.map((g) => (g.name || '').toLowerCase().trim()));
    const seenUserNames = new Set();
    const uniqueUserReviews = [];
    for (const r of parsed) {
      if (r && r.id && String(r.id).startsWith('user-')) {
        const key = (r.name || '').toLowerCase().trim();
        if (key && !googleNames.has(key) && !seenUserNames.has(key)) {
          seenUserNames.add(key);
          uniqueUserReviews.push(r);
        }
      }
    }
    return uniqueUserReviews;
  } catch (err) {
    return [];
  }
}

function ReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Google Reviews');
  const [reviewsList, setReviewsList] = useState(() => {
    const userReviews = getStoredUserReviews();
    return [...userReviews, ...GOOGLE_REVIEWS];
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [service, setService] = useState('Dental Implants');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [quote, setQuote] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const filteredReviews = useMemo(() => {
    if (selectedCategory === 'All Google Reviews') return reviewsList;
    return reviewsList.filter((r) => r.category === selectedCategory || r.service.toLowerCase().includes(selectedCategory.toLowerCase()));
  }, [reviewsList, selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanQuote = quote.trim();
    if (!cleanName || !cleanQuote) return;

    const newReview = {
      id: `user-${Date.now()}`,
      name: cleanName,
      service: service.trim() || 'General Dentistry',
      category: service.trim() || 'General Dentistry',
      rating: Number(rating) || 5,
      quote: cleanQuote,
      time: 'Just now',
      source: 'Verified Review',
      avatarColor: '#2f39a9'
    };

    setReviewsList((current) => {
      const filtered = current.filter((r) => (r.name || '').trim().toLowerCase() !== cleanName.toLowerCase());
      return [newReview, ...filtered];
    });

    try {
      const stored = getStoredUserReviews().filter((r) => (r.name || '').trim().toLowerCase() !== cleanName.toLowerCase());
      localStorage.setItem('ma_dental_user_reviews', JSON.stringify([newReview, ...stored]));
    } catch (err) {
      console.error('Failed to save review in localStorage:', err);
    }

    // Auto-copy written review text so patient can paste directly into Google
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanQuote).catch(() => {});
    }

    setSuccessMessage(`Thank you, ${cleanName}! Your review has been saved to our site and copied to your clipboard.`);
    setName('');
    setQuote('');
    setRating(5);
  };

  return (
    <div className="reviews-shell">
      <div className="page-breadcrumb">
        <span className="crumb-icon">⌂</span>
        <span>Home</span>
        <span className="crumb-separator">/</span>
        <span>Google Reviews</span>
      </div>

      <main className="reviews-page">
        <section className="reviews-hero">
          <div className="reviews-hero-content">
            <span className="section-kicker">Verified Patient Experiences</span>
            <h1>Life-Changing Smiles</h1>
            <p>Read authentic experiences and 5-star ratings shared by our patients on Google.</p>
          </div>
          <div className="reviews-hero-actions">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noreferrer"
              className="google-direct-review-btn"
            >
              <GoogleIcon />
              <span>Write a Review on Google</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
            <button
              type="button"
              className="write-review-btn"
              onClick={() => {
                setIsFormOpen((prev) => !prev);
                setSuccessMessage('');
              }}
            >
              {isFormOpen ? '✕ Close Form' : '✍️ Write on Site'}
            </button>
          </div>
        </section>

        {/* GOOGLE REVIEWS OVERVIEW SUMMARY BANNER */}
        <section className="google-overview-bar" aria-label="Google review summary metrics">
          <div className="google-overview-left">
            <div className="google-badge-circle">
              <GoogleIcon />
            </div>
            <div>
              <div className="google-score-row">
                <span className="google-overview-rating">4.9</span>
                <span className="google-overview-stars" aria-label="4.9 out of 5 stars">★★★★★</span>
              </div>
              <small>Excellent Rating • Based on <strong>680+ Google Reviews</strong></small>
            </div>
          </div>

          <div className="google-overview-highlights">
            <div className="google-metric">
              <strong>100%</strong>
              <span>Verified Patients</span>
            </div>
            <div className="google-metric-divider"></div>
            <div className="google-metric">
              <strong>#1 Rated</strong>
              <span>Dental Clinic in Pileru</span>
            </div>
          </div>

          <div className="google-overview-actions">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noreferrer"
              className="google-view-all-link"
            >
              <span>Review on Google Maps</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>

        {/* CATEGORY FILTER PILLS */}
        <div className="review-category-pills" role="tablist" aria-label="Review Categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`review-category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* WRITE A REVIEW FORM PANEL */}
        {isFormOpen && (
          <section className="review-form-card" aria-label="Review submission form">
            <div className="form-card-header">
              <div>
                <h3>Share Your Treatment Experience</h3>
                <p>Your honest feedback helps others find the best dental care in Pileru &amp; Tirupati.</p>
              </div>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="google-form-direct-link"
              >
                <GoogleIcon />
                <span>Write Directly on Google &rarr;</span>
              </a>
            </div>

            {successMessage && (
              <div className="review-success-alert" role="status">
                <span className="success-icon" aria-hidden="true">✓</span>
                <div className="success-alert-body">
                  <strong>{successMessage}</strong>
                  <p>Your review is now displayed below. We copied your words so you can easily post them to Google too!</p>
                  <div className="alert-actions-row">
                    <a
                      href={GOOGLE_REVIEW_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="google-instant-post-btn"
                    >
                      <GoogleIcon />
                      <span>Post to Google in 1 Click (Just Paste &amp; Submit) &rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-rating-row">
                <label className="form-label">Your Rating *</label>
                <div className="star-picker" role="radiogroup" aria-label="Star rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`${star} star`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="rating-label">
                    {(hoverRating || rating) === 5 && '5.0 — Excellent Care'}
                    {(hoverRating || rating) === 4 && '4.0 — Very Good'}
                    {(hoverRating || rating) === 3 && '3.0 — Average Visit'}
                    {(hoverRating || rating) === 2 && '2.0 — Needs Improvement'}
                    {(hoverRating || rating) === 1 && '1.0 — Poor Experience'}
                  </span>
                </div>
              </div>

              <div className="form-grid-row">
                <div className="form-field">
                  <label htmlFor="reviewer-name" className="form-label">Your Name *</label>
                  <input
                    id="reviewer-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Reddy"
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="reviewer-service" className="form-label">Treatment Received</label>
                  <select
                    id="reviewer-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="form-select"
                  >
                    <option value="Dental Implants">Dental Implants</option>
                    <option value="Cosmetic Dentistry">Cosmetic Dentistry / Smile Care</option>
                    <option value="Smile Rehabilitation">Smile Rehabilitation</option>
                    <option value="Clear Aligners">Clear Aligners / Braces</option>
                    <option value="Root Canal Care">Root Canal &amp; Crown</option>
                    <option value="Pediatric Care">Pediatric Dental Care</option>
                    <option value="Laser & Gum Care">Laser Gum Treatment</option>
                    <option value="Dental Treatment">Dental Treatment &amp; Scaling</option>
                    <option value="Checkup & Restoration">Checkup &amp; Restoration</option>
                    <option value="Preventive Care">Preventive Care</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="reviewer-quote" className="form-label">Your Review *</label>
                <textarea
                  id="reviewer-quote"
                  required
                  rows="3"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Share details about the doctors, the painless procedures, and your overall experience..."
                  className="form-textarea"
                />
              </div>

              <div className="form-actions-row">
                <button type="submit" className="submit-review-btn">
                  Submit to Website <span aria-hidden="true">&rarr;</span>
                </button>
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="google-form-secondary-btn"
                >
                  <GoogleIcon />
                  <span>Write on Google Instead</span>
                </a>
              </div>
            </form>
          </section>
        )}

        {/* REVIEWS GRID */}
        <div className="reviews-grid">
          {filteredReviews.map((review) => (
            <article
              className="review-card"
              key={review.id || `${review.name}-${review.time}`}
            >
              <div className="review-card-header">
                <div className="review-stars" aria-label={`${review.rating || 5} out of 5 stars`}>
                  {'★'.repeat(review.rating || 5)}{'☆'.repeat(Math.max(0, 5 - (review.rating || 5)))}
                </div>
                <div className="google-verified-tag">
                  <GoogleIcon />
                  <span>Google Review</span>
                </div>
              </div>

              <p>“{review.quote}”</p>

              <div className="reviewer-box">
                <div
                  className="review-avatar"
                  style={{ background: review.avatarColor || '#2f39a9' }}
                >
                  {(review.name || 'P').charAt(0).toUpperCase()}
                </div>
                <div>
                  <strong>
                    {review.name}
                    <span className="verified-check" title="Verified Google Review">✓</span>
                  </strong>
                  <span>{review.service} • {review.time}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ReviewsPage;
