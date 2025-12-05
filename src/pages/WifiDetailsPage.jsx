import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Wifi, 
  Copy, 
  QrCode,
  Edit2,
  Save,
  Plus,
  Trash2,
  X,
  ScanLine
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
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
  }
  .animate-pulse-slow {
    animation: pulse-slow 3s infinite ease-in-out;
  }
`;

const INITIAL_WIFI = [
  { ssid: "Clover_5G", password: "clover_guest_123" },
  { ssid: "Clover_2.4G", password: "clover_guest_123" }
];

// Extracted Input Component for Focus Stability
const WifiInput = ({ label, value, onChange, placeholder, type = "text" }) => (
    <div className="mb-2">
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">{label}</label>
        <input 
            type={type} 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-medium"
        />
    </div>
);

export default function WifiDetailsPage() {
  const navigate = useNavigate();
  const [wifiList, setWifiList] = useState(INITIAL_WIFI);
  const [isEditing, setIsEditing] = useState(false);

  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert(`Copied: ${text}`);
  };

  const handleWifiChange = (index, field, value) => {
    const newList = [...wifiList];
    newList[index][field] = value;
    setWifiList(newList);
  };

  const handleAddWifi = () => {
    setWifiList([...wifiList, { ssid: '', password: '' }]);
  };

  const handleRemoveWifi = (index) => {
    const newList = wifiList.filter((_, i) => i !== index);
    setWifiList(newList);
  };

  const handleSave = () => {
    console.log("Saving Wi-Fi Data:", wifiList);
    setIsEditing(false);
  };

  // Generate standard Wi-Fi QR Code string: WIFI:S:MySSID;T:WPA;P:MyPass;;
  const getQrUrl = (ssid, password) => {
    const wifiString = `WIFI:S:${ssid};T:WPA;P:${password};;`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(wifiString)}`;
  };

  return (
    <div className="font-sans bg-slate-50 min-h-screen w-full relative overflow-x-hidden">
      <style>{styles}</style>
      
      {/* Background Decor - Enhanced for richness */}
      <div className="fixed top-[-20%] right-[-20%] w-[600px] h-[600px] bg-sky-400/20 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-[-20%] left-[-20%] w-[600px] h-[600px] bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-lg mx-auto bg-white/20 min-h-screen relative shadow-2xl flex flex-col backdrop-blur-sm">
        
        {/* --- Header --- */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(-1)} 
                  className="w-10 h-10 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-slate-600 transition-all border border-white/50 shadow-sm active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-bold text-slate-800">Wi-Fi Networks</h1>
            </div>
            
            <button 
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border shadow-sm active:scale-95 ${
                    isEditing ? 'bg-blue-600 text-white border-blue-600 shadow-blue-500/30' : 'bg-white/50 hover:bg-white text-slate-600 border-white/50'
                }`}
            >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
            
            {/* --- Hero Section --- */}
            <div className="text-center animate-slideUp">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-400 to-blue-600 shadow-xl shadow-blue-500/30 mb-4 animate-pulse-slow">
                    <Wifi className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Stay Connected</h2>
                <p className="text-slate-500 text-sm mt-1">Scan QR or copy details to join instantly</p>
            </div>

            {/* --- Wifi Cards --- */}
            <div className="space-y-6">
                {wifiList.map((wifi, idx) => (
                    <div 
                        key={idx} 
                        className="group relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-slideUp" 
                        style={{ animationDelay: `${idx * 150}ms` }}
                    >
                        
                        {/* Remove Button (Edit Mode) */}
                        {isEditing && (
                            <button 
                                onClick={() => handleRemoveWifi(idx)}
                                className="absolute top-4 right-4 p-2 bg-rose-50 text-rose-500 rounded-full hover:bg-rose-100 transition-colors z-20"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}

                        <div className="flex flex-col gap-6">
                            
                            {/* Card Header: Network Name */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                                    <Wifi className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Network Name</p>
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            value={wifi.ssid}
                                            onChange={(e) => handleWifiChange(idx, 'ssid', e.target.value)}
                                            className="w-full font-bold text-lg text-slate-800 bg-transparent border-b border-blue-200 focus:outline-none focus:border-blue-500"
                                            placeholder="SSID"
                                        />
                                    ) : (
                                        <h3 className="text-xl font-bold text-slate-800 truncate leading-tight">{wifi.ssid || "Hidden Network"}</h3>
                                    )}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                            {/* Card Body: QR & Password */}
                            <div className="flex items-start gap-5">
                                {/* QR Code */}
                                {wifi.ssid && wifi.password && (
                                    <div className="flex-shrink-0 flex flex-col items-center gap-2">
                                        <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                                            <img src={getQrUrl(wifi.ssid, wifi.password)} alt="QR" className="w-24 h-24 object-contain mix-blend-multiply" />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                            <ScanLine className="w-3 h-3" /> Scan to Join
                                        </span>
                                    </div>
                                )}
                                
                                {/* Password Field */}
                                <div className="flex-1 min-w-0 flex flex-col justify-center h-full pt-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Password</p>
                                    
                                    {isEditing ? (
                                        <WifiInput 
                                            value={wifi.password} 
                                            onChange={(val) => handleWifiChange(idx, 'password', val)} 
                                            placeholder="Password" 
                                        />
                                    ) : (
                                        <div className="relative group/pass">
                                            <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 font-mono text-sm font-medium text-slate-700 break-all leading-relaxed">
                                                {wifi.password}
                                            </div>
                                            <button 
                                                onClick={() => copyToClipboard(wifi.password)}
                                                className="mt-2 w-full py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
                                            >
                                                <Copy className="w-3.5 h-3.5" /> Copy Password
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Add Button (Edit Mode) */}
            {isEditing && (
                <button 
                    onClick={handleAddWifi}
                    className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-300 text-slate-400 font-bold flex items-center justify-center gap-2 hover:bg-white hover:border-blue-300 hover:text-blue-500 transition-all animate-slideUp"
                >
                    <Plus className="w-5 h-5" /> Add New Network
                </button>
            )}

        </div>
      </div>
    </div>
  );
}