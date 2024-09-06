import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { setAuthToken } from '../services/api';
import { Home, Clipboard, User, LogOut, Menu, X, Info, Star, Briefcase, DollarSign, Mail } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    navigate('/login');
  };

  const NavLink = ({ to, icon: Icon, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          isActive
            ? 'bg-blue-700 text-white'
            : 'text-gray-300 hover:bg-blue-700 hover:text-white'
        }`}
      >
        <Icon className="mr-2" size={16} />
        {children}
      </Link>
    );
  };

  return (
    <nav className={`fixed w-full z-10 transition-all duration-300 ${isScrolled ? 'bg-blue-600 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Clipboard className="h-8 w-8 text-white" />
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLink to="/" icon={Home}>Home</NavLink>
                <NavLink to="/about" icon={Info}>About</NavLink>
                <NavLink to="/features" icon={Star}>Features</NavLink>
                <NavLink to="/services" icon={Briefcase}>Services</NavLink>
                <NavLink to="/pricing" icon={DollarSign}>Pricing</NavLink>
                <NavLink to="/contact" icon={Mail}>Contact</NavLink>
                {isAuthenticated && (
                  <>
                    <NavLink to="/dashboard" icon={Clipboard}>Dashboard</NavLink>
                    <NavLink to="/profile" icon={User}>Profile</NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-blue-700 hover:text-white transition-colors duration-200"
                >
                  <LogOut className="mr-2" size={16} />
                  Logout
                </button>
              ) : (
                <div className="space-x-4">
                  <Link to="/login" className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                  <Link to="/register" className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors duration-200">Register</Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" icon={Home}>Home</NavLink>
            <NavLink to="/about" icon={Info}>About</NavLink>
            <NavLink to="/features" icon={Star}>Features</NavLink>
            <NavLink to="/services" icon={Briefcase}>Services</NavLink>
            <NavLink to="/pricing" icon={DollarSign}>Pricing</NavLink>
            <NavLink to="/contact" icon={Mail}>Contact</NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" icon={Clipboard}>Dashboard</NavLink>
                <NavLink to="/profile" icon={User}>Profile</NavLink>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-blue-700">
            <div className="flex items-center px-5">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-blue-700 hover:text-white transition-colors duration-200"
                >
                  <LogOut className="mr-2" size={16} />
                  Logout
                </button>
              ) : (
                <div className="space-y-2 w-full">
                  <Link to="/login" className="flex items-center justify-center w-full px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-blue-700 hover:text-white">Login</Link>
                  <Link to="/register" className="flex items-center justify-center w-full px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;