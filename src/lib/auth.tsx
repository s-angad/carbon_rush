"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

export type UserRole = "admin" | "user";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signIn: async () => ({}),
  signUp: async () => ({}),
  signOut: async () => {},
  isAdmin: false,
});

function extractProfile(supabaseUser: User): UserProfile {
  const meta = supabaseUser.user_metadata || {};
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || "",
    full_name: meta.full_name || meta.name || supabaseUser.email?.split("@")[0] || "User",
    role: (meta.role as UserRole) || "user",
    avatar_url: meta.avatar_url || undefined,
    created_at: supabaseUser.created_at,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const handleSession = useCallback((sess: Session | null) => {
    setSession(sess);
    if (sess?.user) {
      setUser(extractProfile(sess.user));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      handleSession(sess);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, sess) => {
        handleSession(sess);
      }
    );

    return () => subscription.unsubscribe();
  }, [handleSession]);

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If Supabase returns "Invalid login credentials", provide a clearer message
        if (error.message.includes("Invalid login")) {
          return { error: "Invalid email or password. Please sign up first if you don't have an account." };
        }
        return { error: error.message };
      }

      if (data.user) {
        setUser(extractProfile(data.user));
        setSession(data.session);
      }
      return {};
    } catch (err) {
      return { error: "Connection failed. Please check your internet and try again." };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole
  ): Promise<{ error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          return { error: "This email is already registered. Please sign in instead." };
        }
        return { error: error.message };
      }

      // If email confirmation is disabled, user is logged in immediately
      if (data.user && data.session) {
        setUser(extractProfile(data.user));
        setSession(data.session);
      }

      return {};
    } catch (err) {
      return { error: "Sign up failed. Please try again." };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
