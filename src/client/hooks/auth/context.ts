import { Context, createContext } from "react";
import { signUp as _signUp } from "./auth";
export type ProvidersMethod = typeof _signUp;
export type Providers = keyof ProvidersMethod;
export type ProviderArgs<P extends Providers> = {
  provider: P;
} & Parameters<ProvidersMethod[P]>[0];

export type ProviderReturnType =
  | {
      token: string;
    }
  | { error?: { message?: string } };

export interface AuthProviderContext {
  isAuthenticated: boolean;
  isVerifying: boolean;
  logout: (options?: { onSuccess?: () => void }) => void;
  signUp: <P extends Providers>(
    args: { provider: P } & ProviderArgs<P>
  ) => Promise<ProviderReturnType>;
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

export const AuthContext: Context<AuthProviderContext | null> =
  createContext<AuthProviderContext | null>(null);
