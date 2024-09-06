import React from 'react';
import { Users, Target, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const stats = [
    { label: 'Users', value: '10,000+', icon: Users },
    { label: 'Tasks Completed', value: '1,000,000+', icon: Target },
    { label: 'Years of Experience', value: '5+', icon: Award },
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
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About TaskTracker</h2>
          <p className="mt-4 text-xl text-gray-500">Empowering productivity since 2019</p>
        </motion.div>

        <motion.div className="mt-20" variants={itemVariants}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <motion.div className="relative p-8 bg-white shadow-lg rounded-lg" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="inline-flex p-3 bg-blue-600 rounded-full shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900">Our Mission</h3>
              <p className="mt-4 text-base text-gray-500">
                At TaskTracker, we're on a mission to simplify task management and boost productivity for individuals and teams worldwide.
              </p>
            </motion.div>
            <motion.div className="relative p-8 bg-white shadow-lg rounded-lg" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="inline-flex p-3 bg-blue-600 rounded-full shadow-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900">Our Vision</h3>
              <p className="mt-4 text-base text-gray-500">
                We envision a world where everyone can achieve their goals efficiently, one task at a time, using our intuitive and powerful platform.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="mt-20" variants={itemVariants}>
          <h3 className="text-2xl font-bold text-gray-900 text-center">Our Impact</h3>
          <dl className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((stat) => (
              <motion.div 
                key={stat.label} 
                className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                  <stat.icon className="mr-2 h-5 w-5 text-blue-600" />
                  {stat.label}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;