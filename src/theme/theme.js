const { createMuiTheme } = require("@material-ui/core/styles");

const theme = createMuiTheme({
  palette: {
    warning: {
      main: "#FB4226",
      light: "#fa5238a3",
      100: "#fb4226b0",
    },
    success: {
      main: "#108F3E",
      light: "#108f3ea3",
      100: "#7ED321",
    },
    common: {
      black: "#0000007a",
    },
    text: {
      primary: "#000000",
      secondary: "#ffffff",
    },
    grey: {
      50: "#9B9B9B",
      100: "#4A4A4A",
      150: "#949494",
      200: "#222222",
      250: "#D8D8D8",
      300: "#E9E9E9",
      350: "#fafafa",
    },
  },
  typography: {
    fontSize: 14,
  },
  transitions: {
    duration: "0.25s",
  },
  overrides: {
    MuiTypography: {
      root: {
        fontSize: "14px",
      },
      body1: {
        fontSize: "14px",
      },
      body2: {
        fontSize: "14px",
      },
    },
    MuiAccordionSummary: {
      root: {
        padding: 0,
        margin: 0,
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: 0,
        margin: 0,
      },
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: "#FB4226",
      },
      colorSecondary: {
        color: "#ffffff",
      },
    },
  },
});

export default theme;
