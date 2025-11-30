import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, BrainCircuit, MailCheck, ShieldCheck } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SetPassword() {
  const [step, setStep] = useState('email'); // 'email', 'otp', 'reset'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const otpInputs = useRef([]);
  const location = useLocation()
  const currentPath = location.pathname
  const navigate = useNavigate()

  useEffect(() => {
    if(currentPath == "/otp") {
      setStep('otp')
    }
  }, [])

  // --- OTP Input Handlers ---

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    // Only allow numbers
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Set only the last digit entered
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // Auto-focus previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  // --- Step Navigation Handlers ---

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // TODO: Add email submission logic (e.g., API call)
    setStep('otp'); // Move to next step
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log('OTP submitted:', otp.join(''));
    // TODO: Add OTP verification logic
    setStep('reset'); // Move to next step
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!"); // Use a modal in a real app
      return;
    }
    console.log('Password reset successfully');
    // TODO: Add password reset logic
    alert('Password Reset Successful!');
    setStep('email'); // Go back to start (or a login page)
  };

  const goToLogin = () => {
    console.log('Go back to login');
    // TODO: Add navigation logic to go to login page
    setStep('email'); // For demo, just reset to first step
    navigate('/login')
  };

  // --- Main Render ---

  return (
    <div className="font-sans bg-cyan-50 min-h-screen w-full max-w-md mx-auto shadow-xl flex flex-col p-6 pt-10">
      
      {/* --- STEP 1: FORGOT PASSWORD (EMAIL) --- */}
      {step === 'email' && (
        <form className="w-full flex flex-col flex-grow" onSubmit={handleEmailSubmit}>
          <header className="flex items-center mb-12">
            <button type="button" onClick={goToLogin} className="text-blue-600 hover:text-blue-700 p-2 -ml-2">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-blue-900 mx-auto">PGManager</h1>
            <div className="w-10"></div> {/* Spacer to balance header */}
          </header>
          
          <div className="flex-grow flex flex-col items-center pt-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <BrainCircuit className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Forgot Your Password and Continue</h2>
            
            {/* Email Input */}
            <div className="relative w-full mb-6">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded-full py-3 px-5 pl-12 text-gray-800 placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full shadow-lg shadow-blue-500/30 transition-all">
              Submit Now
            </button>
          </div>

          <div className="text-center mt-auto pb-4">
            <button type="button" onClick={goToLogin} className="text-sm font-medium text-gray-600 hover:text-blue-600 flex items-center justify-center w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              back to login
            </button>
          </div>
        </form>
      )}

      {/* --- STEP 2: VERIFY EMAIL (OTP) --- */}
      {step === 'otp' && (
        <form className="w-full flex flex-col flex-grow" onSubmit={handleOtpSubmit}>
          <header className="flex items-center justify-center mb-12">
            <h1 className="text-xl font-semibold text-blue-900">PGManager</h1>
          </header>

          <div className="flex-grow flex flex-col items-center pt-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <MailCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Verify Your Email to Begin Door Deliveries</h2>
            <p className="text-gray-500 mb-8">Enter the 6-digit verification code</p>
            
            {/* OTP Inputs */}
            <div className="flex justify-center gap-2 mb-8">
              {otp.map((digit, index) => (
                <input 
                  key={index}
                  ref={el => otpInputs.current[index] = el}
                  type="tel" // 'tel' prompts number pad on mobile
                  maxLength="1"
                  value={digit}
                  onChange={e => handleOtpChange(e, index)}
                  onKeyDown={e => handleOtpKeyDown(e, index)}
                  className="w-12 h-14 bg-white border border-gray-200 rounded-lg text-center text-2xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              ))}
            </div>
            
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full shadow-lg shadow-blue-500/30 transition-all">
              Continue
            </button>
          </div>

          <div className="text-center mt-auto pb-4">
            <p className="text-sm text-gray-500">
              Didn't you receive any code?{' '}
              <button type="button" className="font-semibold text-blue-600 hover:text-blue-700">
                Resend Code
              </button>
            </p>
          </div>
        </form>
      )}

      {/* --- STEP 3: RESET PASSWORD --- */}
      {step === 'reset' && (
        <form className="w-full flex flex-col flex-grow" onSubmit={handleResetSubmit}>
          <header className="flex items-center justify-center mb-12">
            <h1 className="text-xl font-semibold text-blue-900">PG Manager</h1>
          </header>

          <div className="flex-grow flex flex-col items-center pt-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Reset Password to Access Doorstep Deliveries</h2>
            
            {/* Password Inputs */}
            <div className="w-full space-y-4 mb-6">
              {/* New Password */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white rounded-full py-3 px-5 pl-12 pr-12 text-gray-800 placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-500 hover:text-gray-700">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Confirm Password */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.targe.value)}
                  className="w-full bg-white rounded-full py-3 px-5 pl-12 pr-12 text-gray-800 placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-500 hover:text-gray-700">
                  {showConfirmPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full shadow-lg shadow-blue-500/30 transition-all">
              Continue
            </button>
          </div>

          <div className="text-center mt-auto pb-4">
            <button type="button" className="text-sm font-medium text-gray-600 hover:text-blue-600" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}