import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  setAuthFromStorage: (userData: User, token: string) => void;
  clearAuth: () => void;
  updateToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: true,

      login: (user, token) => {
        // Also store in localStorage for axios interceptor
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true, loading: false });
      },

      logout: () => {
        // Clear localStorage as well
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, isAuthenticated: false });
      },

      setAuthFromStorage: (user, token) => set({ user, token, isAuthenticated: true, loading: false }),

      clearAuth: () => set({ user: null, token: null, isAuthenticated: false, loading: false }),

      updateToken: (token) => set({ token }),
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      }), // only persist these values
      onRehydrateStorage: () => {
        // Set loading to true when rehydrating
        return (state) => {
          if (state) {
            // Update loading state after rehydration
            state.loading = false;
          }
        };
      },
    }
  )
);