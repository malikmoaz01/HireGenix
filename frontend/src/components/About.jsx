import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Target, Award, Brain, Shield, Clock, TrendingUp, Star, CheckCircle } from 'lucide-react';
import TeamLeader from '../assets/1.png';

const HireGenixAbout = () => {
  const [successRate, setSuccessRate] = useState(89.2);
  const [totalHires, setTotalHires] = useState(12847);
  const [activeJobs, setActiveJobs] = useState(5420);
  const [companies, setCompanies] = useState(2890);

  // Auto-update success rate and stats
  useEffect(() => {
    const interval = setInterval(() => {
      setSuccessRate(prev => {
        const newRate = prev + (Math.random() * 0.3 - 0.1);
        return Math.min(Math.max(newRate, 88.5), 96.8);
      });
      
      setTotalHires(prev => prev + Math.floor(Math.random() * 3));
      setActiveJobs(prev => prev + Math.floor(Math.random() * 5 - 2));
      setCompanies(prev => prev + Math.floor(Math.random() * 2));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Matching",
      description: "Our intelligent algorithm matches candidates with jobs based on skills, experience, and preferences for perfect fits."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Trusted",
      description: "JWT authentication, bcrypt hashing, and secure data handling ensure your information is always protected."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Skill-Based Hiring",
      description: "Focus on what matters most - skills and competencies rather than just qualifications and experience."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Real-Time Updates",
      description: "Get instant notifications about application status, interview calls, and new job opportunities."
    }
  ];

  const teamFeatures = [
    {
      title: "For Job Seekers",
      items: [
        "Smart profile creation with skill tagging",
        "AI-powered job recommendations",
        "Resume builder and PDF upload",
        "Application tracking dashboard",
        "Skill-based job filtering"
      ]
    },
    {
      title: "For Employers",
      items: [
        "Advanced candidate filtering by skill match",
        "Bulk resume download and analysis",
        "Interview scheduling system",
        "Company branding and profile setup",
        "Applicant tracking system"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-2 shadow-lg mb-8">
              <Brain className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-600 font-semibold">Smart-Hire Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HireGenix
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Revolutionizing recruitment through intelligent skill-based matching. 
              Connect the right talent with the right opportunities, powered by cutting-edge technology.
            </p>

            {/* Dynamic Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {successRate.toFixed(1)}%
                </div>
                <div className="text-gray-600">Success Rate</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${successRate}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {totalHires.toLocaleString()}+
                </div>
                <div className="text-gray-600">Successful Hires</div>
                <TrendingUp className="h-6 w-6 text-green-500 mt-2" />
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {activeJobs.toLocaleString()}+
                </div>
                <div className="text-gray-600">Active Jobs</div>
                <Briefcase className="h-6 w-6 text-purple-500 mt-2" />
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {companies.toLocaleString()}+
                </div>
                <div className="text-gray-600">Partner Companies</div>
                <Users className="h-6 w-6 text-orange-500 mt-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white border-opacity-30 shadow-2xl">
                  <img 
                    src={TeamLeader} 
                    alt="Malik Moaz - Team Leader & CEO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-4xl font-bold mb-4">Meet Our CEO</h2>
                <h3 className="text-2xl font-semibold mb-6 text-blue-100">Malik Moaz</h3>
                <p className="text-lg text-blue-100 mb-6">
                  Team Leader & CEO of HireGenix, driving innovation in the recruitment industry 
                  through technology-powered solutions. With a vision to transform how companies 
                  find talent and how professionals discover opportunities.
                </p>
                <div className="flex items-center space-x-4">
                  <Award className="h-6 w-6 text-yellow-300" />
                  <span className="text-blue-100">Leading HireGenix to new heights</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white bg-opacity-10 rounded-2xl p-6">
                  <h4 className="text-xl font-semibold mb-3">Our Mission</h4>
                  <p className="text-blue-100">
                    To bridge the gap between talent and opportunity through intelligent, 
                    skill-based matching that benefits both job seekers and employers.
                  </p>
                </div>
                
                <div className="bg-white bg-opacity-10 rounded-2xl p-6">
                  <h4 className="text-xl font-semibold mb-3">Our Vision</h4>
                  <p className="text-blue-100">
                    To become the world's leading platform for skill-based recruitment, 
                    where every hire is a perfect match.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> HireGenix?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our Smart-Hire platform leverages advanced technology to create meaningful connections 
              between employers and job seekers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Platform Features */}
          <div className="grid md:grid-cols-2 gap-12">
            {teamFeatures.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <Star className="h-5 w-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of companies and professionals who trust HireGenix for their recruitment needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Start Hiring Today
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Find Your Dream Job
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HireGenixAbout;