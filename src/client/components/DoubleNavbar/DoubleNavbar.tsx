import React from "react";
import classes from "./DoubleNavbar.module.css";
import {
  ActionIcon,
  Anchor,
  Divider,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import {
  Link,
  linkOptions,
  LinkProps,
  useMatchRoute,
  useSearch,
} from "@tanstack/react-router";
import {
  IconBuilding,
  IconDashboard,
  IconDashboardFilled,
  IconLayoutNavbarCollapse,
  IconLockAccess,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Logo } from "../Logo";
import { UserButton } from "../UserButton";
import { ConditionalTooltip } from "../ConditionalTooltip";

type Links = LinkProps["to"];

export interface NestedNavigation {
  name: string;
  to: Links;
  description: string;
  icon: React.ReactNode;
}

export interface Navigation {
  name: string;
  to: Links;
  description: string;
  icon: React.ReactNode;
  iconFilled: React.ReactNode;
  hideInNav?: boolean;
  nested?: {
    label?: string;
    links: NestedNavigation[];
  }[];
}
const links: Navigation[] = [
  {
    name: "Dashboard",
    to: "/",
    description: "View analytics and manage your account",
    icon: <IconDashboard size={20} />,
    iconFilled: <IconDashboardFilled size={20} />,
    nested: [
      {
        label: "Dashboard",
        links: [
          {
            name: "Dashboard",
            to: "/",
            description: "View analytics and manage your account",
            icon: <IconDashboard size={20} />,
          },
        ],
      },
    ],
  },
  {
    name: "Other",
    to: "/signin",
    description: "View Other things",
    icon: <IconDashboard size={20} />,
    iconFilled: <IconDashboardFilled size={20} />,
  },
  {
    name: "Settings",
    to: "/settings",
    description: "Manage your account settings",
    icon: <IconDashboard size={20} />,
    iconFilled: <IconDashboardFilled size={20} />,
    hideInNav: true,
    nested: [
      {
        label: "Account",
        links: [
          {
            name: "Account settings",
            to: "/settings",
            description: "Manage your account settings",
            icon: <IconUser size={20} />,
          },
          {
            name: "Security",
            to: "/settings/security",
            description: "Manage your account security",
            icon: <IconLockAccess size={20} />,
          },
        ],
      },
      {
        label: "Organization",
        links: [
          {
            name: "Organizations",
            to: "/settings/organization",
            description: "Manage your organization settings",
            icon: <IconBuilding size={20} />,
          },
          {
            name: "Members",
            to: "/settings/members",
            description: "Manage your organization members",
            icon: <IconUsersGroup size={20} />,
          },
        ],
      },
    ],
  },
];

export interface DoubleNavbarProps {
  onCollapse: () => void;
  collapsed: boolean;
}

export const DoubleNavbar: React.FC<DoubleNavbarProps> = ({
  onCollapse,
  collapsed,
}) => {
  const matchRoute = useMatchRoute();

  const matchedRoute = links.find((link) => {
    const match = matchRoute({ to: link.to, fuzzy: true });
    return match;
  });
  console.log(matchedRoute);

  const mainLinks = links
    .filter((l) => !l.hideInNav)
    .map((link) => (
      <Tooltip key={link.to} label={link.description} position="right-start">
        <Link
          to={link.to}
          activeOptions={{
            exact: link.to === "/", // only exact match for home
          }}
          activeProps={{ className: classes.activeLink }}
          className={classes.link}
        >
          <div>
            <ThemeIcon
              size="lg"
              className={classes.linkIcon}
              variant="transparent"
            >
              {matchedRoute?.to === link.to ? link.iconFilled : link.icon}
            </ThemeIcon>
          </div>
        </Link>
      </Tooltip>
    ));

  const nestedLinks = matchedRoute?.nested?.map((nested) => (
    <Stack mb="md" key={nested.label} gap="md">
      {collapsed ? (
        <Divider mt="md" />
      ) : (
        <Text size="sm" fw={400} c="dimmed">
          {nested.label}
        </Text>
      )}
      {nested.links.map((link) => (
        <Anchor
          component={Link}
          key={link.to}
          to={link.to}
          activeOptions={{
            exact: true,
          }}
          activeProps={{ className: classes.activeNestedLink }}
          className={classes.nestedLink}
        >
          <Group gap={4} w="100%" align="center">
            <ConditionalTooltip
              active={collapsed}
              label={link.name}
              position="right-end"
            >
              <ThemeIcon
                size="lg"
                className={classes.linkIcon}
                variant="transparent"
              >
                {link.icon}
              </ThemeIcon>
            </ConditionalTooltip>
            {!collapsed && (
              <Text fw="500" fz="sm" className={classes.nestedName}>
                {link.name}
              </Text>
            )}
          </Group>
        </Anchor>
      ))}
    </Stack>
  ));

  return (
    <div className={classes.root}>
      <Group gap={0} h="100%">
        <div className={classes.mainNav}>
          <Logo size={32} className={classes.logo} />
          <Stack mt="xl" align="stretch" flex="1">
            {mainLinks}
          </Stack>
          <div className={classes.userButton}>
            <UserButton />
          </div>
        </div>
        <div className={classes.nestedNav} data-collapsed={collapsed}>
          <Group mb="xl" justify="space-between" align="center">
            {!collapsed && <Text fw="bold">{matchedRoute?.name}</Text>}
            <ActionIcon variant="transparent" className={classes.actionIcon}>
              <IconLayoutNavbarCollapse
                size={20}
                onClick={onCollapse}
                style={{
                  transition: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: collapsed ? "rotate(90deg)" : "rotate(-90deg)",
                }}
              />
            </ActionIcon>
          </Group>
          {nestedLinks}
        </div>
      </Group>
    </div>
  );
};
