import './index.css';
import { Link } from 'react-router-dom';

const testimonials = [
	{
		quote: 'The smile preview gave me so much confidence. The result is beautiful.',
		name: 'Sailaja',
		service: 'Aesthetic Veneers',
		time: '2 wks ago',
		image: '/Assets/specialists_images/doctor-4-compressed.webp'
	},
	{
		quote: 'I had severe dental anxiety. The visit was completely painless.',
		name: 'Sekhar Reddy',
		service: 'Dental Implants',
		time: '1 mo ago',
		image: '/Assets/specialists_images/doctor-1-compressed.webp'
	},
	{
		quote: 'My crown was finished in one visit and fits perfectly.',
		name: 'Rajesh Kudala',
		service: 'Same-Day Crown',
		time: '3 wks ago',
		image: '/Assets/specialists_images/doctor-3-compressed.webp'
	},
	{
		quote: 'Every step was explained clearly, and the whole team made me feel at ease.',
		name: 'Priya Menon',
		service: 'Smile Makeover',
		time: '5 wks ago',
		image: '/Assets/specialists_images/doctor-4-compressed.webp'
	},
	{
		quote: 'The staff were wonderful with my son. He left proud of his bright smile.',
		name: 'Naveen Kumar',
		service: 'Pediatric Care',
		time: '6 days ago',
		image: '/Assets/specialists_images/doctor-1-compressed.webp'
	},
	{
		quote: 'My aligner plan was simple to follow, and I could see progress quickly.',
		name: 'Anusha P',
		service: 'Clear Aligners',
		time: '2 months ago',
		image: '/Assets/specialists_images/doctor-3-compressed.webp'
	}
];

function getCombinedTestimonials() {
	if (typeof window === 'undefined') return testimonials;
	try {
		const raw = localStorage.getItem('ma_dental_user_reviews');
		if (!raw) return testimonials;
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed) && parsed.length > 0) {
			return [...parsed, ...testimonials];
		}
	} catch (e) {
		// ignore
	}
	return testimonials;
}

function Testimonials() {
	const allTestimonials = getCombinedTestimonials();

	return (
		<section className="testimonials-section" id="reviews">
			<div className="testimonials-heading">
				<span className="testimonials-eyebrow">PATIENT EXPERIENCES</span>
				<h2>Life-Changing Smiles</h2>
				<div className="overall-rating"><strong>★★★★★</strong><b>4.9/5 from 655+ reviews</b></div>
			</div>

			<div className="testimonials-grid" role="region" aria-label="Patient reviews" tabIndex={0}>
				<div className="testimonials-track">
					{[false, true].map((isDuplicate) => (
						<div className="testimonials-group" aria-hidden={isDuplicate} key={isDuplicate ? 'duplicate' : 'original'}>
							{allTestimonials.map((testimonial, idx) => (
								<article className="testimonial-card" key={testimonial.id || `${testimonial.name}-${idx}`}>
									<div className="review-stars" aria-label="5 out of 5 stars">
										{'★'.repeat(testimonial.rating || 5)}{'☆'.repeat(Math.max(0, 5 - (testimonial.rating || 5)))}
									</div>
									<p>“{testimonial.quote}”</p>
									<div className="reviewer">
										{testimonial.image ? (
											<img src={testimonial.image} alt="" />
										) : (
											<div className="reviewer-avatar-initial">{(testimonial.name || 'P').charAt(0).toUpperCase()}</div>
										)}
										<div><strong>{testimonial.name}</strong><small>{testimonial.service} • {testimonial.time}</small></div>
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
					<Link className="secondary-cta" to="/treatments">Explore Our Specialties</Link>
				</div>
			</div>
		</section>
	);
}

export default Testimonials;