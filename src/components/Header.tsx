import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Header: React.FC = () => {
  const location = useLocation();
  
  // Test Supabase connection (optional)
  React.useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.from('Billing').select('count').limit(1);
        if (error) {
          console.log('Supabase connection test:', error.message);
        } else {
          console.log('Supabase connected successfully');
        }
      } catch (err) {
        console.log('Supabase connection error:', err);
      }
    };
    testConnection();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Resume Pro
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <span>Home</span>
            </Link>
            <Link
              to="/builder"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/builder') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <span>Builder</span>
            </Link>
            <Link
              to="/cover-letter"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/cover-letter') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <span>Cover Letter</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Navigation items only */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;