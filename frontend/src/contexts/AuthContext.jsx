import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  // 🔹 Load profile
  const loadProfile = async (userId) => {
    if (!userId) return;

    setProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (err) {
      console.error('Profile load error:', err);
    } finally {
      setProfileLoading(false);
    }
  };

  const clearProfile = () => setUserProfile(null);

  // 🔹 LOGOUT FUNCTION (THIS WAS MISSING ❗)
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      clearProfile();
    }
    return { error };
  };

  // 🔹 Session handling
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
        session?.user ? loadProfile(session.user.id) : clearProfile();
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    userProfile,
    loading,
    profileLoading,
    isAuthenticated: !!user,
    signOut, // ✅ EXPOSED
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
