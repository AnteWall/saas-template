import React from "react";
import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export interface BreadcrumbsHeaderProps {
  breadcrumbs: BreadcrumbItem[];
}

export const BreadcrumbsHeader: React.FC<BreadcrumbsHeaderProps> = ({
  breadcrumbs,
}) => {
  const breadcrumbItems = breadcrumbs.map((item, index) => {
    const lastIndex = index === breadcrumbs.length - 1;
    return (
      <BreadcrumbItem key={index} className="hidden md:block">
        {item.to && !lastIndex && (
          <BreadcrumbLink asChild>
            <Link to={item.to}>{item.label}</Link>
          </BreadcrumbLink>
        )}
        {lastIndex && <BreadcrumbPage>{item.label}</BreadcrumbPage>}
      </BreadcrumbItem>
    );
  });

  // insert a separator between each breadcrumb item

  const breadcrumbItemsWithSeparators = breadcrumbItems.reduce(
    (acc, item, index) => {
      if (index === 0) {
        return [item];
      }

      return [
        ...acc,
        <BreadcrumbSeparator
          key={`sep-${index}`}
          className="hidden md:block"
        />,
        item,
      ];
    },
    [] as React.ReactNode[],
  );

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>{breadcrumbItemsWithSeparators}</BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
