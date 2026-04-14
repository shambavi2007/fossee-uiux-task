import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/RegisterPage.css';

/* ─────────────────────────────────────────
   Static data — mirrors Django models.py
───────────────────────────────────────── */
const TITLES = [
  { value: '', label: 'Select title' },
  { value: 'Professor', label: 'Prof.' },
  { value: 'Doctor',    label: 'Dr.' },
  { value: 'Shriman',   label: 'Shri' },
  { value: 'Shrimati',  label: 'Smt' },
  { value: 'Kumari',    label: 'Ku' },
  { value: 'Mr',        label: 'Mr.' },
  { value: 'Mrs',       label: 'Mrs.' },
  { value: 'Miss',      label: 'Ms.' },
];

const DEPARTMENTS = [
  { value: '', label: 'Select department' },
  { value: 'computer engineering',              label: 'Computer Science' },
  { value: 'information technology',            label: 'Information Technology' },
  { value: 'civil engineering',                 label: 'Civil Engineering' },
  { value: 'electrical engineering',            label: 'Electrical Engineering' },
  { value: 'mechanical engineering',            label: 'Mechanical Engineering' },
  { value: 'chemical engineering',              label: 'Chemical Engineering' },
  { value: 'aerospace engineering',             label: 'Aerospace Engineering' },
  { value: 'biosciences and bioengineering',    label: 'Biosciences and BioEngineering' },
  { value: 'electronics',                       label: 'Electronics' },
  { value: 'energy science and engineering',    label: 'Energy Science and Engineering' },
];

const STATES = [
  { value: '',      label: 'Select state' },
  { value: 'IN-AP', label: 'Andhra Pradesh' },
  { value: 'IN-AR', label: 'Arunachal Pradesh' },
  { value: 'IN-AS', label: 'Assam' },
  { value: 'IN-BR', label: 'Bihar' },
  { value: 'IN-CT', label: 'Chhattisgarh' },
  { value: 'IN-GA', label: 'Goa' },
  { value: 'IN-GJ', label: 'Gujarat' },
  { value: 'IN-HR', label: 'Haryana' },
  { value: 'IN-HP', label: 'Himachal Pradesh' },
  { value: 'IN-JK', label: 'Jammu and Kashmir' },
  { value: 'IN-JH', label: 'Jharkhand' },
  { value: 'IN-KA', label: 'Karnataka' },
  { value: 'IN-KL', label: 'Kerala' },
  { value: 'IN-MP', label: 'Madhya Pradesh' },
  { value: 'IN-MH', label: 'Maharashtra' },
  { value: 'IN-MN', label: 'Manipur' },
  { value: 'IN-ML', label: 'Meghalaya' },
  { value: 'IN-MZ', label: 'Mizoram' },
  { value: 'IN-NL', label: 'Nagaland' },
  { value: 'IN-OR', label: 'Odisha' },
  { value: 'IN-PB', label: 'Punjab' },
  { value: 'IN-RJ', label: 'Rajasthan' },
  { value: 'IN-SK', label: 'Sikkim' },
  { value: 'IN-TN', label: 'Tamil Nadu' },
  { value: 'IN-TG', label: 'Telangana' },
  { value: 'IN-TR', label: 'Tripura' },
  { value: 'IN-UT', label: 'Uttarakhand' },
  { value: 'IN-UP', label: 'Uttar Pradesh' },
  { value: 'IN-WB', label: 'West Bengal' },
  { value: 'IN-AN', label: 'Andaman and Nicobar Islands' },
  { value: 'IN-CH', label: 'Chandigarh' },
  { value: 'IN-DN', label: 'Dadra and Nagar Haveli' },
  { value: 'IN-DD', label: 'Daman and Diu' },
  { value: 'IN-DL', label: 'Delhi' },
  { value: 'IN-LD', label: 'Lakshadweep' },
  { value: 'IN-PY', label: 'Puducherry' },
];

const SOURCES = [
  { value: '',                    label: 'How did you hear about us?' },
  { value: 'FOSSEE website',      label: 'FOSSEE website' },
  { value: 'Google',              label: 'Google' },
  { value: 'Social Media',        label: 'Social Media' },
  { value: 'From other College',  label: 'From other College' },
];

