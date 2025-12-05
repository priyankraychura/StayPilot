import React, { useState, useEffect } from 'react';
import {
  Home,
  Building,
  User,
  Menu,
  Bell,
  Search,
  ShieldAlert,
  CreditCard,
  UtensilsCrossed,
  Users,
  FileText,
  LifeBuoy,
  Settings,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  MailPlus,
  LogOut,
  ChevronRight,
  Sparkles,
  MapPin
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// --- Components ---

function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm transition-all">
      <div className="flex items-center gap-2">
         <div className="bg-blue-600 rounded-lg p-1.5 shadow-lg shadow-blue-500/20">
             <Building className="w-5 h-5 text-white" />
         </div>
         <h1 className="text-xl font-bold text-slate-800 tracking-tight">PGManager</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <Link to={'/notifications'} className="relative p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Link>
        <Link to={'/profile'} className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 p-[2px] shadow-md">
           <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full" />
           </div>
        </Link>
      </div>
    </header>
  );
}

function Greeting() {
  return (
    <div className="px-6 py-6">
      <div className="flex justify-between items-end">
          <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Monday, 24 Aug</p>
            <h2 className="text-2xl font-bold text-slate-800">Hi, Priyank! <span className="inline-block animate-pulse">👋</span></h2>
          </div>
          <div className="text-right">
             <div className="flex items-center gap-1 text-slate-500 text-xs bg-slate-100 px-2 py-1 rounded-full">
                <MapPin className="w-3 h-3 text-blue-500" />
                Pune, MH
             </div>
          </div>
      </div>
    </div>
  );
}

