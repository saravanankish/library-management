import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { green } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    button : {
        marginRight: theme.spacing(2)
    },
    buttonGrp: {
        position: 'absolute',
        right: theme.spacing(4)
    }
}));

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);

export default function Navbar() {
    const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Library
            </Typography>
            <div className={classes.buttonGrp}>
                <Link to="/login" style={{ "text-decoration" : "none"}}>
                  <Button 
                      color="default" 
                      variant="contained"
                      startIcon={ <LoginIcon />}
                      className={classes.button}
                  >
                  Login
                  </Button>
                </Link>
                <Link to="/signup" style={{ "text-decoration" : "none"}}>
                  <ColorButton 
                      variant="contained"
                      startIcon={ <HowToRegIcon />}
                  >
                  Sign Up
                  </ColorButton>
                </Link>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