/* ─────────────────────────────────────────
   Inline SVG icons
───────────────────────────────────────── */
const Icon = ({ d, d2, circle, rect, line, poly }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    {circle && <circle {...circle} />}
    {rect   && <rect   {...rect}   />}
    {d      && <path d={d} />}
    {d2     && <path d={d2} />}
    {line   && <line  {...line}  />}
    {poly   && <polyline points={poly} />}
  </svg>
);

const IUser    = () => <Icon circle={{ cx:12, cy:8, r:4 }} d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />;
const IEmail   = () => <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" d2="M22 6l-10 7L2 6" />;
const ILock    = () => <Icon rect={{ x:3, y:11, width:18, height:11, rx:2, ry:2 }} d="M7 11V7a5 5 0 0 1 10 0v4" />;
const IPhone   = () => <Icon d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />;
const IBuilding= () => <Icon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" d2="M9 22V12h6v10" />;
const IMap     = () => <Icon d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" circle={{ cx:12, cy:10, r:3 }} />;
const IChevron = () => <Icon poly="6 9 12 15 18 9" />;
const IEyeOn   = () => <Icon d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" circle={{ cx:12, cy:12, r:3 }} />;
const IEyeOff  = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const IFossee  = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
);

/* ─────────────────────────────────────────
   Password strength scorer
───────────────────────────────────────── */
function getPwdStrength(pwd) {
  if (!pwd) return null;
  let score = 0;
  if (pwd.length >= 8)                        score++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
  if (/\d/.test(pwd))                          score++;
  if (/[^A-Za-z0-9]/.test(pwd))               score++;
  if (score <= 1) return 'weak';
  if (score <= 3) return 'medium';
  return 'strong';
}

/* ─────────────────────────────────────────
   Reusable field components
───────────────────────────────────────── */
function Field({ id, label, error, children }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span id={`${id}-error`} className="reg-field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function TextInput({ id, name, type = 'text', placeholder, value, onChange,
                     hasError, icon, autoComplete }) {
  return (
    <div className="reg-input-wrap">
      {icon && <span className="reg-input-icon">{icon}</span>}
      <input
        id={id} name={name} type={type}
        placeholder={placeholder}
        value={value} onChange={onChange}
        autoComplete={autoComplete}
        className={hasError ? 'is-error' : ''}
        aria-describedby={hasError ? `${id}-error` : undefined}
        aria-invalid={hasError || undefined}
      />
    </div>
  );
}

function SelectInput({ id, name, value, onChange, hasError, options, icon }) {
  return (
    <div className={`reg-input-wrap${icon ? '' : ' no-icon'}`}>
      {icon && <span className="reg-input-icon">{icon}</span>}
      <select
        id={id} name={name} value={value} onChange={onChange}
        className={hasError ? 'is-error' : ''}
        aria-describedby={hasError ? `${id}-error` : undefined}
        aria-invalid={hasError || undefined}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <span className="reg-select-chevron"><IChevron /></span>
    </div>
  );
}

