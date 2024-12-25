import React, { useEffect } from "react";
import { useAuth } from "../../../hooks/auth/useAuth";
import { FullscreenLoader } from "../../common/FullscreenLoader";
import { useNavigate } from "react-router";
import { paths } from "@/pages/paths";

export interface AuthenticatedWrapperProps {
  children: React.ReactNode;
}

/**
 * Redirects to the sign-in page if the user is not authenticated. Otherwise, renders the children.
 */
export const AuthenticatedWrapper: React.FC<AuthenticatedWrapperProps> = ({
  children,
}) => {
  const { isAuthenticated, isVerifying } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isVerifying) {
      return;
    }

    if (!isAuthenticated) {
      navigate(paths.SignIn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isVerifying]);

  if (isVerifying) {
    return <FullscreenLoader />;
  }

  return children;
};
