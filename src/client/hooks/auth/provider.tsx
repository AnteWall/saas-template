import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useCallback } from "react";
import {
  useListOrganizations,
  organization,
  _signOut,
  signUp as _signUp,
} from "./auth";
import {
  AuthContext,
  ProviderArgs,
  ProviderReturnType,
  Providers,
} from "./context";
import { useSession } from "./useSession";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const { data, isPending, error, refetch } = useSession();
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

  const signUp = useCallback(
    <P extends Providers>(args: { provider: P } & ProviderArgs<P>) => {
      const { provider, ...rest } = args;
      return new Promise((resolve) => {
        _signUp[provider](rest).then((res) => {
          refetch();
          resolve(res as ProviderReturnType);
        });
      }) as Promise<ProviderReturnType>;
    },
    [refetch]
  );

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
    [queryClient]
  );

  useEffect(() => {
    if (error) {
      notifications.show({
        title: "Authentication error",
        message: error.message,
      });
      return;
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
        signUp,
        user: data?.data?.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
