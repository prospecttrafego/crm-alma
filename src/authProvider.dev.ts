import { AuthProvider } from "@refinedev/core";

/**
 * AuthProvider de DESENVOLVIMENTO
 * Permite navegar pelo CRM sem precisar do banco de dados configurado
 * 
 * Para usar: importe este arquivo no App.tsx ao invés do authProvider.ts
 */

export interface UserIdentity {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
  organizationId?: string;
  organizationName?: string;
  organizationSlug?: string;
}

// Usuário mockado para desenvolvimento
const mockUser: UserIdentity = {
  id: "dev-user-123",
  email: "dev@alma.digital",
  name: "Usuário Dev",
  role: "admin",
  organizationId: "org-123",
  organizationName: "Alma Digital",
  organizationSlug: "alma-digital",
};

const devAuthProvider: AuthProvider = {
  login: async () => {
    // Sempre permite login em modo dev
    return {
      success: true,
      redirectTo: "/dashboard",
    };
  },

  register: async () => {
    return {
      success: true,
      redirectTo: "/dashboard",
    };
  },

  forgotPassword: async () => {
    return {
      success: true,
      successNotification: {
        message: "[DEV] Email enviado!",
        description: "Modo desenvolvimento - nenhum email foi realmente enviado.",
      },
    };
  },

  updatePassword: async () => {
    return {
      success: true,
      redirectTo: "/",
    };
  },

  logout: async () => {
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  onError: async (error) => {
    console.error("[DEV] Auth error:", error);
    return { error };
  },

  check: async () => {
    // SEMPRE autenticado em modo dev
    return {
      authenticated: true,
    };
  },

  getPermissions: async () => {
    return "admin";
  },

  getIdentity: async (): Promise<UserIdentity> => {
    return mockUser;
  },
};

export default devAuthProvider;

