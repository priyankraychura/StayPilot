import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Fingerprint, 
  LogIn, 
  UserPlus 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Assets ---

const GoogleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
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

// --- Main Component ---

export default function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('Password'); // 'Passkey' | 'Password'
  const [isLoading, setIsLoading] = useState(false);

  // Use hook safely; fallback for demo if not inside a Router context
  let navigate;
  try {
    navigate = useNavigate();
  } catch (e) {
    navigate = (path) => console.log(`Navigating to ${path}`);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
        console.log('Logging in with:', { userId, password, loginMethod });
        setIsLoading(false);
        // window.location.replace('/dashboard');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    console.log('Signing in with Google');
  };

  return (
    <div className="min-h-screen w-full flex font-sans bg-white overflow-hidden">
      
      {/* --- LEFT PANEL (Visuals - Hidden on Mobile, Visible on Desktop) --- */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
         
         {/* Animated Background Elements */}
         <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob"></div>
         <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
         <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-blob animation-delay-4000"></div>
         
         {/* Glass Card Content */}
         <div className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/10 p-12 rounded-[40px] max-w-xl mx-12 text-white shadow-2xl">
             <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30">
                <ShieldCheck className="text-white w-9 h-9" />
             </div>
             
             <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
                Manage your PG <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Like a Pro.</span>
             </h1>
             
             <p className="text-slate-300 text-lg leading-relaxed opacity-90 mb-8">
                Streamline bookings, track payments, and manage tenants efficiently with our all-in-one dashboard designed for modern property managers.
             </p>

             {/* Stat/Trust Badge */}
             <div className="flex items-center gap-4 bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/5">
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                       <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-700" alt="User" />
                   ))}
                </div>
                <div>
                    <p className="font-bold text-sm">Trusted by 1k+ Owners</p>
                    <p className="text-xs text-slate-400">Join the community today</p>
                </div>
             </div>
         </div>

         {/* Grid Pattern Overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* --- RIGHT PANEL (Login Form) --- */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-12 relative bg-slate-50 lg:bg-white">
          
          {/* Mobile-only background blobs for visual interest on small screens */}
          <div className="lg:hidden absolute top-[-10%] right-[-5%] w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          
          {/* Back Button (Absolute) */}
          <button 
                onClick={() => navigate('/')} 
                className="absolute top-6 left-6 lg:top-12 lg:left-12 p-3 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Go back"
            >
                <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="w-full max-w-md space-y-8 relative z-10">
             
             {/* Header */}
             <div className="text-center lg:text-left">
                <div className="lg:hidden inline-flex w-14 h-14 bg-blue-600 rounded-2xl items-center justify-center mb-6 shadow-xl shadow-blue-600/20">
                    <ShieldCheck className="text-white w-8 h-8" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">Welcome back</h2>
                <p className="text-slate-500 text-base">Please enter your details to sign in.</p>
             </div>

             {/* Custom Tab Switcher */}
             <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center relative">
                <div 
                    className={`absolute h-[calc(100%-12px)] w-[calc(50%-6px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out top-1.5 ${
                        loginMethod === 'Passkey' ? 'left-1.5' : 'left-[calc(50%+6px)]'
                    }`}
                />
                
                <button
                    onClick={() => setLoginMethod('Passkey')}
                    className={`flex-1 relative z-10 py-3 text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 ${
                        loginMethod === 'Passkey' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    <Fingerprint className="w-4 h-4" />
                    Passkey
                </button>
                <button
                    onClick={() => setLoginMethod('Password')}
                    className={`flex-1 relative z-10 py-3 text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 ${
                        loginMethod === 'Password' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    <Lock className="w-4 h-4" />
                    Password
                </button>
             </div>

             {/* Form */}
             <form onSubmit={handleLogin} className="flex flex-col space-y-5">
                
                {/* User ID Input */}
                <div className="group space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 ml-1">
                        User ID / Mobile
                    </label>
                    <div className="relative transition-all duration-200 focus-within:transform focus-within:scale-[1.01]">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium"
                            required
                        />
                    </div>
                </div>

                {/* Password Input */}
                {loginMethod === 'Password' && (
                    <div className="group space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex justify-between items-center ml-1">
                             <label className="block text-sm font-semibold text-slate-700">
                                Password
                            </label>
                             <button 
                                type="button" 
                                onClick={() => navigate('/forgotpass')}
                                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Forgot Password?
                            </button>
                        </div>
                       
                        <div className="relative transition-all duration-200 focus-within:transform focus-within:scale-[1.01]">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm font-medium"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                )}

                {/* Passkey Info Text */}
                {loginMethod === 'Passkey' && (
                     <div className="text-center py-4 bg-blue-50 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-bottom-2">
                        <Fingerprint className="w-8 h-8 text-blue-500 mx-auto mb-2 opacity-80" />
                        <p className="text-sm font-medium text-slate-700">
                            Scan your biometrics to login instantly.
                        </p>
                     </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 px-4 text-base font-bold text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 mt-4 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? (
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <span>{loginMethod === 'Passkey' ? 'Continue with Passkey' : 'Sign In'}</span>
                            <LogIn className="w-5 h-5 opacity-90" />
                        </>
                    )}
                </button>

                {/* Divider */}
                <div className="relative flex items-center py-4">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">Or continue with</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* Social Login */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full py-4 px-4 text-sm font-semibold text-slate-700 border border-slate-200 rounded-2xl bg-white hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all duration-200 flex items-center justify-center gap-3 active:scale-[0.99]"
                >
                    <GoogleIcon className="w-5 h-5" />
                    <span>Google Account</span>
                </button>
             </form>

             {/* Footer Links */}
             <div className="pt-4 text-center">
                <p className="text-slate-500 text-sm">
                    Don't have an account?{' '}
                    <a href="#" className="font-bold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                        Create Account
                        <UserPlus className="w-4 h-4" />
                    </a>
                </p>
             </div>

          </div>
          
          {/* Footer Version */}
          <div className="absolute bottom-6 text-slate-400/60 text-[10px] font-mono">
            App Ver. 1.0.0 (Build 2024)
          </div>
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
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}