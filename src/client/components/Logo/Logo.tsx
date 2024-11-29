import React from "react";
import { IconBrandFlightradar24 } from "@tabler/icons-react";

export interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 48, className }) => {
  return (
    <div className={className}>
      <IconBrandFlightradar24 size={size} stroke={1.6} />
    </div>
  );
};
