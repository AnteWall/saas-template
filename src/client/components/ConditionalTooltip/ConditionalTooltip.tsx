import { Tooltip, TooltipProps } from "@mantine/core";
import React from "react";

export interface ConditionalTooltipProps extends TooltipProps {
  label: string;
  active: boolean;
  children: React.ReactNode;
}

export const ConditionalTooltip: React.FC<ConditionalTooltipProps> = ({
  label,
  active,
  children,
  ...otherProps
}) => {
  if (!active) {
    return children;
  }
  return (
    <Tooltip {...otherProps} label={label}>
      {children}
    </Tooltip>
  );
};
