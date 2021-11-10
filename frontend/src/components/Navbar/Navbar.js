import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    buttonGrp: {
        position: 'absolute',
        right: theme.spacing(4)
    }
}));


export default function Navbar(props) {
  const classes = useStyles();
  const NavbarBtns = props.navbarBtns
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {props.title}
            </Typography>
            <div className={classes.buttonGrp}>
                {NavbarBtns ? <NavbarBtns /> : <></>}
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
