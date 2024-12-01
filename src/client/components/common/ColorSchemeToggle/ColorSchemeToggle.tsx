import React from "react";
import classes from "./ColorSchemeToggle.module.css";
import {
  Group,
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
  MantineSize,
  ActionIconProps,
  Tooltip,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import cx from "clsx";

export interface ColorSchemeToggleProps extends ActionIconProps {
  size?: MantineSize;
}

export const ColorSchemeToggle: React.FC<ColorSchemeToggleProps> = ({
  size = "md",
  ...otherProps
}) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Group justify="center">
      <Tooltip label="Switch color scheme" position="right">
        <ActionIcon
          onClick={() =>
            setColorScheme(computedColorScheme === "light" ? "dark" : "light")
          }
          variant="subtle"
          size={size}
          aria-label="Toggle color scheme"
          className={classes.toggle}
          {...otherProps}
        >
          <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
          <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
