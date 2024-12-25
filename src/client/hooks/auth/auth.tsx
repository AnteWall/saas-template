import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";

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
