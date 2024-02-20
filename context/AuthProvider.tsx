import { getUserInfo } from '@/lib/actions/getUserInfo';
import { UserInfo } from '@/types';
import { Session, User } from '@supabase/supabase-js';
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '../lib/initSupabase';

type AuthProps = {
  user: User | null;
  session: Session | null;
  initialized?: boolean;
  signOut?: () => void;
  userInfo: UserInfo | null;
};

// initialize react context
export const AuthContext = createContext<Partial<AuthProps>>({});

// Custom hook to read the context values
export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>();
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>();

  useEffect(() => {
    // Listen for changes to authentication state
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session ? session.user : null);
      setInitialized(true);
    });

    const fetchUserData = async () => {
      if (!user) return;
      const data = await getUserInfo(user.id);
      setUserInfo(data);
    };

    fetchUserData();

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  // Log out the user
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    initialized,
    signOut,
    userInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
