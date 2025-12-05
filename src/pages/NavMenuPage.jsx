import React, { useState, useRef } from 'react';
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
  Plus,
  CheckCircle2,
  X
} from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';

// Animation Styles
const styles = `
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideUpDrawer {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-slideUp {
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-slideUpDrawer {
    animation: slideUpDrawer 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out forwards;
  }
`;

// Mock PG Data for the Blue Card
const PG_INFO = {
  id: '1',
  name: "The Clover House",
  code: "CLVR-01",
  address: "Viman Nagar, Pune",
  rating: "4.8",
  image: null 
};

// Mock List of PGs for the Switcher
const MY_PROPERTIES = [
  { id: '1', name: "The Clover House", code: "CLVR-01", address: "Viman Nagar, Pune", active: true },
  { id: '2', name: "Sunrise Residency", code: "SUN-02", address: "Koregaon Park, Pune", active: false },
];

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
  iconColor = "text-slate-500", 
  bgColor = "bg-slate-50"
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

export default function NavMenuPage() {
  const navigate = useNavigate();
  
  // Access setNavVisible from the Layout Context to hide navbar when sheet opens
  const { setNavVisible } = useOutletContext() || { setNavVisible: () => {} };

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  
  // --- Long Press & Sheet State ---
  const [showProfileSheet, setShowProfileSheet] = useState(false);
  const timerRef = useRef(null);
  const isLongPress = useRef(false);

  // --- Handlers ---

  const handleTouchStart = () => {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setShowProfileSheet(true);
      setNavVisible(false); // Hide the bottom navbar
      if (navigator.vibrate) navigator.vibrate(50);
    }, 600);
  };

  const handleTouchEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleCardClick = () => {
    if (!isLongPress.current) {
      navigate('/pg-details');
    }
  };

  const closeSheet = () => {
    setShowProfileSheet(false);
    setNavVisible(true); // Bring back the bottom navbar
  };

  return (
    <div className="font-sans bg-slate-50 min-h-screen w-full relative overflow-x-hidden">
      <style>{styles}</style>
      
      {/* Background Decor */}
      <div className="fixed top-[-10%] left-[-5%] w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-lg mx-auto bg-white/30 min-h-screen relative shadow-2xl flex flex-col pb-24">
        
        {/* --- Header --- */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm px-6 py-4">
            <h1 className="text-xl font-bold text-slate-800">PG Profile</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
            
            {/* --- Hero PG Card (Long Press Enabled) --- */}
            <div 
                onMouseDown={handleTouchStart}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={handleCardClick}
                className={`relative h-32 rounded-3xl overflow-hidden shadow-lg shadow-blue-900/10 mb-6 cursor-pointer group animate-slideUp select-none active:scale-[0.98] transition-transform ${!PG_INFO.image ? 'bg-gradient-to-br from-blue-600 to-indigo-600' : ''}`}
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

        {/* --- Switch Profile Bottom Sheet --- */}
        {showProfileSheet && (
            <div className="fixed inset-0 z-50 flex items-end justify-center">
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
                    onClick={closeSheet}
                ></div>

                {/* Sheet */}
                <div className="bg-white w-full max-w-lg rounded-t-[32px] p-6 relative z-10 animate-slideUpDrawer shadow-2xl">
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
                    
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-slate-800">Switch Property</h3>
                        <button 
                            onClick={closeSheet}
                            className="p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-3 max-h-[60vh] overflow-y-auto pb-4">
                        {MY_PROPERTIES.map((pg) => (
                            <button 
                                key={pg.id}
                                onClick={() => { /* Logic to switch context */ closeSheet(); }}
                                className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all active:scale-[0.98] ${
                                    pg.active 
                                    ? 'border-blue-500 bg-blue-50 shadow-sm' 
                                    : 'border-slate-100 bg-white hover:border-blue-200'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                        pg.active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                        <Building className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <p className={`text-sm font-bold ${pg.active ? 'text-blue-900' : 'text-slate-800'}`}>{pg.name}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{pg.address}</p>
                                    </div>
                                </div>
                                {pg.active && (
                                    <div className="bg-blue-600 rounded-full p-1">
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </button>
                        ))}

                        <button 
                            onClick={() => { navigate('/edit-pg', { state: { mode: 'new' } }); closeSheet(); }}
                            className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center gap-2 text-slate-500 font-bold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all mt-4"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Property
                        </button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}