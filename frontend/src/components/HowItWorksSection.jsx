import React from 'react';
import { User, Search, ArrowRight, CheckCircle } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Build a comprehensive profile showcasing your skills, experience, and career goals.",
      icon: <User className="h-8 w-8" />
    },
    {
      number: "02",
      title: "Get Matched",
      description: "Our smart algorithm finds the perfect job opportunities based on your profile.",
      icon: <Search className="h-8 w-8" />
    },
    {
      number: "03",
      title: "Apply & Connect",
      description: "Apply to jobs with one click and connect directly with hiring managers.",
      icon: <ArrowRight className="h-8 w-8" />
    },
    {
      number: "04",
      title: "Land Your Dream Job",
      description: "Interview with top companies and secure the career opportunity you deserve.",
      icon: <CheckCircle className="h-8 w-8" />
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with HireGenix is simple and straightforward
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="text-6xl font-bold text-gray-100 mb-4">{step.number}</div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;