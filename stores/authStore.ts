import AppwriteService from "@/appwrite/service";
import { create } from "zustand";
type User = {
  username: string | null;
  email: string | null;
  $id: string | null;
};

type AuthState = {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
};

type AuthActions = {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  getCurrentUser: () => Promise<void>;
};
const appwrite = new AppwriteService();

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  isAuth: false,
  isLoading: true,
  error: null,

  logout: async () => {
    try {
      await appwrite.logoutUser();
      set({ user: null, isAuth: false, isLoading: false });
    } catch (error: any) {
      set({
        error: error?.message || "Something went wrong",
        isLoading: false,
      });
      throw error;
    }
  },
  register: async (username, email, password) => {
    try {
      const account = new AppwriteService();

      await account.createUserAccount({ username, email, password });

      await account.loginUser({ email, password });

      const currentUser = await account.getCurrentUser();
      if (currentUser) {
        set({
          user: {
            username: currentUser.name,
            email: currentUser.email,
            $id: currentUser.$id,
          },
          isAuth: true,
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error?.message || "Something went wrong",
        isLoading: false,
      });
      throw error;
    }
  },
  getCurrentUser: async () => {
    try {
      const currentUser = await appwrite.getCurrentUser();
      if (currentUser) {
        set({
          user: {
            email: currentUser.email,
            username: currentUser.name,
            $id: currentUser.$id,
          },
          isAuth: true,
          isLoading: false,
        });
      } else {
        set({
          user: null,
          isAuth: false,
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        user: null,
        isAuth: false,
        isLoading: false,
        error: error?.message || "Something went wrong",
      });
    }
  },
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      await appwrite.loginUser({ email, password });
      const currentUser = await appwrite.getCurrentUser();
      if (currentUser) {
        set({
          user: {
            email: currentUser.email,
            username: currentUser.name,
            $id: currentUser.$id,
          },
          isAuth: true,
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error?.message || "Something went wrong",
        isLoading: false,
      });
      throw error;
    }
  },
}));
