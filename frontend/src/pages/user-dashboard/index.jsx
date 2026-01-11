import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext'; 
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BookingCard from './components/BookingCard';
import SavedTourCard from './components/SavedTourCard';
import ProfileSection from './components/ProfileSection';
import NotificationCard from './components/NotificationCard';
import StatsCard from './components/StatsCard';
import QuickActionCard from './components/QuickActionCard';

const UserDashboard = () => {
  const { userProfile, loading, profileLoading } = useAuth(); // ✅ Get logged-in user's profile
  const [activeTab, setActiveTab] = useState('bookings');

  // Use empty arrays if userProfile is not loaded yet
  const [savedTours, setSavedTours] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const handleRemoveSavedTour = (tourId) => {
    setSavedTours(prev => prev.filter(tour => tour.id !== tourId));
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => prev.map(n =>
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const handleProfileUpdate = (updatedProfile) => {
    // You might call context updateProfile here
  };

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: 'Calendar' },
    { id: 'saved', label: 'Saved Tours', icon: 'Heart' },
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' }
  ];

  return (
    <>
      <Helmet>
        <title>My Dashboard - Funiskool</title>
        <meta
          name="description"
          content="Manage your bookings, profile, and saved tours on Funiskool dashboard"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-[72px]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
            <div className="mb-6 md:mb-8">
              {loading || profileLoading ? (
                <p>Loading your dashboard...</p>
              ) : (
                <>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                    Welcome back, {userProfile?.full_name?.split(' ')[0]}!
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground font-caption">
                    Manage your bookings, explore saved tours, and update your profile
                  </p>
                </>
              )}
            </div>

            {/* Tabs */}
            <div className="mb-6 md:mb-8 overflow-x-auto">
              <div className="flex gap-2 border-b border-border min-w-max">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 md:px-6 py-3 font-medium transition-smooth relative ${
                      activeTab === tab.id
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={tab.icon} size={20} />
                    <span className="whitespace-nowrap">{tab.label}</span>
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Tab Content */}
            {activeTab === 'profile' && userProfile && (
              <div className="space-y-6">
                <ProfileSection profile={userProfile} onUpdate={handleProfileUpdate} />
              </div>
            )}

            {activeTab !== 'profile' && (
              <div>
                {/* Other tabs can be filled with API / database data */}
                <p className="text-muted-foreground">
                  Data for this tab will load from the backend.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
