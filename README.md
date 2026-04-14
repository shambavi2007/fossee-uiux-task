# Workshop Booking — FOSSEE, IIT Bombay

> A web application for coordinators to book FOSSEE workshops. Coordinators can register, browse available workshops, and propose a workshop date. Instructors from IIT Bombay review and confirm the bookings.

---

## UI Redesign

Full frontend redesign built with **React + Vite**, replacing the original Django templates with a modern, mobile-first UI.

> Before and after UI screenshots are available in the `screenshots/` folder.


---

## Tech Stack

| Layer    | Technology                      |
|----------|---------------------------------|
| Backend  | Django 3.0.7, SQLite            |
| Frontend | React 18, Vite, plain CSS       |
| Fonts    | Poppins (Google Fonts)          |
| Routing  | React Router v6                 |
| SEO      | react-helmet-async              |

---

## Pages

| Route         | Page                |
|---------------|---------------------|
| `/`           | Home                |
| `/login`      | Login               |
| `/register`   | Register / Sign Up  |
| `/statistics` | Workshop Statistics |

---

## Features

- Mobile-first responsive design
- Accessible — ARIA labels, visible focus rings, semantic HTML
- Workshop statistics with date, state, and type filters
- CSV download of filtered workshop data
- State-wise and type-wise bar charts
- Password strength indicator on signup
- Show/hide password toggle

---

## Quick Start

```bash
# Backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

# Frontend (separate terminal)
cd frontend
npm install
npm run dev
```

- Django → `http://localhost:8000`
- React → `http://localhost:5173`

---

## Project Structure

```
workshop_booking/
├── frontend/            # React + Vite app
│   └── src/
│       ├── components/  # Navbar, Footer, Layout
│       ├── pages/       # HomePage, LoginPage, RegisterPage, StatisticsPage
│       └── styles/      # Per-page CSS files
├── workshop_app/        # Django app — models, views, forms
├── statistics_app/      # Django app — workshop statistics
├── workshop_portal/     # Django project settings and URLs
├── docs/                # Setup guide
├── screenshots/         # Before/After UI screenshots
└── requirements.txt
```

---

Developed by **FOSSEE group, IIT Bombay**
