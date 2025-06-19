import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import page components
import HomePage from './components/Homepage';
import FindJobsPage from './components/FindJobs';
import AboutPage from './components/About';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import CompaniesPage from './components/Companies';
import ProfileRedirect from './components/ProfileRedirect';
import Profile from './components/Profile';
import CompanyProfile from './components/CompanyProfile';
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Main routes */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/jobs" element={<FindJobsPage />} />
                  <Route path='/companies' element = {<CompaniesPage />}/>
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path='/profile' element={<ProfileRedirect />}/>
                  <Route path='/jobseeker-profile' element={<Profile />}/>
                  <Route path='/company-profile' element={<CompanyProfile/>}/>
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;