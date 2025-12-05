import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Building, 
  User, 
  Menu 
} from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

// Navigation Items Configuration
const NAV_ITEMS = [
  { name: "Home", icon: Home, path: "/dashboard" },
  { name: "Bookings", icon: Building, path: "/bookings" },
  { name: "Profile", icon: User, path: "/profile" },
  { name: "Menu", icon: Menu, path: "/nav-menu" },
];

export default function BottomNavLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Home");
  const [isNavVisible, setNavVisible] = useState(true); // State to control navbar visibility

  // Sync active tab with current URL path on mount/update
  useEffect(() => {
    const currentItem = NAV_ITEMS.find(item => item.path === location.pathname);
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
  }, [location.pathname]);

  // Ensure navbar is visible when location changes (failsafe)
  useEffect(() => {
    setNavVisible(true);
  }, [location.pathname]);

  // --- Swipe Logic ---
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); 
    setTouchStart(e.targetTouches[0].clientX);
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    const currentIndex = NAV_ITEMS.findIndex(item => item.name === activeTab);
    
    if (isLeftSwipe && currentIndex < NAV_ITEMS.length - 1) {
       navigate(NAV_ITEMS[currentIndex + 1].path);
    }
    if (isRightSwipe && currentIndex > 0) {
       navigate(NAV_ITEMS[currentIndex - 1].path);
    }
  }

  return (
    <div 
      className="font-sans bg-slate-50 min-h-screen w-full relative overflow-x-hidden touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* --- Global Background Decor --- */}
      <div className="fixed top-[-10%] right-[-5%] w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none z-0"></div>
      <div className="fixed top-[40%] left-[20%] w-72 h-72 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none z-0"></div>

      {/* --- Main Content Area --- */}
      <div className="max-w-lg mx-auto bg-white/30 min-h-screen relative shadow-2xl transition-all duration-300 flex flex-col">
        
        {/* Child pages render here. We pass setNavVisible down via context */}
        <div className="flex-1 pb-24 z-10">
            <Outlet context={{ setNavVisible }} />
        </div>

        {/* --- Floating Bottom Navbar --- */}
        {/* Added transform transition logic based on isNavVisible */}
        <div className={`fixed bottom-5 left-0 right-0 z-40 px-6 pointer-events-none transition-transform duration-500 ease-in-out ${isNavVisible ? 'translate-y-0' : 'translate-y-[150%]'}`}>
            <nav className="max-w-[360px] mx-auto bg-white border border-slate-200 shadow-2xl shadow-blue-900/10 rounded-full py-2 px-6 flex justify-between items-center pointer-events-auto">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.name;
                    return (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.path)}
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

      </div>

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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}