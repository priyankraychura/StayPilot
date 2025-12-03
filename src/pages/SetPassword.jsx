import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  BrainCircuit, 
  MailCheck, 
  ShieldCheck,
  KeyRound
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SetPassword() {
  const [step, setStep] = useState('email'); // 'email', 'otp', 'reset'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const otpInputs = useRef([]);
  
  // Safe navigation hooks
  let location, navigate;
  try {
    location = useLocation();
    navigate = useNavigate();
  } catch (e) {
    location = { pathname: '/' };
    navigate = () => {};
  }
  
  const currentPath = location.pathname;

  useEffect(() => {
    if(currentPath === "/otp") {
      setStep('otp');
    }
  }, [currentPath]);

  // --- OTP Input Handlers ---

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pastedData.some(char => isNaN(char))) return;
    
    const newOtp = [...otp];
    pastedData.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
    });
    setOtp(newOtp);
    otpInputs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  // --- Step Navigation Handlers ---

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        console.log('Email submitted:', email);
        setIsLoading(false);
        setStep('otp');
    }, 1000);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        console.log('OTP submitted:', otp.join(''));
        setIsLoading(false);
        setStep('reset');
    }, 1000);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!"); 
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
        console.log('Password reset successfully');
        setIsLoading(false);
        alert('Password Reset Successful!');
        navigate('/login');
    }, 1000);
  };

  const handleBack = () => {
    if (step === 'email') navigate('/login');
    else if (step === 'otp') setStep('email');
    else if (step === 'reset') setStep('otp');
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>

      {/* Header (Native-like Top Bar) */}
      <div className="w-full max-w-md px-4 pt-6 pb-2 z-20 flex items-center">
        <button 
          onClick={handleBack}
          className="p-2 -ml-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Wrapper */}
      <div className="w-full max-w-md flex-grow flex flex-col px-6 pb-8 z-10 relative">

        {/* --- STEP 1: EMAIL INPUT --- */}
        {step === 'email' && (
          <form className="flex flex-col h-full animate-in fade-in slide-in-from-right-8 duration-300" onSubmit={handleEmailSubmit}>
            <div className="flex-grow flex flex-col pt-4">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                    <BrainCircuit className="w-8 h-8 text-white" />
                </div>
                
                <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Forgot Password?</h1>
                <p className="text-slate-500 text-base leading-relaxed mb-8">
                    Don't worry! It happens. Please enter the email associated with your account.
                </p>
                
                <div className="space-y-6">
                    <div className="group">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-base font-medium shadow-sm"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-6">
                <button type="submit" disabled={isLoading} className="w-full py-4 px-4 text-base font-bold text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center">
                    {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Send Code"}
                </button>
            </div>
          </form>
        )}

        {/* --- STEP 2: OTP VERIFICATION --- */}
        {step === 'otp' && (
          <form className="flex flex-col h-full animate-in fade-in slide-in-from-right-8 duration-300" onSubmit={handleOtpSubmit}>
             <div className="flex-grow flex flex-col pt-4">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                    <MailCheck className="w-8 h-8 text-white" />
                </div>
                
                <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Check your email</h1>
                <p className="text-slate-500 text-base leading-relaxed mb-8">
                    We sent a code to <span className="font-semibold text-slate-900">{email || "your email"}</span>. Enter the 6 digit code below.
                </p>

                <div className="flex justify-between gap-2 mb-8 w-full" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                        <input 
                            key={index}
                            ref={el => otpInputs.current[index] = el}
                            type="text"
                            inputMode="numeric"
                            maxLength="1"
                            value={digit}
                            onChange={e => handleOtpChange(e, index)}
                            onKeyDown={e => handleOtpKeyDown(e, index)}
                            className="w-12 h-16 bg-white border border-slate-200 rounded-2xl text-center text-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                            required
                        />
                    ))}
                </div>
                
                <div className="text-center">
                     <p className="text-sm text-slate-500 font-medium">
                        Didn't receive code?{' '}
                        <button type="button" className="font-bold text-blue-600 hover:text-blue-700 transition-colors ml-1">
                            Resend
                        </button>
                    </p>
                </div>
            </div>

            <div className="mt-auto pt-6">
                <button type="submit" disabled={isLoading} className="w-full py-4 px-4 text-base font-bold text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center">
                      {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Verify Code"}
                </button>
            </div>
          </form>
        )}

        {/* --- STEP 3: RESET PASSWORD --- */}
        {step === 'reset' && (
          <form className="flex flex-col h-full animate-in fade-in slide-in-from-right-8 duration-300" onSubmit={handleResetSubmit}>
             <div className="flex-grow flex flex-col pt-4">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-600/20">
                    <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                
                <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Set new password</h1>
                <p className="text-slate-500 text-base leading-relaxed mb-8">
                    Your new password must be at least 8 characters long.
                </p>

                <div className="space-y-6">
                     <div className="group">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">New Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                            </div>
                            <input
                                type={showPass ? 'text' : 'password'}
                                placeholder="Min. 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-12 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-base font-medium shadow-sm"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                            >
                                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Confirm Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <KeyRound className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                            </div>
                            <input
                                type={showConfirmPass ? 'text' : 'password'}
                                placeholder="Re-enter password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-11 pr-12 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-base font-medium shadow-sm"
                                required
                            />
                             <button
                                type="button"
                                onClick={() => setShowConfirmPass(!showConfirmPass)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                            >
                                {showConfirmPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-6">
                <button type="submit" disabled={isLoading} className="w-full py-4 px-4 text-base font-bold text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center">
                     {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Reset Password"}
                </button>
            </div>
          </form>
        )}
        
      </div>

       {/* Tailwind Custom Animations */}
       <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}