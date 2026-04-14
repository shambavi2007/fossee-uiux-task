import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/LoginPage.css';

/* ── Inline SVG icons — no icon library needed ── */
function IconUser() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconEye({ off }) {
  return off ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconFossee() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

/* ── Component ── */
export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const [fields, setFields]       = useState({ username: '', password: '' });
  const [showPwd, setShowPwd]     = useState(false);
  const [errors, setErrors]       = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading]     = useState(false);

  /* Update a single field and clear its error */
  function handleChange(e) {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setServerError('');
  }

  /* Client-side validation */
  function validate() {
    const errs = {};
    if (!fields.username.trim()) errs.username = 'Username is required.';
    if (!fields.password)        errs.password = 'Password is required.';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setServerError('');

    try {
      /* ── Replace this block with your real API call ──
         const res  = await fetch('/workshop/login/', { method:'POST', ... });
         const data = await res.json();
         if (!res.ok) throw new Error(data.error || 'Invalid username or password.');
         onLogin({ fullName: data.full_name, isInstructor: data.is_instructor });
         navigate(data.is_instructor ? '/workshops/instructor' : '/workshops');
      ── */

      /* Demo: simulate a successful login after 800ms */
      await new Promise(r => setTimeout(r, 800));
      onLogin({ fullName: fields.username, isInstructor: false });
      navigate('/workshops');

    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Sign In — FOSSEE Workshops</title>
        <meta name="description"
          content="Sign in to the FOSSEE Workshop Booking portal to manage and propose workshops." />
      </Helmet>

      <section className="login-page" aria-labelledby="login-heading">
        <div className="login-card" role="main">

          {/* ── Header ── */}
          <header className="login-header">
            <div className="login-logo-ring" aria-hidden="true">
              <IconFossee />
            </div>
            <h1 id="login-heading">Welcome Back</h1>
            <p>Sign in to your FOSSEE account</p>
          </header>

          {/* ── Server error ── */}
          {serverError && (
            <div className="login-alert" role="alert" aria-live="assertive">
              {serverError}
            </div>
          )}

          {/* ── Form ── */}
          <form
            className="login-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Login form"
          >
            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <span className="input-icon"><IconUser /></span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={fields.username}
                  onChange={handleChange}
                  className={errors.username ? 'input-error' : ''}
                  aria-describedby={errors.username ? 'username-error' : undefined}
                  aria-invalid={!!errors.username}
                  tabIndex={1}
                />
              </div>
              {errors.username && (
                <span id="username-error" className="field-error-msg" role="alert">
                  {errors.username}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon"><IconLock /></span>
                <input
                  id="password"
                  name="password"
                  type={showPwd ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={fields.password}
                  onChange={handleChange}
                  className={errors.password ? 'input-error' : ''}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  aria-invalid={!!errors.password}
                  tabIndex={2}
                />
                <button
                  type="button"
                  className="pwd-toggle"
                  onClick={() => setShowPwd(v => !v)}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                  tabIndex={3}
                >
                  <IconEye off={showPwd} />
                </button>
              </div>
              {errors.password && (
                <span id="password-error" className="field-error-msg" role="alert">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
              aria-label="Sign in to your account"
              tabIndex={4}
            >
              {loading ? (
                <>
                  <span className="btn-spinner" aria-hidden="true" />
                  Signing in…
                </>
              ) : 'Sign In'}
            </button>
          </form>

          {/* ── Divider ── */}
          <div className="login-divider" aria-hidden="true">or</div>

          {/* ── Footer links ── */}
          <nav className="login-footer-links" aria-label="Account options">
            <Link to="/register" tabIndex={5}>
              New around here? Sign up
            </Link>
            <Link to="/password/reset" tabIndex={6}>
              Forgot password?
            </Link>
          </nav>

        </div>
      </section>
    </>
  );
}
