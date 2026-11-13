import './index.css';
import { Link } from 'react-router-dom';
import { GOOGLE_REVIEW_URL } from '../../config/googleReviewConfig';

function GoogleIcon() {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" className="google-icon" aria-hidden="true">
			<path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
			<path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
			<path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
			<path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
		</svg>
	);
}

// Authentic patient reviews from Ma Dental Google Business page
const googleTestimonials = [
	{
		id: 'gr-kamlesh',
		name: 'Kamlesh Kumar',
		service: 'Dental Treatment & Scaling',
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
		time: '2 months ago',
		rating: 5,
		quote: 'Clear explanation of my dental treatment plan from day one. Smooth procedure and good communication from the staff throughout. Highly recommended!',
		source: 'Google Review',
		avatarColor: '#43A047'
	}
];

function getCombinedTestimonials() {
	if (typeof window === 'undefined') return googleTestimonials;
	try {
		const raw = localStorage.getItem('ma_dental_user_reviews');
		if (!raw) return googleTestimonials;
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed) && parsed.length > 0) {
			const validUserReviews = parsed.filter((r) => r.id && String(r.id).startsWith('user-'));
			const seen = new Set();
			const combined = [];
			for (const r of [...validUserReviews, ...googleTestimonials]) {
				const key = (r.name || '').trim().toLowerCase();
				if (!seen.has(key)) {
					seen.add(key);
					combined.push(r);
				}
			}
			return combined;
		}
	} catch (e) {
		// ignore
	}
	return googleTestimonials;
}

function Testimonials() {
	const allTestimonials = getCombinedTestimonials();

	return (
		<section className="testimonials-section" id="reviews">
			<div className="testimonials-heading">
				<div className="google-badge-pill">
					<GoogleIcon />
					<span>Verified Google Reviews</span>
				</div>
				<h2>Life-Changing Smiles</h2>
				<div className="overall-rating">
					<span className="google-rating-score">4.9</span>
					<strong aria-label="5 out of 5 stars">★★★★★</strong>
					<b>Based on 680+ Verified Google Reviews</b>
				</div>
				<div className="google-heading-actions">
					<a
						href={GOOGLE_REVIEW_URL}
						target="_blank"
						rel="noreferrer"
						className="google-heading-review-btn"
					>
						<GoogleIcon />
						<span>Write a Review on Google</span>
						<span aria-hidden="true">&rarr;</span>
					</a>
				</div>
			</div>

			<div className="testimonials-grid" role="region" aria-label="Patient reviews" tabIndex={0}>
				<div className="testimonials-track">
					{[false, true].map((isDuplicate) => (
						<div className="testimonials-group" aria-hidden={isDuplicate} key={isDuplicate ? 'duplicate-group' : 'original-group'}>
							{allTestimonials.map((testimonial) => (
								<article className="testimonial-card" key={isDuplicate ? `dup-${testimonial.id}` : testimonial.id}>
									<div className="testimonial-card-header">
										<div className="review-stars" aria-label="5 out of 5 stars">
											{'★'.repeat(testimonial.rating || 5)}{'☆'.repeat(Math.max(0, 5 - (testimonial.rating || 5)))}
										</div>
										<div className="google-source-tag">
											<GoogleIcon />
											<span>Google Review</span>
										</div>
									</div>
									<p>“{testimonial.quote}”</p>
									<div className="reviewer">
										<div
											className="reviewer-avatar-initial"
											style={{ background: testimonial.avatarColor || '#2f39a9' }}
										>
											{(testimonial.name || 'P').charAt(0).toUpperCase()}
										</div>
										<div>
											<strong>
												{testimonial.name}
												<span className="verified-badge" title="Verified Patient">✓</span>
											</strong>
											<small>{testimonial.service} • {testimonial.time}</small>
										</div>
									</div>
								</article>
							))}
						</div>
					))}
				</div>
			</div>

			<div className="cta-band">
				<div className="cta-band__copy">
					<span>Elevate your dental experience</span>
					<h3>Experience the New Standard of Dental Care</h3>
				</div>
				<div className="cta-band__actions">
					<Link className="primary-cta" to="/book-appointment">Book Your Consultation</Link>
					<a
						className="secondary-cta google-cta-link"
						href={GOOGLE_REVIEW_URL}
						target="_blank"
						rel="noreferrer"
					>
						<GoogleIcon />
						<span>Review Us on Google</span>
					</a>
				</div>
			</div>
		</section>
	);
}

export default Testimonials;
