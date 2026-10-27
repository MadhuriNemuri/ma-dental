import { useState, useRef, useEffect } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const dentalServices = [
	{
		category: 'Crowns & Prosthetics',
		title: 'Veneers',
		description: 'Ultra-thin, custom porcelain laminates crafted with lifelike translucency and lasting strength.',
		badge: 'Cosmetic'
	},
	{
		category: 'Crowns & Prosthetics',
		title: 'Onlays',
		description: 'Custom-milled partial restorations preserving natural tooth structure and restoring chewing function.',
		badge: 'Restorative'
	},
	{
		category: 'Crowns & Prosthetics',
		title: 'Inlays',
		description: 'Precision-crafted laboratory fillings offering superior fit, durability, and cavity protection.',
		badge: 'Restorative'
	},
	{
		category: 'Crowns & Prosthetics',
		title: 'Metal Ceramic Crown',
		description: 'Durable, hybrid aesthetic crowns offering high bite strength with natural tooth shading.',
		badge: 'Prosthetics'
	},
	{
		category: 'Crowns & Prosthetics',
		title: 'Zirconia Crown',
		description: 'Premium metal-free monolithic zirconia crowns with diamond-grade strength and aesthetics.',
		badge: 'Premium'
	},
	{
		category: 'Crowns & Prosthetics',
		title: 'Complete Denture',
		description: 'Custom-engineered full arches restoring facial contour, natural smile, and chewing confidence.',
		badge: 'Prosthetics'
	},
	{
		category: 'Implants & Surgery',
		title: 'Dental Implant',
		description: 'Permanent titanium root replacements that preserve jawbone integrity and look completely natural.',
		badge: 'Permanent'
	},
	{
		category: 'Fillings & Restorations',
		title: 'GIC Filling',
		description: 'Fluoride-releasing glass ionomer restorations that bond chemically to protect against decay.',
		badge: 'Restorative'
	},
	{
		category: 'Fillings & Restorations',
		title: 'Composite Filling',
		description: 'Color-matched nano-hybrid resin fillings that seamlessly blend with your natural tooth enamel.',
		badge: 'Restorative'
	},
	{
		category: 'Crowns & Prosthetics',
		title: 'Crown Re-Cementation',
		description: 'Precision clinical re-bonding of dislodged or loosened crowns with high-strength cement.',
		badge: 'Urgent Care'
	},
	{
		category: 'Endodontics',
		title: 'Root Canal Treatment',
		description: 'Single-visit rotary endodontic therapy relieving pain and saving deeply infected natural teeth.',
		badge: 'Painless RCT'
	},
	{
		category: 'Cosmetic Dentistry',
		title: 'Teeth Whitening',
		description: 'In-clinic advanced LED laser whitening brightening teeth up to 8 shades in just 45 minutes.',
		badge: 'Instant Glow'
	},
	{
		category: 'Orthodontics',
		title: 'Clear Aligners',
		description: 'Virtually invisible, removable orthodontic aligners gently straightening teeth without metal wires.',
		badge: 'Discreet'
	},
	{
		category: 'Preventive Care',
		title: 'Scaling & Polishing',
		description: 'Ultrasonic deep cleaning removing hardened calculus, plaque, and stubborn tobacco or tea stains.',
		badge: 'Preventive'
	},
	{
		category: 'Oral Surgery',
		title: 'Wisdom Tooth Care',
		description: 'Gentle, painless removal of impacted third molars with modern atraumatic surgical techniques.',
		badge: 'Surgical'
	},
	{
		category: 'Pediatric Dentistry',
		title: 'Kids Dental Care',
		description: 'Child-friendly preventive fluoride, cavity sealants, and gentle dental checkups for youngsters.',
		badge: 'Gentle Care'
	},
	{
		category: 'Periodontics',
		title: 'Gum Therapy',
		description: 'Deep ultrasonic root planing and laser gum treatment stopping bleeding and gum recession.',
		badge: 'Gum Health'
	},
	{
		category: 'Cosmetic Dentistry',
		title: 'Smile Makeover',
		description: 'Comprehensive digital smile design harmonizing teeth alignment, shape, proportions, and brightness.',
		badge: 'Full Aesthetic'
	}
];

