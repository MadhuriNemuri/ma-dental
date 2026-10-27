import './index.css';

function OurStory() {
	return (
		<section className="our-story" id="about">
			<div className="story-visual">
				<img src={`${process.env.PUBLIC_URL || ''}/Assets/images/clinic-operatory.webp`} width="480" height="360" loading="lazy" decoding="async" alt="Ma Dental Clinic Treatment Operatory Suite" />
				<div className="certified-card">
					<span className="certified-icon" aria-hidden="true">&#10003;</span>
					<span><strong>Certified Clinic</strong><small>ISO 9001:2020 Compliant</small></span>
				</div>
			</div>

			<div className="story-copy">
				<span className="story-eyebrow">OUR STORY</span>
				<h2>Modern Dentistry With a <em>Human Touch.</em></h2>
				<p>Modern tools, gentle care, and a plan that makes sense for you.</p>

				<ul className="story-benefits">
					<li><span aria-hidden="true">&#10003;</span><div><strong>Clear digital diagnosis</strong><small>See the problem and understand your options.</small></div></li>
					<li><span aria-hidden="true">&#10003;</span><div><strong>Calm, human appointments</strong><small>Comfort and communication at every step.</small></div></li>
				</ul>

				<a className="story-link" href="/about">Meet Ma Dental <span aria-hidden="true">&rarr;</span></a>
			</div>
		</section>
	);
}

export default OurStory;
