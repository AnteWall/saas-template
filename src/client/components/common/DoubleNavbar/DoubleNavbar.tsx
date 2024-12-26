import React from "react";
import classes from "./DoubleNavbar.module.css";
import {
  ActionIcon,
  Divider,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
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
import { NavLink, useLocation } from "react-router";
import clsx from "clsx";
import { paths } from "@/pages/paths";
import { ColorSchemeToggle } from "../ColorSchemeToggle";

export interface NestedNavigation {
  name: string;
  to: string;
  description: string;
  icon: React.ReactNode;
}

export interface Navigation {
  name: string;
  to: string;
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
    name: "Home",
    to: paths.Home,
    description: "View analytics and manage your account",
    icon: <IconDashboard size={20} />,
    iconFilled: <IconDashboardFilled size={20} />,
    nested: [
      {
        label: "Home",
        links: [
          {
            name: "Home",
            to: "/",
            description: "View analytics and manage your account",
            icon: <IconDashboard size={20} />,
          },
        ],
      },
    ],
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
            to: paths.Settings,
            description: "Manage your account settings",
            icon: <IconUser size={20} />,
          },
          {
            name: "Security",
            to: paths.SettingsSecurity,
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
            to: paths.SettingsOrganizations,
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
  const location = useLocation();

  const matchedRoute = links.find((link) => {
    if (link.to === "/") {
      return location.pathname === "/";
    }
    const match = location.pathname.includes(link.to);
    return match;
  });

  const mainLinks = links
    .filter((l) => !l.hideInNav)
    .map((link) => (
      <Tooltip key={link.to} label={link.description} position="right-start">
        <NavLink
          to={link.to}
          className={({ isActive }) =>
            clsx(classes.link, {
              [classes.activeLink]: isActive,
            })
          }
        >
          {({ isActive }) => (
            <div>
              <ThemeIcon
                size="lg"
                className={classes.linkIcon}
                variant="transparent"
              >
                {isActive ? link.iconFilled : link.icon}
              </ThemeIcon>
            </div>
          )}
        </NavLink>
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
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            clsx(classes.nestedLink, {
              [classes.nestedActiveLink]: isActive,
            })
          }
        >
          {() => (
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
          )}
        </NavLink>
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
            <Stack>
              <ColorSchemeToggle />
              <UserButton />
            </Stack>
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
