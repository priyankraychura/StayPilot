import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  X, 
  Check, 
  Phone, 
  Calendar, 
  Clock, 
  RotateCcw, 
  Users, 
  AlertTriangle, 
  ArrowLeft,
  Search,
  MoreVertical,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Animation Styles
const styles = `
  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-slideUp {
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
`;

export default function PGEnquiryTracker() {
  const [enquiries, setEnquiries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Search state
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    date: '',
    time: '',
    note: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  // Auto-focus input when search opens
  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);

  const loadData = async () => {
    setLoading(true);
    // Mock storage fallback
    if (!window.storage) {
      window.storage = {
        get: (key) => Promise.resolve({ value: localStorage.getItem(key) }),
        set: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
      };
    }

    try {
      const enquiriesResult = await window.storage.get('pg-enquiries');
      if (enquiriesResult && enquiriesResult.value) {
        setEnquiries(JSON.parse(enquiriesResult.value));
      }
    } catch (error) {
      console.log('No existing enquiries');
    }
    setLoading(false);
  };

  const saveEnquiries = async (updatedEnquiries) => {
    try {
      await window.storage.set('pg-enquiries', JSON.stringify(updatedEnquiries));
    } catch (error) {
      console.error('Failed to save enquiries:', error);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.number || !formData.date || !formData.time) {
      return;
    }

    if (editingId) {
      const updatedEnquiries = enquiries.map(enq =>
        enq.id === editingId ? { ...enq, ...formData } : enq
      );
      setEnquiries(updatedEnquiries);
      saveEnquiries(updatedEnquiries);
      setEditingId(null);
    } else {
      const newEnquiry = {
        id: Date.now(),
        ...formData,
        completed: false,
        createdAt: new Date().toISOString()
      };
      const updatedEnquiries = [...enquiries, newEnquiry];
      setEnquiries(updatedEnquiries);
      saveEnquiries(updatedEnquiries);
    }

    setFormData({ name: '', number: '', date: '', time: '', note: '' });
    setShowForm(false);
  };

  const handleEdit = (enquiry) => {
    setFormData({
      name: enquiry.name,
      number: enquiry.number,
      date: enquiry.date,
      time: enquiry.time,
      note: enquiry.note || ''
    });
    setEditingId(enquiry.id);
    setShowForm(true);
  };

  const handleComplete = (id) => {
    const updatedEnquiries = enquiries.map(enq =>
      enq.id === id ? { ...enq, completed: true } : enq
    );
    setEnquiries(updatedEnquiries);
    saveEnquiries(updatedEnquiries);
  };

  const handleUndo = (id) => {
    const updatedEnquiries = enquiries.map(enq =>
      enq.id === id ? { ...enq, completed: false } : enq
    );
    setEnquiries(updatedEnquiries);
    saveEnquiries(updatedEnquiries);
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setDeletingId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (!deletingId) return;
    const updatedEnquiries = enquiries.filter(enq => enq.id !== deletingId);
    setEnquiries(updatedEnquiries);
    saveEnquiries(updatedEnquiries);
    setDeletingId(null);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setDeletingId(null);
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    try {
      const date = new Date(dateStr + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const inputDate = new Date(date);
      inputDate.setHours(0, 0, 0, 0);

      if (inputDate.getTime() === today.getTime()) return 'Today';
      if (inputDate.getTime() === tomorrow.getTime()) return 'Tomorrow';

      return inputDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    } catch (error) {
      return '--';
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '--:--';
    try {
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch (error) {
      return '--:--';
    }
  };

  // Sorting and Filtering
  const sortedEnquiries = [...enquiries]
    .filter(enq => enq.name.toLowerCase().includes(searchTerm.toLowerCase()) || enq.number.includes(searchTerm))
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const dateA = a.date || '1970-01-01';
      const timeA = a.time || '00:00';
      const dateB = b.date || '1970-01-01';
      const timeB = b.time || '00:00';
      return new Date(`${dateA}T${timeA}`) - new Date(`${dateB}T${timeB}`);
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-slate-50 min-h-screen w-full relative overflow-x-hidden">
      <style>{styles}</style>
      
      {/* Background Decor - Consistent with Dashboard */}
      <div className="fixed top-[-10%] right-[-5%] w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-lg mx-auto bg-white/30 min-h-screen relative shadow-2xl pb-24">
        
        {/* --- Dynamic Header --- */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm h-[72px] flex items-center px-4 transition-all duration-300 ease-in-out">
          
          {!isSearchActive ? (
            /* Standard Header View */
            <div className="w-full flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/')} 
                  className="w-10 h-10 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-slate-600 transition-all border border-white/50 shadow-sm active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-lg font-bold text-slate-800 leading-tight">Enquiries</h1>
                  <p className="text-xs text-slate-500 font-medium">
                    {enquiries.filter(e => !e.completed).length} Pending
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsSearchActive(true)}
                className="w-10 h-10 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-slate-600 transition-all border border-white/50 shadow-sm active:scale-95"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          ) : (
            /* Expanded Search View */
            <div className="w-full flex items-center gap-3 animate-fadeIn">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  placeholder="Search by name or number..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
              <button 
                onClick={() => {
                  setIsSearchActive(false);
                  setSearchTerm('');
                }}
                className="text-sm font-semibold text-slate-500 hover:text-slate-800 px-2 py-1"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* --- Content --- */}
        <div className="p-4 space-y-3">
          {sortedEnquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center pt-20 text-center px-6">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <Users className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-slate-800 font-semibold mb-1">
                {searchTerm ? 'No results found' : 'No enquiries found'}
              </h3>
              <p className="text-slate-500 text-sm">
                {searchTerm ? 'Try adjusting your search term.' : 'Add a new enquiry to get started tracking visits.'}
              </p>
            </div>
          ) : (
            sortedEnquiries.map(enquiry => (
              <div
                key={enquiry.id}
                onClick={() => handleEdit(enquiry)}
                className={`relative group bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer overflow-hidden ${
                  enquiry.completed ? 'opacity-60 grayscale-[0.5]' : ''
                }`}
              >
                {/* Completed Strip */}
                {enquiry.completed && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div>
                )}

                <div className="flex justify-between items-start mb-3 pl-2">
                  <div>
                    <h3 className={`font-bold text-slate-800 ${enquiry.completed ? 'line-through decoration-slate-400' : ''}`}>
                      {enquiry.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-0.5">
                        <Phone className="w-3 h-3" />
                        {enquiry.number}
                    </div>
                  </div>
                  
                  {/* Date Badge */}
                  <div className={`flex flex-col items-end`}>
                     <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs font-bold border border-blue-100 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(enquiry.date)}
                     </div>
                     <div className="text-[10px] text-slate-400 font-semibold mt-1 flex items-center gap-1 pr-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(enquiry.time)}
                     </div>
                  </div>
                </div>

                {/* Note Area */}
                {enquiry.note && (
                  <div className="bg-yellow-50/50 border border-yellow-100 rounded-lg p-2 mb-3 ml-2">
                    <p className="text-xs text-slate-600 line-clamp-2 italic">
                      "{enquiry.note}"
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 ml-2 mt-2 border-t border-slate-100 pt-3">
                  <a
                    href={`tel:${enquiry.number}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200 hover:border-blue-200 py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </a>
                  
                  {!enquiry.completed ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleComplete(enquiry.id); }}
                      className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-all"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Done
                    </button>
                  ) : (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleUndo(enquiry.id); }}
                      className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200 py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Undo
                    </button>
                  )}
                  
                  <button
                    onClick={(e) => handleDeleteClick(e, enquiry.id)}
                    className="w-10 flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-rose-500 border border-rose-200 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* --- Floating Action Button (Hide when searching to avoid clutter) --- */}
        {!isSearchActive && (
          <button
            onClick={() => {
              setFormData({ name: '', number: '', date: '', time: '', note: '' });
              setEditingId(null);
              setShowForm(true);
            }}
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-40 animate-fadeIn"
          >
            <Plus className="w-7 h-7" />
          </button>
        )}

        {/* --- Add/Edit Form Modal --- */}
        {showForm && (
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-fadeIn"
            onClick={() => setShowForm(false)}
          >
            <div 
              className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                  {editingId ? 'Edit Enquiry' : 'New Enquiry'}
                </h2>
                <button onClick={() => setShowForm(false)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter visitor name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Phone Number</label>
                   <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        value={formData.number}
                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                        placeholder="10 digit number"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Time</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Note (Optional)</label>
                  <textarea
                    rows="2"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="Requirements, budget, source..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] mt-2"
                >
                  {editingId ? 'Update Enquiry' : 'Save Enquiry'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- Delete Confirmation Modal --- */}
        {showDeleteConfirm && (
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={cancelDelete}
          >
            <div 
              className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-slideUp text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-7 h-7 text-rose-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Enquiry?</h3>
              <p className="text-slate-500 text-sm mb-6">
                Are you sure? This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}