import './index.css';
import { Link } from 'react-router-dom';

const specialists = [
	{
		image: `${process.env.PUBLIC_URL || ''}/Assets/specialists_images/Background (1).webp`,
		experience: '10 Yrs Exp',
		name: 'Mounika Pothireddy',
		qualification: 'MANAGING DIRECTOR',
		description: 'Managing Director leading strategic operations, healthcare excellence, and patient-centric clinic management across all Ma Dental centers.',
		category: 'Managing Director'
	},
	{
		image: `${process.env.PUBLIC_URL || ''}/Assets/specialists_images/Background.webp`,
		experience: '8 Yrs Exp',
		name: 'Dr. G. RISHITHA REDDY',
		qualification: 'M.D.S., • PERIODONTIST & ORAL IMPLANTOLOGIST',
		description: 'Specializing in advanced gum therapies, laser periodontics, precision dental implantology, and periodontal bone regeneration.',
		category: 'Periodontist & Oral Implantologist'
	},
	{
		image: `${process.env.PUBLIC_URL || ''}/Assets/specialists_images/Group 1000003419.webp`,
		experience: '8 Yrs Exp',
		name: 'Dr. Y. SHANTHI PRIYA',
		qualification: 'B.D.S., • COSMETIC DENTAL SURGEON',
		description: 'Specializing in smile makeovers, aesthetic tooth restorations, composite bonding, and advanced cosmetic dental surgery.',
		category: 'Cosmetic Dental Surgeon'
	}
];

function Specialists() {
	return (
		<section className="specialists-section" id="doctors">
			<div className="specialists-heading">
				<span className="specialists-eyebrow">EXPERT TEAM</span>
				<h2>Meet Our Specialists</h2>
				<p>Experienced specialists, one coordinated team.</p>
			</div>

			<div className="specialists-grid">
				{specialists.map((specialist) => (
					<article className="specialist-card" key={specialist.name}>
						<div className="specialist-image-wrap">
							<img src={specialist.image} alt={specialist.name} width="340" height="380" loading="lazy" decoding="async" />
						</div>
						<div className="specialist-content">
							<h3>{specialist.name}</h3>
							<strong>{specialist.qualification}</strong>
							<p>{specialist.description}</p>
							<div className="specialist-footer">
								<span>{specialist.category}</span>
								<Link to="/book-appointment">Book Consult <span aria-hidden="true">&rarr;</span></Link>
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}

export default Specialists;
