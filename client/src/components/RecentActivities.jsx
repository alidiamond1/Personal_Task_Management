import { Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RecentActivities = ({ tasks }) => {
  const recentActivities = tasks
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
    >
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <Activity className="mr-2" /> Recent Activities
      </h3>
      <AnimatePresence>
        {recentActivities.map(task => (
          <motion.li
            key={task._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-2"
          >
            <span className="font-medium">{task.title}</span>
            <br />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Updated: {new Date(task.updatedAt).toLocaleString()}
            </span>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default RecentActivities;