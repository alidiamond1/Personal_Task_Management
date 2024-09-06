import React from 'react';
import { Briefcase, Users, BarChart, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    { name: 'Personal Task Management', description: 'Organize your personal tasks and boost your productivity', icon: Briefcase },
    { name: 'Team Collaboration', description: 'Collaborate with your team and manage projects efficiently', icon: Users },
    { name: 'Analytics and Reporting', description: 'Gain insights into your productivity with detailed reports', icon: BarChart },
    { name: 'Premium Support', description: '24/7 support for our premium users', icon: Headphones },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-xl text-gray-500">Comprehensive solutions for all your task management needs</p>
        </motion.div>

        <motion.div className="mt-20" variants={itemVariants}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service) => (
              <motion.div 
                key={service.name} 
                className="relative p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute top-0 left-0 -mt-4 -ml-4 p-3 bg-blue-600 rounded-full shadow-lg">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">{service.name}</h3>
                <p className="mt-4 text-base text-gray-500">{service.description}</p>
                <a href="#" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500">
                  Learn more
                  <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Services;