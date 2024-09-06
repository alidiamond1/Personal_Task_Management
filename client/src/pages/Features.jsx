import React from 'react';
import { CheckCircle, Clock, Users, Zap, Bell, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    { name: 'Task Management', description: 'Create, edit, and organize tasks effortlessly', icon: CheckCircle },
    { name: 'Due Dates', description: 'Set and track deadlines for your tasks', icon: Clock },
    { name: 'Collaboration', description: 'Share tasks and collaborate with team members', icon: Users },
    { name: 'Productivity Boost', description: 'Increase your efficiency and get more done', icon: Zap },
    { name: 'Reminders', description: 'Get notified about upcoming and overdue tasks', icon: Bell },
    { name: 'Tags and Categories', description: 'Organize tasks with custom tags and categories', icon: Tag },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.1 } }
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
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Powerful Features</h2>
          <p className="mt-4 text-xl text-gray-500">Discover what makes TaskTracker the best choice for managing your tasks</p>
        </motion.div>

        <motion.div className="mt-20" variants={itemVariants}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div 
                key={feature.name} 
                className="relative p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="inline-flex p-3 bg-blue-600 rounded-full shadow-lg">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900">{feature.name}</h3>
                <p className="mt-4 text-base text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Features;