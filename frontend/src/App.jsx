import { lazy, Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage       = lazy(() => import('./pages/HomePage'));
const LoginPage      = lazy(() => import('./pages/LoginPage'));
const RegisterPage   = lazy(() => import('./pages/RegisterPage'));
const StatisticsPage = lazy(() => import('./pages/StatisticsPage'));

function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <div
        aria-label="Loading page"
        role="status"
        style={{
          width: 40, height: 40,
          border: '4px solid var(--border)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  // Uncomment to test logged-in state:
  // const [user, setUser] = useState({ fullName: 'Shambavi P V', isInstructor: false });

  function handleLogout() { setUser(null); }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"           element={<HomePage />} />
          <Route path="/login"      element={<LoginPage onLogin={setUser} />} />
          <Route path="/register"   element={<RegisterPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="*"           element={<HomePage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
