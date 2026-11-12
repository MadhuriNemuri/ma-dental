import { useState, useRef, useEffect } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const scrollingTreatments = [
	{
		title: 'Root Canal Treatment (RCT)',
		imageName: 'RTC',
		image: `${process.env.PUBLIC_URL || ''}/scrolling_imgs/RTC.webp`,
		category: 'Endodontics',
		badge: 'Root Canal (RCT)'
	},
	{
		title: 'Ceramic & Zirconia Crowns',
		imageName: 'Ceramic & Zirconia Crowns',
		image: `${process.env.PUBLIC_URL || ''}/scrolling_imgs/Ceramic%20%26%20Zirconia%20Crowns.webp`,
		category: 'Crowns & Bridges',
		badge: 'Aesthetic Crowns'
	},
	{
		title: 'Teeth Replacement',
		imageName: 'teethreplacement',
		image: `${process.env.PUBLIC_URL || ''}/scrolling_imgs/teethreplacement.webp`,
		category: 'Dental Implants',
		badge: 'Permanent Solution'
	},
	{
		title: 'Clear Aligners',
		imageName: 'Clear Aligners',
		image: `${process.env.PUBLIC_URL || ''}/scrolling_imgs/Clear%20Aligners.webp`,
		category: 'Orthodontics',
		badge: 'Invisible Braces'
	},
	{
		title: 'Alignment of Teeth (Braces)',
		imageName: 'Alignment of Teeth (Braces)',
		image: `${process.env.PUBLIC_URL || ''}/scrolling_imgs/Alignment%20of%20Teeth%20(Braces).webp`,
		category: 'Orthodontics',
		badge: 'Precision Braces'
	},
	{
		title: 'Extraction of Wisdom Teeth',
		imageName: 'Extraction of Wisdom Teeth',
		image: `${process.env.PUBLIC_URL || ''}/scrolling_imgs/Extraction%20of%20Wisdom%20Teeth.webp`,
		category: 'Oral Surgery',
		badge: 'Painless Extraction'
	},
	{
		title: 'Removable & BPS Dentures',
		imageName: 'Removable & BPS Dentures',
		image: `${process.env.PUBLIC_URL || ''}/scrolling_imgs/Removable%20%26%20BPS%20Dentures.webp`,
		category: 'Prosthetics',
		badge: 'Custom Fit'
	},
	{
		title: 'Laser Treatment for Gum Problems',
		imageName: 'Laser Treatment for Gum Problems',
		image: `${process.env.PUBLIC_URL || ''}/scrolling_imgs/Laser%20Treatment%20for%20Gum%20Problems.webp`,
		category: 'Periodontics',
		badge: 'Laser Therapy'
	},
	{
		title: 'Jaw Joint Treatment',
		imageName: 'Jaw Joint Treatment',
		image: `${process.env.PUBLIC_URL || ''}/scrolling_imgs/Jaw%20Joint%20Treatment.webp`,
		category: 'Oral Surgery & TMJ',
		badge: 'TMJ / TMD Care'
	},
	{
		title: 'Teeth Whitening',
		imageName: 'Teeth Whitening',
		image: `${process.env.PUBLIC_URL || ''}/scrolling_imgs/Teeth%20Whitening.webp`,
		category: 'Cosmetic Dentistry',
		badge: 'Instant Brightness'
	},
	{
		title: 'Ultrasonic Scaling',
		imageName: 'Ultrasonic Scaling',
		image: `${process.env.PUBLIC_URL || ''}/scrolling_imgs/Ultrasonic%20Scaling.webp`,
		category: 'Preventive Care',
		badge: 'Deep Cleaning'
	},
	{
		title: 'GIC Filling (Glass Ionomer)',
		imageName: 'GIC Filling (Glass Ionomer)',
		image: `${process.env.PUBLIC_URL || ''}/scrolling_imgs/GIC%20Filling%20(Glass%20Ionomer).webp`,
		category: 'Restorative Care',
		badge: 'Fluoride Bonding'
	},
	{
		title: "Special Care for Children's Teeth",
		imageName: "Special Care for Children's Teeth",
		image: `${process.env.PUBLIC_URL || ''}/scrolling_imgs/Special%20Care%20for%20Children's%20Teeth.webp`,
		category: 'Pediatric Dentistry',
		badge: 'Kids Dental Care'
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
						{[...scrollingTreatments, ...scrollingTreatments].map((treatment, index) => (
							<article className="services-ticker-card" key={`${treatment.title}-${index}`}>
								<div className="ticker-card-image-wrap">
									<img
										src={treatment.image}
										alt={treatment.title}
										width="290"
										height="185"
										loading="lazy"
										decoding="async"
									/>
									<span className="ticker-image-badge">{treatment.badge}</span>
								</div>
								<div className="ticker-card-body">
									<span className="ticker-category">{treatment.category}</span>
									<h3 className="ticker-card-title">{treatment.title}</h3>
									<Link to="/book-appointment" className="ticker-book-btn">
										Book Consult <span aria-hidden="true">&rarr;</span>
									</Link>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}

export default Hero;
