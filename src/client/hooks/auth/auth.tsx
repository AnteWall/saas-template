import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";
import React, { createContext, useCallback, useEffect } from "react";
import { useSession } from "./useSession.ts";
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL || "http://localhost:3000",
  plugins: [organizationClient()],
});

export const {
  signUp,
  signIn,
  signOut: _signOut,
  organization,
  useActiveOrganization,
  useListOrganizations,
  updateUser,
  changeEmail,
  changePassword,
  resetPassword,
  forgetPassword,
  getSession,
  listSessions,
  $Infer,
  revokeSession,
} = authClient;

export interface AuthContext {
  isAuthenticated: boolean;
  isVerifying: boolean;
  logout: (options?: { onSuccess?: () => void }) => void;
  user?: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const { data, isPending, error } = useSession();
  const { data: organizations, error: errorOrgs } = useListOrganizations();

  useEffect(() => {
    const orgs = organizations || [];
    if (
      data &&
      data.data &&
      data.data.session.activeOrganizationId == undefined &&
      orgs.length > 0
    ) {
      organization.setActive({
        organizationId: orgs[0].id,
      });
    }
  }, [data, organizations]);

  const logout = useCallback(
    async ({ onSuccess }: { onSuccess?: () => void } = {}) => {
      _signOut({
        fetchOptions: {
          onSuccess: () => {
            queryClient.invalidateQueries();
            onSuccess?.();
          },
        },
      });
    },
    []
  );

  useEffect(() => {
    if (error) {
      notifications.show({
        title: "Authentication error",
        message: error.message,
      });
    }
    if (errorOrgs) {
      notifications.show({
        title: "Failed to list user organizations",
        message: errorOrgs.statusText,
      });
    }
  }, [error, errorOrgs]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: data?.data != null && !isPending,
        isVerifying: isPending,
        logout,
        user: data?.data?.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
