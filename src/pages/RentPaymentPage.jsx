import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  Copy, 
  Smartphone, 
  QrCode,
  Building,
  Edit2,
  Save,
  AtSign
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

const INITIAL_DATA = {
  accountName: "The Clover House",
  accountNumber: "123456789012",
  ifsc: "HDFC0001234",
  bank: "HDFC Bank, Viman Nagar",
  upiId: "cloverhouse@hdfc"
};

// Extracted for focus stability
const EditInput = ({ label, value, onChange, placeholder, className = "" }) => (
    <div className={`flex flex-col ${className}`}>
        {label && <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">{label}</label>}
        <input 
            type="text" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-slate-50 border border-blue-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
        />
    </div>
);

export default function RentPaymentPage() {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(INITIAL_DATA);
  const [isEditing, setIsEditing] = useState(false);

  // Generate QR Code URL dynamically based on UPI ID and Payee Name
  const upiString = `upi://pay?pa=${paymentData.upiId}&pn=${encodeURIComponent(paymentData.accountName)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiString)}`;

  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert(`Copied: ${text}`);
  };

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving Payment Data:", paymentData);
    setIsEditing(false);
  };

  return (
    <div className="font-sans bg-slate-50 min-h-screen w-full relative overflow-x-hidden">
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
                <h1 className="text-lg font-bold text-slate-800">Rent Payment</h1>
            </div>
            
            <button 
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border shadow-sm active:scale-95 ${
                    isEditing ? 'bg-blue-600 text-white border-blue-600' : 'bg-white/50 hover:bg-white text-slate-600 border-white/50'
                }`}
            >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
            
            {/* --- Main QR Card --- */}
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-500/10 border border-slate-100 text-center animate-slideUp">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <QrCode className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">Scan to Pay</h2>
                <p className="text-sm text-slate-500 mb-6">Use any UPI app to pay rent instantly</p>
                
                <div className="relative inline-block mb-6 group">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 object-contain mix-blend-multiply" />
                    </div>
                </div>

                {isEditing ? (
                    <div className="max-w-xs mx-auto">
                        <EditInput 
                            value={paymentData.upiId}
                            onChange={(val) => handleInputChange('upiId', val)}
                            placeholder="Enter UPI ID"
                        />
                    </div>
                ) : (
                    <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-200/50 max-w-xs mx-auto">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <AtSign className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1 text-left overflow-hidden">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">UPI ID</p>
                            <p className="text-sm font-mono text-slate-700 truncate">{paymentData.upiId}</p>
                        </div>
                        <button 
                            onClick={() => copyToClipboard(paymentData.upiId)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* --- Bank Transfer Details --- */}
            <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-sm animate-slideUp" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                        <Building className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-800">Bank Transfer</h3>
                        <p className="text-[10px] text-slate-500">For NEFT / IMPS / RTGS</p>
                    </div>
                </div>

                <div className="space-y-4">
                    
                    {/* Account Number */}
                    {isEditing ? (
                        <EditInput 
                            label="Account Number"
                            value={paymentData.accountNumber}
                            onChange={(val) => handleInputChange('accountNumber', val)}
                        />
                    ) : (
                        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">Account Number</p>
                                <p className="text-sm font-mono font-semibold text-slate-700 tracking-wider">{paymentData.accountNumber}</p>
                            </div>
                            <button 
                                onClick={() => copyToClipboard(paymentData.accountNumber)}
                                className="text-blue-600 text-xs font-bold px-3 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                                Copy
                            </button>
                        </div>
                    )}

                    {/* IFSC */}
                    {isEditing ? (
                        <EditInput 
                            label="IFSC Code"
                            value={paymentData.ifsc}
                            onChange={(val) => handleInputChange('ifsc', val)}
                        />
                    ) : (
                        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">IFSC Code</p>
                                <p className="text-sm font-mono font-semibold text-slate-700">{paymentData.ifsc}</p>
                            </div>
                            <button 
                                onClick={() => copyToClipboard(paymentData.ifsc)}
                                className="text-blue-600 text-xs font-bold px-3 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                                Copy
                            </button>
                        </div>
                    )}

                    {/* Account Name */}
                    {isEditing ? (
                        <EditInput 
                            label="Beneficiary Name"
                            value={paymentData.accountName}
                            onChange={(val) => handleInputChange('accountName', val)}
                        />
                    ) : (
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">Beneficiary Name</p>
                                <p className="text-sm font-semibold text-slate-700">{paymentData.accountName}</p>
                            </div>
                        </div>
                    )}

                    {/* Bank Name */}
                    {isEditing ? (
                        <EditInput 
                            label="Bank Name"
                            value={paymentData.bank}
                            onChange={(val) => handleInputChange('bank', val)}
                        />
                    ) : (
                        <div className="flex justify-between items-center pt-1">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">Bank Name</p>
                                <p className="text-xs font-medium text-slate-600">{paymentData.bank}</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* --- Helper Text --- */}
            <div className="text-center pb-4">
                <p className="text-[10px] text-slate-400">
                    Please share the payment screenshot with the owner after transfer.
                </p>
            </div>

        </div>
      </div>
    </div>
  );
}