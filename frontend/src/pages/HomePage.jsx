import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/HomePage.css';

const CARDS = [
  {
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png',
    iconAlt: 'Graduation cap representing education',
    iconBg:  '#e8eaf6',
    title: 'What is FOSSEE?',
    body: 'FOSSEE (Free/Libre and Open Source Software for Education) is a project at IIT Bombay that promotes the use of open-source tools in science and engineering education across India.',
    link: { to: '/workshop-types', label: 'Browse workshops' },
  },
  {
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1705/1705312.png',
    iconAlt: 'Gear representing how the process works',
    iconBg:  '#fff3e0',
    title: 'How it Works',
    body: 'Coordinators propose a workshop date at their institution. An instructor from IIT Bombay reviews and accepts the request. Once confirmed, the workshop is conducted on-site.',
    link: { to: '/register', label: 'Get started' },
  },
  {
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/681/681494.png',
    iconAlt: 'People representing who can apply',
    iconBg:  '#e0f2f1',
    title: 'Who Can Apply?',
    body: 'Any faculty member, student coordinator, or institution representative across India can register as a coordinator and propose a workshop for their college or university.',
    link: { to: '/register', label: 'Register now' },
  },
];

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>FOSSEE Workshop Booking — IIT Bombay</title>
        <meta
          name="description"
          content="Book hands-on technical workshops with expert instructors from IIT Bombay. Free and open-source software training for institutions across India."
        />
      </Helmet>

      {/* ── Hero ── */}
      <section className="home-hero" aria-labelledby="hero-heading">
        <div className="hero-badge" aria-hidden="true">
          IIT Bombay · Free &amp; Open Source
        </div>

        <h1 id="hero-heading">
          Book a Workshop with{' '}
          <span>FOSSEE</span>
        </h1>

        <p>
          Connect with expert instructors from IIT Bombay and bring
          hands-on technical workshops to your institution.
        </p>

        <div className="hero-cta-group">
          <Link to="/register" className="btn-hero-primary" aria-label="Book a workshop — register now">
            Book a Workshop →
          </Link>
          <Link to="/statistics" className="btn-hero-secondary" aria-label="View workshop statistics">
            View Statistics
          </Link>
        </div>
      </section>

      {/* ── Info cards ── */}
      <section className="home-cards-section" aria-labelledby="cards-heading">
        <div className="container">
          <h2 id="cards-heading">Everything you need to know</h2>
          <p className="section-subtext">
            Learn about FOSSEE, the booking process, and who can participate.
          </p>

          <div className="home-cards-grid">
            {CARDS.map(card => (
              <article key={card.title} className="info-card">
                <div className="info-card-icon" style={{ background: card.iconBg }}>
                  <img
                    src={card.iconUrl}
                    alt={card.iconAlt}
                    width="32"
                    height="32"
                    loading="lazy"
                    className="info-card-img"
                  />
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <Link to={card.link.to} className="info-card-link">
                  {card.link.label} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── IIT Bombay note ── */}
      <aside className="home-iitb-note" aria-label="About FOSSEE">
        <div className="iitb-note-inner">
          <span className="iitb-badge">
            <span className="iitb-dot" aria-hidden="true" />
            FOSSEE, IIT Bombay
          </span>
          <p className="iitb-note-text">
            An initiative under the{' '}
            <a
              href="https://www.iitb.ac.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Indian Institute of Technology Bombay
            </a>
            , funded by the National Mission on Education through ICT, MHRD.
          </p>
        </div>
      </aside>
    </>
  );
}
