import React from "react";
import classes from "./BreadcrumbsHeader.module.css";
import { Anchor, Breadcrumbs, Group } from "@mantine/core";
import { Link } from "react-router";
import { IconChevronRight } from "@tabler/icons-react";

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
      <Breadcrumbs
        p="md"
        separator={
          <IconChevronRight
            size={14}
            stroke={4}
            className={classes.breadcrumbs}
          />
        }
      >
        {breadcrumbs.map((item, index) => {
          return (
            <Group key={index}>
              {item.icon}
              <Anchor
                fz="sm"
                renderRoot={(props) => <Link {...props} to={item.to} />}
                className={classes.breadcrumb}
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
