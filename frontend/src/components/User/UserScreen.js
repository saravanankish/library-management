import MiniDrawer from "./Minidrawer/MiniDrawer";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BookScreen from "./BookScreen/BookScreen";
import { makeStyles } from "@material-ui/core";
import Profile from "./Profile/Profile";
import HomeIcon from '@material-ui/icons/Home';

export default function UserScreen(props){
    const userList = [
        {
            name: "Home",
            icon: <HomeIcon />,
            function: () => {
                props.history.push('/user/home')
            }
        },
        {
            name: "Profile",
            icon: <AccountCircleIcon />,
            function: () => {
                props.history.push('/user/profile')
            }
        },
        {
            name: "Notifications",
            icon: <NotificationsActiveIcon />,
            function: () => {}
        },
        {
            name: "Request",
            icon: <AssignmentReturnedIcon />,
            function: () => {}  
        },
    ]

    const userToolList = [
        {
            name: "Log Out",
            icon: <ExitToAppIcon />,
            function: () => {
                props.history.replace('/login')
                localStorage.removeItem("id");
                localStorage.removeItem("role");
            }
        }
    ]


    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexGrow: 1
          },
    }));

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <MiniDrawer title={process.env.REACT_APP_TITLE} lists={userList} tools={userToolList}/>
            {props.location.pathname === "/user/home" ? <BookScreen /> : props.location.pathname === "/user/profile" ? <Profile /> : <> </> }
        </div>
    );
}