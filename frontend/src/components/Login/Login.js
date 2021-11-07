import React from 'react';
import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Link as LinkTo } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Navbar from '../Navbar/Navbar';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  formContainer : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    backgroundImage: 'url(https://static.toiimg.com/photo/80507427.cms)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'right',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(4, 0, 3),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Navbar />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} className={classes.formContainer}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Login
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={
                  <Checkbox value="remember" color="primary" checked={showPassword} onChange={(e) => {
                      setShowPassword(e.target.checked);
                      console.log(showPassword, e.target.checked);
                      document.getElementById("password").type = showPassword ? "password" : "text" ;
                    }
                  }/>
                }
                label="Show Password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
              <Typography component="p">
                  New User?
                  <LinkTo to="/signup" >
                    <Link  variant="body1">
                        {" Sign Up"}
                    </Link>
                  </LinkTo>
              </Typography>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}