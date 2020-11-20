import theme from "../../theme/theme";

const { withStyles } = require("@material-ui/core");

export const GlobalSlickCss = withStyles({
  "@global": {
    ".slick-slider": {
      height: "auto",
    },
    ".slick-arrow": {
      zIndex: 1,
      opacity: 1,
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
      "&::before": {
        display: "none",
      },
    },
    ".slick-prev": {
      left: theme.spacing(-4),
      backgroundImage:
        "url('https://tix.vn/app/assets/img/icons/back-session.png')",
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      width: 20,
      height: 20,
      "&:hover, &:focus": {
        backgroundImage:
          "url('https://tix.vn/app/assets/img/icons/back-session.png')",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        width: 20,
        height: 20,
      },
    },
    ".slick-next": {
      right: theme.spacing(-4),
      backgroundImage:
        "url('https://tix.vn/app/assets/img/icons/next-session.png')",
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      width: 20,
      height: 20,
      "&:hover, &:focus": {
        backgroundImage:
          "url('https://tix.vn/app/assets/img/icons/next-session.png')",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        width: 20,
        height: 20,
      },
    },
  },
})(() => null);
