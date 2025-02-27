import { supabase } from './supabase';

// Sign in with email and password
export const signInWithPassword = async (email: string, password: string): Promise<boolean> => {
  if (email !== 'enockccg28@gmail.com') {
    throw new Error('Access denied. Invalid email address.');
  }
  
  // Get admin password from environment variable
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.error('Admin password environment variable is not set');
    throw new Error('Server configuration error. Please contact the administrator.');
  }
  
  // Check if password matches the admin password
  if (password !== adminPassword) {
    throw new Error('Invalid password. Please try again.');
  }
  
  // Instead of trying to authenticate with Supabase, we'll create a custom session
  // This avoids the need for a Supabase user to exist
  localStorage.setItem('admin_authenticated', 'true');
  localStorage.setItem('admin_email', email);
  localStorage.setItem('admin_session_created', Date.now().toString());
  
  return true;
};

// Get current session
export const getSession = async () => {
  // Check if we have a custom admin session
  const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
  const email = localStorage.getItem('admin_email');
  const sessionCreated = localStorage.getItem('admin_session_created');
  
  if (isAuthenticated && email && sessionCreated) {
    // Check if session is still valid (24 hours)
    const now = Date.now();
    const created = parseInt(sessionCreated, 10);
    const sessionAge = now - created;
    const sessionValid = sessionAge < 24 * 60 * 60 * 1000; // 24 hours
    
    if (sessionValid) {
      // Return a mock session object
      return {
        user: { email },
        expires_at: new Date(created + 24 * 60 * 60 * 1000).toISOString()
      };
    } else {
      // Session expired, clear it
      signOut();
      return null;
    }
  }
  
  // Try to get Supabase session as fallback
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Supabase session error:', error);
    return null;
  }
};

// Sign out
export const signOut = async () => {
  // Clear custom session
  localStorage.removeItem('admin_authenticated');
  localStorage.removeItem('admin_email');
  localStorage.removeItem('admin_session_created');
  
  // Also sign out from Supabase as a precaution
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Supabase sign out error:', error);
  }
};