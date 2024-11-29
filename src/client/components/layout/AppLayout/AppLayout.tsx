import React from "react";
import classes from "./AppLayout.module.css";
import { AppShell, Burger, useMatches } from "@mantine/core";
import { DoubleNavbar } from "../../DoubleNavbar";
import { useDisclosure } from "@mantine/hooks";

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
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
  console.log(matches);
  const [opened, { toggle }] = useDisclosure(matches);
  return (
    <AppShell
      navbar={{
        breakpoint: "sm",
        width: opened ? 270 : 131,
        collapsed: { mobile: !opened },
      }}
      classNames={{
        navbar: classes.navbar,
      }}
    >
      <AppShell.Navbar>
        <DoubleNavbar collapsed={!opened} onCollapse={toggle} />
      </AppShell.Navbar>
      <AppShell.Main>
        <div className={classes.header}>
          <Burger
            hiddenFrom="sm"
            opened={opened}
            onClick={toggle}
            size="sm"
            py="xl"
            px="md"
          />
        </div>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};
