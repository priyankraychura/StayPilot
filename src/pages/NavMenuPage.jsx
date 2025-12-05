import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Shield, 
  FileText, 
  Moon,
  Info,
  Building,
  CreditCard,
  Lock,
  Smartphone,
  BadgeCheck,
  MessageCircle,
  Star,
  Home,
  Menu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Animation Styles
const styles = `
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-slideUp {
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`;

// Mock PG Data for the Blue Card
const PG_INFO = {
  name: "The Clover House",
  code: "CLVR-01",
  address: "Viman Nagar, Pune",
  rating: "4.8",
  image: null 
};

const MenuSection = ({ title, children }) => (
  <div className="mb-5 animate-slideUp">
    {title && (
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-4">
        {title}
      </h3>
    )}
    <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-3xl overflow-hidden shadow-sm">
      {children}
    </div>
  </div>
);

const MenuItem = ({ 
  icon: Icon, 
  label, 
  subLabel, 
  onClick, 
  isDestructive = false, 
  hasToggle = false, 
  toggleValue, 
  onToggle,
  iconColor = "text-slate-500", // Default icon color
  bgColor = "bg-slate-50"       // Default background color
}) => (
  <button 
    onClick={hasToggle ? undefined : onClick}
    className={`w-full flex items-center justify-between p-3.5 border-b border-slate-100 last:border-0 hover:bg-white/50 transition-colors active:scale-[0.99] ${isDestructive ? 'text-rose-600' : 'text-slate-800'}`}
  >
    <div className="flex items-center gap-3.5">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDestructive ? 'bg-rose-50 text-rose-500' : `${bgColor} ${iconColor}`}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-left">
        <p className={`text-sm font-semibold ${isDestructive ? 'text-rose-600' : 'text-slate-800'}`}>
          {label}
        </p>
        {subLabel && <p className="text-[10px] text-slate-400">{subLabel}</p>}
      </div>
    </div>

    {hasToggle ? (
      <div 
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer ${toggleValue ? 'bg-blue-600' : 'bg-slate-200'}`}
      >
        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${toggleValue ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
    ) : (
      !isDestructive && <ChevronRight className="w-4 h-4 text-slate-300" />
    )}
  </button>
);

// Copied BottomNav for standalone capability
const BottomNav = ({ active }) => {
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", icon: Home },
    { name: "Bookings", icon: Building },
    { name: "Profile", icon: User },
    { name: "Menu", icon: Menu },
  ];

  const handleNavClick = (name) => {
    if (name === 'Home') navigate('/dashboard');
    if (name === 'Menu') navigate('/nav-menu');
    // Add logic for others
  };

  return (
    <div className="fixed bottom-5 left-0 right-0 z-40 px-6 pointer-events-none">
        <nav className="max-w-[360px] mx-auto bg-white border border-slate-200 shadow-2xl shadow-blue-900/10 rounded-full py-2 px-6 flex justify-between items-center pointer-events-auto">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.name;
                return (
                    <button
                        key={item.name}
                        onClick={() => handleNavClick(item.name)}
                        className={`relative flex flex-col items-center justify-center w-12 h-12 transition-all duration-300 ${isActive ? '-translate-y-2' : 'hover:bg-slate-50 rounded-full'}`}
                    >
                        <div className={`
                            p-2.5 rounded-full transition-all duration-300
                            ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-white' : 'text-slate-400'}
                        `}>
                            <Icon className="w-5 h-5" strokeWidth={2.5} />
                        </div>
                        {isActive && (
                            <span className="absolute -bottom-4 text-[10px] font-bold text-blue-600 animate-in fade-in slide-in-from-top-1 whitespace-nowrap">
                                {item.name}
                            </span>
                        )}
                    </button>
                );
            })}
        </nav>
    </div>
  );
}

export default function NavMenuPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="font-sans bg-slate-50 min-h-screen w-full relative overflow-x-hidden">
      <style>{styles}</style>
      
      {/* Background Decor */}
      <div className="fixed top-[-10%] left-[-5%] w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-lg mx-auto bg-white/30 min-h-screen relative shadow-2xl flex flex-col pb-32">
        
        {/* --- Header --- */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm px-6 py-4">
            <h1 className="text-xl font-bold text-slate-800">PG Profile</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
            
            {/* --- Hero PG Card (Dynamic Fallback) --- */}
            <div 
                onClick={() => navigate('/pg-details')}
                className={`relative h-32 rounded-3xl overflow-hidden shadow-lg shadow-blue-900/10 mb-6 cursor-pointer group animate-slideUp ${!PG_INFO.image ? 'bg-gradient-to-br from-blue-600 to-indigo-600' : ''}`}
            >
                {/* Background Logic */}
                {PG_INFO.image ? (
                    <>
                        <img 
                            src={PG_INFO.image} 
                            alt="PG" 
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                    </>
                ) : (
                    <>
                        {/* Abstract Decor for No-Image State */}
                        <div className="absolute -right-4 -bottom-8 text-white/10 transform rotate-12 group-hover:scale-110 transition-transform duration-700">
                            <Building className="w-32 h-32" />
                        </div>
                        <div className="absolute inset-0 bg-black/5"></div>
                    </>
                )}

                {/* Content */}
                <div className="absolute inset-0 p-5 flex items-center justify-between z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-lg font-bold text-white leading-tight">{PG_INFO.name}</h2>
                            <div className="bg-white/20 backdrop-blur-md border border-white/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <BadgeCheck className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                                <span className="text-[9px] font-bold text-white uppercase tracking-wide">Verified</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-200 font-medium flex items-center gap-1">
                            <Building className="w-3 h-3" /> {PG_INFO.address}
                        </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1.5">
                         <div className="flex items-center gap-1 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 px-2 py-1 rounded-lg text-yellow-400 text-xs font-bold">
                            <Star className="w-3 h-3 fill-yellow-400" /> {PG_INFO.rating}
                         </div>
                         <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-2 py-1 rounded-lg">
                            <span className="text-[10px] text-white font-mono">{PG_INFO.code}</span>
                         </div>
                    </div>
                </div>
            </div>

            {/* --- Account Management --- */}
            <MenuSection title="Account & Security">
                <MenuItem 
                    icon={User} 
                    label="User Details" 
                    subLabel="Profile, Roles & Staff"
                    onClick={() => navigate('/profile')} 
                    iconColor="text-blue-600"
                    bgColor="bg-blue-100"
                />
                <MenuItem 
                    icon={CreditCard} 
                    label="Payment Settings" 
                    subLabel="QR Code, Bank Info"
                    onClick={() => navigate('/rent-payment')} 
                    iconColor="text-green-600"
                    bgColor="bg-green-100"
                />
                <MenuItem 
                    icon={BadgeCheck} 
                    label="PG Verification" 
                    subLabel="Status: Verified"
                    onClick={() => {}} 
                    iconColor="text-indigo-600"
                    bgColor="bg-indigo-100"
                />
                <MenuItem 
                    icon={Lock} 
                    label="Reset Password" 
                    onClick={() => navigate('/forgotpass')} 
                    iconColor="text-orange-600"
                    bgColor="bg-orange-100"
                />
                <MenuItem 
                    icon={Smartphone} 
                    label="Two-Factor Auth" 
                    hasToggle
                    toggleValue={twoFactor}
                    onToggle={() => setTwoFactor(!twoFactor)}
                    iconColor="text-purple-600"
                    bgColor="bg-purple-100"
                />
            </MenuSection>

            {/* --- Application Preferences --- */}
            <MenuSection title="Preferences">
                <MenuItem 
                    icon={Bell} 
                    label="Notifications" 
                    hasToggle 
                    toggleValue={notifications}
                    onToggle={() => setNotifications(!notifications)}
                    iconColor="text-yellow-600"
                    bgColor="bg-yellow-100"
                />
                <MenuItem 
                    icon={Moon} 
                    label="Dark Mode" 
                    hasToggle 
                    toggleValue={darkMode}
                    onToggle={() => setDarkMode(!darkMode)}
                    iconColor="text-slate-600"
                    bgColor="bg-slate-200"
                />
            </MenuSection>

            {/* --- Support & Info --- */}
            <MenuSection title="Support">
                <MenuItem 
                    icon={MessageCircle} 
                    label="FAQs" 
                    onClick={() => {}} 
                    iconColor="text-teal-600"
                    bgColor="bg-teal-100"
                />
                <MenuItem 
                    icon={HelpCircle} 
                    label="Help & Support" 
                    onClick={() => {}} 
                    iconColor="text-pink-600"
                    bgColor="bg-pink-100"
                />
                <MenuItem 
                    icon={Info} 
                    label="About Us" 
                    subLabel="v1.0.0"
                    onClick={() => {}} 
                    iconColor="text-cyan-600"
                    bgColor="bg-cyan-100"
                />
                <MenuItem 
                    icon={FileText} 
                    label="Terms & Privacy" 
                    onClick={() => {}} 
                    iconColor="text-gray-600"
                    bgColor="bg-gray-200"
                />
            </MenuSection>

            {/* --- Logout --- */}
            <div className="animate-slideUp" style={{ animationDelay: '100ms' }}>
                <button 
                    onClick={() => navigate('/login')}
                    className="w-full bg-white/80 backdrop-blur-md border border-rose-100 rounded-3xl p-3.5 flex items-center justify-center gap-2 text-rose-600 font-bold shadow-sm hover:bg-rose-50 transition-all active:scale-95"
                >
                    <LogOut className="w-5 h-5" />
                    Log Out
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-4 mb-2">
                    Made with ❤️ by Clover Team
                </p>
            </div>

        </div>
        
        {/* --- Bottom Nav (Visible on Menu Page) --- */}
        <BottomNav active="Menu" />

      </div>
    </div>
  );
}