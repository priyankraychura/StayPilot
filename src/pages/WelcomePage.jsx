import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Languages, 
  ArrowRight, 
  UserCircle2, 
  Mail, 
  ChevronRight,
  ShieldCheck,
  Zap,
  MessageSquare
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const [slide, setSlide] = useState(0);
  const [email, setEmail] = useState('');
  
  const features = [
    { text: "Get updated with all PG related information", icon: Building2 },
    { text: "Pay rent and manage bills seamlessly", icon: Zap },
    { text: "Register complaints and get quick support", icon: MessageSquare },
  ];

  const navigate = useNavigate();

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <div className="min-h-screen w-full bg-slate-50 relative flex items-center justify-center p-4 overflow-hidden font-sans">
      
      {/* Background Decor - Blobs (Consistent with Login) */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      {/* Main Content Container */}
      <div className="relative w-full max-w-[420px] h-full flex flex-col">
        
        {/* Header - Floating */}
        <header className="flex justify-between items-center mb-6 px-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
               <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">PGManager</h1>
          </div>
          
          <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-white/20 flex items-center justify-center hover:bg-white transition-colors text-slate-600">
            <Languages className="w-5 h-5" />
          </button>
        </header>

        {/* Glass Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 flex flex-col flex-grow relative z-10">
          
          {/* Hero Section */}
          <div className="mb-8 text-center mt-2">
             <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome!</h2>
             <p className="text-slate-500 text-sm">Join the smartest way to manage your PG stay.</p>
          </div>

          {/* Registration Block */}
          <div className="space-y-6">
            <div className="relative group">
              <label className="block text-xs font-bold text-slate-500 mb-2 ml-1 uppercase tracking-wide">
                New User Registration
              </label>
              
              {/* Modern Pill Input */}
              <div className="relative flex items-center w-full bg-white border border-slate-200 rounded-full shadow-sm p-1.5 focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all duration-300 hover:shadow-md">
                <div className="pl-4 pr-3 text-slate-400">
                   <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow bg-transparent text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none min-w-0 py-2"
                />
                <button 
                  onClick={() => navigate('/otp')} 
                  className="flex-shrink-0 px-6 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-full hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2 group-hover/btn:translate-x-1"
                >
                  Join
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Social Registration */}
            <div>
                <div className="flex items-center mb-6">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">Or Register With</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all group">
                        <UserCircle2 className="w-8 h-8 text-slate-400 mb-2 group-hover:text-blue-600 transition-colors" />
                        <span className="text-xs font-semibold text-slate-600">Google Account</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all group">
                        <Building2 className="w-8 h-8 text-slate-400 mb-2 group-hover:text-blue-600 transition-colors" />
                        <span className="text-xs font-semibold text-slate-600">PG Code</span>
                    </button>
                </div>
            </div>
          </div>

          <div className="mt-8 mb-4">
             {/* Existing User Link */}
             <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between group cursor-pointer hover:bg-blue-50 transition-colors" onClick={() => navigate('/login')}>
                <div>
                    <p className="text-xs text-blue-600 font-semibold mb-0.5">Already a member?</p>
                    <p className="text-sm font-bold text-slate-800">Log in to your account</p>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="w-5 h-5" />
                </div>
             </div>
          </div>
          
          {/* Guest Login */}
          <div className="text-center mt-auto">
            <button className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
              Continue as <span className="underline decoration-2 decoration-blue-200 hover:decoration-blue-500 transition-all text-slate-700">Guest</span>
            </button>
          </div>

        </div>

        {/* Feature Carousel (Bottom) */}
        <div className="mt-6 mb-2">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md flex-shrink-0">
                        {React.createElement(features[slide].icon, { className: "w-5 h-5" })}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 leading-relaxed animate-in fade-in slide-in-from-right-4 duration-500 key={slide}">
                            {features[slide].text}
                        </p>
                    </div>
                    {/* Dots */}
                    <div className="flex space-x-1 flex-shrink-0 self-center">
                        {features.map((_, i) => (
                            <div 
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? 'w-4 bg-blue-600' : 'w-1.5 bg-slate-300'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Footer Links */}
            <div className="flex justify-center items-center gap-3 mt-4 text-[10px] text-slate-400 font-medium">
                <a href="#" className="hover:text-slate-600 transition-colors">Terms of Use</a>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>v1.0.0</span>
            </div>
        </div>

      </div>

      {/* Tailwind Animations (Same as Login) */}
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