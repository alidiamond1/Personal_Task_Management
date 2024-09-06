import React from 'react';
import { Check, Edit, Trash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskList = ({ tasks, onEdit, onDelete, onToggleCompletion }) => {
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="divide-y divide-gray-200 dark:divide-gray-700"
    >
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.li
            key={task._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <button
                onClick={() => onToggleCompletion(task._id)}
                className={`mr-3 flex-shrink-0 h-5 w-5 border-2 rounded-full ${
                  task.status === 'completed'
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                {task.status === 'completed' && <Check className="h-4 w-4 text-white" />}
              </button>
              <span className={`text-gray-800 dark:text-gray-200 ${task.status === 'completed' ? 'line-through' : ''}`}>
                {task.title}
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => onEdit(task)}
                className="mr-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash size={18} />
              </button>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default TaskList;