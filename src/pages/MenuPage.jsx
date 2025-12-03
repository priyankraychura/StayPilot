import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Coffee, 
  Sun, 
  Moon, 
  CalendarDays,
  ChevronRight,
  Utensils,
  Edit2,
  Save
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
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Initial Menu Data
const INITIAL_MENU_DATA = {
  1: { // Week 1
    Monday: { breakfast: "Meggie", lunch: "Vege, Daal rice", dinner: "Mix veg, Paratha" },
    Tuesday: { breakfast: "Thepla", lunch: "Mug, Rice", dinner: "Paw Bhaji" },
    Wednesday: { breakfast: "Bhajiya", lunch: "Vege, Daal rice", dinner: "Kadhi-Kichdi, Aloo" },
    Thursday: { breakfast: "Bhakhri", lunch: "Desi Chana, Rice", dinner: "Daal Bati" },
    Friday: { breakfast: "Bread, Butter", lunch: "Vege, Daal rice", dinner: "Mendu Vada, Dhosa" },
    Saturday: { breakfast: "Dhokla", lunch: "Rajma, Rice", dinner: "Tuver, Bread" },
    Sunday: { breakfast: "Chana-chat", lunch: "Undhiyu", dinner: "Pani puri, Sandwitch" },
  },
  2: { // Week 2
    Monday: { breakfast: "Poha", lunch: "Chole, Rice", dinner: "Manchurian rice & noodles" },
    Tuesday: { breakfast: "Pasta", lunch: "Vege, Daal rice", dinner: "Sev Tamatar, Bhakhri" },
    Wednesday: { breakfast: "Sev Khamni", lunch: "White Choda, Rice", dinner: "Aloo mater, Pulaav" },
    Thursday: { breakfast: "Upma", lunch: "Vege, Daal rice", dinner: "Aloo Parotha, Dahi" },
    Friday: { breakfast: "Masala Puri", lunch: "Tuver Dal, Rice", dinner: "Dal Pakvaan, Vada paw" },
    Saturday: { breakfast: "Sandwitch Dhokla", lunch: "Vege, Daal rice", dinner: "Bateka Raviya, Roti" },
    Sunday: { breakfast: "Chilla", lunch: "Paneer sabji", dinner: "Dabeli, Bhel" },
  }
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// MealCard Component extracted outside to prevent re-renders losing focus
const MealCard = ({ title, type, item, icon: Icon, colorClass, delay, isEditing, onUpdate }) => (
  <div 
    className={`animate-slideUp relative bg-white/70 backdrop-blur-md border border-white/60 rounded-3xl p-5 shadow-sm overflow-hidden group hover:shadow-md transition-all active:scale-[0.98]`}
    style={{ animationDelay: `${delay}ms` }}
  >
      <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${colorClass}`}>
          <Icon className="w-24 h-24" />
      </div>
      
      <div className="relative z-10 flex gap-4 items-center">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${colorClass} bg-opacity-20`}>
              <Icon className={`w-7 h-7 ${colorClass.replace('bg-', 'text-').replace('-100', '-600')}`} />
          </div>
          <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</h3>
              {isEditing ? (
                <input 
                  type="text"
                  value={item}
                  onChange={(e) => onUpdate(type, e.target.value)}
                  className="w-full bg-white/50 border-b-2 border-orange-200 focus:border-orange-500 rounded-md px-1 text-lg font-bold text-slate-800 leading-tight focus:outline-none transition-colors"
                />
              ) : (
                <p className="text-lg font-bold text-slate-800 leading-tight break-words">{item}</p>
              )}
          </div>
      </div>
  </div>
);

