import './index.css';
import { useState } from 'react';

const DEFAULT_REVIEWS = [
  {
    id: 'default-1',
    quote: 'The team made me feel informed, calm, and confident from day one.',
    name: 'Sailaja',
    service: 'Aesthetic Veneers',
    time: '2 weeks ago',
    rating: 5
  },
  {
    id: 'default-2',
    quote: 'A pain-free experience that felt more like a wellness visit.',
    name: 'Sekhar Reddy',
    service: 'Dental Implants',
    time: '1 month ago',
    rating: 5
  },
  {
    id: 'default-3',
    quote: 'My crown was placed in one visit and fits beautifully.',
    name: 'Rajesh Kudala',
    service: 'Same-Day Crown',
    time: '3 weeks ago',
    rating: 5
  },
  {
    id: 'default-4',
    quote: 'Every cost and option was explained clearly. No pressure.',
    name: 'Priya Menon',
    service: 'Smile Makeover',
    time: '5 weeks ago',
    rating: 5
  },
  {
    id: 'default-5',
    quote: 'My son was relaxed throughout the visit and left smiling.',
    name: 'Naveen Kumar',
    service: 'Pediatric Care',
    time: '6 days ago',
    rating: 5
  },
  {
    id: 'default-6',
    quote: 'The communication was transparent and warm from start to finish.',
    name: 'Anusha P',
    service: 'Clear Aligners',
    time: '2 months ago',
    rating: 5
  }
];

function getStoredUserReviews() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('ma_dental_user_reviews');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function ReviewsPage() {
  const [reviewsList, setReviewsList] = useState(() => {
    const userReviews = getStoredUserReviews();
    return [...userReviews, ...DEFAULT_REVIEWS];
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [service, setService] = useState('Dental Implants');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [quote, setQuote] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanQuote = quote.trim();
    if (!cleanName || !cleanQuote) return;

    const newReview = {
      id: `user-${Date.now()}`,
      name: cleanName,
      service: service.trim() || 'General Dentistry',
      rating: Number(rating) || 5,
      quote: cleanQuote,
      time: 'Just now'
    };

    // Prepend new review in React state so it immediately appears
    setReviewsList((current) => [newReview, ...current]);

    // Save to localStorage for persistence across reloads
    try {
      const stored = getStoredUserReviews();
      localStorage.setItem('ma_dental_user_reviews', JSON.stringify([newReview, ...stored]));
    } catch (err) {
      console.error('Failed to save review in localStorage:', err);
    }

    setSuccessMessage(`Thank you, ${cleanName}! Your review has been added.`);
    setName('');
    setQuote('');
    setRating(5);

    // Auto dismiss success alert after 6 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 6000);
  };

  return (
    <div className="reviews-shell">
      <div className="page-breadcrumb">
        <span className="crumb-icon">⌂</span>
        <span>Home</span>
        <span className="crumb-separator">/</span>
        <span>Reviews</span>
      </div>

      <main className="reviews-page">
        <section className="reviews-hero">
          <div className="reviews-hero-content">
            <span className="section-kicker">Patient experiences</span>
            <h1>Life-Changing Smiles</h1>
            <p>A few words from patients who left smiling.</p>
          </div>
          <button
            type="button"
            className="write-review-btn"
            onClick={() => {
              setIsFormOpen((prev) => !prev);
              setSuccessMessage('');
            }}
          >
            {isFormOpen ? '✕ Close Review Form' : '✍️ Write a Review'}
          </button>
        </section>

        {/* WRITE A REVIEW FORM PANEL */}
        {isFormOpen && (
          <section className="review-form-card" aria-label="Review submission form">
            <div className="form-card-header">
              <div>
                <h3>Share Your Treatment Experience</h3>
                <p>Your honest feedback helps others find the best dental care in Pileru &amp; Tirupati.</p>
              </div>
            </div>

            {successMessage && (
              <div className="review-success-alert" role="status">
                <span className="success-icon" aria-hidden="true">✓</span>
                <div>
                  <strong>{successMessage}</strong>
                  <p>Your review is now displayed at the top of the reviews below.</p>
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
                    <option value="Smile Makeover">Smile Makeover / Veneers</option>
                    <option value="Clear Aligners">Clear Aligners / Braces</option>
                    <option value="Root Canal Care">Root Canal Care</option>
                    <option value="Same-Day Crown">Same-Day Crown</option>
                    <option value="Pediatric Care">Pediatric Care</option>
                    <option value="Teeth Whitening">Teeth Whitening</option>
                    <option value="General Dentistry">General Checkup &amp; Cleaning</option>
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
                  Send Review <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </form>
          </section>
        )}

        {/* REVIEWS GRID (SHOWS ALL REVIEWS INCLUDING USER REVIEWS) */}
        <div className="reviews-grid">
          {reviewsList.map((review) => (
            <article
              className="review-card"
              key={review.id || `${review.name}-${review.time}`}
            >
              <div className="review-stars" aria-label={`${review.rating || 5} out of 5 stars`}>
                {'★'.repeat(review.rating || 5)}{'☆'.repeat(Math.max(0, 5 - (review.rating || 5)))}
              </div>
              <p>“{review.quote}”</p>
              <div className="reviewer-box">
                <div className="review-avatar">{(review.name || 'P').charAt(0).toUpperCase()}</div>
                <div>
                  <strong>{review.name}</strong>
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

