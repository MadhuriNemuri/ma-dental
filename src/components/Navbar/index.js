import './index.css';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const WHATSAPP_NUMBER = '917799234108';

function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const closeMenu = () => setIsMenuOpen(false);

	return (
		<header className={`site-header${isMenuOpen ? ' mobile-open' : ''}`}>
			<Link className="brand" to="/" aria-label="Ma Dental home" onClick={closeMenu}>
				<img
					src={`${process.env.PUBLIC_URL || ''}/Assets/navbar_logo.png`}
					alt="Ma Dental"
					className="brand-logo"
				/>
			</Link>

			<nav className={`main-nav${isMenuOpen ? ' mobile-open' : ''}`} aria-label="Primary navigation">
				<NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/" onClick={closeMenu}>Home</NavLink>
				<NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/about" onClick={closeMenu}>About</NavLink>
				<NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/treatments" onClick={closeMenu}>Treatments</NavLink>
				<NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/doctors" onClick={closeMenu}>Doctors</NavLink>
				<NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/gallery" onClick={closeMenu}>Gallery</NavLink>
				<NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/reviews" onClick={closeMenu}>Reviews</NavLink>
				<NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/book-appointment" onClick={closeMenu}>Contact</NavLink>
			</nav>

			<div className="header-actions">
				<a
					className="whatsapp-link"
					href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Ma Dental, I would like to connect with your team.')}`}
					target="_blank"
					rel="noreferrer"
				>
					<span aria-hidden="true">&#9679;</span> WhatsApp
				</a>
				<Link className="header-appointment" to="/book-appointment" onClick={closeMenu}>Book Appointment</Link>
			</div>
			<button
				className="menu-toggle"
				type="button"
				aria-label="Open navigation"
				aria-expanded={isMenuOpen}
				onClick={() => setIsMenuOpen((open) => !open)}
			>
				<span />
				<span />
				<span />
			</button>
		</header>
	);
}

export default Navbar;