function QuickActions() {
  const actions = [
    {
      title: "Find a PG",
      subtitle: "Explore stays",
      img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      color: "from-blue-600/90 to-blue-900/10"
    },
    {
      title: "My Bookings",
      subtitle: "View history",
      img: "https://images.unsplash.com/photo-1522771753035-4a53c9d2785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      color: "from-purple-600/90 to-purple-900/10"
    },
    {
      title: "Add Property",
      subtitle: "List yours",
      img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      color: "from-emerald-600/90 to-emerald-900/10"
    },
  ];

  return (
    <div className="px-6 mb-8">
      <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">Quick Actions</h3>
          <button className="text-blue-600 text-xs font-semibold hover:underline">See All</button>
      </div>
      
      {/* Horizontal Scroll for Cards */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory touch-pan-x">
        {actions.map((action) => (
          <div
            key={action.title}
            className="snap-center shrink-0 relative w-64 h-36 rounded-2xl shadow-lg overflow-hidden cursor-pointer group transition-transform active:scale-95"
          >
            <img
              src={action.img}
              alt={action.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${action.color} via-transparent to-transparent flex flex-col justify-end p-4`}>
              <p className="text-white/80 text-xs font-medium mb-0.5">{action.subtitle}</p>
              <p className="text-white text-lg font-bold shadow-sm">{action.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Services() {
  const services = [
    { id: "/search", title: "Search", icon: <Search className="w-5 h-5 text-blue-600" />, color: "bg-blue-100", border: "border-blue-200" },
    { id: "#", title: "Complaints", icon: <ShieldAlert className="w-5 h-5 text-red-600" />, color: "bg-red-100", border: "border-red-200" },
    { id: "/rent-payment", title: "Pay Rent", icon: <CreditCard className="w-5 h-5 text-green-600" />, color: "bg-green-100", border: "border-green-200" },
    { id: "/menu", title: "Menu", icon: <UtensilsCrossed className="w-5 h-5 text-orange-600" />, color: "bg-orange-100", border: "border-orange-200" },
    { id: "#", title: "Visitors", icon: <Users className="w-5 h-5 text-indigo-600" />, color: "bg-indigo-100", border: "border-indigo-200" },
    { id: "#", title: "Notices", icon: <FileText className="w-5 h-5 text-yellow-600" />, color: "bg-yellow-100", border: "border-yellow-200" },
    { id: "#", title: "Support", icon: <LifeBuoy className="w-5 h-5 text-purple-600" />, color: "bg-purple-100", border: "border-purple-200" },
    { id: "/enquiries", title: "Inquiries", icon: <MailPlus className="w-5 h-5 text-pink-600" />, color: "bg-pink-100", border: "border-pink-200" },
  ];

  return (
    <div className="px-6 mb-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Services</h3>
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-5 border border-white/40 shadow-sm">
        <div className="grid grid-cols-4 gap-y-6 gap-x-2">
            {services.map((service) => (
            <Link to={service.id} key={service.title} className="flex flex-col items-center gap-2 group">
                <div className={`w-12 h-12 ${service.color} rounded-2xl flex items-center justify-center shadow-sm border ${service.border} group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                </div>
                <p className="text-[10px] text-center font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">{service.title}</p>
            </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

function NewsAndTips() {
  const articles = [
    {
      title: "5 crucial tips for moving into a PG first time.",
      category: "Guide",
      img: "https://images.unsplash.com/photo-1517260739337-6799d239ce83?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "How to manage monthly budget & save money.",
      category: "Finance",
      img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Discover the best localities in Pune.",
      category: "Location",
      img: "https://images.unsplash.com/photo-1565058728564-282bb2b467bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
  ];

  return (
    <div className="mb-8">
      <div className="px-6 mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            Tips & Updates
          </h3>
      </div>

      <div className="flex gap-4 overflow-x-auto px-6 pb-6 scrollbar-hide snap-x snap-mandatory touch-pan-x">
        {articles.map((article) => (
          <div
            key={article.title}
            className="snap-center shrink-0 w-60 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-32 overflow-hidden relative">
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                    {article.category}
                </div>
                <img
                src={article.img}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-slate-700 leading-snug line-clamp-2">
                {article.title}
              </p>
              <button className="text-[10px] text-blue-600 font-bold mt-2 flex items-center gap-1">
                Read More <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialMedia() {
  const socialLinks = [
    { name: 'X', icon: <Twitter className="w-4 h-4" />, color: "bg-black text-white" },
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, color: "bg-[#1877F2] text-white" },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, color: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white" },
    { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, color: "bg-[#FF0000] text-white" },
  ];

  return (
    <div className="px-6 mb-6">
      <div className="relative rounded-3xl overflow-hidden shadow-lg group">
        <img
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Social BG"
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 p-6 flex flex-col items-center text-center">
            <h3 className="text-white font-bold text-lg mb-1">Join our Community</h3>
            <p className="text-slate-300 text-xs mb-5">Stay updated with the latest news & offers</p>
            
            <div className="flex gap-4">
                {socialLinks.map((link) => (
                    <button
                        key={link.name}
                        className={`w-10 h-10 ${link.color} rounded-full flex items-center justify-center shadow-lg transition-transform hover:-translate-y-1 active:scale-95`}
                    >
                        {link.icon}
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

function BottomNav({ active, setActive }) {
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", icon: Home },
    { name: "Bookings", icon: Building },
    { name: "Profile", icon: User },
    { name: "Menu", icon: Menu },
  ];

  const handleNavClick = (name) => {
    setActive(name);
    if (name === 'Menu') {
      navigate('/nav-menu');
    } else if (name === 'Home') {
      navigate('/dashboard'); // Assuming dashboard route is /dashboard
    }
    // Add other routes if needed
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


// --- Main App Component ---

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();
  
  const navItems = [
    { name: "Home", icon: Home },
    { name: "Bookings", icon: Building },
    { name: "Profile", icon: User },
    { name: "Menu", icon: Menu },
  ];

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
    
    // Find current index
    const currentIndex = navItems.findIndex(item => item.name === activeTab);
    
    let nextTab = activeTab;

    if (isLeftSwipe) {
       // Swipe Left -> Next Tab
       if (currentIndex < navItems.length - 1) {
           nextTab = navItems[currentIndex + 1].name;
       }
    }
    if (isRightSwipe) {
       // Swipe Right -> Prev Tab
       if (currentIndex > 0) {
           nextTab = navItems[currentIndex - 1].name;
       }
    }

    if (nextTab !== activeTab) {
        setActiveTab(nextTab);
        if (nextTab === 'Menu') navigate('/nav-menu');
        if (nextTab === 'Home') navigate('/dashboard');
        // Handle other tabs if they map to routes
    }
  }

  return (
    <div 
      className="font-sans bg-slate-50 min-h-screen w-full relative overflow-x-hidden touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      
      {/* Background Decor - Blobs */}
      <div className="fixed top-[-10%] right-[-5%] w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="fixed top-[40%] left-[20%] w-72 h-72 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none"></div>

      {/* Main Content Wrapper - Simulates Mobile Width on Desktop */}
      <div className="max-w-lg mx-auto bg-white/30 min-h-screen relative shadow-2xl transition-all duration-300">
        <Header />
        
        <main className="pb-32"> {/* Extra padding for floating nav */}
          <Greeting />
          <QuickActions />
          <Services />
          <NewsAndTips />
          <SocialMedia />
        </main>
        
        <BottomNav active={activeTab} setActive={setActiveTab} />
      </div>

       {/* Tailwind Animations */}
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