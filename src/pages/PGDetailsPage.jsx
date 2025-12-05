import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Wifi, 
  Wind, 
  Utensils, 
  Tv, 
  Zap, 
  ShieldCheck,
  CreditCard,
  Share2,
  Edit2,
  FileText,
  Clock,
  Shirt, 
  Car, 
  Dumbbell,
  ChevronRight
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

// Available Amenities
const ALL_AMENITIES = [
  { id: 'wifi', name: "High Speed Wifi", icon: Wifi },
  { id: 'ac', name: "Air Conditioning", icon: Wind },
  { id: 'food', name: "3 Times Meal", icon: Utensils },
  { id: 'tv', name: "Smart TV", icon: Tv },
  { id: 'power', name: "Power Backup", icon: Zap },
  { id: 'security', name: "24/7 Security", icon: ShieldCheck },
  { id: 'laundry', name: "Laundry", icon: Shirt },
  { id: 'parking', name: "Parking", icon: Car },
  { id: 'gym', name: "Gym", icon: Dumbbell },
];

// Initial Data
const INITIAL_DATA = {
  name: "The Clover House",
  type: "Luxury Co-living",
  address: "123, Green Avenue, Viman Nagar, Pune, Maharashtra 411014",
  images: [
    "https://images.unsplash.com/photo-1522771753035-4a53c9d2785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  selectedAmenityIds: ['wifi', 'ac', 'food', 'tv', 'power', 'security'],
  rules: [
    "Gate closes at 10:30 PM strictly.",
    "No loud music after 11:00 PM.",
    "Guests allowed only in common areas.",
    "Turn off AC/Lights when leaving the room."
  ]
};

export default function PGDetailsPage() {
  const navigate = useNavigate();
  const [pgData, setPgData] = useState(INITIAL_DATA);

  // Derived Amenities based on IDs
  const activeAmenities = ALL_AMENITIES.filter(a => pgData.selectedAmenityIds.includes(a.id));

  return (
    <div className="font-sans bg-slate-50 min-h-screen w-full relative overflow-x-hidden">
      <style>{styles}</style>
      
      {/* Background Decor */}
      <div className="fixed top-[-10%] right-[-5%] w-96 h-96 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-96 h-96 bg-cyan-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-lg mx-auto bg-white/30 min-h-screen relative shadow-2xl flex flex-col pb-8">
        
        {/* --- Header --- */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(-1)} 
                  className="w-10 h-10 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-slate-600 transition-all border border-white/50 shadow-sm active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-bold text-slate-800">Property Details</h1>
            </div>
            
            <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-slate-600 transition-all border border-white/50 shadow-sm active:scale-95">
                    <Share2 className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => navigate('/edit-pg')}
                    className="w-10 h-10 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-slate-600 transition-all border border-white/50 shadow-sm active:scale-95"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-5">
            
            {/* --- Hero Image Card --- */}
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-md animate-slideUp group">
                <img 
                    src={pgData.images[0]} 
                    alt="PG Building" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-5 w-full">
                    <div className="inline-block bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md mb-2 shadow-sm">
                        {pgData.type}
                    </div>
                    <h2 className="text-2xl font-bold text-white leading-tight">{pgData.name}</h2>
                    <div className="flex items-center gap-1.5 text-slate-200 mt-1">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <p className="text-xs font-medium truncate">{pgData.address}</p>
                    </div>
                </div>
            </div>

            {/* --- Navigation Cards --- */}
            <div className="grid grid-cols-1 gap-3 animate-slideUp" style={{ animationDelay: '100ms' }}>
                
                {/* Rent & Payment Link */}
                <div 
                    onClick={() => navigate('/rent-payment')}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 shadow-lg shadow-blue-500/20 flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Rent & Payment Details</p>
                            <p className="text-[10px] text-blue-100">QR Code, Bank Info & UPI</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/80" />
                </div>

                {/* Wifi Details Link */}
                <div 
                    onClick={() => navigate('/wifi-details')}
                    className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer active:scale-95 transition-transform hover:shadow-md"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                            <Wifi className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">Wi-Fi Networks</p>
                            <p className="text-[10px] text-slate-500">Scan QR to connect</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>

            </div>

            {/* --- Amenities Grid --- */}
            <div className="animate-slideUp" style={{ animationDelay: '200ms' }}>
                <h3 className="text-sm font-bold text-slate-800 mb-3 ml-1">Amenities</h3>
                <div className="grid grid-cols-3 gap-3">
                    {activeAmenities.map((item, idx) => (
                        <div key={idx} className="bg-white/60 border border-white/60 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 shadow-sm hover:bg-white transition-colors min-h-[80px]">
                            <item.icon className="w-6 h-6 text-slate-600 opacity-80" strokeWidth={1.5} />
                            <span className="text-[10px] font-medium text-slate-600 leading-tight">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Rules & Regulations --- */}
            <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 shadow-sm animate-slideUp" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-2 mb-3 text-rose-600">
                    <Clock className="w-4 h-4" />
                    <h3 className="text-sm font-bold">House Rules</h3>
                </div>
                <ul className="space-y-2.5">
                    {pgData.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0"></span>
                            <span className="leading-relaxed">{rule}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* --- Documents --- */}
            <button className="w-full bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm group hover:border-blue-300 transition-all animate-slideUp mb-4" style={{ animationDelay: '400ms' }}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                        <FileText className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-semibold text-slate-800">Rental Agreement</p>
                        <p className="text-[10px] text-slate-500">Tap to view PDF</p>
                    </div>
                </div>
                <ArrowLeft className="w-4 h-4 text-slate-300 rotate-180" />
            </button>

        </div>
      </div>
    </div>
  );
}