import React from 'react';
import { Search as BookSearch, Home } from 'lucide-react';
import PropertySearchForm from './components/PropertySearchForm';
import LanguageToggle from './components/LanguageToggle';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BookSearch className="h-6 w-6" />
              <h1 className="text-xl font-bold">PropVerify</h1>
            </div>
            <LanguageToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <section className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6 space-x-3">
              <Home className="h-5 w-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Property Verification Portal</h2>
            </div>
            <p className="mb-8 text-gray-600">
              Search and verify property ownership and loan status across multiple government databases
            </p>
            
            <PropertySearchForm />
          </section>
        </main>

        <footer className="bg-gray-800 text-white p-6 mt-auto">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm">&copy; 2025 PropVerify. All rights reserved.</p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white text-sm">About</a>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
}

export default App;