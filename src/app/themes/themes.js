import { createTheme } from "@material-ui/core/styles";

export const CRITIC_PALETTE = {
  primary: "#003433",
  secondary: "#ff5b33",
  light: "#c6d9b4",
};

const {primary,secondary} = CRITIC_PALETTE

export const CRITIC_THEME = createTheme({

  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
});
