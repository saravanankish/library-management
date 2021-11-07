import React from 'react';
import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link as LinkTo } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Navbar from '../Navbar/Navbar';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  formContainer : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  image: {
    backgroundImage: 'url(https://images.indianexpress.com/2021/06/Untitled-design-4-1.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'left',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

export default function SingUp() {
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
              <HowToRegIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Sign Up
            </Typography>
            <form className={classes.form} noValidate>
                <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                />
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
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={
                    <Checkbox value="remember" color="primary" checked={showPassword} onChange={(e) => {
                        setShowPassword(e.target.checked);
                        console.log(showPassword, e.target.checked);
                        document.getElementById("password").type = showPassword ? "password" : "text" ;
                        document.getElementById("confirm-password").type = showPassword ? "password" : "text" ;
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
                    Sign Up
                </Button>
                <Typography component="p">
                    Already a User?
                    <LinkTo to="/login" >
                        <Link variant="body1">
                            {" Login"}
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