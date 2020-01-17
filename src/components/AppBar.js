/**
 * https://material-ui.com/components/app-bar/
 */
import React from "react";
import { withAmplitudeContext } from "mock-amplitude-sdk";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 30
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const ButtonAppBar = (props) => {
  const { handleLogEvent } = props.context;
  const classes = useStyles();

  const handleSigninClick = () => {
    handleLogEvent("login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit" onClick={handleSigninClick}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withAmplitudeContext(ButtonAppBar);
