import { useContext } from "react";
import { AuthContext, AuthProviderContext } from "./context";

export function useAuth(): AuthProviderContext {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
