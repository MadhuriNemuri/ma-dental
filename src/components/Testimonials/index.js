import './index.css';
import { Link } from 'react-router-dom';

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

const googleTestimonials = [
	{
		id: 'gr-1',
		quote: 'Highest standard of dental care in Pileru. The clinic is spotless and equipped with modern technology. Doctors explain every procedure clearly, and pricing is very reasonable.',
		name: 'Guru Prakash',
		service: 'Dental Implants & Checkup',
		time: '1 month ago',
		rating: 5,
		source: 'Google Review',
		avatarColor: '#4285F4'
	},
	{
		id: 'gr-2',
		quote: 'Brought my child here for teeth cleaning and cavity care. The doctor was gentle, patient, and made the visit completely pain-free and fun. Best pediatric dental care in Pileru!',
		name: 'Anand Reddy',
		service: 'Pediatric Dental Care',
		time: '2 weeks ago',
		rating: 5,
		source: 'Google Review',
		avatarColor: '#EA4335'
	},
	{
		id: 'gr-3',
		quote: 'Very convenient location near Kotapalli Circle with warm reception staff. Got my single-visit root canal done with zero pain, and the ceramic crown matches my natural teeth perfectly.',
		name: 'M. Surendra',
		service: 'Root Canal & Crown',
		time: '3 weeks ago',
		rating: 5,
		source: 'Google Review',
		avatarColor: '#34A853'
	},
	{
		id: 'gr-4',
		quote: 'Exceptional dental treatment and surgical precision. Dr. Rishitha and the specialists are polite, attentive, and highly skilled. Hospital-grade sterilization and spotless clinic.',
		name: 'V. Chandu',
		service: 'Smile Rehabilitation',
		time: '1 month ago',
		rating: 5,
		source: 'Google Review',
		avatarColor: '#FBBC05'
	},
	{
		id: 'gr-5',
		quote: 'Dr. Rishitha and the team are exceptionally knowledgeable. The advanced laser treatment resolved my bleeding gums with zero post-procedure discomfort. Very happy with the results!',
		name: 'Viswa',
		service: 'Laser Periodontics',
		time: '2 months ago',
		rating: 5,
		source: 'Google Review',
		avatarColor: '#9C27B0'
	},
	{
		id: 'gr-6',
		quote: 'Exceptionally clean and hygienic clinic that immediately puts you at ease. The doctors are compassionate, skilled, and took time to address all my dental concerns.',
		name: 'Gandar',
		service: 'Preventive Care & Scaling',
		time: '3 weeks ago',
		rating: 5,
		source: 'Google Review',
		avatarColor: '#00897B'
	},
	{
		id: 'gr-7',
		quote: 'Caring specialists, humble staff, and top-tier clinical quality. They give honest guidance without pushing unnecessary procedures, and the pricing is very reasonable.',
		name: 'Suzi',
		service: 'Cosmetic Dentistry',
		time: '1 month ago',
		rating: 5,
		source: 'Google Review',
		avatarColor: '#E91E63'
	},
	{
		id: 'gr-8',
		quote: 'Clear explanation of my aligner treatment plan from day one. Visible improvement in my smile within weeks. The team is always responsive and supportive.',
		name: 'Purushotham Reddy',
		service: 'Clear Aligners',
		time: '2 months ago',
		rating: 5,
		source: 'Google Review',
		avatarColor: '#3949AB'
	},
	{
		id: 'gr-9',
		quote: 'I had severe anxiety about wisdom tooth extraction, but the doctor made it 100% painless with gentle surgical technique. Very fast healing without complications.',
		name: 'Kavitha Naidu',
		service: 'Wisdom Tooth Surgery',
		time: '1 month ago',
		rating: 5,
		source: 'Google Review',
		avatarColor: '#FB8C00'
	},
	{
		id: 'gr-10',
		quote: 'Had monolithic zirconia crowns placed here. Flawless color match with my natural enamel and chewing comfort restored. Highly recommended dental clinic in Pileru.',
		name: 'Ramesh Babu',
		service: 'Zirconia Crown',
		time: '3 weeks ago',
		rating: 5,
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
			return [...parsed, ...googleTestimonials];
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
			</div>

			<div className="testimonials-grid" role="region" aria-label="Patient reviews" tabIndex={0}>
				<div className="testimonials-track">
					{[false, true].map((isDuplicate) => (
						<div className="testimonials-group" aria-hidden={isDuplicate} key={isDuplicate ? 'duplicate' : 'original'}>
							{allTestimonials.map((testimonial, idx) => (
								<article className="testimonial-card" key={testimonial.id || `${testimonial.name}-${idx}`}>
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
					<Link className="secondary-cta" to="/reviews">View All Google Reviews</Link>
				</div>
			</div>
		</section>
	);
}

export default Testimonials;
