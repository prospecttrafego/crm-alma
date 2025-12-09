import { AuthProvider } from "@refinedev/core";
import { supabaseClient } from "./utility";

// Tipos para o usuário autenticado
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

const authProvider: AuthProvider = {
  login: async ({ email, password, providerName }) => {
    try {
      // Login com OAuth (Google, GitHub, etc)
      if (providerName) {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
          provider: providerName,
          options: {
            redirectTo: `${window.location.origin}/`,
          },
        });

        if (error) {
          return {
            success: false,
            error,
          };
        }

        if (data?.url) {
          return {
            success: true,
            redirectTo: "/",
          };
        }
      }

      // Login com email e senha
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data?.user) {
        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: unknown) {
      return {
        success: false,
        error: error as Error,
      };
    }

    return {
      success: false,
      error: {
        message: "Falha no login",
        name: "Email ou senha inválidos",
      },
    };
  },

  register: async ({ email, password, fullName, organizationName }) => {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || email.split("@")[0],
          },
        },
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data?.user) {
        // Se forneceu nome da organização, criar organização após confirmação do email
        // A criação da organização será feita no primeiro acesso
        if (organizationName) {
          localStorage.setItem("pending_organization", organizationName);
        }

        return {
          success: true,
          redirectTo: "/login",
          successNotification: {
            message: "Conta criada com sucesso!",
            description: "Verifique seu email para confirmar o cadastro.",
          },
        };
      }
    } catch (error: unknown) {
      return {
        success: false,
        error: error as Error,
      };
    }

    return {
      success: false,
      error: {
        message: "Falha no cadastro",
        name: "Não foi possível criar a conta",
      },
    };
  },

  forgotPassword: async ({ email }) => {
    try {
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/update-password`,
        }
      );

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
          successNotification: {
            message: "Email enviado!",
            description: "Verifique sua caixa de entrada para redefinir a senha.",
          },
        };
      }
    } catch (error: unknown) {
      return {
        success: false,
        error: error as Error,
      };
    }

    return {
      success: false,
      error: {
        message: "Falha ao enviar email",
        name: "Email inválido",
      },
    };
  },

  updatePassword: async ({ password }) => {
    try {
      const { data, error } = await supabaseClient.auth.updateUser({
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
          redirectTo: "/",
          successNotification: {
            message: "Senha atualizada!",
            description: "Sua senha foi alterada com sucesso.",
          },
        };
      }
    } catch (error: unknown) {
      return {
        success: false,
        error: error as Error,
      };
    }

    return {
      success: false,
      error: {
        message: "Falha ao atualizar senha",
        name: "Senha inválida",
      },
    };
  },

  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  onError: async (error) => {
    console.error("Auth error:", error);
    
    // Se for erro de autenticação, fazer logout
    if (error?.status === 401 || error?.message?.includes("JWT")) {
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }

    return { error };
  },

  check: async () => {
    try {
      const { data } = await supabaseClient.auth.getSession();
      const { session } = data;

      if (!session) {
        return {
          authenticated: false,
          error: {
            message: "Sessão expirada",
            name: "Faça login novamente",
          },
          logout: true,
          redirectTo: "/login",
        };
      }

      return {
        authenticated: true,
      };
    } catch (error: unknown) {
      return {
        authenticated: false,
        error: error as Error || {
          message: "Erro de autenticação",
          name: "Não autenticado",
        },
        logout: true,
        redirectTo: "/login",
      };
    }
  },

  getPermissions: async () => {
    try {
      const { data: userData } = await supabaseClient.auth.getUser();
      
      if (!userData?.user) {
        return null;
      }

      // Buscar role do profile
      const { data: profile } = await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single();

      return profile?.role || "sales";
    } catch {
      return null;
    }
  },

  getIdentity: async (): Promise<UserIdentity | null> => {
    try {
      const { data: userData } = await supabaseClient.auth.getUser();

      if (!userData?.user) {
        return null;
      }

      // Buscar profile com organização
      const { data: profile } = await supabaseClient
        .from("profiles")
        .select(`
          id,
          full_name,
          email,
          avatar_url,
          role,
          organization_id,
          organizations (
            id,
            name,
            slug
          )
        `)
        .eq("id", userData.user.id)
        .single();

      if (profile) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const orgData = profile.organizations as any;
        const org = Array.isArray(orgData) ? orgData[0] : orgData;
        
        return {
          id: profile.id,
          email: profile.email,
          name: profile.full_name || profile.email,
          avatar: profile.avatar_url,
          role: profile.role,
          organizationId: profile.organization_id,
          organizationName: org?.name,
          organizationSlug: org?.slug,
        };
      }

      // Fallback para dados básicos do auth
      return {
        id: userData.user.id,
        email: userData.user.email || "",
        name: userData.user.user_metadata?.full_name || userData.user.email || "",
        avatar: userData.user.user_metadata?.avatar_url,
      };
    } catch (error) {
      console.error("Error getting identity:", error);
      return null;
    }
  },
};

export default authProvider;
