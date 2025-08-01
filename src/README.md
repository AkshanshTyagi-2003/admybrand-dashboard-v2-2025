# Admybrand Dashboard V2

A modern, scalable, and fully responsive dashboard web application built with **Next.js 13** (App Router) and **React**.  
This project demonstrates a real-world business analytics dashboard featuring user authentication, dynamic data visualizations, data filtering, export capabilities, and smooth UI interactions.

---

## Overview

The Admybrand Dashboard V2 is designed as a comprehensive solution to visualize user and sales data with an emphasis on usability and performance. It serves as a practical example of building a dashboard system using the latest Next.js features and modern frontend best practices.

The app starts at the **Login page (`/login`)**, where users can authenticate (currently mocked or ready for integration). Upon login, users access the **Dashboard**, which contains:

- **Metrics cards** summarizing key business KPIs like revenue, user counts, and growth percentage.
- **Interactive charts** showing trends and data analytics.
- **Data tables** with robust features including:
  - Sorting by columns  
  - Live searching and filtering  
  - Date range filtering  
  - Export options to CSV and PDF

The data is fetched dynamically from an external fake API (https://fakestoreapi.com) and augmented with simulated values to mimic real business data. This project is ideal for showcasing skills in React, TypeScript, data handling, and user interface design.

---

## Features in Detail

### 1. Login Page (`/login`)

- Entry point for the app  
- Form-based authentication UI (can be connected to backend auth)  
- Redirects to dashboard on successful login  

### 2. Dashboard Overview

- **Metrics Cards**: Display real-time KPIs with animated changes and icons using `react-icons` and `framer-motion`  
- **Charts**: Line, bar, or custom charts powered by reusable components  
- **Data Table**: 
  - Displays user sales data  
  - Search by name or email  
  - Sort columns ascending/descending  
  - Filter by date range with integrated date picker  
  - Export data to CSV or PDF with `react-csv` and `jspdf` + `jspdf-autotable`  

### 3. Analytics Page

- Additional charts and analytics visualization  
- Loading skeletons for better UX during data fetch  

### 4. Responsive Design & Accessibility

- Fully responsive for desktop, tablet, and mobile  
- Dark mode support enabled via Tailwind CSS configuration  
- Keyboard and screen reader accessible UI components  

---

## Tech Stack

| Technology        | Purpose                            |
|-------------------|----------------------------------|
| **Next.js 13**    | Framework, Server-side rendering, Routing |
| **React 18**      | UI building                      |
| **TypeScript**    | Type safety and developer tooling |
| **Tailwind CSS**  | Utility-first CSS styling        |
| **Axios**         | HTTP requests                   |
| **React Icons**   | Iconography                      |
| **Framer Motion** | Animation and transitions        |
| **jspdf + jspdf-autotable** | Export PDF functionality  |
| **react-csv**     | Export CSV functionality          |

---

## Project Structure

```src/```<br>
```├── app/```<br>
```│ ├── login/       # Login page components```<br>
```│ ├── dashboard/   # Dashboard page and components```<br>
```│ ├── analytics/   # Analytics page and components```<br>
```│ ├── components/  # Shared components (Sidebar, DataTable, Charts)```<br>
```│ └── page.tsx     # Root page (redirect or landing)```<br>
```├── types/         # TypeScript declaration files```<br>
```└── styles/        # Tailwind and global styles```<br>


---

## Installation and Setup

### Prerequisites

- **Node.js** v18 or higher  
- npm or yarn package manager  
- Git client  

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/AkshanshTyagi-2003/admybrand-dashboard-v2-2025.git
cd admybrand-dashboard-v2-2025
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. **Access the app**
Open http://localhost:3000/login in your browser to start using the app from the login page.

---

## Configuration Notes
-ESLint and TypeScript errors are ignored during build for smooth deployment on Vercel using
```bash
next.config.ts
```
```bash
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
```
API URLs can be updated in the source code or configured via environment variables for production.
---
## Deployment

This project is optimized for deployment on Vercel with zero-config.
Just push your code to a GitHub repository and connect it in Vercel.
Vercel will automatically detect Next.js and build your app.

## Future Improvements

-Add real authentication and session management
-Connect with real backend APIs and databases
-Add role-based access control (RBAC)
-Implement unit and integration tests
-Enhance UI/UX with more charts and filters

## License

MIT License — see LICENSE for details.

## Contact

Akshansh Tyagi
LinkedIn: 
```bash
https://www.linkedin.com/in/akshansh-tyagi-961691330/
```
GitHub:
```bash
https://github.com/AkshanshTyagi-2003
```
Email:
```bash
akshanshtyagi2003@gmail.com
```



