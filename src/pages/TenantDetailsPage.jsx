import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Edit2, Save, Upload, User, Phone, Mail, MapPin, 
  Briefcase, Calendar, CreditCard, ShieldCheck, FileText, 
  Trash2, Plus, Camera, CheckCircle2, AlertTriangle, Zap
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

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

// Initial Empty State for "New Tenant"
const EMPTY_TENANT = {
  regId: `REG-${Math.floor(Math.random() * 10000)}`, // Auto-generated
  name: "",
  phone: "",
  email: "",
  nationality: "Indian",
  gender: "Male",
  dob: "",
  emergencyContact: { name: "", phone: "" },
  adhaarNumber: "",
  permanentAddress: "",
  
  // Professional
  workType: "Student", // Student or Professional
  organizationName: "", // College or Company
  organizationAddress: "",
  organizationContact: "",

  // Stay
  roomNo: "",
  sharingType: "Double",
  joinDate: new Date().toISOString().split('T')[0],
  currentRent: "",
  depositPaid: "",
  meterReading: "", // Initial or current reading
  
  // Status
  rentStatus: "Pending", // Paid/Pending
  paymentMethod: "UPI",
  policeVerified: false,
  termsAccepted: false,

  // Documents (URLs)
  profilePhoto: null,
  adhaarCardImg: null,
  policeFormImg: null
};

// Mock Existing Data (For Demo when ID != new)
const MOCK_EXISTING = {
  ...EMPTY_TENANT,
  name: "Aarav Patel",
  phone: "9876543210",
  email: "aarav@gmail.com",
  roomNo: "101",
  currentRent: "8500",
  rentStatus: "Paid",
  profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav"
};

const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-5 shadow-sm mb-4 animate-slideUp">
    <div className="flex items-center gap-2 mb-4 text-slate-800 border-b border-slate-100 pb-2">
      <Icon className="w-4 h-4 text-blue-600" />
      <h3 className="text-sm font-bold uppercase tracking-wider">{title}</h3>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InputGroup = ({ label, value, onChange, type = "text", placeholder, isEditing, options }) => {
  if (!isEditing) {
    return (
      <div className="border-b border-slate-50 last:border-0 pb-2 last:pb-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase">{label}</p>
        <p className="text-sm font-medium text-slate-800 break-words">{value || "-"}</p>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 ml-1">{label}</label>
      {options ? (
        <select 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none"
        >
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input 
          type={type} 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      )}
    </div>
  );
};

const FileUpload = ({ label, file, onUpload, isEditing }) => (
  <div className="relative">
    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">{label}</p>
    {file ? (
      <div className="relative group rounded-xl overflow-hidden border border-slate-200 h-32 w-full bg-slate-100">
        <img src={file} alt={label} className="w-full h-full object-cover" />
        {isEditing && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={onUpload}>
            <p className="text-white text-xs font-bold">Change</p>
          </div>
        )}
      </div>
    ) : (
      isEditing ? (
        <div onClick={onUpload} className="h-32 w-full rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all">
          <Camera className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">Tap to Upload</span>
        </div>
      ) : (
        <div className="h-10 w-full bg-slate-50 rounded-lg flex items-center justify-center text-xs text-slate-400 italic">
          No Document
        </div>
      )
    )}
  </div>
);

