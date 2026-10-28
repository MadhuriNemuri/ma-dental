import './index.css';
import { Link } from 'react-router-dom';

const specialists = [
	{
		image: `${process.env.PUBLIC_URL || ''}/Assets/specialists_images/Background (1).webp`,
		experience: '10 Yrs Exp',
		name: 'Mounika Pothireddy',
		qualification: 'MANAGING DIRECTOR • ORAL IMPLANTOLOGIST',
		description: 'Managing Director leading clinical operations, advanced oral implantology, and smile rehabilitation with surgical excellence.',
		category: 'Oral Implantologist'
	},
	{
		image: `${process.env.PUBLIC_URL || ''}/Assets/specialists_images/Background.webp`,
		experience: '8 Yrs Exp',
		name: 'Dr. G. RISHITHA REDDY',
		qualification: 'M.D.S., • PERIODONTIST & IMPLANTITIS',
		description: 'Expert in clear aligner therapy and interceptive orthodontics for teens and adults.',
		category: 'Periodontist'
	},
	{
		image: `${process.env.PUBLIC_URL || ''}/Assets/specialists_images/Group 1000003419.webp`,
		experience: '8 Yrs Exp',
		name: 'Dr. Y. SHANTHI PRIYA',
		qualification: 'B.D.S., • COSMETIC DENTAL SURGEON',
		description: 'Making dental visits fun and anxiety-free for younger smiles while building healthy habits.',
		category: 'Dental Surgeon'
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
