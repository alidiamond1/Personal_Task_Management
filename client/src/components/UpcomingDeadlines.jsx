import { Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UpcomingDeadlines = ({ tasks }) => {
  const upcomingTasks = tasks
    .filter(task => task.status !== 'completed' && new Date(task.dueDate) > new Date())
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
    >
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <Calendar className="mr-2" /> Upcoming Deadlines
      </h3>
      <AnimatePresence>
        {upcomingTasks.map(task => (
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
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default UpcomingDeadlines;