export default function TenantDetailsPage() {
  const { id } = useParams();
  console.log("🚀 ~ TenantDetailsPage ~ id:", id)
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [isEditing, setIsEditing] = useState(id === 'new');
  const [formData, setFormData] = useState(id === 'new' ? EMPTY_TENANT : MOCK_EXISTING);
  const [activeUploadField, setActiveUploadField] = useState(null);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent, field, value) => {
    setFormData(prev => ({ 
      ...prev, 
      [parent]: { ...prev[parent], [field]: value } 
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && activeUploadField) {
      const url = URL.createObjectURL(file);
      updateField(activeUploadField, url);
    }
    setActiveUploadField(null);
  };

  const triggerUpload = (field) => {
    if (!isEditing) return;
    setActiveUploadField(field);
    fileInputRef.current.click();
  };

  return (
    <div className="font-sans bg-slate-50 min-h-screen w-full relative overflow-x-hidden">
      <style>{styles}</style>
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />

      {/* Background Decor */}
      <div className="fixed top-[-10%] right-[-5%] w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-lg mx-auto bg-white/30 min-h-screen relative shadow-2xl flex flex-col pb-8">
        
        {/* --- Header --- */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(-1)} 
                  className="w-10 h-10 rounded-full bg-slate-50 hover:bg-white flex items-center justify-center text-slate-600 transition-all border border-slate-200 active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-bold text-slate-800">
                  {id === 'new' ? 'Add Tenant' : 'Tenant Profile'}
                </h1>
            </div>
            
            <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border shadow-sm active:scale-95 ${
                    isEditing ? 'bg-blue-600 text-white border-blue-600' : 'bg-white/50 hover:bg-white text-slate-600 border-white/50'
                }`}
            >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-6 space-y-6">
            
            {/* --- Profile Header --- */}
            <div className="flex flex-col items-center text-center animate-slideUp">
                <div className="relative group">
                    <div className="w-28 h-28 rounded-full bg-slate-200 border-4 border-white shadow-lg overflow-hidden">
                        {formData.profilePhoto ? (
                            <img src={formData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <User className="w-12 h-12" />
                            </div>
                        )}
                    </div>
                    {isEditing && (
                        <button 
                            onClick={() => triggerUpload('profilePhoto')}
                            className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md active:scale-95"
                        >
                            <Camera className="w-4 h-4" />
                        </button>
                    )}
                </div>
                
                {isEditing ? (
                    <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="Full Name"
                        className="mt-3 text-center text-xl font-bold bg-transparent border-b border-slate-300 focus:border-blue-500 focus:outline-none w-3/4"
                    />
                ) : (
                    <h2 className="mt-3 text-xl font-bold text-slate-800">{formData.name || "New Tenant"}</h2>
                )}
                
                <p className="text-xs text-slate-500 font-mono mt-1 bg-slate-100 px-2 py-0.5 rounded">
                    ID: {formData.regId}
                </p>
            </div>

            {/* --- 1. Personal Details --- */}
            <Section title="Personal Information" icon={User}>
                <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Phone" value={formData.phone} onChange={(v) => updateField('phone', v)} isEditing={isEditing} type="tel" />
                    <InputGroup label="Gender" value={formData.gender} onChange={(v) => updateField('gender', v)} isEditing={isEditing} options={['Male', 'Female', 'Other']} />
                </div>
                <InputGroup label="Email" value={formData.email} onChange={(v) => updateField('email', v)} isEditing={isEditing} type="email" />
                <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="DOB" value={formData.dob} onChange={(v) => updateField('dob', v)} isEditing={isEditing} type="date" />
                    <InputGroup label="Nationality" value={formData.nationality} onChange={(v) => updateField('nationality', v)} isEditing={isEditing} />
                </div>
                <InputGroup label="Permanent Address" value={formData.permanentAddress} onChange={(v) => updateField('permanentAddress', v)} isEditing={isEditing} />
            </Section>

            {/* --- 2. Emergency Contact --- */}
            <Section title="Emergency Contact" icon={ShieldCheck}>
                <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Contact Name" value={formData.emergencyContact.name} onChange={(v) => updateNestedField('emergencyContact', 'name', v)} isEditing={isEditing} />
                    <InputGroup label="Contact Number" value={formData.emergencyContact.phone} onChange={(v) => updateNestedField('emergencyContact', 'phone', v)} isEditing={isEditing} type="tel" />
                </div>
            </Section>

            {/* --- 3. Stay Details --- */}
            <Section title="Stay & Rent" icon={Calendar}>
                <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Room No" value={formData.roomNo} onChange={(v) => updateField('roomNo', v)} isEditing={isEditing} />
                    <InputGroup label="Sharing Type" value={formData.sharingType} onChange={(v) => updateField('sharingType', v)} isEditing={isEditing} options={['Single', 'Double', 'Triple', 'Quad']} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Join Date" value={formData.joinDate} onChange={(v) => updateField('joinDate', v)} isEditing={isEditing} type="date" />
                    <InputGroup label="Current Rent" value={formData.currentRent} onChange={(v) => updateField('currentRent', v)} isEditing={isEditing} type="number" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Deposit Paid" value={formData.depositPaid} onChange={(v) => updateField('depositPaid', v)} isEditing={isEditing} type="number" />
                    <InputGroup label="Initial AC Reading" value={formData.meterReading} onChange={(v) => updateField('meterReading', v)} isEditing={isEditing} type="number" />
                </div>
                
                {/* Status Toggles (Edit Only or Read Only Badge) */}
                <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Rent Status</span>
                    {isEditing ? (
                        <select 
                            value={formData.rentStatus} 
                            onChange={(e) => updateField('rentStatus', e.target.value)}
                            className={`text-xs font-bold px-2 py-1 rounded border ${formData.rentStatus === 'Paid' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}
                        >
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Due">Due</option>
                        </select>
                    ) : (
                        <span className={`text-xs font-bold px-2 py-1 rounded ${formData.rentStatus === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'}`}>
                            {formData.rentStatus}
                        </span>
                    )}
                </div>
            </Section>

            {/* --- 4. Professional / College Info --- */}
            <Section title="Work / College" icon={Briefcase}>
                <InputGroup label="Type" value={formData.workType} onChange={(v) => updateField('workType', v)} isEditing={isEditing} options={['Student', 'Professional']} />
                <InputGroup label={formData.workType === 'Student' ? "College Name" : "Company Name"} value={formData.organizationName} onChange={(v) => updateField('organizationName', v)} isEditing={isEditing} />
                <InputGroup label="Address" value={formData.organizationAddress} onChange={(v) => updateField('organizationAddress', v)} isEditing={isEditing} />
                <InputGroup label="Contact Info" value={formData.organizationContact} onChange={(v) => updateField('organizationContact', v)} isEditing={isEditing} />
            </Section>

            {/* --- 5. Identity & Docs --- */}
            <Section title="Identity & Documents" icon={FileText}>
                <InputGroup label="Adhaar Number" value={formData.adhaarNumber} onChange={(v) => updateField('adhaarNumber', v)} isEditing={isEditing} />
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                    <FileUpload label="Adhaar Card" file={formData.adhaarCardImg} onUpload={() => triggerUpload('adhaarCardImg')} isEditing={isEditing} />
                    <FileUpload label="Police Verification" file={formData.policeFormImg} onUpload={() => triggerUpload('policeFormImg')} isEditing={isEditing} />
                </div>

                <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div 
                            onClick={() => isEditing && updateField('policeVerified', !formData.policeVerified)}
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.policeVerified ? 'bg-blue-600 border-blue-600' : 'border-slate-300'} ${isEditing ? 'cursor-pointer' : ''}`}
                        >
                            {formData.policeVerified && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className="text-sm text-slate-700">Police Verification Completed</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <div 
                            onClick={() => isEditing && updateField('termsAccepted', !formData.termsAccepted)}
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.termsAccepted ? 'bg-blue-600 border-blue-600' : 'border-slate-300'} ${isEditing ? 'cursor-pointer' : ''}`}
                        >
                            {formData.termsAccepted && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className="text-sm text-slate-700">Terms & Conditions Accepted</span>
                    </div>
                </div>
            </Section>

            {/* --- Delete Button (Only for existing tenants) --- */}
            {id !== 'new' && (
                <div className="pt-4 pb-8">
                    <button className="w-full py-3.5 rounded-xl border border-rose-100 bg-white text-rose-500 font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-rose-50 transition-colors">
                        <Trash2 className="w-4 h-4" />
                        Remove Tenant
                    </button>
                </div>
            )}

        </div>
      </div>
    </div>
  );
}