import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { Link } from 'react-router-dom';
import { green } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    button : {
        marginRight: theme.spacing(2)
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

export default function NavbarBtns(props){
    const classes = useStyles();
    return(
        <div>
            <Link to="/login" style={{ "textDecoration" : "none"}}>
                <Button 
                    color="default" 
                    variant="contained"
                    startIcon={ <LoginIcon />}
                    className={classes.button}
                >
                Login
                </Button>
            </Link>
            <Link to="/signup" style={{ "textDecoration" : "none"}}>
                <ColorButton 
                    variant="contained"
                    startIcon={ <HowToRegIcon />}
                >
                Sign Up
                </ColorButton>
            </Link>
        </div>
    );
}