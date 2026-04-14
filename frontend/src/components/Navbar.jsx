import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

const IconChevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const NAV_LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/statistics', label: 'Workshop Statistics' },
];

export default function Navbar({ user, onLogout }) {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate    = useNavigate();

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function closeMenu() { setMenuOpen(false); }

  function handleLogout() {
    setDropdownOpen(false);
    setMenuOpen(false);
    onLogout?.();
    navigate('/login');
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="container">

          {/* Brand */}
          <Link to="/" className="nav-brand" onClick={closeMenu}>
            <span className="nav-brand-dot" aria-hidden="true" />
            FOSSEE Workshops
          </Link>

          {/* Desktop links */}
          <ul className="nav-links" role="list">
            {NAV_LINKS.map(l => (
              <li key={l.to}>
                <NavLink to={l.to} className={({ isActive }) => isActive ? 'active' : ''}>
                  {l.label}
                </NavLink>
              </li>
            ))}

            {/* Logged-in: user dropdown */}
            {user ? (
              <li className="nav-user" ref={dropdownRef}>
                <button
                  className="nav-user-btn"
                  onClick={() => setDropdownOpen(o => !o)}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  aria-label={`Account menu for ${user.fullName}`}
                >
                  <IconUser />
                  {user.fullName}
                  <IconChevron open={dropdownOpen} />
                </button>

                {dropdownOpen && (
                  <div className="nav-dropdown" role="menu">
                    <div className="nav-dropdown-divider" />
                    <button role="menuitem" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </li>
            ) : (
              /* Logged-out: Sign In button */
              <li>
                <Link to="/login" className="nav-signin-btn">
                  Sign In
                </Link>
              </li>
            )}
          </ul>

          {/* Hamburger (mobile) */}
          <button
            className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        className={`nav-mobile-drawer ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {NAV_LINKS.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} onClick={closeMenu}>{l.label}</NavLink>
            </li>
          ))}

          {user ? (
            <>
              <li><div className="nav-mobile-divider" /></li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login" onClick={closeMenu}>Sign In</NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
