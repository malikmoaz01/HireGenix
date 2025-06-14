import React from 'react';
import { User, Building2, TrendingUp, CheckCircle } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <User className="h-8 w-8" />,
      title: "Smart Job Matching",
      description: "Our AI-powered algorithm matches you with jobs that perfectly fit your skills and preferences.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Top Companies",
      description: "Connect with leading companies across all industries looking for talented professionals.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Career Growth",
      description: "Access resources, insights, and opportunities to accelerate your professional development.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Easy Application",
      description: "Apply to multiple jobs with one click and track your application status in real-time.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose HireGenix?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing the way people find jobs and companies hire talent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;