function Hero() {
	const videoRef = useRef(null);
	const [isMuted, setIsMuted] = useState(true);
	const [isPlaying, setIsPlaying] = useState(true);

	useEffect(() => {
		// Defer 98MB video buffering to leave 100% network and CPU free for LCP paint
		const timer = setTimeout(() => {
			if (videoRef.current) {
				videoRef.current.play().catch(() => {});
			}
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	const toggleSound = (e) => {
		if (e) e.stopPropagation();
		if (videoRef.current) {
			const nextMuted = !videoRef.current.muted;
			videoRef.current.muted = nextMuted;
			setIsMuted(nextMuted);
		}
	};

	const togglePlay = (e) => {
		if (e) e.stopPropagation();
		if (videoRef.current) {
			if (videoRef.current.paused) {
				videoRef.current.play();
				setIsPlaying(true);
			} else {
				videoRef.current.pause();
				setIsPlaying(false);
			}
		}
	};

	return (
		<main id="home">
			<section className="hero-section">
				<div className="hero-copy">
					<span className="eyebrow"><span aria-hidden="true">&#10024;</span> Premier Dental Care Provider</span>
					<h1>Your Smile<br />Deserves<br /><em>Expert Care.</em></h1>
					<p>Advanced dental treatments, experienced specialists, and compassionate care &mdash; all under one roof at Ma Dental. We prioritize your comfort and health with state-of-the-art precision.</p>
					<div className="hero-actions">
						<Link className="primary-button" to="/book-appointment">Book an Appointment <span aria-hidden="true">&rarr;</span></Link>
						<a className="secondary-button" href="https://wa.me/917799234108?text=Hello%20Ma%20Dental%2C%20I%20would%20like%20to%20connect%20with%20your%20team." target="_blank" rel="noreferrer"><span aria-hidden="true">&#9675;</span> Chat on WhatsApp</a>
					</div>
					<div className="trust-row">
						<div className="patient-avatars" aria-hidden="true"><span>R</span><span>A</span><span>M</span><span>S</span></div>
						<div><div className="rating"><strong>★★★★★</strong> <b>4.9/5</b></div><small>Trusted by 10,000+ Happy patients</small></div>
					</div>
				</div>

				<div className="hero-visual" onClick={togglePlay}>
					<video
						ref={videoRef}
						className="hero-video"
						preload="metadata"
						loop
						muted
						playsInline
						onClick={togglePlay}
						onPlay={() => setIsPlaying(true)}
						onPause={() => setIsPlaying(false)}
						poster={`${process.env.PUBLIC_URL || ''}/Assets/hero_section_image/hero_section_compress_image.webp`}
						aria-label="Ma Dental Clinic Tour Video"
					>
						<source src={`${process.env.PUBLIC_URL || ''}/Videos/ma-dental-reel-1.mp4`} type="video/mp4" />
						<source src={`${process.env.PUBLIC_URL || ''}/Videos/MA%20DENTAL%20REEL%201.mp4`} type="video/mp4" />
						Your browser does not support the video tag.
					</video>

					<div className="hero-video-controls">
						<button
							type="button"
							className="hero-video-ctrl-btn"
							onClick={togglePlay}
							aria-label={isPlaying ? "Pause video" : "Play video"}
							title={isPlaying ? "Pause video" : "Play video"}
						>
							{isPlaying ? (
								<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
									<rect x="5" y="3" width="4" height="18" rx="1" />
									<rect x="15" y="3" width="4" height="18" rx="1" />
								</svg>
							) : (
								<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
									<path d="M6 4.5v15a1 1 0 0 0 1.52.86l12.5-7.5a1 1 0 0 0 0-1.72l-12.5-7.5A1 1 0 0 0 6 4.5z" />
								</svg>
							)}
						</button>
						<button
							type="button"
							className="hero-video-ctrl-btn"
							onClick={toggleSound}
							aria-label={isMuted ? "Unmute video" : "Mute video"}
							title={isMuted ? "Unmute sound" : "Mute sound"}
						>
							{isMuted ? (
								<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"></polygon>
									<line x1="23" y1="9" x2="17" y2="15"></line>
									<line x1="17" y1="9" x2="23" y2="15"></line>
								</svg>
							) : (
								<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"></polygon>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
								</svg>
							)}
						</button>
					</div>
				</div>
			</section>

			<section className="services-ticker-section" aria-label="Featured Dental Treatments">
				<div className="services-ticker-header">
					<div className="ticker-stats-strip">
						<span><strong>10+</strong> Years Experience</span>
						<span className="stat-separator">•</span>
						<span><strong>10k+</strong> Happy Patients</span>
						<span className="stat-separator">•</span>
						<span><strong>18+</strong> Dental Procedures</span>
						<span className="stat-separator">•</span>
						<span><strong>5+</strong> Certified Specialists</span>
					</div>
					<span className="ticker-eyebrow">
						<span aria-hidden="true">&#10022;</span> Comprehensive Dental Care
					</span>
					<h2>Specialized Dental Treatments &amp; Procedures</h2>
					<p>Explore our wide range of restorative, cosmetic, and surgical dental services &mdash; performed with clinical precision.</p>
				</div>

				<div className="services-marquee" tabIndex="0" aria-label="Continuously scrolling dental services list">
					<div className="services-marquee-track">
						{[...dentalServices, ...dentalServices].map((service, index) => (
							<article className="services-ticker-card" key={`${service.title}-${index}`}>
								<div className="ticker-card-top">
									<span className="ticker-category">{service.category}</span>
									<span className="ticker-badge">{service.badge}</span>
								</div>
								<h3>{service.title}</h3>
								<p>{service.description}</p>
								<Link to="/book-appointment" className="ticker-book-btn">
									Book Now <span aria-hidden="true">&rarr;</span>
								</Link>
							</article>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}

export default Hero;
