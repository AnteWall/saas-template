import {
  Anchor,
  Button,
  CSSVariablesResolver,
  Input,
  MantineThemeOverride,
  MenuItem,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import classes from "./theme.module.css";

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {},
  dark: {
    "--mantine-color-body": theme.colors.dark[9],
    "--tooltip-bg": theme.colors.dark[9],
    "--tooltip-color": theme.colors.dark[0],
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
    Paper: Paper.extend({
      defaultProps: {
        withBorder: true,
        className: classes.paper,
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
    MenuItem: MenuItem.extend({
      defaultProps: {
        classNames: {
          item: classes.menuItem,
        },
      },
    }),
  },
};
