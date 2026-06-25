  "use client";

  import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

  export type UserRole = "buyer" | "grower" | "ngo_verifier";

  export interface UserProfile {
    id: string;
    email: string;
    full_name: string;
    role: UserRole;
    organization_name?: string;
    avatar_url?: string;
    created_at: string;
  }

  interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error?: string }>;
    signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ error?: string }>;
    signOut: () => Promise<void>;
    updateRole: (role: UserRole) => Promise<void>;
    isBuyer: boolean;
    isGrower: boolean;
    isNgoVerifier: boolean;
    allUsers: UserProfile[];
  }

  const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signIn: async () => ({}),
    signUp: async () => ({}),
    signOut: async () => {},
    updateRole: async () => {},
    isBuyer: false,
    isGrower: false,
    isNgoVerifier: false,
    allUsers: [],
  });

  async function trySupabaseSignUp(
    email: string,
    password: string,
    fullName: string,
    role: UserRole
  ) {
    const { supabase } = await import("@/lib/supabase");

    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
        },
      },
    });
  }
  async function trySupabaseSignIn(
    email: string,
    password: string
  ) {
    const { supabase } = await import("@/lib/supabase");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  }
  // ─── Auth Provider ────────────────────────────────────────────────────────────
  export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    
useEffect(() => {
  let subscription: any;

  const getCurrentUser = async () => {
    const { supabase } = await import("@/lib/supabase");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      const meta = session.user.user_metadata || {};

      setUser({
        id: session.user.id,
        email: session.user.email || "",
        full_name: meta.full_name || "",
        role: meta.role || "grower",
        created_at: session.user.created_at,
      });
    }

    setLoading(false);

    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const meta = session.user.user_metadata || {};

        setUser({
          id: session.user.id,
          email: session.user.email || "",
          full_name: meta.full_name || "",
          role: meta.role || "grower",
          created_at: session.user.created_at,
        });
      } else {
        setUser(null);
      }
    });

    subscription = authListener.data.subscription;
  };

  getCurrentUser();

  return () => {
    subscription?.unsubscribe();
  };
}, []); // ✅ useEffect ends here



  const signIn = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ error?: string }> => {

      const { data, error } = await trySupabaseSignIn(email, password);

      if (error) {
        return { error: error.message };
      }

      if (!data.user) {
        return { error: "Invalid email or password." };
      }

      const meta = data.user.user_metadata || {};

      setUser({
        id: data.user.id,
        email: data.user.email || "",
        full_name: meta.full_name || "",
        role: meta.role || "grower",
        created_at: data.user.created_at,
      });

      return {};
    },
    []
  );
  const signUp = useCallback(
  async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole
  ): Promise<{ error?: string }> => {

    const { data, error } = await trySupabaseSignUp(
      email,
      password,
      fullName,
      role
    );

    if (error) {
      return { error: error.message };
    }

    if (!data.user) {
      return { error: "Unable to create account." };
    }

    setUser({
      id: data.user.id,
      email: data.user.email || email,
      full_name: fullName,
      role,
      created_at: data.user.created_at,
    });

    return {};
  },
  []
);

  const updateRole = useCallback(async (role: UserRole) => {
    if (!user) return;

    setUser({
      ...user,
      role,
    });
  }, [user]);

  const signOut = useCallback(async () => {
    const { supabase } = await import("@/lib/supabase");

    await supabase.auth.signOut();

    setUser(null);
  }, []);

    return (
      <AuthContext.Provider
        value={{
          user,
          loading,
          signIn,
          signUp,
          signOut,
          updateRole,
          isBuyer: user?.role === "buyer",
          isGrower: user?.role === "grower",
          isNgoVerifier: user?.role === "ngo_verifier",
          allUsers: [],
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  export const useAuth = () => useContext(AuthContext);
