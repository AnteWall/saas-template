import { FullscreenLoader } from "@/components/common/FullscreenLoader";
import { useAuth } from "@/hooks/auth/auth";
import { paths } from "@/pages/paths";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export interface AuthRedirectWrapperProps {
  children: React.ReactNode;
}

/**
 * Redirects to the home page if the user is authenticated. Otherwise, renders the children.
 * Useful for pages that should not be accessible to authenticated users such as the sign-in page.
 */
export const AuthRedirectWrapper: React.FC<AuthRedirectWrapperProps> = ({
  children,
}) => {
  const { isAuthenticated, isVerifying } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isVerifying) {
      return;
    }

    if (isAuthenticated) {
      navigate(paths.Home);
    }
  }, [isAuthenticated, isVerifying]);

  if (isVerifying) {
    return <FullscreenLoader />;
  }

  return children;
};
