import { config } from "@/config";
import React from "react";

export interface HelmetWrapperProps {
  title: string;
  withSuffix?: boolean;
  canonicalSuffix?: string;
  children?: React.ReactNode;
}

export const HelmetWrapper: React.FC<HelmetWrapperProps> = ({
  title,
  withSuffix = true,
  canonicalSuffix,
  children,
}) => {
  // if we dont start with a slash, add it
  const fixedCanonicalSuffix = canonicalSuffix?.startsWith("/")
    ? canonicalSuffix
    : `/${canonicalSuffix}`;

  return (
    <>
      <title>{`${title} ${withSuffix ? `| ${config.appName}` : ""}`}</title>
      <link rel="canonical" href={`${config.appUrl}${fixedCanonicalSuffix}`} />
      {children}
    </>
  );
};
