import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import '../styles/StatisticsPage.css';

/* ── India state list (matches Django's `states` tuples) ── */
const INDIA_STATES = [
  ['', 'All States'],
  ['IN-AP', 'Andhra Pradesh'], ['IN-AR', 'Arunachal Pradesh'],
  ['IN-AS', 'Assam'],         ['IN-BR', 'Bihar'],
  ['IN-CT', 'Chhattisgarh'], ['IN-GA', 'Goa'],
  ['IN-GJ', 'Gujarat'],      ['IN-HR', 'Haryana'],
  ['IN-HP', 'Himachal Pradesh'], ['IN-JH', 'Jharkhand'],
  ['IN-KA', 'Karnataka'],    ['IN-KL', 'Kerala'],
  ['IN-MP', 'Madhya Pradesh'], ['IN-MH', 'Maharashtra'],
  ['IN-MN', 'Manipur'],      ['IN-ML', 'Meghalaya'],
  ['IN-MZ', 'Mizoram'],      ['IN-NL', 'Nagaland'],
  ['IN-OR', 'Odisha'],       ['IN-PB', 'Punjab'],
  ['IN-RJ', 'Rajasthan'],    ['IN-SK', 'Sikkim'],
  ['IN-TN', 'Tamil Nadu'],   ['IN-TG', 'Telangana'],
  ['IN-TR', 'Tripura'],      ['IN-UP', 'Uttar Pradesh'],
  ['IN-UT', 'Uttarakhand'],  ['IN-WB', 'West Bengal'],
  ['IN-DL', 'Delhi'],        ['IN-JK', 'Jammu & Kashmir'],
];

/* ── Demo data — replace with real API response ── */
const DEMO_WORKSHOPS = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  coordinator: `Coordinator ${i + 1}`,
  institute:   `Institute of Technology ${String.fromCharCode(65 + (i % 10))}`,
  instructor:  `Instructor ${(i % 5) + 1}`,
  workshop:    ['Python Basics', 'Scilab', 'ISCP', 'eSim', 'OpenFOAM'][i % 5],
  date:        new Date(2026, i % 12, (i % 28) + 1).toISOString().split('T')[0],
  state:       INDIA_STATES[(i % (INDIA_STATES.length - 1)) + 1][0],
}));

const DEMO_WORKSHOP_TYPES = [
  { id: '', name: 'All Workshops' },
  { id: 1,  name: 'Python Basics' },
  { id: 2,  name: 'Scilab' },
  { id: 3,  name: 'ISCP' },
  { id: 4,  name: 'eSim' },
  { id: 5,  name: 'OpenFOAM' },
];

const PAGE_SIZE = 10;

/* ── Inline SVG icons ── */
function IconFilter()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>; }
function IconEye()      { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>; }
function IconDownload() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>; }
function IconBar()      { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>; }
function IconChevL()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>; }
function IconChevR()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>; }

