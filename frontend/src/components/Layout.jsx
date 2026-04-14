import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout wraps every page.
 * Props:
 *   user     — passed down to Navbar
 *   onLogout — passed down to Navbar
 *   children — page content
 */
export default function Layout({ user, onLogout, children }) {
  return (
    <div className="page-wrapper">
      <Navbar user={user} onLogout={onLogout} />
      <main className="page-main" id="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
