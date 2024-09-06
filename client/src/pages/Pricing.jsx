import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Basic',
      monthlyPrice: 'Free',
      annualPrice: 'Free',
      features: ['Up to 50 tasks', 'Basic task management', 'Email support'],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      monthlyPrice: '$9.99',
      annualPrice: '$99.99',
      features: ['Unlimited tasks', 'Advanced task management', 'Team collaboration', 'Priority support'],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      features: ['All Pro features', 'Custom integrations', 'Dedicated account manager', '24/7 phone support'],
      cta: 'Contact Sales',
      highlighted: false,
    },
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
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Pricing Plans</h2>
          <p className="mt-4 text-xl text-gray-500">Choose the perfect plan for your needs</p>
        </motion.div>

        <motion.div className="mt-12 flex justify-center" variants={itemVariants}>
          <div className="relative flex items-center">
            <span className={`mr-3 text-sm ${!isAnnual ? 'font-semibold' : ''}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`ml-3 text-sm ${isAnnual ? 'font-semibold' : ''}`}>Annual</span>
          </div>
        </motion.div>

        <motion.div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8" variants={itemVariants}>
          {plans.map((plan) => (
            <motion.div 
              key={plan.name} 
              className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col ${plan.highlighted ? 'border-blue-600 ring-2 ring-blue-600' : 'border-gray-200'}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                {plan.highlighted && (
                  <p className="absolute top-0 py-1.5 px-4 bg-blue-600 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">Most Popular</p>
                )}
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  {plan.monthlyPrice !== 'Custom' && (
                    <span className="ml-1 text-xl font-semibold">
                      {isAnnual ? '/year' : '/month'}
                    </span>
                  )}
                </p>
                {isAnnual && plan.monthlyPrice !== 'Custom' && (
                  <p className="mt-1 text-sm text-gray-500">
                    Billed annually (Save {((Number(plan.monthlyPrice.replace('$', '')) * 12 - Number(plan.annualPrice.replace('$', ''))) / (Number(plan.monthlyPrice.replace('$', '')) * 12) * 100).toFixed(0)}%)
                  </p>
                )}
                <ul className="mt-6 space-y-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 w-6 h-6 text-green-500" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#"
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Pricing;