/* ── Bar chart modal ── */
function ChartModal({ title, labels, data, onClose }) {
  const max = Math.max(...data, 1);

  /* Close on Escape key */
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="chart-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chart-title"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="chart-modal">
        <div className="chart-modal-header">
          <h3 id="chart-title">{title}</h3>
          <button className="btn-modal-close" onClick={onClose} aria-label="Close chart">✕</button>
        </div>

        {labels.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No data to display.</p>
        ) : (
          <div className="bar-chart" role="img" aria-label={`Bar chart: ${title}`}>
            {labels.map((label, i) => (
              <div className="bar-row" key={label}>
                <span className="bar-label" title={label}>{label}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${(data[i] / max) * 100}%` }}
                  >
                    {data[i] > 0 && <span className="bar-value">{data[i]}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function StatisticsPage() {
  /* Filter state */
  const [filters, setFilters] = useState({
    from_date: '', to_date: '', workshop_type: '', state: '', sort: 'date',
  });

  /* Applied filters (only update when View is clicked) */
  const [applied, setApplied] = useState(filters);

  /* Data + pagination */
  const [rows,    setRows]    = useState(DEMO_WORKSHOPS);
  const [page,    setPage]    = useState(1);
  const [loading, setLoading] = useState(false);

  /* Mobile sidebar toggle */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* Chart modal */
  const [chart, setChart] = useState(null); // { title, labels, data }

  /* ── Derived: filtered + sorted rows ── */
  const filtered = rows.filter(w => {
    if (applied.state && w.state !== applied.state) return false;
    if (applied.workshop_type && w.workshop !== DEMO_WORKSHOP_TYPES.find(t => String(t.id) === applied.workshop_type)?.name) return false;
    if (applied.from_date && w.date < applied.from_date) return false;
    if (applied.to_date   && w.date > applied.to_date)   return false;
    return true;
  }).sort((a, b) => applied.sort === '-date'
    ? b.date.localeCompare(a.date)
    : a.date.localeCompare(b.date)
  );

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage    = Math.min(page, totalPages);
  const pageRows    = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  /* ── Chart data derived from filtered rows ── */
  function getStateChartData() {
    const counts = {};
    filtered.forEach(w => {
      const label = INDIA_STATES.find(s => s[0] === w.state)?.[1] || w.state;
      counts[label] = (counts[label] || 0) + 1;
    });
    return { labels: Object.keys(counts), data: Object.values(counts) };
  }

  function getTypeChartData() {
    const counts = {};
    filtered.forEach(w => { counts[w.workshop] = (counts[w.workshop] || 0) + 1; });
    return { labels: Object.keys(counts), data: Object.values(counts) };
  }

  /* ── Handlers ── */
  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  }

  function handleView(e) {
    e.preventDefault();
    setLoading(true);
    setPage(1);
    /* Simulate API call — replace with:
       const res = await fetch(`/statistics/public?from_date=...`);
       const data = await res.json();
       setRows(data.workshops); */
    setTimeout(() => {
      setApplied(filters);
      setLoading(false);
      setSidebarOpen(false); // close drawer on mobile after applying
    }, 400);
  }

  function handleClear() {
    const empty = { from_date: '', to_date: '', workshop_type: '', state: '', sort: 'date' };
    setFilters(empty);
    setApplied(empty);
    setPage(1);
  }

  function handleDownload() {
    /* Replace with: window.location.href = `/statistics/public?download=download&...` */
    const header = ['Sr No.', 'Coordinator', 'Institute', 'Instructor', 'Workshop', 'Date'];
    const csvRows = [
      header.join(','),
      ...filtered.map((w, i) =>
        [i + 1, w.coordinator, w.institute, w.instructor, w.workshop, w.date].join(',')
      ),
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'statistics.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  /* ── Render ── */
  return (
    <>
      <Helmet>
        <title>Workshop Statistics — FOSSEE Workshops</title>
        <meta name="description"
          content="View and filter workshop statistics across India. Download data as CSV." />
      </Helmet>

      <section className="stats-page" aria-labelledby="stats-heading">
        <div className="container">
          <h1 className="stats-page-title" id="stats-heading">Workshop Statistics</h1>

          {/* Mobile: Show/Hide Filters toggle */}
          <button
            className="btn-show-filters"
            onClick={() => setSidebarOpen(o => !o)}
            aria-expanded={sidebarOpen}
            aria-controls="filters-sidebar"
          >
            <IconFilter />
            {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div className="stats-layout">

            {/* ── Sidebar ── */}
            <aside
              id="filters-sidebar"
              className={`stats-sidebar${sidebarOpen ? '' : ' mobile-hidden'}`}
              aria-label="Filter workshops"
            >
              <div className="sidebar-card">
                <div className="sidebar-header">
                  <h2>Filters</h2>
                  <button
                    className="btn-clear"
                    onClick={handleClear}
                    aria-label="Clear all filters"
                  >
                    ✕ Clear
                  </button>
                </div>

                <form className="sidebar-form" onSubmit={handleView} noValidate>

                  <div className="form-group">
                    <label htmlFor="from_date">From Date</label>
                    <input
                      id="from_date" name="from_date" type="date"
                      value={filters.from_date}
                      onChange={handleFilterChange}
                      aria-label="Filter from date"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="to_date">To Date</label>
                    <input
                      id="to_date" name="to_date" type="date"
                      value={filters.to_date}
                      onChange={handleFilterChange}
                      aria-label="Filter to date"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="workshop_type">Workshop</label>
                    <select
                      id="workshop_type" name="workshop_type"
                      value={filters.workshop_type}
                      onChange={handleFilterChange}
                      aria-label="Filter by workshop type"
                    >
                      {DEMO_WORKSHOP_TYPES.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <select
                      id="state" name="state"
                      value={filters.state}
                      onChange={handleFilterChange}
                      aria-label="Filter by state"
                    >
                      {INDIA_STATES.map(([code, name]) => (
                        <option key={code} value={code}>{name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="sort">Sort By</label>
                    <select
                      id="sort" name="sort"
                      value={filters.sort}
                      onChange={handleFilterChange}
                      aria-label="Sort workshops"
                    >
                      <option value="date">Oldest First</option>
                      <option value="-date">Newest First</option>
                    </select>
                  </div>

                  <div className="sidebar-divider" aria-hidden="true" />

                  <div className="sidebar-actions">
                    <button
                      type="submit"
                      className="btn-view"
                      disabled={loading}
                      aria-label="Apply filters and view results"
                    >
                      <IconEye />
                      {loading ? 'Loading…' : 'View'}
                    </button>
                    <button
                      type="button"
                      className="btn-download"
                      onClick={handleDownload}
                      aria-label="Download filtered results as CSV"
                    >
                      <IconDownload />
                      Download
                    </button>
                  </div>

                </form>
              </div>
            </aside>

            {/* ── Main table area ── */}
            <main className="stats-main">

              {/* Top bar */}
              <div className="stats-topbar">
                <div className="stats-chart-btns">
                  <button
                    className="btn-chart"
                    onClick={() => { const d = getStateChartData(); setChart({ title: 'State-wise Workshops', ...d }); }}
                    aria-label="Show state-wise bar chart"
                  >
                    <IconBar />
                    <span>State chart</span>
                  </button>
                  <button
                    className="btn-chart"
                    onClick={() => { const d = getTypeChartData(); setChart({ title: 'Workshop-type Distribution', ...d }); }}
                    aria-label="Show workshop-type bar chart"
                  >
                    <IconBar />
                    <span>Workshops chart</span>
                  </button>
                </div>

                {/* Pagination */}
                <nav className="stats-pagination" aria-label="Table pagination">
                  <button
                    className="page-btn"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={safePage === 1}
                    aria-label="Previous page"
                  >
                    <IconChevL />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(n => n === 1 || n === totalPages || Math.abs(n - safePage) <= 1)
                    .reduce((acc, n, idx, arr) => {
                      if (idx > 0 && n - arr[idx - 1] > 1) acc.push('…');
                      acc.push(n);
                      return acc;
                    }, [])
                    .map((item, idx) =>
                      item === '…'
                        ? <span key={`ellipsis-${idx}`} className="page-info">…</span>
                        : (
                          <button
                            key={item}
                            className={`page-btn${safePage === item ? ' active' : ''}`}
                            onClick={() => setPage(item)}
                            aria-label={`Go to page ${item}`}
                            aria-current={safePage === item ? 'page' : undefined}
                          >
                            {item}
                          </button>
                        )
                    )
                  }

                  <button
                    className="page-btn"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={safePage === totalPages}
                    aria-label="Next page"
                  >
                    <IconChevR />
                  </button>

                  <span className="page-info">
                    {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                  </span>
                </nav>
              </div>

              {/* Table */}
              <div className="table-card">
                <div className="table-scroll">
                  <table className="stats-table" aria-label="Workshop statistics">
                    <thead>
                      <tr>
                        <th scope="col">Sr No.</th>
                        <th scope="col">Coordinator Name</th>
                        <th scope="col">Institute Name</th>
                        <th scope="col">Instructor Name</th>
                        <th scope="col">Workshop Name</th>
                        <th scope="col">Workshop Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageRows.length === 0 ? (
                        <tr>
                          <td colSpan={6}>
                            <div className="table-empty">
                              <div className="table-empty-icon" aria-hidden="true">📋</div>
                              <p>No workshops found for the selected filters.</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        pageRows.map((w, idx) => (
                          <tr key={w.id}>
                            <td>{(safePage - 1) * PAGE_SIZE + idx + 1}</td>
                            <td>{w.coordinator}</td>
                            <td>{w.institute}</td>
                            <td>{w.instructor}</td>
                            <td>{w.workshop}</td>
                            <td>{w.date}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </main>
          </div>
        </div>
      </section>

      {/* Chart modal */}
      {chart && (
        <ChartModal
          title={chart.title}
          labels={chart.labels}
          data={chart.data}
          onClose={() => setChart(null)}
        />
      )}
    </>
  );
}
