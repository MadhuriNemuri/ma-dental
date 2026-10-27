import { useState } from 'react';
import './index.css';

const exploreItems = [
	{
		image: `${process.env.PUBLIC_URL || ''}/Assets/images/fona-opg-xray.webp`,
		badge: '3D Radiography',
		title: 'FONA 3D Panoramic OPG',
		description: 'Full-mouth digital panoramic radiography for accurate implant planning, wisdom tooth assessment, and bone diagnostics.',
		highlight: 'High-definition 3D panoramic scan',
		alt: 'FONA panoramic dental x-ray unit at Ma Dental'
	},
	{
		image: `${process.env.PUBLIC_URL || ''}/Assets/images/digital-rvg-sensor.webp`,
		badge: 'Digital Sensor',
		title: 'Digital RVG Diagnostic Suite',
		description: 'Chairside digital sensor imaging providing instant, ultra-low radiation tooth visualization directly on screen.',
		highlight: 'Instant chairside digital imaging',
		alt: 'Chairside digital dental radiovisiography workstation'
	},
	{
		image: `${process.env.PUBLIC_URL || ''}/Assets/images/sterilization-autoclave.webp`,
		badge: 'Hospital Grade',
		title: 'Class-B Vacuum Sterilization',
		description: 'Hospital-grade autoclaving and vacuum sealing protocols ensuring 100% infection-free instrument safety for every patient.',
		highlight: '100% sterile vacuum protocol',
		alt: 'Class-B dental autoclave sterilization unit'
	},
	{
		image: `${process.env.PUBLIC_URL || ''}/Assets/images/clinic-operatory.webp`,
		badge: 'Treatment Suite',
		title: 'Modern Clinical Operatory',
		description: 'Ergonomic dual-chair treatment suites designed with calming ambient lighting, sterile surrounds, and advanced patient comfort.',
		highlight: 'Ergonomic dual-chair treatment suite',
		alt: 'Ma Dental modern treatment operatory'
	},
	{
		image: `${process.env.PUBLIC_URL || ''}/Assets/images/dental-facilities.webp`,
		badge: 'Advanced Facilities',
		title: 'Advanced Dental Infrastructure',
		description: 'Modern operatory suites furnished with multi-functional dental chairs, shadowless surgical lighting, and serene patient surrounds.',
		highlight: 'Multi-functional operatory setup',
		alt: 'Advanced dental infrastructure and treatment rooms at Ma Dental'
	},
	{
		image: `${process.env.PUBLIC_URL || ''}/Assets/images/implant-physiodispenser.webp`,
		badge: 'Surgical Implantology',
		title: 'Surgical Physiodispenser & Implant Kit',
		description: 'Computer-controlled surgical motor with sterile saline irrigation and precision drill kit for pain-free, predictable dental implants.',
		highlight: 'Computer-controlled implant torque',
		alt: 'Marathon ICU-20 surgical implant physiodispenser and kit at Ma Dental'
	}
];

function Explore() {
	const [selectedItem, setSelectedItem] = useState(null);

	return (
		<section className="explore-section" id="explore">
			<div className="explore-container">
				<div className="explore-header">
					<div className="explore-header-left">
						<span className="explore-eyebrow">CLINICAL INFRASTRUCTURE &amp; TECHNOLOGY</span>
						<h2>Driven By <em>Innovation.</em></h2>
						<p>State-of-the-art diagnostic imaging, hospital-grade sterile protocols, and modern operatories engineered for uncompromised patient safety and comfort.</p>
					</div>
					<div className="explore-header-right">
						<a className="explore-button" href="/about">Tour Our Clinic <span aria-hidden="true">&rarr;</span></a>
					</div>
				</div>

				<div className="explore-grid">
					{exploreItems.map((item) => (
						<article 
							className="explore-card" 
							key={item.title}
							onClick={() => setSelectedItem(item)}
						>
							<div className="explore-image-box">
								<img src={item.image} alt={item.alt} width="380" height="240" loading="lazy" decoding="async" />
								<span className="explore-badge">{item.badge}</span>
								<span className="explore-zoom-hint" title="Click to view full photo">🔍 Full View</span>
							</div>
							<div className="explore-content">
								<h3>{item.title}</h3>
								<p>{item.description}</p>
								<div className="explore-highlight">
									<span aria-hidden="true">&#10003;</span>
									<span>{item.highlight}</span>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>

			{selectedItem && (
				<div className="explore-modal-backdrop" onClick={() => setSelectedItem(null)}>
					<div className="explore-modal-content" onClick={(e) => e.stopPropagation()}>
						<button 
							type="button" 
							className="explore-modal-close" 
							onClick={() => setSelectedItem(null)} 
							aria-label="Close modal"
						>
							&times;
						</button>
						<div className="explore-modal-image-wrap">
							<img src={selectedItem.image} alt={selectedItem.alt} />
						</div>
						<div className="explore-modal-caption">
							<span className="explore-badge modal-badge">{selectedItem.badge}</span>
							<h3>{selectedItem.title}</h3>
							<p>{selectedItem.description}</p>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

export default Explore;
