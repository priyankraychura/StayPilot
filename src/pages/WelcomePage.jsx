import React, { useState } from 'react';
import { Building2, Languages, ArrowRight, Phone, UserCircle2, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const [slide, setSlide] = useState(0);
  const slides = [
    "Get updated with all PG related information",
    "Pay rent and manage bills easily",
    "Register complaints and get quick support",
  ];

  const navigate = useNavigate();

  return (
    <div className="font-sans min-h-screen w-full bg-cyan-50 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 pt-6">
        <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center transition-transform active:scale-95">
          <Languages className="w-6 h-6 text-blue-600" />
        </button>
        <h1 className="text-3xl font-bold text-blue-900 tracking-tight">PGManager</h1>
        <div className="w-10 h-10"></div> {/* Spacer */}
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-4 pt-8">
        {/* Login Card */}
        <div className="w-full max-w-sm bg-white rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex justify-center gap-1 items-center text-sm">
            <span className="text-gray-600 font-normal">Registered user?</span>
            <Link to="/login" className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Login Here <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Registration Card */}
        <div className="w-full max-w-sm bg-sky-100/70 rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="text-md font-medium flex justify-center text-gray-900 mb-5">New User Registration</h2>
          
          {/* Mobile Input - Fixed Spacing */}
          {/* Added 'p-2' to container for outer spacing, ensuring button doesn't touch edge */}
          <div className="relative flex items-center w-full bg-white rounded-full shadow-sm border border-transparent p-2 mb-5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <Mail className="w-5 h-5 text-gray-400 ml-2 mr-3 flex-shrink-0" />
            <input
              type="email"
              placeholder="Enter your personal email"
              className="flex-grow bg-transparent text-gray-700 placeholder-gray-500 text-sm focus:outline-none min-w-0"
            />
            {/* Button sits inside padding of parent, naturally spaced from edge */}
            <button 
              onClick={() => navigate('/otp')} 
              className="flex-shrink-0 px-5 py-2 text-sm font-medium text-gray-700 bg-[#EAF5F9] rounded-full hover:bg-sky-100 transition-colors"
            >
              Register
            </button>
          </div>

          {/* Separator */}
          <div className="flex items-center my-6 opacity-80">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">Or Register with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Other Providers */}
          <div className="flex justify-center space-x-8">
            <button className="flex flex-col items-center group">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <UserCircle2 className="w-7 h-7 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </div>
              <span className="text-xs font-medium text-gray-600">Account</span>
            </button>
            <button className="flex flex-col items-center group">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </div>
              <span className="text-xs font-medium text-gray-600">Other PG</span>
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center text-xs text-gray-600 max-w-xs leading-relaxed">
          By continuing, you agree to our{' '}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Terms Of Use
          </a>{' '}
          &{' '}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Privacy Policy
          </a>
        </div>
        <button className="mt-5 text-gray-700 font-medium hover:text-blue-600 transition-colors text-sm">
          Login as <span className='text-blue-600 font-semibold'>Guest</span>
        </button>
        <p className="text-center text-gray-400 text-[10px] mt-2 font-medium">V-1.0.0</p>
      </main>

      {/* Bottom Banner */}
      <footer className="w-full max-w-sm mx-auto p-4 mb-2">
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Icon Block */}
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xs font-semibold text-gray-800 leading-snug">
              {slides[slide]}
            </p>
          </div>
          {/* Pagination Dots */}
          <div className="flex space-x-1.5 flex-shrink-0 ml-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === slide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}