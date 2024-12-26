import React from "react";
import classes from "./AppLayout.module.css";
import { AppShell, Box, Burger, useMatches } from "@mantine/core";
import { DoubleNavbar } from "../../common/DoubleNavbar";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";

export const AppLayout: React.FC = () => {
  const matches = useMatches(
    {
      xs: false,
      sm: false,
      md: true,
      lg: true,
      xl: true,
    },
    { getInitialValueInEffect: false }
  );
  const [opened, { toggle }] = useDisclosure(matches);
  return (
    <AppShell
      navbar={{
        breakpoint: "sm",
        width: opened ? 270 : 131,
        collapsed: { mobile: !opened },
      }}
      header={{
        height: 0,
      }}
      classNames={{
        navbar: classes.navbar,
      }}
    >
      <AppShell.Navbar>
        <DoubleNavbar collapsed={!opened} onCollapse={toggle} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Box hiddenFrom="md" className={classes.header}>
          <Burger
            hiddenFrom="sm"
            opened={opened}
            onClick={toggle}
            size="sm"
            py="xl"
            px="md"
          />
        </Box>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
