import './index.css';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<footer className="site-footer" id="contact">
			<div className="footer-main">
				<div className="footer-brand-column">
					<h2>Ma Dental</h2>
					<p>Advanced Dentistry. Gentle Care.<br />Healthier Smiles.</p>
					<div className="social-links" aria-label="Social media links">
						<a href="#instagram" aria-label="Instagram">IG</a>
						<a href="#facebook" aria-label="Facebook">f</a>
						<a href="https://wa.me/917799234108" target="_blank" rel="noreferrer" aria-label="WhatsApp">WA</a>
					</div>
					<form className="newsletter-form">
						<input type="email" placeholder="Enter your correspondence email" aria-label="Email address" />
						<button type="submit">Subscribe</button>
					</form>
				</div>

				<div className="footer-column">
					<h3>Quick Links</h3>
					<a href="#about">About Us</a>
					<a href="#treatments">Treatments</a>
					<a href="#doctors">Our Doctors</a>
					<Link to="/book-appointment">Book Appointment</Link>
				</div>

				<div className="footer-column hours-column">
					<h3>Presence Of Hours</h3>
					<p>Monday - Saturday<br /><small>09:00 AM - 09:00 PM</small></p>
					<p>Sunday<br /><small>10:00 AM - 06:00 PM</small></p>
					<p>Saturday<br /><small>Private Concierge Surgery</small></p>
					<p>Sunday<br /><small>Closed for Reflection</small></p>
					<p className="direct-access">Direct Access<br /><small>+1 (800) 792-4632</small></p>
				</div>

				<div className="footer-column contact-column">
					<h3>Contact Details</h3>
					<p><span aria-hidden="true">&#9678;</span> Kotapalli Circle, Tirupati Road,<br />&nbsp;&nbsp;&nbsp; Pileru, 517214.</p>
					<p><span aria-hidden="true">&#9742;</span> 7799234108<br />&nbsp;&nbsp;&nbsp; 7406270999</p>
					<p><span aria-hidden="true">&#9993;</span> madental999@gmail.com</p>
					<h3 className="follow-heading">Follow Us</h3>
					<p className="follow-copy">Stay updated with the latest in dental care and<br />our clinic news.</p>
					<div className="social-links footer-social">
						<a href="#instagram" aria-label="Instagram">IG</a>
						<a href="#facebook" aria-label="Facebook">f</a>
						<a href="https://wa.me/917799234108" target="_blank" rel="noreferrer" aria-label="WhatsApp">WA</a>
					</div>
				</div>
			</div>

			<div className="footer-bottom">
				<span>&copy; 2026 Ma Dental Clinic. All Rights Reserved.</span>
				<div><a href="#privacy">Privacy Policy</a><a href="#terms">Terms of Service</a></div>
			</div>
		</footer>
	);
}

export default Footer;