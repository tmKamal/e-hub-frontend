import React, { useContext } from "react";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { AuthContext } from "../context/auth-context";
import { Button, Hidden } from "@material-ui/core";
import { Link } from "react-router-dom";
import { purple } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    
    secondary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const auth = useContext(AuthContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const redirectToDashboard=()=>{
    setAnchorEl(null);
    history.push('/dashboard');
  }
  const signout = () => {
    console.log("whhfoa");
    setAnchorEl(null);
    auth.logout();
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
            E-Hub.lk
          </Typography>
          {auth.name!=null ? (
            <div>
              <Hidden smDown>
                <Button onClick={handleMenu} color="inherit">
                  {auth.name}
                </Button>
              </Hidden>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
                
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={redirectToDashboard}>Dashboard</MenuItem>
                
                <MenuItem onClick={signout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
              <ThemeProvider theme={theme}>
            <Link to="/login-as" color="secondary">
                <Button variant="contained" color="secondary">
                  Login
                </Button>
            </Link>
              </ThemeProvider>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
