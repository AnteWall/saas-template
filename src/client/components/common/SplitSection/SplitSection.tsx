import React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { P, TypographySmall } from "@/components/ui/typography";

export interface SplitSectionProps extends React.ComponentProps<"div"> {
  title: string;
  description: string | React.ReactNode;
  children: React.ReactNode;
  withSeparator?: boolean;
}

export const SplitSection: React.FC<SplitSectionProps> = ({
  title,
  description,
  children,
  className,
  withSeparator = true,
  ...otherProps
}) => {
  return (
    <div className={cn("space-y-4 pt-4", className)}>
      <div className={cn("grid grid-cols-12 gap-4")} {...otherProps}>
        <div className="col-span-12 md:col-span-4">
          <div className="space-y-2">
            <TypographySmall>{title}</TypographySmall>
            <P className="text-xs text-muted-foreground">{description}</P>
          </div>
        </div>
        <div className="col-span-8">{children}</div>
      </div>
      {withSeparator && <Separator className="w-full" />}
    </div>
  );
};
