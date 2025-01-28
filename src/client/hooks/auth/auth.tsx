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
  listAccounts,
  unlinkAccount,
  linkSocial,
  listSessions,
  revokeSession,
} = authClient;

export type Session = typeof authClient.$Infer.Session;
export type Organization = typeof authClient.$Infer.Organization;
export type Member = typeof authClient.$Infer.Member;
export type Invitation = typeof authClient.$Infer.Invitation;
