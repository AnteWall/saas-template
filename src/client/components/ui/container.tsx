import * as React from "react";

import { cn } from "@/lib/utils";

const Container = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("container mx-auto p-8", className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Container.displayName = "Conatiner";

export { Container };
