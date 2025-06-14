import React from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

// Simple Router Component
export const Router = ({ children, currentPath }) => {
  return (
    <div>
      {React.Children.map(children, child => {
        if (child.props.path === currentPath) {
          return child.props.children;
        }
        return null;
      })}
    </div>
  );
};

export const Route = ({ path, children }) => children;

// Home Page Component
const HomePage = ({ setCurrentPath }) => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection setCurrentPath={setCurrentPath} />
    </div>
  );
};

// Other Pages (Placeholder)
export const JobsPage = () => (
  <div className="py-20 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Jobs</h1>
    <p className="text-xl text-gray-600">Job listings coming soon...</p>
  </div>
);

export const CompaniesPage = () => (
  <div className="py-20 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Companies</h1>
    <p className="text-xl text-gray-600">Company profiles coming soon...</p>
  </div>
);

export const AboutPage = () => (
  <div className="py-20 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
    <p className="text-xl text-gray-600">Learn more about HireGenix...</p>
  </div>
);

export const LoginPage = () => (
  <div className="py-20 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Login</h1>
    <p className="text-xl text-gray-600">Login form coming soon...</p>
  </div>
);

export const SignupPage = () => (
  <div className="py-20 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Sign Up</h1>
    <p className="text-xl text-gray-600">Registration form coming soon...</p>
  </div>
);

export default HomePage;