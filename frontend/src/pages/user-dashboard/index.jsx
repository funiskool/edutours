import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import SecondaryNavbar from '../../components/ui/SecondaryNavbar';
import ProfileSection from './components/ProfileSection';

const UserDashboard = () => {
  const { userProfile, loading, profileLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');

  const firstName = userProfile?.full_name?.split(' ')[0];

  return (
    <>
      <Helmet>
        <title>My Dashboard - Funiskool</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <SecondaryNavbar />

        <main className="pt-[120px]">
          <div className="max-w-[1280px] mx-auto px-4 py-8">

            {loading || profileLoading ? (
              <p>Loading your dashboard...</p>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {firstName || 'User'}!
                </h1>

                <p className="text-muted-foreground">
                  Manage your bookings, explore saved tours, and update your profile
                </p>

                {!userProfile?.full_name && (
                  <p className="text-xs text-yellow-600 mt-2">
                    Profile name not set. Please update your profile.
                  </p>
                )}
              </>
            )}

            {/* Tabs */}
            <div className="flex gap-4 mt-8 border-b">
              {['Bookings', 'Saved', 'Profile', 'Notifications'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 ${
                    activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Profile */}
            {activeTab === 'profile' && userProfile && (
              <ProfileSection profile={userProfile} />
            )}

          </div>
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
