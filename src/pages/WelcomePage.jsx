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

  const navigate = useNavigate()

  return (
    <div className="font-sans min-h-screen w-full bg-cyan-50 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 pt-6">
        <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center">
          <Languages className="w-6 h-6 text-blue-600" />
        </button>
        <h1 className="text-3xl font-bold text-blue-900">PGManager</h1>
        <div className="w-10 h-10"></div> {/* Spacer */}
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-4 pt-8">
        {/* Login Card */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-4 mb-6">
          <div className="flex justify-center gap-1 items-center">
            <span className="text-gray-700 font-normal">Registered user?</span>
            <Link to="/login" className="flex items-center text-blue-600 font-semibold">
              Login Here <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Registration Card */}
        <div className="w-full max-w-sm bg-sky-100/70 rounded-xl shadow-lg p-4 mb-6">
          <h2 className="text-md font-medium flex justify-center text-gray-900 mb-4">New User Registration</h2>
          
          {/* Mobile Input - Overhauled */}
          <div className="relative flex items-center w-full bg-white rounded-full shadow-sm border border-gray-200 p-1.5 mb-4 focus-within:ring-2 focus-within:ring-blue-500">
            <Mail className="w-5 h-5 text-gray-400 mx-2 flex-shrink-0" />
            <input
              type="email"
              placeholder="Enter your personal email"
              className="flex-grow bg-transparent text-gray-900 placeholder-gray-500 text-sm focus:outline-none"
            />
            {/* This is the clickable "Register" button inside the input */}
            <button onClick={() => navigate('/otp')} className="flex-shrink-0 px-4 py-2.5 text-sm font-normal text-gray-600 border-gray-200 bg-sky-100/70 rounded-full hover:bg-gray-50 transition-all">
              Register
            </button>
          </div>

          {/* Separator */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">Or Register with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Other Providers */}
          <div className="flex justify-center space-x-6">
            <button className="flex flex-col items-center text-gray-600 hover:text-violet-600">
              <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center mb-2">
                <UserCircle2 className="w-8 h-8 text-gray-500" />
              </div>
              <span className="text-xs font-medium">Account</span>
            </button>
            <button className="flex flex-col items-center text-gray-600 hover:text-violet-600">
              <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center mb-2">
                <Building2 className="w-7 h-7 text-gray-500" />
              </div>
              <span className="text-xs font-medium">Other PG</span>
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center text-xs text-gray-900 max-w-sm">
          By continuing, you agree to our{' '}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Terms Of Use
          </a>{' '}
          &{' '}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Privacy Policy
          </a>
        </div>
        <button className="mt-4 text-gray-700 font-semibold hover:text-blue-600">
          Login as <span className='text-blue-600 '>Guest</span>
        </button>
        <p className="text-center text-gray-400 text-xs mt-3">V-1.0.0</p>
      </main>

      {/* Bottom Banner */}
      <footer className="w-full max-w-sm mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Placeholder for image */}
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Building2 className="w-7 h-7 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-800">
              {slides[slide]}
            </p>
          </div>
          {/* Pagination Dots */}
          <div className="flex space-x-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`w-2 h-2 rounded-full ${
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