function PwdInput({ id, name, placeholder, value, onChange, hasError, show, onToggle }) {
  return (
    <div className="reg-input-wrap">
      <span className="reg-input-icon"><ILock /></span>
      <input
        id={id} name={name}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value} onChange={onChange}
        autoComplete={name === 'password' ? 'new-password' : 'new-password'}
        className={hasError ? 'is-error' : ''}
        aria-describedby={hasError ? `${id}-error` : undefined}
        aria-invalid={hasError || undefined}
      />
      <button type="button" className="reg-pwd-toggle"
        onClick={onToggle}
        aria-label={show ? `Hide ${placeholder}` : `Show ${placeholder}`}>
        {show ? <IEyeOff /> : <IEyeOn />}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
const EMPTY = {
  title: '', first_name: '', last_name: '', email: '',
  username: '', password: '', confirm_password: '',
  institute: '', department: '', location: '',
  state: '', phone_number: '', how_did_you_hear_about_us: '',
};

export default function RegisterPage() {
  const navigate = useNavigate();

  const [fields,      setFields]      = useState(EMPTY);
  const [errors,      setErrors]      = useState({});
  const [serverError, setServerError] = useState('');
  const [loading,     setLoading]     = useState(false);
  const [showPwd,     setShowPwd]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const pwdStrength = getPwdStrength(fields.password);

  /* ── Field change ── */
  function handleChange(e) {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setServerError('');
  }

  /* ── Validation — mirrors Django's UserRegistrationForm ── */
  function validate() {
    const e = {};
    const f = fields;

    if (!f.title)                                    e.title       = 'Please select a title.';
    if (!f.first_name.trim())                        e.first_name  = 'First name is required.';
    if (!f.last_name.trim())                         e.last_name   = 'Last name is required.';

    if (!f.email.trim())                             e.email       = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
                                                     e.email       = 'Enter a valid email address.';

    if (!f.username.trim())                          e.username    = 'Username is required.';
    else if (/[^a-zA-Z0-9._]/.test(f.username))     e.username    = 'Only letters, digits, period and underscore allowed.';

    if (!f.password)                                 e.password    = 'Password is required.';
    else if (f.password.length < 8)                  e.password    = 'Password must be at least 8 characters.';

    if (!f.confirm_password)                         e.confirm_password = 'Please confirm your password.';
    else if (f.confirm_password !== f.password)      e.confirm_password = 'Passwords do not match.';

    if (!f.institute.trim())                         e.institute   = 'Institute name is required.';
    if (!f.department)                               e.department  = 'Please select a department.';
    if (!f.location.trim())                          e.location    = 'City is required.';
    if (!f.state)                                    e.state       = 'Please select a state.';

    if (!f.phone_number.trim())                      e.phone_number = 'Phone number is required.';
    else if (!/^\d{10}$/.test(f.phone_number))       e.phone_number = 'Enter a valid 10-digit phone number.';

    if (!f.how_did_you_hear_about_us)                e.how_did_you_hear_about_us = 'Please select an option.';

    return e;
  }

  /* ── Submit ── */
  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      /* Scroll to first error */
      const firstId = Object.keys(errs)[0];
      document.getElementById(firstId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);
    setServerError('');

    try {
      /* ── Replace with real API call ──
         const res = await fetch('/workshop/register/', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken') },
           body: JSON.stringify(fields),
         });
         const data = await res.json();
         if (!res.ok) throw new Error(data.error || 'Registration failed.');
      ── */
      await new Promise(r => setTimeout(r, 900)); // demo delay
      navigate('/activate');
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  /* ─────────────────────────────────────────
     Render
  ───────────────────────────────────────── */
  return (
    <>
      <Helmet>
        <title>Create Account — FOSSEE Workshops</title>
        <meta name="description"
          content="Register as a coordinator or instructor on the FOSSEE Workshop Booking portal." />
      </Helmet>

      <section className="register-page" aria-labelledby="register-heading">
        <div className="register-card">

          {/* Header */}
          <header className="register-header">
            <div className="register-logo-ring" aria-hidden="true"><IFossee /></div>
            <h1 id="register-heading">Create Your Account</h1>
            <p>Join FOSSEE Workshops today</p>
          </header>

          {/* Server error */}
          {serverError && (
            <div className="register-alert" role="alert" aria-live="assertive">
              {serverError}
            </div>
          )}

          <form className="register-form" onSubmit={handleSubmit} noValidate>

            {/* ── Personal details ── */}
            <p className="register-section-label" aria-hidden="true">Personal Details</p>

            {/* Title */}
            <Field id="title" label="Title" error={errors.title}>
              <SelectInput id="title" name="title"
                value={fields.title} onChange={handleChange}
                hasError={!!errors.title} options={TITLES} />
            </Field>

            {/* First + Last name — two columns */}
            <div className="register-row">
              <Field id="first_name" label="First Name" error={errors.first_name}>
                <TextInput id="first_name" name="first_name"
                  placeholder="First name" value={fields.first_name}
                  onChange={handleChange} hasError={!!errors.first_name}
                  icon={<IUser />} autoComplete="given-name" />
              </Field>
              <Field id="last_name" label="Last Name" error={errors.last_name}>
                <TextInput id="last_name" name="last_name"
                  placeholder="Last name" value={fields.last_name}
                  onChange={handleChange} hasError={!!errors.last_name}
                  icon={<IUser />} autoComplete="family-name" />
              </Field>
            </div>

            {/* Email */}
            <Field id="email" label="Email Address" error={errors.email}>
              <TextInput id="email" name="email" type="email"
                placeholder="you@example.com" value={fields.email}
                onChange={handleChange} hasError={!!errors.email}
                icon={<IEmail />} autoComplete="email" />
            </Field>

            {/* Username */}
            <Field id="username" label="Username" error={errors.username}>
              <TextInput id="username" name="username"
                placeholder="Letters, digits, period, underscore"
                value={fields.username} onChange={handleChange}
                hasError={!!errors.username} icon={<IUser />}
                autoComplete="username" />
            </Field>

            {/* Password */}
            <Field id="password" label="Password" error={errors.password}>
              <PwdInput id="password" name="password"
                placeholder="Min. 8 characters"
                value={fields.password} onChange={handleChange}
                hasError={!!errors.password}
                show={showPwd} onToggle={() => setShowPwd(v => !v)} />
              {fields.password && pwdStrength && (
                <div className="pwd-strength" aria-live="polite">
                  <div className="pwd-strength-bar">
                    <div className={`pwd-strength-fill ${pwdStrength}`} />
                  </div>
                  <span className={`pwd-strength-label ${pwdStrength}`}>
                    {pwdStrength.charAt(0).toUpperCase() + pwdStrength.slice(1)}
                  </span>
                </div>
              )}
            </Field>

            {/* Confirm password */}
            <Field id="confirm_password" label="Confirm Password" error={errors.confirm_password}>
              <PwdInput id="confirm_password" name="confirm_password"
                placeholder="Re-enter your password"
                value={fields.confirm_password} onChange={handleChange}
                hasError={!!errors.confirm_password}
                show={showConfirm} onToggle={() => setShowConfirm(v => !v)} />
            </Field>

            {/* ── Institute details ── */}
            <p className="register-section-label" aria-hidden="true">Institute Details</p>

            {/* Institute */}
            <Field id="institute" label="Institute Name" error={errors.institute}>
              <TextInput id="institute" name="institute"
                placeholder="Full name of your institute / organization"
                value={fields.institute} onChange={handleChange}
                hasError={!!errors.institute} icon={<IBuilding />}
                autoComplete="organization" />
            </Field>

            {/* Department */}
            <Field id="department" label="Department" error={errors.department}>
              <SelectInput id="department" name="department"
                value={fields.department} onChange={handleChange}
                hasError={!!errors.department} options={DEPARTMENTS} />
            </Field>

            {/* City + State — two columns */}
            <div className="register-row">
              <Field id="location" label="City" error={errors.location}>
                <TextInput id="location" name="location"
                  placeholder="Your city" value={fields.location}
                  onChange={handleChange} hasError={!!errors.location}
                  icon={<IMap />} autoComplete="address-level2" />
              </Field>
              <Field id="state" label="State" error={errors.state}>
                <SelectInput id="state" name="state"
                  value={fields.state} onChange={handleChange}
                  hasError={!!errors.state} options={STATES} />
              </Field>
            </div>

            {/* Phone */}
            <Field id="phone_number" label="Phone Number" error={errors.phone_number}>
              <TextInput id="phone_number" name="phone_number" type="tel"
                placeholder="10-digit mobile number"
                value={fields.phone_number} onChange={handleChange}
                hasError={!!errors.phone_number} icon={<IPhone />}
                autoComplete="tel" />
            </Field>

            {/* How did you hear */}
            <Field id="how_did_you_hear_about_us" label="How did you hear about us?"
              error={errors.how_did_you_hear_about_us}>
              <SelectInput id="how_did_you_hear_about_us" name="how_did_you_hear_about_us"
                value={fields.how_did_you_hear_about_us} onChange={handleChange}
                hasError={!!errors.how_did_you_hear_about_us} options={SOURCES} />
            </Field>

            {/* Submit */}
            <button type="submit" className="register-btn"
              disabled={loading} aria-label="Create your account">
              {loading
                ? <><span className="btn-spinner" aria-hidden="true" /> Creating account…</>
                : 'Create Account'}
            </button>
          </form>

          {/* Sign in link */}
          <p className="register-signin-link">
            Already have an account?
            <Link to="/login">Sign in</Link>
          </p>

        </div>
      </section>
    </>
  );
}
