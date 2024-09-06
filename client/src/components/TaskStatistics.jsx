import { PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskStatistics = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
    >
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <PieChart className="mr-2" /> Task Statistics
      </h3>
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed: {completedTasks}</p>
      <p>Pending: {pendingTasks}</p>
    </motion.div>
  );
};

export default TaskStatistics;