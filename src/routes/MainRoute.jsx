import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import PGEnquiryTracker from '../pages/PGEnquiryTracker';
import Dashboard from '../pages/Dashboard';
import WelcomePage from '../pages/WelcomePage';
import LoginPage from '../pages/LoginPage';
import SetPassword from '../pages/SetPassword';
import PublicRoute from './PublicRoute';

function PlaceholderPage({ title }) {
    return (
        <div className="font-sans bg-gray-50 max-w-lg mx-auto min-h-screen shadow-2xl p-6 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">{title}</h1>
            <p className="text-gray-600 mb-8">This page is under construction.</p>
            <Link
                to="/"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
                Go Back Home
            </Link>
        </div>
    );
}

const MainRoute = () => {
    return (
        <Routes>
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
            {/* The main dashboard page */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Routes from the "Services" section */}
            <Route path="/search" element={<PlaceholderPage title="Search PG" />} />
            <Route path="/complaints" element={<PlaceholderPage title="Complaints" />} />
            <Route path="/pay-rent" element={<PlaceholderPage title="Pay Rent" />} />
            <Route path="/guest-entry" element={<PlaceholderPage title="Guest Entry" />} />
            <Route path="/notices" element={<PlaceholderPage title="Notices" />} />
            <Route path="/support" element={<PlaceholderPage title="Support" />} />
            <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
            <Route path="/enquiries" element={<PGEnquiryTracker />} />

            {/* Routes from the "QuickActions" section */}
            <Route path="/add-property" element={<PlaceholderPage title="Add Property" />} />

            {/* Routes from the "BottomNav" */}
            <Route path="/bookings" element={<PlaceholderPage title="My Bookings" />} />
            <Route path="/profile" element={<PlaceholderPage title="My Profile" />} />
            <Route path="/menu" element={<PlaceholderPage title="Food Menu" />} />

            {/* A catch-all route for any other URL */}
            <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
        </Routes>
    );
}

export default MainRoute
