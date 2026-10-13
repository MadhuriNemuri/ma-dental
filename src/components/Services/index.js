import './index.css';
import { Link } from 'react-router-dom';

const services = [
	{
		image: '/Assets/services/cosmetic-dentistry.webp',
		alt: 'Cosmetic dentistry consultation',
		badge: 'TOP RATED',
		title: 'Cosmetic Dentistry',
		description: 'Veneers, teeth whitening, and composite bonding crafted for aesthetic perfection.',
		points: [],
		link: 'Explore Options'
	},
	{
		image: '/Assets/services/dental-implants.webp',
		alt: 'Dental implant treatment',
		title: 'Dental Implants',
		description: 'Permanent, natural-looking tooth restoration using grade-4 titanium anchors.',
		points: ['Single & Multi-teeth', 'All-on-4 / All-on-6'],
		link: 'Book Consultation'
	},
	{
		image: '/Assets/services/orthodontics.webp',
		alt: 'Orthodontic treatment',
		title: 'Orthodontics',
		description: 'Invisible aligners and precision brackets tailored for teen and adult corrections.',
		points: ['Clear Aligners', 'Metal & Ceramic Braces'],
		link: 'Discover Aligners'
	},
	{
		image: '/Assets/services/pediatric-care.webp',
		alt: 'Pediatric dental care',
		title: 'Pediatric Care',
		description: 'Warm, anxiety-free dentistry for children with preventive fluoride & sealants.',
		points: ['Gentle cavity defense', 'Child behavioral comfort'],
		link: 'Learn More'
	}
];

function Services() {
	return (
		<section className="services-section" id="treatments">
			<div className="services-heading">
				<div>
					<span className="services-eyebrow">SPECIALIZED SERVICES</span>
					<h2>Precision Specialties</h2>
					<p>Focused care for healthier teeth and confident smiles.</p>
				</div>
				<Link className="all-treatments" to="/treatments">View All Treatments <span aria-hidden="true">&rarr;</span></Link>
			</div>

			<div className="services-grid">
				{services.slice(0, 3).map((service, index) => (
					<article className={`service-card${index === 0 ? ' featured-service' : ''}`} key={service.title}>
						<div className="service-image-wrap">
							<img className="service-card-image" src={service.image} alt={service.alt} />
							{service.badge && <span className="top-rated">{service.badge}</span>}
						</div>
						<div className="service-card-content">
							<h3>{service.title}</h3>
							<p>{service.description}</p>
							{service.points.length > 0 && <ul>
								{service.points.map((point) => <li key={point}>{point}</li>)}
							</ul>}
							<Link to="/book-appointment">{service.link} <span aria-hidden="true">&rarr;</span></Link>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}

export default Services;
