import React, { useState } from 'react';
// --- Import Lucide Icons ---
import {
    Home,
    Building,
    User,
    Menu,
    Bell,
    Search,
    ShieldAlert,
    CreditCard,
    UtensilsCrossed,
    Users,
    FileText,
    LifeBuoy,
    Settings,
    Twitter,
    Facebook,
    Instagram,
    Youtube,
    MailPlus,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Icon Components (Removed) ---
// All inline SVG components have been removed.

// --- Page Components ---

function Header() {
    return (
        <header className="flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-10">
            <h1 className="text-2xl font-bold text-blue-600">PGManager</h1>
            <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-blue-600">
                    <Bell className="w-6 h-6" />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                    <User className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
}

function Greeting() {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Hi, Priyank!</h2>
            <p className="text-gray-500">Welcome to your dashboard.</p>
        </div>
    );
}

function QuickActions() {
    const actions = [
        {
            title: "Find a PG",
            img: "https://picsum.photos/seed/pgfind/600/400", // Removed blur from URL
        },
        {
            title: "My Bookings",
            img: "https://picsum.photos/seed/pgbookings/600/400", // Removed blur from URL
        },
        {
            title: "Add Property",
            img: "https://picsum.photos/seed/pgproperty/600/400", // Removed blur from URL
        },
    ];

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-3">
                {actions.map((action) => (
                    <div
                        key={action.title}
                        className="relative rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 h-28"
                    >
                        {/* Background Image */}
                        <img
                            src={action.img}
                            alt={action.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Error'; }}
                        />

                        {/* Gradient Overlay */}
                        {/* This creates a gradient from 60% black at the bottom to fully transparent at the top */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                            <p className="text-white text-sm font-semibold">
                                {action.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Services() {
    const services = [
        { id: "/search", title: "Search PG", icon: <Search className="w-6 h-6 text-blue-500" />, color: "bg-blue-50" },
        { id: "#", title: "Complaints", icon: <ShieldAlert className="w-6 h-6 text-red-500" />, color: "bg-red-50" },
        { id: "#", title: "Pay Rent", icon: <CreditCard className="w-6 h-6 text-green-500" />, color: "bg-green-50" },
        { id: "#", title: "Food Menu", icon: <UtensilsCrossed className="w-6 h-6 text-orange-500" />, color: "bg-orange-50" },
        { id: "#", title: "Guest Entry", icon: <Users className="w-6 h-6 text-indigo-500" />, color: "bg-indigo-50" },
        { id: "#", title: "Notices", icon: <FileText className="w-6 h-6 text-yellow-500" />, color: "bg-yellow-50" },
        { id: "#", title: "Support", icon: <LifeBuoy className="w-6 h-6 text-purple-500" />, color: "bg-purple-50" },
        { id: "#", title: "Settings", icon: <Settings className="w-6 h-6 text-gray-500" />, color: "bg-gray-50" },
        { id: "/enquiries", title: "Inquries", icon: <MailPlus className="w-6 h-6 text-pink-500" />, color: "bg-pink-50" },
    ];

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">More Services</h3>
            <div className="grid grid-cols-4 gap-4">
                {services.map((service) => (
                    <Link to={service.id} key={service.title} className="flex flex-col items-center justify-center space-y-2">
                        <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center shadow-sm`}>
                            {service.icon}
                        </div>
                        <p className="text-xs text-center font-medium text-gray-600">{service.title}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function NewsAndTips() {
    const articles = [
        {
            title: "5 crucial tips for anyone moving into a PG for the first time.",
            img: "https://placehold.co/600x400/EC4899/FFFFFF?text=PG+Tips"
        },
        {
            title: "How to manage your monthly budget and save money while living in a PG.",
            img: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=Budgeting"
        },
        {
            title: "Discover the best localities for students and professionals moving to Pune.",
            img: "https://placehold.co/600x400/F59E0B/FFFFFF?text=Pune+Guide"
        },
    ];

    return (
        <div className="p-4"> {/* Extend padding to screen edge on mobile */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3 px-4">Do You Know?</h3>

            {/* Full-width scrollable area with hidden scrollbar */}
            <div className="overflow-x-auto scrollbar-hide"> {/* scrollbar-hide custom class */}
                <div className="flex space-x-4 px-4 pb-6 snap-x snap-mandatory">
                    {articles.map((article) => (
                        <div
                            key={article.title}
                            className="flex-shrink-0 w-44 snap-center bg-gray-50 rounded-2xl shadow-md overflow-hidden"
                        >
                            <img
                                src={article.img}
                                alt={article.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-3">
                                <p className="text-sm font-medium text-gray-700">
                                    {article.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );  
}

// --- SOCIAL MEDIA COMPONENT ---
function SocialMedia() {
    const socialLinks = [
        { name: 'X', icon: <Twitter className="w-5 h-5" />, color: "bg-black" },
        { name: 'Facebook', icon: <Facebook className="w-6 h-6" />, color: "bg-blue-600" },
        { name: 'Instagram', icon: <Instagram className="w-6 h-6" />, color: "bg-pink-500" },
        { name: 'YouTube', icon: <Youtube className="w-7 h-7" />, color: "bg-red-600" },
    ];

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Follow Us On Social Media Platforms</h3>
            <div className="relative w-full h-40 rounded-lg shadow-md overflow-hidden">
                {/* Background Image */}
                <img
                    src="https://picsum.photos/seed/socialbg/800/400"
                    alt="Social media background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                {/* Icons */}
                <div className="relative h-full flex items-center justify-center space-x-4 z-10">
                    {socialLinks.map((link) => (
                        <button
                            key={link.name}
                            aria-label={`Follow us on ${link.name}`}
                            className={`w-12 h-12 ${link.color} rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110`}
                        >
                            {link.icon}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}


function BottomNav() {
    const [active, setActive] = useState("Home");

    // Use the Lucide components directly
    const navItems = [
        { name: "Home", icon: Home },
        { name: "Bookings", icon: Building },
        { name: "Profile", icon: User },
        { name: "Menu", icon: Menu },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-t-md border-t border-gray-200 z-10">
            <div className="flex justify-around max-w-lg mx-auto py-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.name;
                    return (
                        <button
                            key={item.name}
                            onClick={() => setActive(item.name)}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg w-20 
                ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                        >
                            {/* Pass strokeWidth and className directly to the Lucide icon */}
                            <Icon className="w-6 h-6 mb-1" strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-xs font-medium">{item.name}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}


// --- Main App Component ---

export default function Dashboard() {
    return (
        // Set a max-width for a more mobile-like view on desktop
        // Set min-height to ensure background color covers viewport
        <div className="font-sans bg-gray-50 max-w-lg mx-auto min-h-screen shadow-2xl">
            <Header />
            <main className="pb-20"> {/* Add padding-bottom to avoid overlap with bottom nav */}
                <Greeting />
                <QuickActions />
                <Services />
                <NewsAndTips />
                <SocialMedia /> {/* --- ADDED NEW COMPONENT HERE --- */}
            </main>
            <BottomNav />
        </div>
    );
}