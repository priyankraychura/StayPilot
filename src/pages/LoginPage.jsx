import React, { useState } from 'react';
import { ArrowLeft, User, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Google Icon SVG (unchanged)
const GoogleIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 48 48" 
    width="48px" 
    height="48px" 
    {...props}
  >
    <path 
      fill="#FFC107" 
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path 
      fill="#FF3D00" 
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path 
      fill="#4CAF50" 
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.565-3.34-11.303-7.96l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path 
      fill="#1976D2" 
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.088,5.571l6.19,5.238C41.31,34.125,44,29.69,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);


export default function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()
  // Renamed 'MPIN' to 'Passkey'
  const [loginMethod, setLoginMethod] = useState('Password'); // Can be 'Passkey' or 'Password'

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { userId, password, loginMethod });
    // TODO: Implement actual login logic here
    // localStorage.setItem("token")
    // navigate('/dashboard')
    window.location.replace('/dashboard')
  };

  const handlePasskeyLogin = () => {
    console.log('Signing in with Passkey method'); // This is now for the toggle
    // TODO: Implement Passkey specific login flow if different from password
  };

  const handleGoogleLogin = () => {
    console.log('Signing in with Google');
    // TODO: Implement Google login logic
  };

  return (
    <div className="font-sans min-h-screen w-full bg-cyan-50 flex flex-col p-4 sm:max-w-md sm:mx-auto sm:rounded-lg sm:my-8">
      {/* Top Bar */}
      <div className="items-center mb-8">
        <button onClick={() => navigate('/')} className="p-2 rounded-full hover:bg-cyan-100 text-blue-600">
          <ArrowLeft className="w-6 h-6" />
        </button>
        {/* <div className="flex-grow"></div> Spacer to push RailOne to center */}
        {/* You can replace this with an actual logo image if you have one */}
        <h1 className="flex justify-center text-3xl font-bold text-gray-800 tracking-tight">RailOne</h1>
        {/* <div className="flex-grow"></div> Spacer */}
      </div>

      {/* Login Options Header */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-lg font-semibold text-gray-800">Login with</h2>
        <div className="flex space-x-2 bg-gray-200 p-1 rounded-full">
          <button
            onClick={() => setLoginMethod('Passkey')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              loginMethod === 'Passkey'
                ? 'bg-white text-gray-800 shadow'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Passkey {/* Changed from MPIN to Passkey */}
          </button>
          <button
            onClick={() => setLoginMethod('Password')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              loginMethod === 'Password'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Password
          </button>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="flex-grow flex flex-col">
        <div className="space-y-4 mb-6">
          {/* User ID / Mobile Number Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="User ID / Mobile Number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              required
            />
          </div>

          {/* Password Input */}
          {loginMethod === 'Password' && ( // Only show password if method is Password
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Forgot Password (only visible with Password method) */}
        {loginMethod === 'Password' && (
          <div className="text-right mb-5 pr-2">
            <button onClick={() => navigate('/forgotpass')} type="button" className="text-sm font-medium text-blue-600 hover:underline">
              Forgot Password?
            </button>
          </div>
        )}
        
        {/* Main Login Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 text-base font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors mb-1"
        >
          {loginMethod === 'Passkey' ? 'Login with Passkey' : 'Login'}
        </button>

        {/* Or Separator */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Sign in with Google Button (Passkey button removed) */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 px-4 text-base font-semibold text-gray-800 border border-gray-300 rounded-full bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          <GoogleIcon className="w-5 h-5" /> {/* Google icon */}
          Sign in with Google
        </button>
      </form>

      {/* Don't have an account? */}
      <p className="text-center text-gray-500 text-sm mt-auto pb-4">
        Don't have an account?{' '}
        <a href="#" className="font-semibold text-blue-600 hover:underline">
          Sign Up
        </a>
      </p>
      {/* Version text */}
      <p className="text-center text-gray-400 text-xs">V-1.0.0</p>
    </div>
  );
}