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
import axios from 'axios';
import NavbarBtns from '../NavbarBtns/NavbarBtns';


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

//Click Handlers

export default function SignUp(props) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [name_, setName_] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {}
    temp.name = name_ ? ""  : "This field is required";
    temp.email = email ? (/$^|.+@.+..+/).test(email) ? "" : "Email is not valid" : "This field is required";
    temp.password = password ? confirmPass ? password === confirmPass ? "" : "Passwords doesn't match" : "" : "This field is required";
    temp.confirmPass = confirmPass ? password ?  password === confirmPass ? "" : "Passwords doesn't match" : "" : "This field is required";
    setErrors({...temp});
    return Object.values(temp).every(x => x === "")
  }

  const signupSubmit = (e) => {
    e.preventDefault();
    if(validate()){
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/new`, {"name" : name_, "email": email, "password": password, "role" : "USER"}).then((res) => {
        if(res.data.status){
          props.history.push('/login');
        }else{
          alert('User With this Email already exists')
        }
      })
    }
  }

  return (
    <div>
      <Navbar navbarBtns={NavbarBtns} title={process.env.REACT_APP_TITLE}/>
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
            <form className={classes.form} noValidate onSubmit={signupSubmit}>
                <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    value={name_}
                    onChange={(e) => setName_(e.target.value)}
                    {...(errors.name && {error: true, helperText: errors.name})}
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
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    {...(errors.email && {error: true, helperText: errors.email})}
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
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    {...(errors.password && {error: true, helperText: errors.password})}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Confirm Password"
                    type="password"
                    value={confirmPass}
                    id="confirm-password"
                    autoComplete="current-password"
                    onChange={(e) => setConfirmPass(e.target.value)}
                    {...(errors.confirmPass && {error: true, helperText: errors.confirmPass})}
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
                    <Link variant="body1">
                      <LinkTo to="/login" >
                              {" Login"}
                      </LinkTo>
                    </Link>
                </Typography>
                </form>
            </div>
        </Grid>
      </Grid>
    </div>
  );
}