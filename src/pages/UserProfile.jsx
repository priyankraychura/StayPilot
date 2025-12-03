import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  ShieldCheck, 
  Users, 
  LogOut,
  Edit,
  Briefcase,
  Utensils,
  Sparkles,
  MoreVertical,
  Trash2,
  UserX,
  UserPlus,
  Settings,
  X,
  Save,
  RotateCcw
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
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-menu {
    animation: fadeIn 0.1s ease-out forwards;
  }
`;

// Initial Mock Data
const INITIAL_USERS = {
  owner: { id: 1, name: "Priyank Sutaria", role: "Owner", email: "priyank@clover.com", phone: "+91 98765 43210", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priyank" },
  partner: { id: 2, name: "Rahul Sharma", role: "Partner", email: "rahul@clover.com", phone: "+91 98765 00000", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
  manager: { id: 3, name: "Suresh Kumar", role: "Manager", email: "suresh.mgr@clover.com", phone: "+91 91234 56789", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh" },
  cook: { id: 4, name: "Ramesh Bhai", role: "Cook", email: "", phone: "+91 99887 76655", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh" }
};

const PG_DETAILS = {
  id: "pg_001",
  name: "The Clover House",
  address: "123, Green Avenue, Pune, Maharashtra",
  code: "CLVR-01"
};

const ROLES = ["Owner", "Partner", "Manager", "Cook", "Cleaner"];

// --- EXTRACTED COMPONENTS (Fixes Focus Issue) ---

const ModalInput = ({ label, value, onChange, type = "text", placeholder }) => (
  <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">{label}</label>
      <input 
          type={type}
          value={value} 
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
      />
  </div>
);

const UserListItem = ({ user, currentUser, isOwner, onEdit, onRemove }) => (
  <div className="flex items-center justify-between group">
      <div className="flex items-center gap-3">
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-slate-100 border border-white shadow-sm" />
          <div>
              <p className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                  {user.name} 
                  {user.id === currentUser.id && <span className="text-[10px] font-normal text-slate-400">(You)</span>}
              </p>
              <p className="text-[10px] text-slate-500">{user.role}</p>
          </div>
      </div>
      
      <div className="flex items-center gap-2">
          {isOwner && user.id !== currentUser.id ? (
              <>
                  <button 
                      onClick={() => onEdit(user)}
                      className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100"
                  >
                      <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button 
                      onClick={() => onRemove(user)}
                      className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-rose-100 transition-colors border border-transparent hover:border-rose-200"
                  >
                      <UserX className="w-3.5 h-3.5" />
                  </button>
              </>
          ) : (
              <a href={`tel:${user.phone}`} className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors shadow-sm">
                  <Phone className="w-3.5 h-3.5" />
              </a>
          )}
      </div>
  </div>
);

const getRoleBadge = (role) => {
  switch (role) {
    case 'Owner':
    case 'Partner': return { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: ShieldCheck };
    case 'Manager': return { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Briefcase };
    case 'Cook': return { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: Utensils };
    case 'Cleaner': return { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: Sparkles };
    default: return { color: 'bg-slate-100 text-slate-700 border-slate-200', icon: User };
  }
};

const RoleBadge = ({ role }) => {
  const style = getRoleBadge(role);
  const Icon = style.icon;
  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${style.color}`}>
      <Icon className="w-3.5 h-3.5" />
      {role}
    </span>
  );
};

