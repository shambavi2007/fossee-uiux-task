# Workshop Booking — FOSSEE, IIT Bombay

> A web application for coordinators to book FOSSEE workshops. Coordinators can register, browse available workshops, and propose a workshop date. Instructors from IIT Bombay review and confirm the bookings.

---

## UI Redesign

Full frontend redesign built with **React + Vite**, replacing the original Django templates with a modern, mobile-first UI.

---

## Visual Showcase

### Before UI

**Booking Page**

![Before Booking](screenshots/before/before-booking.png)

**Signup Page**

![Before Signup](screenshots/before/before-signup.png)

---

### After UI

**Home Page**

![After Home](screenshots/after/after-home.png)

**Booking / Statistics Page**

![After Booking](screenshots/after/after-booking.png)

**Signup Page — Part 1**

![After Signup 1](screenshots/after/after-signup1.png)

**Signup Page — Part 2**

![After Signup 2](screenshots/after/after-signup2.png)

---

### Mobile View

**Home Page**

![Mobile Home](screenshots/mobile_view/mobile-home.png)

**Booking Page**

![Mobile Booking](screenshots/mobile_view/mobile-booking.png)

**Signup Page**

![Mobile Signup](screenshots/mobile_view/mobile-signup.png)

---

## Reasoning

### Design Principles

The main goal while redesigning was to keep things simple and easy to understand for the user. I focused on visual hierarchy — making sure the important things like headings, buttons, and form fields stand out clearly. Consistent spacing and typography using Poppins font was used throughout all pages so nothing feels out of place. The color scheme was kept minimal with deep blue as the primary color and orange as the accent, which matches FOSSEE's identity. Navigation was made straightforward so users don't have to think twice about where to go.

### Responsiveness

I followed a mobile-first approach because most students and coordinators access websites on their phones. The layout was built using CSS Flexbox and Grid, which naturally adapts to different screen sizes. Media queries were added to handle breakpoints for mobile, tablet, and desktop views. The navbar collapses into a hamburger menu on smaller screens, and multi-column layouts stack into single columns on mobile. I tested the layouts using browser developer tools by simulating different device screen sizes.

### Trade-offs

I decided not to use any heavy UI libraries like Material UI or Bootstrap because they add a lot of extra weight to the project and reduce performance. Instead, plain CSS was written for every component which gave more control over the design. Complex animations were also avoided on purpose — subtle hover effects and transitions were enough to make the UI feel smooth without slowing things down. The focus was always on clarity and usability rather than making things look fancy.

### Challenges

One of the biggest challenges was converting the existing Django HTML templates into proper React components without losing any of the original functionality. It was tricky to figure out which parts of the old UI to keep and which to redesign from scratch. Making the forms fully responsive without breaking the layout on smaller screens took a lot of trial and error, especially the registration form which has many fields. Structuring reusable components like Navbar, Footer, and Layout in a way that works across all pages was also something I had to think through carefully.

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