export default function MenuPage() {
  const navigate = useNavigate();
  
  // State
  const [menuData, setMenuData] = useState(INITIAL_MENU_DATA);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [isEditing, setIsEditing] = useState(false);

  // Set Today on Mount
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    if (DAYS.includes(today)) {
      setSelectedDay(today);
    }
  }, []);

  const handleUpdateMenu = (type, value) => {
    setMenuData(prev => ({
      ...prev,
      [selectedWeek]: {
        ...prev[selectedWeek],
        [selectedDay]: {
          ...prev[selectedWeek][selectedDay],
          [type]: value
        }
      }
    }));
  };

  // Safe fallback if data is missing for a specific day
  const currentMenu = menuData[selectedWeek][selectedDay] || { breakfast: "", lunch: "", dinner: "" };

  return (
    <div className="font-sans bg-slate-50 min-h-screen w-full relative overflow-x-hidden">
      <style>{styles}</style>
      
      {/* Background Decor */}
      <div className="fixed top-[-10%] right-[-5%] w-96 h-96 bg-orange-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-96 h-96 bg-yellow-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-lg mx-auto bg-white/30 min-h-screen relative shadow-2xl pb-6 flex flex-col">
        
        {/* --- Header --- */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(-1)} 
                  className="w-10 h-10 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-slate-600 transition-all border border-white/50 shadow-sm active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-lg font-bold text-slate-800 leading-tight">Food Menu</h1>
                    <p className="text-xs text-slate-500 font-medium">The Clover House</p>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Week Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
                  <button 
                      onClick={() => setSelectedWeek(1)}
                      className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${selectedWeek === 1 ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-400'}`}
                  >
                      W1
                  </button>
                  <button 
                      onClick={() => setSelectedWeek(2)}
                      className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${selectedWeek === 2 ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-400'}`}
                  >
                      W2
                  </button>
              </div>

              {/* Edit Toggle */}
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isEditing ? 'bg-orange-500 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-white border border-slate-200'}`}
              >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              </button>
            </div>
        </div>

        {/* --- Day Selector (Horizontal Scroll) --- */}
        <div className="pt-4 pb-2">
            <div className="flex overflow-x-auto hide-scrollbar px-4 gap-3 snap-x">
                {DAYS.map((day, index) => {
                    const isSelected = selectedDay === day;
                    const shortDay = day.substring(0, 3);
                    
                    return (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`snap-center flex-shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-2xl border transition-all duration-300 ${
                                isSelected 
                                ? 'bg-orange-500 border-orange-600 text-white shadow-lg shadow-orange-500/30 scale-105' 
                                : 'bg-white/60 border-white/60 text-slate-500 hover:bg-white'
                            }`}
                        >
                            <span className="text-[10px] font-medium opacity-80">{shortDay}</span>
                            <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                                {index + 1}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>

        {/* --- Main Content --- */}
        <div className="flex-1 px-4 py-4 space-y-4">
            
            <div className="flex items-center justify-between mb-2 px-1">
                <h2 className="text-xl font-bold text-slate-800">
                    {selectedDay}'s Special
                </h2>
                <div className="flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-lg border border-orange-100">
                    <CalendarDays className="w-3.5 h-3.5" />
                    Week {selectedWeek}
                </div>
            </div>

            <MealCard 
                title="Breakfast" 
                type="breakfast"
                item={currentMenu.breakfast} 
                icon={Coffee} 
                colorClass="bg-amber-100" 
                delay={0}
                isEditing={isEditing}
                onUpdate={handleUpdateMenu}
            />
            
            <MealCard 
                title="Lunch" 
                type="lunch"
                item={currentMenu.lunch} 
                icon={Sun} 
                colorClass="bg-orange-100" 
                delay={100}
                isEditing={isEditing}
                onUpdate={handleUpdateMenu}
            />
            
            <MealCard 
                title="Dinner" 
                type="dinner"
                item={currentMenu.dinner} 
                icon={Moon} 
                colorClass="bg-indigo-100" 
                delay={200}
                isEditing={isEditing}
                onUpdate={handleUpdateMenu}
            />

        </div>

        {/* --- Footer Note --- */}
        <div className="px-6 pb-6 text-center">
             <p className="text-[10px] text-slate-400">
                Menu is subject to change based on vegetable availability.
             </p>
        </div>

      </div>
    </div>
  );
}