import {
  Box,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    [theme.breakpoints.up("sm")]: {
      width: 0,
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: 200,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: 200,
    paddingLeft: theme.spacing(2),
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "flex-end",
  },
  divider: {
    margin: theme.spacing(1.5, 0),
  },
  itemList: {
    margin: theme.spacing(0, 1),
  },
});

const MobileDrawer = (props) => {
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const itemList = [
    <Box>
      <Typography component="p">Người dùng:</Typography>
      <Typography component="p">Huỳnh Ngọc Khánh</Typography>
    </Box>,
    <Divider className={classes.divider} />,
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  // Mobile drawer
  const drawer = itemList.map((item, index) => (
    <div key={index} className={classes.itemList}>
      {item}
    </div>
  ));
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <IconButton
        color="default"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default MobileDrawer;
