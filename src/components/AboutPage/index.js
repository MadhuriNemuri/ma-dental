import './index.css';
import { Link } from 'react-router-dom';

const distinctionCards = [
  {
    icon: '✦',
    eyebrow: 'Conservation First',
    title: 'Biomimetic Approach',
    text: 'We protect more of your natural smile with thoughtful, conservative treatment.',
    badge: 'Natural first'
  },
  {
    icon: '✧',
    eyebrow: 'Comfort Protocol',
    title: 'Zero-Anxiety & Pain-Managed',
    text: 'Calm rooms, gentle techniques, and a team that explains every step.',
    badge: 'Comfort always'
  },
  {
    icon: '◌',
    eyebrow: 'Predictable Engineering',
    title: 'Digital Precision',
    text: 'Digital scans help us plan clearly and create a more predictable result.',
    badge: 'Digital precision'
  },
  {
    icon: '▣',
    eyebrow: 'Patient Advocacy',
    title: 'Radical Transparency',
    text: 'Clear options, clear pricing, and no pressure to choose more than you need.',
    badge: 'No surprises'
  }
];

const careList = [
  'Digital planning for a clearer diagnosis',
  'Private rooms designed around comfort',
  'Sterile, careful, unhurried care'
];

function AboutPage() {
  return (
    <div className="about-page-shell">
      <div className="page-breadcrumb">
        <span className="crumb-icon">⌂</span>
        <span>Home</span>
        <span className="crumb-separator">›</span>
        <span>About Us &amp; Clinical Excellence</span>
      </div>

      <main className="about-page">
        <section className="about-distinction">
          <div className="distinction-header">
            <span className="section-kicker">The standard of care</span>
            <h1>The Ma Dental Distinction</h1>
            <p>Thoughtful dentistry for people who want to feel informed, comfortable, and cared for.</p>
          </div>

          <div className="protocol-pill">
            <span className="protocol-dot" />
            Standardized Clinical Protocols
          </div>
        </section>

        <section className="distinction-grid" aria-label="Clinical excellence pillars">
          {distinctionCards.map((card) => (
            <article className="distinction-card" key={card.title}>
              <div className="card-icon">{card.icon}</div>
              <span className="card-eyebrow">{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <strong>{card.badge}</strong>
            </article>
          ))}
        </section>

        <section className="technology-suite">
          <div className="technology-header">
            <span className="section-kicker">Biomedical infrastructure</span>
            <h2>State-of-the-Art Technology Suite</h2>
            <p>Modern tools, human conversations, better decisions.</p>
          </div>

          <div className="technology-grid">
            <article className="tech-card tech-card-featured">
              <div className="tech-card__meta"><span>Scan</span><span>Plan</span><span>Smile</span></div>
              <h3>See your care before it begins.</h3>
              <p>3D imaging and digital scans help our team explain what is happening and design treatment around you.</p>
            </article>
          </div>
        </section>

        <section className="sanctuary-section">
          <div className="sanctuary-copy">
            <span className="section-kicker">Architectural care</span>
            <h2>Designed as a Clinical Sanctuary, Not an Assembly Line</h2>
            <p>A quieter clinic, a simpler visit, and room to ask questions.</p>

            <ul className="care-list">
              {careList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="sanctuary-visuals">
            <div className="visual-large">
              <img src={`${process.env.PUBLIC_URL || ''}/Assets/images/clinic-operatory.webp`} width="520" height="380" loading="lazy" decoding="async" alt="Ma Dental modern treatment operatory" />
            </div>
            <div className="visual-stack">
              <div className="visual-small">
                <img src={`${process.env.PUBLIC_URL || ''}/Assets/images/fona-opg-xray.webp`} width="250" height="180" loading="lazy" decoding="async" alt="FONA 3D panoramic OPG x-ray" />
              </div>
              <div className="visual-small alt">
                <img src={`${process.env.PUBLIC_URL || ''}/Assets/images/sterilization-autoclave.webp`} width="250" height="180" loading="lazy" decoding="async" alt="Class-B vacuum autoclave sterilization unit" />
              </div>
            </div>
          </div>
        </section>

        <section className="doctor-highlight">
          <div className="doctor-photo">
            <img src={`${process.env.PUBLIC_URL || ''}/Assets/enhanced_images/dr-bhanu-enhanced.webp`} width="360" height="420" loading="lazy" decoding="async" alt="Dr. T. Bhanu Prakash Reddy" />
          </div>

          <div className="doctor-quote">
            <div className="quote-mark">“</div>
            <p>
              “Dentistry must be an uncompromised intention of biological health and wellbeing. A healthy smile is not just about being aesthetically pleasing — it is an act of long-term care and trust.”
            </p>

            <div className="doctor-signature">
              <strong>Dr. T. Bhanu Prakash Reddy, B.D.S</strong>
              <span>Implant &amp; Cosmetic Dental Surgeon</span>
            </div>

          </div>
        </section>

        <section className="about-cta">
          <div className="about-cta__copy">
            <span className="section-kicker">Elevate your dental experience</span>
            <h2>Experience the New Standard of Dental Care</h2>
          </div>
          <div className="about-cta__actions">
            <Link to="/book-appointment" className="primary-button">Book Your Consultation</Link>
            <Link to="/treatments" className="secondary-button">Explore Our Specialties</Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AboutPage;
