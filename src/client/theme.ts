import {
  Anchor,
  Button,
  Card,
  CSSVariablesResolver,
  Divider,
  Input,
  MantineThemeOverride,
  Menu,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import classes from "./theme.module.css";

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    "--mantine-color-body": theme.colors.gray[3],
    "--mantine-color-dimmed": "#5B5B66",
  },
  dark: {
    "--mantine-color-body": theme.colors.dark[9],
    "--tooltip-bg": theme.colors.dark[9],
    "--tooltip-color": theme.colors.dark[0],
    "--mantine-datatable-border-color": theme.colors.dark[6],
  },
});

export const theme: MantineThemeOverride = {
  fontFamily: "Inter, sans-serif",
  primaryColor: "orange",
  colors: {
    dark: [
      "#d3d3d3",
      "#b2b2b2",
      "#949494",
      "#7a7a7a",
      "#595959",
      "#2e2e2e",
      "#1b1b1b",
      "#181818",
      "#161616",
      "#121212",
    ],
  },

  components: {
    Divider: Divider.extend({
      defaultProps: {
        className: classes.divider,
      },
    }),
    Card: Card.extend({
      defaultProps: {
        withBorder: true,
        classNames: {
          root: classes.paper,
          section: classes.cardSection,
        },
        shadow: "sm",
      },
    }),
    Paper: Paper.extend({
      defaultProps: {
        withBorder: true,
        className: classes.paper,
        shadow: "sm",
        radius: "lg",
      },
    }),
    Button: Button.extend({
      defaultProps: {
        className: classes.button,
      },
    }),
    Anchor: Anchor.extend({
      defaultProps: {
        underline: "never",
        className: classes.anchor,
      },
    }),
    Input: Input.extend({
      defaultProps: {
        variant: "filled",
        classNames: {
          input: classes.textInput,
        },
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        variant: "filled",
        classNames: {
          label: classes.textInputLabel,
          input: classes.textInput,
        },
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        variant: "filled",
        classNames: {
          label: classes.textInputLabel,
          input: classes.textInput,
        },
      },
    }),
    Menu: Menu.extend({
      defaultProps: {
        classNames: {
          dropdown: classes.menuRoot,
          item: classes.menuItem,
        },
      },
    }),
  },
};
