import React from "react";
import classes from "./BreadcrumbsHeader.module.css";
import { Anchor, Breadcrumbs, Group } from "@mantine/core";
import { Link } from "react-router";

export interface BreadcrumbItem {
  label: string;
  icon?: React.ReactNode;
  to?: string;
}

export interface BreadcrumbsHeaderProps {
  breadcrumbs: BreadcrumbItem[];
}

export const BreadcrumbsHeader: React.FC<BreadcrumbsHeaderProps> = ({
  breadcrumbs,
}) => {
  return (
    <div className={classes.root}>
      <Breadcrumbs>
        {breadcrumbs.map((item, index) => {
          return (
            <Group>
              {item.icon}
              <Anchor
                fz="sm"
                renderRoot={(props) => <Link {...props} to={item.to} />}
                key={index}
              >
                {item.label}
              </Anchor>
            </Group>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};
