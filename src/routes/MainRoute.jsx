import React from 'react'
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import PGEnquiryTracker from '../pages/PGEnquiryTracker';
import LoginPage from '../pages/LoginPage';
import WelcomePage from '../pages/WelcomePage';
import SetPassword from '../pages/SetPassword';
import Dashboard from '../pages/Dashboard';
import UserProfile from '../pages/UserProfile';
import NavMenuPage from '../pages/NavMenuPage';
import PGDetailsPage from '../pages/PGDetailsPage';
import RentPaymentPage from '../pages/RentPaymentPage';
import WifiDetailsPage from '../pages/WifiDetailsPage';
import NotificationPage from '../pages/NotificationPage';
import PublicRoute from './PublicRoute';
import BottomNavLayout from '../pages/BottomNavLayout';
import PGEditPage from '../pages/PGEditPage';
import MenuPage from '../pages/MenuPage';
import TenantListPage from '../pages/TenantListPage';
import TenantDetailsPage from '../pages/TenantDetailsPage';

function PlaceholderPage({ title }) {
    return (
        <div className="font-sans bg-gray-50 max-w-lg mx-auto min-h-screen shadow-2xl p-6 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">{title}</h1>
            <p className="text-gray-600 mb-8">This page is under construction.</p>
            <Link
                to="/dashboard"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
                Go to Dashboard
            </Link>
        </div>
    );
}

const MainRoute = () => {
    return (
        <Routes>
            {/* --- Public Routes --- */}
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />
            <Route
                path="/"
                element={
                    <PublicRoute>
                        <WelcomePage />
                    </PublicRoute>
                }
            />
            <Route
                path="/otp"
                element={
                    <PublicRoute>
                        <SetPassword />
                    </PublicRoute>
                }
            />
            <Route
                path="/forgotpass"
                element={
                    <PublicRoute>
                        <SetPassword />
                    </PublicRoute>
                }
            />

            {/* --- Bottom Navigation Layout Routes --- */}
            {/* These pages will show the Bottom Navbar & Background */}
            <Route element={<BottomNavLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/bookings" element={<PlaceholderPage title="My Bookings" />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/nav-menu" element={<NavMenuPage />} />
            </Route>

             {/* --- Feature Pages --- */}
            <Route path="/tenants" element={<TenantListPage />} />             {/* <--- Tenant List */}
            <Route path="/tenant-details/:id" element={<TenantDetailsPage />} /> {/* <--- Tenant Details (New & Edit) */}

            {/* --- Full Screen Detail Pages (No Bottom Nav) --- */}
            {/* These sit on top of the layout for specific tasks */}
            <Route path="/pg-details" element={<PGDetailsPage />} />
            <Route path="/edit-pg" element={<PGEditPage />} />
            <Route path="/rent-payment" element={<RentPaymentPage />} />
            <Route path="/wifi-details" element={<WifiDetailsPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/enquiries" element={<PGEnquiryTracker />} />
            <Route path="/notifications" element={<NotificationPage />} />

            {/* --- Other Service Placeholders --- */}
            <Route path="/search" element={<PlaceholderPage title="Search PG" />} />
            <Route path="/complaints" element={<PlaceholderPage title="Complaints" />} />
            <Route path="/pay-rent" element={<PlaceholderPage title="Pay Rent" />} />
            <Route path="/guest-entry" element={<PlaceholderPage title="Guest Entry" />} />
            <Route path="/notices" element={<PlaceholderPage title="Notices" />} />
            <Route path="/support" element={<PlaceholderPage title="Support" />} />
            <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
            <Route path="/add-property" element={<PlaceholderPage title="Add Property" />} />

            {/* --- Catch All --- */}
            <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
        </Routes>
    );
}

export default MainRoute;