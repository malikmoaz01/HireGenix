import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/Homepage';
import FindJobsPage from './components/FindJobs';
import AboutPage from './components/About';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import CompaniesPage from './components/Companies';
import ProfileRedirect from './components/ProfileRedirect';
import Profile from './components/Profile';

// Company layout + routes
import CompanyLayout from './components/Companies/CompanyLayout';
import CompanyDashboard from './components/Companies/CompanyDashboard';
import CompanyProfile from './components/Companies/CompanyProfile';
import JobManagementApp from './components/Companies/JobManagement';
import Candidates from './components/Companies/Candidatess';
import Analytics from './components/Companies/Analytics';
import Setting from './components/Companies/Setting';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Company Dashboard Layout with nested children - NO SIDEBAR DUPLICATION */}
        <Route path="/company_dashboard" element={<CompanyLayout />}>
          <Route index element={<CompanyDashboard />} />
          <Route path="company-profile" element={<CompanyProfile />} />
          <Route path="job-management" element={<JobManagementApp />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        {/* Public Routes with Navbar and Footer */}
        <Route path="/signup" element={
          <>
            <Navbar />
            <SignupPage />
            <Footer />
          </>
        } />
        <Route path="/login" element={
          <>
            <Navbar />
            <LoginPage />
            <Footer />
          </>
        } />
        <Route path="/" element={
          <>
            <Navbar />
            <HomePage />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <AboutPage />
            <Footer />
          </>
        } />
        <Route path="/jobs" element={
          <>
            <Navbar />
            <FindJobsPage />
            <Footer />
          </>
        } />
        <Route path="/companies" element={
          <>
            <Navbar />
            <CompaniesPage />
            <Footer />
          </>
        } />
        <Route path="/profile" element={
          <>
            <Navbar />
            <ProfileRedirect />
            <Footer />
          </>
        } />
        <Route path="/jobseeker-profile" element={
          <>
            <Navbar />
            <Profile />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
};

export default App;