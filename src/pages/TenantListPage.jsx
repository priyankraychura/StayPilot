import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical,
  Phone,
  MessageCircle,
  User
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

// Mock Tenant Data (Basic Info for List)
const MOCK_TENANTS = [
  { 
    id: "T001", 
    name: "Aarav Patel", 
    room: "101", 
    phone: "9876543210", 
    status: "Paid", 
    joinDate: "2023-08-01",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav" 
  },
  { 
    id: "T002", 
    name: "Ishita Sharma", 
    room: "102", 
    phone: "9123456789", 
    status: "Due", 
    joinDate: "2023-09-15",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ishita" 
  },
  { 
    id: "T003", 
    name: "Rohan Mehta", 
    room: "201", 
    phone: "9988776655", 
    status: "Paid", 
    joinDate: "2024-01-10",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan" 
  },
];

export default function TenantListPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All'); // All, Paid, Due
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTenants = MOCK_TENANTS.filter(tenant => {
    const matchesFilter = filter === 'All' || tenant.status === filter;
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tenant.room.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="font-sans bg-slate-50 min-h-screen w-full relative overflow-x-hidden">
      <style>{styles}</style>
      
      {/* Background Decor */}
      <div className="fixed top-[-10%] right-[-5%] w-96 h-96 bg-teal-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-lg mx-auto bg-white/30 min-h-screen relative shadow-2xl flex flex-col pb-24">
        
        {/* --- Header --- */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm px-4 py-3">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <button 
                      onClick={() => navigate('/dashboard')} 
                      className="w-10 h-10 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-slate-600 transition-all border border-white/50 shadow-sm active:scale-95"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-bold text-slate-800">Tenants</h1>
                </div>
                <div className="bg-slate-100 p-1 rounded-lg flex text-xs font-bold">
                    {['All', 'Paid', 'Due'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-md transition-all ${filter === f ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search name or room no..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-100/50 border border-slate-200/60 rounded-xl py-2.5 pl-9 pr-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                />
            </div>
        </div>

        {/* --- Tenant List --- */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredTenants.length === 0 ? (
                <div className="text-center py-20">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <User className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-slate-400 text-sm">No tenants found</p>
                </div>
            ) : (
                filteredTenants.map((tenant, index) => (
                    <div 
                        key={tenant.id}
                        onClick={() => navigate(`/tenant-details/${tenant.id}`)}
                        className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-4 shadow-sm active:scale-[0.99] transition-all cursor-pointer animate-slideUp flex items-center justify-between"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="flex items-center gap-3">
                            <img src={tenant.img} alt={tenant.name} className="w-12 h-12 rounded-full bg-slate-100 border border-white shadow-sm" />
                            <div>
                                <h3 className="text-sm font-bold text-slate-800">{tenant.name}</h3>
                                <p className="text-xs text-slate-500 font-medium">Room {tenant.room}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${
                                tenant.status === 'Paid' 
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                : 'bg-rose-50 text-rose-600 border-rose-100'
                            }`}>
                                {tenant.status}
                            </div>
                            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors" onClick={(e) => { e.stopPropagation(); /* Call Logic */ }}>
                                <Phone className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* --- Floating Action Button --- */}
        <button 
            onClick={() => navigate('/tenant-details/new')}
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-40"
        >
            <Plus className="w-7 h-7" />
        </button>

      </div>
    </div>
  );
}