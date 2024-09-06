import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import { Plus, Filter, ArrowUpDown, Search, Calendar, Activity, PieChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskList from '../components/TaskList';
import TaskStatistics from '../components/TaskStatistics';
import UpcomingDeadlines from '../components/UpcomingDeadlines';
import RecentActivities from '../components/RecentActivities';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      try {
        const response = await createTask({ title: newTask });
        setTasks([...tasks, response.data]);
        setNewTask('');
        toast.success('Task added successfully!');
      } catch (error) {
        console.error('Error adding task:', error);
        toast.error('Failed to add task. Please try again.');
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask({ ...task });
  };

  const handleUpdateTask = async () => {
    try {
      const response = await updateTask(editingTask._id, editingTask);
      setTasks(tasks.map(task => task._id === editingTask._id ? response.data : task));
      setEditingTask(null);
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.');
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    try {
      const taskToUpdate = tasks.find(task => task._id === taskId);
      const updatedTask = await updateTask(taskId, { status: taskToUpdate.status === 'completed' ? 'pending' : 'completed' });
      setTasks(tasks.map(task => task._id === taskId ? updatedTask.data : task));
      toast.success(`Task marked as ${updatedTask.data.status}!`);
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task status. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast.success(response.msg || 'Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
        toast.error(`Failed to delete task: ${error.response.data.msg || 'Unknown server error'}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('Failed to delete task: No response from server');
      } else {
        console.error('Error setting up request:', error.message);
        toast.error(`Failed to delete task: ${error.message}`);
      }
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === 'createdAt') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <motion.h2
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white"
      >
        My Dashboard
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <TaskStatistics tasks={tasks} />
        <UpcomingDeadlines tasks={tasks} />
        <RecentActivities tasks={tasks} />
      </motion.div>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleAddTask}
        className="mb-8"
      >
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow px-4 py-3 bg-transparent focus:outline-none dark:text-white"
          />
          <button type="submit" className="bg-blue-500 text-white p-3 hover:bg-blue-600 transition duration-300">
            <Plus size={20} />
          </button>
        </div>
      </motion.form>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-4 flex flex-wrap justify-between items-center"
      >
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex space-x-4">
          <FilterDropdown filter={filter} setFilter={setFilter} />
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </motion.div>
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-4"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading tasks...</p>
          </motion.div>
        ) : (
          <TaskList
            key="tasklist"
            tasks={sortedTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleCompletion={toggleTaskCompletion}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {editingTask && (
          <EditTaskModal
            key="editmodal"
            task={editingTask}
            onClose={() => setEditingTask(null)}
            onUpdate={handleUpdateTask}
            onChange={(field, value) => setEditingTask({ ...editingTask, [field]: value })}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="w-full md:w-auto mb-2 md:mb-0">
    <div className="relative">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  </div>
);

const FilterDropdown = ({ filter, setFilter }) => (
  <div>
    <label htmlFor="filter" className="mr-2 text-gray-700 dark:text-gray-300">Filter:</label>
    <select
      id="filter"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
    >
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="in-progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  </div>
);

const SortDropdown = ({ sortBy, setSortBy }) => (
  <div>
    <label htmlFor="sort" className="mr-2 text-gray-700 dark:text-gray-300">Sort by:</label>
    <select
      id="sort"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
    >
      <option value="createdAt">Created Date</option>
      <option value="dueDate">Due Date</option>
      <option value="title">Title</option>
    </select>
  </div>
);

const EditTaskModal = ({ task, onClose, onUpdate, onChange }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Edit Task</h3>
      <input
        type="text"
        value={task.title}
        onChange={(e) => onChange('title', e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
        >
          Cancel
        </button>
        <button
          onClick={onUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
        >
          Update
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default Dashboard;