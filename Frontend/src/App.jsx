import React from 'react';
import { Search as BookSearch, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import PropertySearchForm from './components/PropertySearchForm';
import LanguageToggle from './components/LanguageToggle';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-md"
        >
          <div className="container mx-auto flex justify-between items-center">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookSearch className="h-6 w-6" />
              <h1 className="text-xl font-bold">PropVerify</h1>
            </motion.div>
            <LanguageToggle />
          </div>
        </motion.header>

        <main className="container mx-auto px-4 py-8">
          <motion.section 
            className="max-w-4xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-6 space-x-3">
              <Home className="h-5 w-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Property Verification Portal</h2>
            </div>
            <motion.p 
              className="mb-8 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Search and verify property ownership and loan status across multiple government databases
            </motion.p>
            
            <PropertySearchForm />
          </motion.section>
        </main>

        <motion.footer 
          className="bg-gray-800 text-white p-6 mt-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm">&copy; 2025 PropVerify. All rights reserved.</p>
              </div>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  className="text-gray-300 hover:text-white text-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  About
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-300 hover:text-white text-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Privacy Policy
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-300 hover:text-white text-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Terms of Service
                </motion.a>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </LanguageProvider>
  );
}

export default App;