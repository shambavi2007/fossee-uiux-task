# Workshop Booking — FOSSEE, IIT Bombay

> A web application for coordinators to book FOSSEE workshops. Coordinators can browse available workshops, register, and propose a workshop date based on their convenience. Instructors from IIT Bombay review and confirm the bookings.

---

## UI Redesign

This project includes a full frontend redesign built with **React + Vite**, replacing the original Django templates with a modern, mobile-first UI.

---

## Before vs After

### 🔹 Before UI

#### Booking Page
![Before Booking](screenshots/before/before-booking.png)

#### Signup Page
![Before Signup](screenshots/before/before-signup.png)

---

### 🔹 After UI

#### Home Page
![After Home](screenshots/after/after-home.png)

#### Booking / Statistics Page
![After Booking](screenshots/after/after-booking.png)

#### Signup Page 1
![After Signup 1](screenshots/after/after-signup1.png)

#### Signup Page 2
![After Signup 2](screenshots/after/after-signup2.png)

---

### 🔹 Mobile View 📱

#### Home Page
![Mobile Home](screenshots/mobile_view/mobile-home.png)

#### Booking Page
![Mobile Booking](screenshots/mobile_view/mobile-booking.png)

#### Signup Page
![Mobile Signup](screenshots/mobile_view/mobile-signup.png)

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Backend   | Django 3.0.7, SQLite              |
| Frontend  | React 18, Vite, plain CSS         |
| Fonts     | Poppins (Google Fonts)            |
| Routing   | React Router v6                   |
| SEO       | react-helmet-async                |

---

## Pages

| Route         | Page                  |
|---------------|-----------------------|
| `/`           | Home                  |
| `/login`      | Login                 |
| `/register`   | Register / Sign Up    |
| `/statistics` | Workshop Statistics   |

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

## Getting Started

See [docs/Getting_Started.md](docs/Getting_Started.md) for full setup instructions.

### Quick Start

```bash
# 1. Install Python dependencies
pip install -r requirements.txt

# 2. Run migrations
python manage.py makemigrations
python manage.py migrate

# 3. Create superuser
python manage.py createsuperuser

# 4. Start Django server
python manage.py runserver

# 5. In a separate terminal — start React frontend
cd frontend
npm install
npm run dev
```

Django runs on `http://localhost:8000`  
React runs on `http://localhost:5173`

---

## Project Structure

```
workshop_booking/
├── frontend/               # React app (Vite)
│   └── src/
│       ├── components/     # Navbar, Footer, Layout
│       ├── pages/          # HomePage, LoginPage, RegisterPage, StatisticsPage
│       └── styles/         # Per-page CSS files
├── workshop_app/           # Django app — models, views, forms
├── statistics_app/         # Django app — workshop statistics
├── workshop_portal/        # Django project settings and URLs
├── docs/                   # Setup guide and diagrams
├── screenshots/            # Before/After UI screenshots
└── requirements.txt
```

---

Developed by **FOSSEE group, IIT Bombay**
