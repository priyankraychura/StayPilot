import React, { useState, useEffect } from 'react';
import { Plus, X, Check, Phone, Calendar, Clock, RotateCcw, Users, Moon, Sun, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const styles = `
  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .animate-slideUp {
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
  
  @media (min-width: 640px) {
    .animate-slideUp {
      /* On desktop, just fade in the modal */
      animation: fadeIn 0.3s ease-out;
    }
  }
`;

export default function PGEnquiryTracker() {
  const [enquiries, setEnquiries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // State for the new delete confirmation modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    date: '',
    time: '',
    note: ''
  });

  const navigate = useNavigate()

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    // Mock storage for local development
    if (!window.storage) {
      console.warn("window.storage not found. Using localStorage fallback.");
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

    try {
      const themeResult = await window.storage.get('pg-theme');
      if (themeResult && themeResult.value) {
        setDarkMode(themeResult.value === 'dark');
      }
    } catch (error) {
      console.log('No theme saved, using default');
    }

    setLoading(false);
  };

  const saveEnquiries = async (updatedEnquiries) => {
    try {
      await window.storage.set('pg-enquiries', JSON.stringify(updatedEnquiries));
    } catch (error) {
      console.error('Failed to save enquiries:', error);
      // We can't use alert, so we'd need a custom error toast
    }
  };

  const toggleTheme = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    try {
      await window.storage.set('pg-theme', newMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme');
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.number || !formData.date || !formData.time) {
      // We can't use alert, so just log for now
      console.warn('Please fill in all required fields');
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

  // --- New Delete Logic ---
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
  // --- End of New Delete Logic ---


  const sortedEnquiries = [...enquiries].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Handle cases where date or time might be missing
    const dateA = a.date || '1970-01-01';
    const timeA = a.time || '00:00';
    const dateB = b.date || '1970-01-01';
    const timeB = b.time || '00:00';

    try {
      const dateTimeA = new Date(`${dateA}T${timeA}`);
      const dateTimeB = new Date(`${dateB}T${timeB}`);

      // Check for invalid dates
      if (isNaN(dateTimeA.getTime())) return 1;
      if (isNaN(dateTimeB.getTime())) return -1;

      return dateTimeA - dateTimeB;
    } catch (error) {
      console.error("Error parsing date/time for sorting:", a, b, error);
      return 0;
    }
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    try {
      const date = new Date(dateStr + 'T00:00:00'); // Ensure date is parsed in local timezone
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Normalize input date
      const inputDate = new Date(date);
      inputDate.setHours(0, 0, 0, 0);

      if (inputDate.getTime() === today.getTime()) return 'Today';
      if (inputDate.getTime() === tomorrow.getTime()) return 'Tomorrow';

      return inputDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    } catch (error) {
      console.error("Error formatting date:", dateStr, error);
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
      console.error("Error formatting time:", timeStr, error);
      return '--:--';
    }
  };

  const theme = darkMode ? {
    bg: 'bg-slate-950',
    cardBg: 'bg-slate-900',
    headerBg: 'bg-slate-900/80',
    border: 'border-slate-800',
    text: 'text-white',
    textSecondary: 'text-slate-400',
    textTertiary: 'text-slate-500',
    inputBg: 'bg-slate-800',
    inputBorder: 'border-slate-700',
    hoverBg: 'hover:bg-slate-800',
    noteBg: 'bg-slate-800/50',
    separator: 'text-slate-600',
    iconBg: 'bg-gradient-to-br from-blue-500 to-sky-600',
    emptyIconBg: 'bg-slate-800',
    emptyIconText: 'text-slate-600'
  } : {
    bg: 'bg-gray-50',
    cardBg: 'bg-white',
    headerBg: 'bg-white/80',
    border: 'border-gray-200',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textTertiary: 'text-gray-500',
    inputBg: 'bg-white',
    inputBorder: 'border-gray-300',
    hoverBg: 'hover:bg-gray-50',
    noteBg: 'bg-gray-100',
    separator: 'text-gray-300',
    iconBg: 'bg-gradient-to-br from-blue-500 to-sky-600',
    emptyIconBg: 'bg-gray-100',
    emptyIconText: 'text-gray-400'
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center`}>
        <div className={theme.textSecondary}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={`font-sans bg-gray-50 max-w-lg mx-auto min-h-screen shadow-2xl ${theme.bg} pb-20`}>
      <style>{styles}</style>
      {/* Header */}
      <div className={`${theme.headerBg} backdrop-blur-lg border-b ${theme.border} sticky top-0 z-10`}>
        <div className="max-w-2xl mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-cyan-100 text-blue-600">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className={`text-base font-semibold ${theme.text}`}>Enquiries</h1>
                <p className={`text-xs ${theme.textSecondary}`}>
                  {enquiries.filter(e => !e.completed).length} pending • {enquiries.filter(e => e.completed).length} completed
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-lg ${theme.hoverBg} ${theme.textSecondary} hover:${theme.text} flex items-center justify-center transition-all`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Enquiry List */}
      <div className="max-w-2xl mx-auto px-3 py-3 space-y-2">
        {sortedEnquiries.length === 0 ? (
          <div className="text-center py-12">
            <div className={`w-12 h-12 ${theme.emptyIconBg} rounded-full flex items-center justify-center mx-auto mb-2`}>
              <Users className={`w-6 h-6 ${theme.emptyIconText}`} />
            </div>
            <p className={`${theme.textSecondary} text-sm`}>No enquiries yet</p>
          </div>
        ) : (
          sortedEnquiries.map(enquiry => (
            <div
              key={enquiry.id}
              onClick={() => handleEdit(enquiry)}
              className={`${theme.cardBg} border ${theme.border} rounded-xl p-2.5 transition-all cursor-pointer active:scale-[0.98] ${enquiry.completed ? 'opacity-50' : ''
                }`}
            >
              {/* Name & Status */}
              <div className="flex items-center justify-between mb-1.5">
                <h3 className={`font-semibold text-sm ${enquiry.completed ? `line-through ${theme.textTertiary}` : theme.text}`}>
                  {enquiry.name}
                </h3>
                {enquiry.completed && (
                  <span className="bg-emerald-500/10 text-emerald-500 text-xs px-2 py-0.5 rounded-full font-medium">
                    Done
                  </span>
                )}
              </div>

              {/* Phone & DateTime */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className={`flex items-center gap-1 text-xs ${theme.textSecondary}`}>
                  <Phone className="w-3 h-3" />
                  <span>{enquiry.number}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1 text-blue-500 font-medium">
                    <Calendar className="w-3 h-3" />
                    {formatDate(enquiry.date)}
                  </span>
                  <span className={theme.separator}>•</span>
                  <span className="flex items-center gap-1 text-blue-500 font-medium">
                    <Clock className="w-3 h-3" />
                    {formatTime(enquiry.time)}
                  </span>
                </div>
              </div>

              {/* Note */}
              {enquiry.note && (
                <p className={`text-xs ${theme.textTertiary} mb-2 ${theme.noteBg} px-2 py-1 rounded break-words`}>
                  {enquiry.note}
                </p>
              )}

              {/* Buttons */}
              <div className="flex gap-1.5">
                <a
                  href={`tel:${enquiry.number}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-600 dark:text-blue-400 py-2 rounded-lg flex items-center justify-center gap-1.5 text-xs font-medium transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </a>
                {!enquiry.completed ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleComplete(enquiry.id);
                    }}
                    className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-600 dark:text-emerald-400 py-2 rounded-lg flex items-center justify-center gap-1.5 text-xs font-medium transition-all active:scale-95"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Done
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUndo(enquiry.id);
                    }}
                    className={`flex-1 ${darkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-gray-200 hover:bg-gray-300'} ${theme.textSecondary} py-2 rounded-lg flex items-center justify-center gap-1.5 text-xs font-medium transition-all active:scale-95`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Undo
                  </button>
                )}
                {/* MODIFIED DELETE BUTTON */}
                <button
                  type="button"
                  onClick={(e) => handleDeleteClick(e, enquiry.id)}
                  className="px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 py-2 rounded-lg transition-all active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => {
          setFormData({ name: '', number: '', date: '', time: '', note: '' });
          setEditingId(null);
          setShowForm(true);
        }}
        className="fixed bottom-5 right-5 bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white w-14 h-14 rounded-full shadow-2xl shadow-blue-500/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add/Edit Enquiry Form Modal */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 animate-fadeIn"
          onClick={() => {
            setShowForm(false);
            setEditingId(null);
            setFormData({ name: '', number: '', date: '', time: '', note: '' });
          }}
        >
          <div
            className={`${theme.cardBg} border ${theme.border} w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl p-5 max-h-[90vh] overflow-y-auto animate-slideUp`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${theme.text}`}>
                {editingId ? 'Edit Enquiry' : 'New Enquiry'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ name: '', number: '', date: '', time: '', note: '' });
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${theme.hoverBg} ${theme.textSecondary} hover:${theme.text} transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className={`block text-xs font-medium ${theme.textSecondary} mb-1`}>
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 text-sm ${theme.inputBg} border ${theme.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.text} placeholder-${darkMode ? 'slate-500' : 'gray-500'} transition-all`}
                  placeholder="Enter name"
                  required
                />
              </div>

              <div>
                <label className={`block text-xs font-medium ${theme.textSecondary} mb-1`}>
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className={`w-full px-3 py-2 text-sm ${theme.inputBg} border ${theme.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.text} placeholder-${darkMode ? 'slate-500' : 'gray-500'} transition-all`}
                  placeholder="10 digit number"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={`block text-xs font-medium ${theme.textSecondary} mb-1`}>
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={`w-full px-3 py-2 text-sm ${theme.inputBg} border ${theme.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.text} transition-all`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium ${theme.textSecondary} mb-1`}>
                    Time *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className={`w-full px-3 py-2 text-sm ${theme.inputBg} border ${theme.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.text} transition-all`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-medium ${theme.textSecondary} mb-1`}>
                  Note
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className={`w-full px-3 py-2 text-sm ${theme.inputBg} border ${theme.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.text} placeholder-${darkMode ? 'slate-500' : 'gray-500'} transition-all resize-none`}
                  placeholder="Source, requirements..."
                  rows="2"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ name: '', number: '', date: '', time: '', note: '' });
                  }}
                  className={`flex-1 px-4 py-2.5 text-sm border ${theme.inputBorder} ${theme.textSecondary} rounded-lg ${theme.hoverBg} font-medium transition-all active:scale-95`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2.5 text-sm bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white rounded-lg font-medium transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                >
                  {editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- NEW Delete Confirmation Modal --- */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn p-4"
          onClick={cancelDelete} // Click on backdrop to cancel
        >
          <div
            className={`${theme.cardBg} border ${theme.border} w-full sm:max-w-sm rounded-2xl p-5 animate-slideUp`}
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-rose-500" />
              </div>
            </div>
            <h3 className={`text-lg font-semibold ${theme.text} mb-2 text-center`}>Delete Enquiry?</h3>
            <p className={`${theme.textSecondary} text-sm mb-4 text-center`}>
              Are you sure you want to delete this enquiry? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={cancelDelete}
                className={`flex-1 px-4 py-2.5 text-sm border ${theme.inputBorder} ${theme.textSecondary} rounded-lg ${theme.hoverBg} font-medium transition-all active:scale-95`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 text-sm bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-all active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}