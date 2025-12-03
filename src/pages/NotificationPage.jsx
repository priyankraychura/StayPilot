import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bell, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Trash2,
  MoreHorizontal
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

export default function NotificationPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All'); // 'All', 'Info', 'Alerts'
  
  // Demo Data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'Rent Payment Overdue',
      message: 'Your rent for September is pending. Please pay by 5th to avoid late fees.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Water Supply Maintenance',
      message: 'Water supply will be unavailable tomorrow from 10 AM to 2 PM due to tank cleaning.',
      time: '5 hours ago',
      read: true
    },
    {
      id: 3,
      type: 'success',
      title: 'Complaint Resolved',
      message: 'Your complaint regarding the broken fan (#402) has been marked as resolved.',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'alert',
      title: 'Visitor Entry Denied',
      message: 'A visitor named "Rahul" was denied entry as per your instructions.',
      time: '1 day ago',
      read: false
    },
    {
      id: 5,
      type: 'info',
      title: 'New Dinner Menu',
      message: 'The mess menu has been updated for the upcoming week. Check it out!',
      time: '2 days ago',
      read: true
    },
    {
      id: 6,
      type: 'success',
      title: 'Payment Received',
      message: 'Thank you! We have received your electricity bill payment of ₹1,200.',
      time: '3 days ago',
      read: true
    }
  ]);

  // Filter Logic
  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Info') return notif.type === 'info' || notif.type === 'success';
    if (activeTab === 'Alerts') return notif.type === 'alert';
    return true;
  });

  const getIcon = (type) => {
    switch(type) {
      case 'alert': return <AlertTriangle className="w-5 h-5 text-rose-500" />;
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'info': default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = (type) => {
    switch(type) {
      case 'alert': return 'bg-rose-50 border-rose-100';
      case 'success': return 'bg-emerald-50 border-emerald-100';
      case 'info': default: return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="font-sans bg-slate-50 min-h-screen w-full relative overflow-x-hidden">
      <style>{styles}</style>
      
      {/* Background Decor */}
      <div className="fixed top-[-10%] right-[-5%] w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-lg mx-auto bg-white/30 min-h-screen relative shadow-2xl pb-6">
        
        {/* --- Header --- */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(-1)} 
                  className="w-10 h-10 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-slate-600 transition-all border border-white/50 shadow-sm active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-bold text-slate-800">Notifications</h1>
            </div>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full transition-colors">
                Mark all read
            </button>
        </div>

        {/* --- Custom Tab Switcher --- */}
        <div className="px-4 py-4">
            <div className="bg-white/60 backdrop-blur-md p-1.5 rounded-2xl flex items-center relative border border-white/50 shadow-sm">
                {/* Animated Background Pill */}
                <div 
                    className="absolute h-[calc(100%-12px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out top-1.5 border border-slate-200/60"
                    style={{
                        width: 'calc(33.33% - 8px)',
                        left: activeTab === 'All' ? '6px' : activeTab === 'Info' ? 'calc(33.33% + 4px)' : 'calc(66.66% + 2px)'
                    }}
                />
                
                {['All', 'Info', 'Alerts'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 relative z-10 py-2.5 text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 ${
                            activeTab === tab ? 'text-slate-800' : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        {tab === 'All' && <Bell className="w-3.5 h-3.5" />}
                        {tab === 'Info' && <Info className="w-3.5 h-3.5" />}
                        {tab === 'Alerts' && <AlertTriangle className="w-3.5 h-3.5" />}
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        {/* --- Notification List --- */}
        <div className="px-4 space-y-3">
            {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center pt-20 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Bell className="w-6 h-6 text-slate-300" />
                    </div>
                    <p className="text-slate-500 font-medium">No notifications found</p>
                </div>
            ) : (
                filteredNotifications.map((notif, index) => (
                    <div 
                        key={notif.id}
                        style={{ animationDelay: `${index * 50}ms` }}
                        className={`animate-slideUp relative bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-4 shadow-sm transition-all active:scale-[0.99] cursor-pointer group ${!notif.read ? 'bg-white border-blue-100 shadow-md' : ''}`}
                    >
                        {/* Unread Indicator */}
                        {!notif.read && (
                            <span className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></span>
                        )}

                        <div className="flex gap-4">
                            {/* Icon Box */}
                            <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center border shadow-sm ${getBgColor(notif.type)}`}>
                                {getIcon(notif.type)}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1 pr-4">
                                    <h3 className={`text-sm font-bold text-slate-800 leading-tight ${!notif.read ? 'text-slate-900' : ''}`}>
                                        {notif.title}
                                    </h3>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-2">
                                    {notif.message}
                                </p>
                                <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                                    <Clock className="w-3 h-3" />
                                    {notif.time}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

      </div>
    </div>
  );
}