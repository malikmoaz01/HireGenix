// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MainLayout from './components/MainLayout';

// // Public Pages
// import HomePage from './components/Homepage';
// import FindJobsPage from './components/FindJobs';
// import AboutPage from './components/About';
// import LoginPage from './components/Login';
// import SignupPage from './components/Signup';
// import CompaniesPage from './components/Companies';
// import ProfileRedirect from './components/ProfileRedirect';
// import Profile from './components/Profile';

// // Company Dashboard
// import CompanyLayout from './components/Companies/CompanyLayout';
// import CompanyDashboard from './components/Companies/CompanyDashboard';
// import CompanyProfile from './components/Companies/CompanyProfile';
// import JobManagementApp from './components/Companies/JobManagement';
// import Candidates from './components/Companies/Candidatess';
// import Analytics from './components/Companies/Analytics';
// import Setting from './components/Companies/Setting';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Layout for public pages with Navbar/Footer */}
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/jobs" element={<FindJobsPage />} />
//           <Route path="/companies" element={<CompaniesPage />} />
//           <Route path="/profile" element={<ProfileRedirect />} />
//           <Route path="/jobseeker-profile" element={<Profile />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignupPage />} />
//         </Route>

//         {/* Layout for company dashboard */}
//         <Route path="/company_dashboard" element={<CompanyLayout />}>
//           <Route index element={<CompanyDashboard />} />
//           <Route path="company-profile" element={<CompanyProfile />} />
//           <Route path="job-management" element={<JobManagementApp />} />
//           <Route path="candidates" element={<Candidates />} />
//           <Route path="analytics" element={<Analytics />} />
//           <Route path="setting" element={<Setting />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectRoute';

import HomePage from './components/Homepage';
import FindJobsPage from './components/FindJobs';
import AboutPage from './components/About';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import CompaniesPage from './components/Companies';
import ProfileRedirect from './components/ProfileRedirect';
import Profile from './components/Profile';
import CompanyLayout from './components/Companies/CompanyLayout';
import CompanyDashboard from './components/Companies/CompanyDashboard';
import CompanyProfile from './components/Companies/CompanyProfile';
import JobManagementApp from './components/Companies/JobManagement';
import Candidates from './components/Companies/Candidatess';
import Analytics from './components/Companies/Analytics';
import Setting from './components/Companies/Setting';

const publicRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/jobs", element: <FindJobsPage /> },
  { path: "/companies", element: <CompaniesPage /> },
];

const authRoutes = [
  { path: "/login", element: <LoginPage />, publicOnly: true },
  { path: "/signup", element: <SignupPage />, publicOnly: true },
];

const jobseekerRoutes = [
  { path: "/profile", element: <ProfileRedirect /> },
  { path: "/jobseeker-profile", element: <Profile />, requiredRole: "jobseeker" },
];

const companyRoutes = [
  {
    path: "/company_dashboard",
    element: <CompanyLayout />,
    requiredRole: "company",
    children: [
      { index: true, element: <CompanyDashboard /> },
      { path: "company-profile", element: <CompanyProfile /> },
      { path: "job-management", element: <JobManagementApp /> },
      { path: "candidates", element: <Candidates /> },
      { path: "analytics", element: <Analytics /> },
      { path: "setting", element: <Setting /> },
    ],
  },
];

const App = () => {
  return (
     <Router>
  <Routes>
    <Route element={<MainLayout />}> 
      {publicRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute blockCompany={true}>{element}</ProtectedRoute>}
        />
      ))}
 
      {authRoutes.map(({ path, element, publicOnly }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute publicOnly={publicOnly}>{element}</ProtectedRoute>}
        />
      ))}
 
      {jobseekerRoutes.map(({ path, element, requiredRole }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute requiredRole={requiredRole}>{element}</ProtectedRoute>}
        />
      ))}
    </Route>
 
    {companyRoutes.map(({ path, element, requiredRole, children }) => (
      <Route
        key={path}
        path={path}
        element={<ProtectedRoute requiredRole={requiredRole}>{element}</ProtectedRoute>}
      >
        {children?.map((child) => (
          <Route key={child.path || "index"} {...child} />
        ))}
      </Route>
    ))}
  </Routes>
</Router>

  );
};

export default App;
