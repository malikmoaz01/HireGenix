# 🧠 HireGenix – Skill-Based Hiring Platform

## 🔰 Objective

**HireGenix** is a MERN-based platform designed to connect employers and job seekers through **skill-set-based job hiring**. The system uses intelligent matching to suggest relevant jobs to candidates based on their skills, and helps companies find ideal candidates faster.

---

## 🔑 Main Features

### 👨‍💻 For Job Seekers (Users)

- **Signup/Login** (JWT Auth, bcrypt hashing)
- **Create/Edit Profile**
  - Personal Info
  - Resume Upload (PDF)
  - Skills (tag-based: React, Node, Python, etc.)
  - Experience & Education
- **Browse Jobs**
  - Filter by Skill, Location, Job Type, Experience
- **Skill-Based Job Recommendations**
  - Backend algorithm for job suggestions
- **Apply to Jobs**
  - Apply button
  - Application status: Pending, Rejected, Accepted
- **Application History Tracking**

---

### 🏢 For Employers (Companies)

- **Signup/Login**
- **Company Profile Setup**
- **Post Jobs**
  - Title, Description, Required Skills, Salary, Location
- **View Applicants**
  - Filter by skill match %
  - Download resumes
  - Shortlist / Reject Applicants
  - Send interview calls via email or message

---

### 📊 Admin Panel *(Optional)*

- View all users and employers
- Block/Unblock accounts
- Delete inappropriate jobs
- **Dashboard Analytics**
  - Total Jobs Posted
  - Applications Submitted
  - Top In-Demand Skills

---

## 🛠 Tech Stack

### Frontend (React.js)
- TailwindCSS or Material UI
- Axios
- React Router
- Redux (optional)

### Backend (Node.js + Express.js)
- REST APIs
- JWT Authentication
- bcrypt for password hashing
- Role-based access: user, employer, admin

### Database (MongoDB)
- Collections: `Users`, `Jobs`, `Applications`, `Companies`

---

## 💡 Bonus Features (Optional Enhancements)

- Skill Match Percentage (Required vs. Candidate Skills)
- Resume Parsing (PDF parsing library)
- Email Notifications (NodeMailer)
- Employer–Job Seeker Chat System
- Integration with LinkedIn / GitHub profiles

---

## 📌 Note

This is a full-stack project ideal for portfolio, internships, or demonstrating MERN skills in professional settings.

---
