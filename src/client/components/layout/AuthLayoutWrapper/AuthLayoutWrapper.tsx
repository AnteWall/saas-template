import React from "react";
import { Link } from "react-router";

import { GalleryVerticalEnd } from "lucide-react";
import { config } from "@/config";

export interface AuthLayoutWrapperProps {
  children: React.ReactNode;
}

const BACK_TO_APP_URL = "http://localhost:3000";

export const AuthLayoutWrapper: React.FC<AuthLayoutWrapperProps> = ({
  children,
}) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to={BACK_TO_APP_URL}
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          {config.appName}
        </Link>
        {children}
      </div>
    </div>
  );
};