export default function UserProfile() {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS.owner);
  const [showMenu, setShowMenu] = useState(false);
  
  // Lists
  const [ownersList, setOwnersList] = useState([INITIAL_USERS.owner, INITIAL_USERS.partner]);
  const [staffList, setStaffList] = useState([INITIAL_USERS.manager, INITIAL_USERS.cook]);
  const [inactiveList, setInactiveList] = useState([]);

  // Modal State
  const [activeModal, setActiveModal] = useState(null); // 'editProfile', 'addMember', 'editMember', 'inactiveUsers'
  const [formData, setFormData] = useState({});
  const [editingMemberId, setEditingMemberId] = useState(null); // For tracking which member is being edited

  const isOwner = currentUser.role === 'Owner' || currentUser.role === 'Partner';

  // --- ACTIONS ---

  const openAddMember = () => {
    setFormData({ name: '', phone: '', email: '', role: 'Manager' });
    setActiveModal('addMember');
    setShowMenu(false);
  };

  const openEditProfile = () => {
    setFormData({ ...currentUser });
    setActiveModal('editProfile');
    setShowMenu(false);
  };

  const openEditMember = (member) => {
    setFormData({ ...member });
    setEditingMemberId(member.id);
    setActiveModal('editMember');
  };

  const handleSaveMember = () => {
    if (!formData.name || !formData.phone) return alert("Name and Phone are required");

    const newMember = {
      id: editingMemberId || Date.now(),
      ...formData,
      avatar: formData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`
    };

    if (activeModal === 'addMember') {
      if (['Owner', 'Partner'].includes(newMember.role)) {
        setOwnersList([...ownersList, newMember]);
      } else {
        setStaffList([...staffList, newMember]);
      }
    } else if (activeModal === 'editMember') {
      // Update in appropriate list
      if (['Owner', 'Partner'].includes(newMember.role)) {
        setOwnersList(prev => prev.map(u => u.id === newMember.id ? newMember : u));
      } else {
        setStaffList(prev => prev.map(u => u.id === newMember.id ? newMember : u));
      }
    } else if (activeModal === 'editProfile') {
      setCurrentUser(newMember);
      // Also update in list if present
      setOwnersList(prev => prev.map(u => u.id === newMember.id ? newMember : u));
      setStaffList(prev => prev.map(u => u.id === newMember.id ? newMember : u));
    }

    setActiveModal(null);
    setEditingMemberId(null);
  };

  const handleRemoveUser = (user) => {
    if (confirm(`Mark ${user.name} as inactive?`)) {
      // Add to inactive
      setInactiveList([...inactiveList, user]);
      // Remove from active lists
      setOwnersList(prev => prev.filter(u => u.id !== user.id));
      setStaffList(prev => prev.filter(u => u.id !== user.id));
    }
  };

  const handleRestoreUser = (user) => {
    // Remove from inactive
    setInactiveList(prev => prev.filter(u => u.id !== user.id));
    // Add back to active based on role
    if (['Owner', 'Partner'].includes(user.role)) {
      setOwnersList(prev => [...prev, user]);
    } else {
      setStaffList(prev => [...prev, user]);
    }
  };

  const handlePermanentDelete = (user) => {
    if (confirm(`Are you sure you want to permanently delete ${user.name}? This cannot be undone.`)) {
      setInactiveList(prev => prev.filter(u => u.id !== user.id));
    }
  };

  return (
    <div className="font-sans bg-slate-50 min-h-screen w-full relative overflow-x-hidden" onClick={() => setShowMenu(false)}>
      <style>{styles}</style>
      
      {/* Background Decor */}
      <div className="fixed top-[-10%] right-[-5%] w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-lg mx-auto bg-white/30 min-h-screen relative shadow-2xl flex flex-col">
        
        {/* --- Header --- */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(-1)} 
                  className="w-10 h-10 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-slate-600 transition-all border border-white/50 shadow-sm active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-bold text-slate-800">
                    {isOwner ? 'Admin Profile' : 'My Profile'}
                </h1>
            </div>

            {/* Owner Dropdown */}
            <div className="relative">
                <button 
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        if (isOwner) setShowMenu(!showMenu); 
                        else openEditProfile(); 
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border shadow-sm active:scale-95 ${
                        showMenu || !isOwner
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white/50 hover:bg-white text-slate-600 border-white/50'
                    }`}
                >
                    {isOwner ? <MoreVertical className="w-5 h-5" /> : <Edit className="w-4 h-4" />}
                </button>

                {/* Dropdown Menu */}
                {showMenu && isOwner && (
                    <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-menu z-50">
                        <div className="p-1">
                            <button 
                                onClick={openEditProfile}
                                className="w-full text-left px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                            >
                                <Edit className="w-4 h-4 text-slate-400" /> Edit My Profile
                            </button>
                            <button 
                                onClick={openAddMember}
                                className="w-full text-left px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                            >
                                <UserPlus className="w-4 h-4 text-slate-400" /> Add New Member
                            </button>
                            <div className="h-px bg-slate-100 my-1"></div>
                            <button 
                                onClick={() => { setActiveModal('inactiveUsers'); setShowMenu(false); }}
                                className="w-full text-left px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                            >
                                <UserX className="w-4 h-4 text-slate-400" /> Inactive Users ({inactiveList.length})
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-8">
            
            {/* --- Profile Header Card --- */}
            <div className="px-4 py-6 text-center animate-slideUp">
                <div className="relative inline-block mb-4">
                    <div className="w-28 h-28 rounded-full p-1 bg-white shadow-xl">
                        <img 
                            src={currentUser.avatar} 
                            alt="Profile" 
                            className="w-full h-full rounded-full bg-slate-100 object-cover"
                        />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-white rounded-full p-1.5 shadow-md border border-slate-100">
                        <RoleBadge role={currentUser.role} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{currentUser.name}</h2>
                <p className="text-slate-500 text-sm mt-1">{currentUser.email || currentUser.phone}</p>
            </div>

            {/* --- Personal Details --- */}
            <div className="px-4 mb-6 animate-slideUp" style={{ animationDelay: '100ms' }}>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">Personal Info</h3>
                <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl overflow-hidden shadow-sm">
                    {currentUser.email && (
                        <div className="flex items-center gap-4 p-4 border-b border-slate-100">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-slate-400 font-medium">Email Address</p>
                                <p className="text-sm font-semibold text-slate-800">{currentUser.email}</p>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-4 p-4">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-slate-400 font-medium">Phone Number</p>
                            <p className="text-sm font-semibold text-slate-800">{currentUser.phone}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- PG Details --- */}
            <div className="px-4 mb-6 animate-slideUp" style={{ animationDelay: '200ms' }}>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">PG Details</h3>
                <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-5">
                        <Building className="w-24 h-24" />
                    </div>
                    <div className="flex items-start gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                            <Building className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-slate-800">{PG_DETAILS.name}</h4>
                            <div className="flex items-center gap-1.5 mt-1 text-slate-500">
                                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                <p className="text-xs font-medium leading-tight">{PG_DETAILS.address}</p>
                            </div>
                            <div className="mt-3 inline-block bg-slate-100 px-2 py-1 rounded text-[10px] font-mono text-slate-600 border border-slate-200">
                                Code: {PG_DETAILS.code}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Management Team --- */}
            <div className="px-4 mb-6 animate-slideUp" style={{ animationDelay: '300ms' }}>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">
                    Management Team
                </h3>
                <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-4 shadow-sm space-y-5">
                    
                    {/* Partners List */}
                    <div>
                        <p className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <Users className="w-3.5 h-3.5" /> Partners & Owners
                        </p>
                        <div className="space-y-4">
                            {ownersList.map((owner) => (
                                <UserListItem 
                                    key={owner.id} 
                                    user={owner} 
                                    currentUser={currentUser} 
                                    isOwner={isOwner} 
                                    onEdit={openEditMember} 
                                    onRemove={handleRemoveUser} 
                                />
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-slate-100"></div>

                    {/* Staff List */}
                    <div>
                        <p className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <Briefcase className="w-3.5 h-3.5" /> Staff
                        </p>
                        <div className="space-y-4">
                            {staffList.map((staff) => (
                                <UserListItem 
                                    key={staff.id} 
                                    user={staff} 
                                    currentUser={currentUser} 
                                    isOwner={isOwner} 
                                    onEdit={openEditMember} 
                                    onRemove={handleRemoveUser} 
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* --- Demo Switcher --- */}
            <div className="px-4 py-4 text-center">
                <p className="text-[10px] text-slate-400 mb-2 uppercase tracking-widest">--- Demo: Switch Role ---</p>
                <div className="flex justify-center gap-2 flex-wrap">
                    {Object.values(INITIAL_USERS).map(u => (
                        <button 
                            key={u.id}
                            onClick={() => setCurrentUser(u)}
                            className={`px-3 py-1 rounded text-[10px] border transition-all ${currentUser.id === u.id ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200'}`}
                        >
                            {u.role}
                        </button>
                    ))}
                </div>
            </div>

            {/* Logout */}
            <div className="px-4 mt-2">
                <button className="w-full py-3.5 rounded-xl bg-white border border-red-100 text-red-600 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" />
                    Log Out
                </button>
            </div>

        </div>

        {/* --- MODALS --- */}

        {/* 1. Add/Edit Member Modal */}
        {(activeModal === 'addMember' || activeModal === 'editMember' || activeModal === 'editProfile') && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
                <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-slideUp">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-800">
                            {activeModal === 'addMember' ? 'Add New Member' : activeModal === 'editProfile' ? 'Edit My Profile' : 'Edit Member'}
                        </h2>
                        <button onClick={() => setActiveModal(null)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <ModalInput 
                            label="Full Name" 
                            value={formData.name || ''} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})} 
                            placeholder="Enter full name"
                        />
                        <ModalInput 
                            label="Phone Number" 
                            type="tel"
                            value={formData.phone || ''} 
                            onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                            placeholder="+91 00000 00000"
                        />
                        <ModalInput 
                            label="Email Address (Optional)" 
                            type="email"
                            value={formData.email || ''} 
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                            placeholder="email@example.com"
                        />
                        
                        {/* Role Selector (Disabled if editing own profile) */}
                        {activeModal !== 'editProfile' && (
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Role</label>
                                <div className="flex flex-wrap gap-2">
                                    {ROLES.map(role => (
                                        <button
                                            key={role}
                                            onClick={() => setFormData({...formData, role})}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                                formData.role === role 
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                                                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200'
                                            }`}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button 
                            onClick={handleSaveMember}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" /> Save Details
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* 2. Inactive Users Modal */}
        {activeModal === 'inactiveUsers' && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
                <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-slideUp">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-800">Inactive Users</h2>
                        <button onClick={() => setActiveModal(null)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {inactiveList.length === 0 ? (
                        <div className="text-center py-8 text-slate-400 text-sm">
                            No inactive users found.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {inactiveList.map(user => (
                                <div key={user.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full grayscale opacity-70" />
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700">{user.name}</p>
                                            <p className="text-[10px] text-slate-500">{user.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => handleRestoreUser(user)}
                                            className="p-2 bg-white border border-slate-200 rounded-full text-green-600 hover:bg-green-50 shadow-sm"
                                            title="Restore User"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handlePermanentDelete(user)}
                                            className="p-2 bg-rose-50 border border-rose-100 rounded-full text-rose-600 hover:bg-rose-100 shadow-sm"
                                            title="Delete Permanently"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )}

      </div>
    </div>
  );
}