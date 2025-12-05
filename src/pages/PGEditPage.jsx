import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Wifi, 
  Wind, 
  Utensils, 
  Tv, 
  Zap, 
  ShieldCheck, 
  Upload,
  X,
  Plus,
  Save,
  Image as ImageIcon,
  CheckCircle2,
  Shirt, // Laundry
  Car, // Parking
  Dumbbell, // Gym
  Trash2
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

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

// Available Amenities for Selection
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

// Mock Data for Editing Existing PG
const INITIAL_DATA = {
  name: "The Clover House",
  type: "Luxury Co-living",
  address: "123, Green Avenue, Viman Nagar, Pune, Maharashtra 411014",
  description: "A premium co-living space designed for comfort and community.",
  images: [
    "https://images.unsplash.com/photo-1522771753035-4a53c9d2785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  selectedAmenityIds: ['wifi', 'ac', 'food', 'tv', 'power', 'security'],
  rules: [
    "Gate closes at 10:30 PM strictly.",
    "No loud music after 11:00 PM.",
    "Guests allowed only in common areas."
  ]
};

// Empty Data for New PG
const EMPTY_DATA = {
  name: "",
  type: "",
  address: "",
  description: "",
  images: [],
  selectedAmenityIds: [],
  rules: [""]
};

// --- Extracted Component ---
const InputField = ({ label, value, onChange, placeholder, type = "text", className = "" }) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
    />
  </div>
);

export default function PGEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  // Check if we are in "Add New" mode
  const isNewMode = location.state?.mode === 'new';

  const [formData, setFormData] = useState(isNewMode ? EMPTY_DATA : INITIAL_DATA);

  // --- Handlers ---

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  // Toggle Amenities
  const toggleAmenity = (id) => {
    setFormData(prev => {
      const current = prev.selectedAmenityIds;
      if (current.includes(id)) {
        return { ...prev, selectedAmenityIds: current.filter(itemId => itemId !== id) };
      } else {
        return { ...prev, selectedAmenityIds: [...current, id] };
      }
    });
  };

  // Rules Management
  const handleAddRule = () => {
    setFormData(prev => ({ ...prev, rules: [...prev.rules, ""] }));
  };

  const handleRuleChange = (index, value) => {
    const newRules = [...formData.rules];
    newRules[index] = value;
    setFormData(prev => ({ ...prev, rules: newRules }));
  };

  const handleRemoveRule = (index) => {
    const newRules = formData.rules.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, rules: newRules }));
  };

  // Image Upload Simulation
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (!formData.name) return alert("Property Name is required");
    console.log(isNewMode ? "Creating New Property:" : "Updating Property:", formData);
    navigate(-1);
  };

  return (
    <div className="font-sans bg-slate-50 min-h-screen w-full relative overflow-x-hidden">
      <style>{styles}</style>
      
      <div className="max-w-lg mx-auto bg-white min-h-screen relative shadow-2xl flex flex-col pb-20">
        
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(-1)} 
                  className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-all border border-slate-200 active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-bold text-slate-800">
                    {isNewMode ? 'Add New Property' : 'Edit Property'}
                </h1>
            </div>
            <button 
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full shadow-lg shadow-blue-500/30 active:scale-95 transition-all flex items-center gap-2"
            >
                <Save className="w-4 h-4" /> Save
            </button>
        </div>

        <div className="flex-1 px-5 py-6 space-y-8">

            {/* --- 1. Property Images --- */}
            <section className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-blue-500" /> Property Images
                </h3>
                
                <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
                    {/* Existing Images */}
                    {formData.images.map((img, idx) => (
                        <div key={idx} className="relative w-32 h-24 flex-shrink-0 rounded-xl overflow-hidden group shadow-sm border border-slate-100">
                            <img src={img} alt="Property" className="w-full h-full object-cover" />
                            <button 
                                onClick={() => handleRemoveImage(idx)}
                                className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}

                    {/* Add Image Button */}
                    <div 
                        onClick={() => fileInputRef.current.click()}
                        className="w-32 h-24 flex-shrink-0 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:text-blue-500 transition-all"
                    >
                        <Plus className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-bold uppercase">Add Photo</span>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                        />
                    </div>
                </div>
            </section>

            {/* --- 2. Basic Details --- */}
            <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" /> Basic Information
                </h3>
                <InputField 
                    label="Property Name" 
                    value={formData.name} 
                    onChange={(val) => handleInputChange(null, 'name', val)} 
                    placeholder="Enter property name"
                />
                <InputField 
                    label="Property Type" 
                    value={formData.type} 
                    onChange={(val) => handleInputChange(null, 'type', val)} 
                    placeholder="e.g. Co-living, Boys PG"
                />
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Full Address</label>
                    <textarea 
                        value={formData.address}
                        onChange={(e) => handleInputChange(null, 'address', e.target.value)}
                        rows="3"
                        placeholder="Enter complete address"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    />
                </div>
            </section>

            {/* --- 3. Amenities (Select/Deselect) --- */}
            <section className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" /> Amenities
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    {ALL_AMENITIES.map((item) => {
                        const isSelected = formData.selectedAmenityIds.includes(item.id);
                        return (
                            <button
                                key={item.id}
                                onClick={() => toggleAmenity(item.id)}
                                className={`
                                    relative p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all duration-200
                                    ${isSelected 
                                        ? 'bg-blue-50 border-blue-200 shadow-sm' 
                                        : 'bg-white border-slate-100 text-slate-400 grayscale'
                                    }
                                `}
                            >
                                {isSelected && (
                                    <div className="absolute top-1 right-1 text-blue-500">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                )}
                                <item.icon className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-slate-300'}`} strokeWidth={1.5} />
                                <span className={`text-[10px] font-bold leading-tight ${isSelected ? 'text-blue-800' : 'text-slate-400'}`}>
                                    {item.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* --- 4. House Rules --- */}
            <section className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-500" /> House Rules
                </h3>
                <div className="space-y-2">
                    {formData.rules.map((rule, idx) => (
                        <div key={idx} className="flex gap-2">
                            <input 
                                type="text"
                                value={rule}
                                onChange={(e) => handleRuleChange(idx, e.target.value)}
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                placeholder="Enter rule..."
                            />
                            <button 
                                onClick={() => handleRemoveRule(idx)}
                                className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <button 
                        onClick={handleAddRule}
                        className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-bold hover:border-blue-300 hover:text-blue-500 transition-all flex items-center justify-center gap-1"
                    >
                        <Plus className="w-3 h-3" /> Add Rule
                    </button>
                </div>
            </section>

        </div>
      </div>
    </div>
  );
}