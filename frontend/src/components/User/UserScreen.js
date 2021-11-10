import MiniDrawer from "../Minidrawer/MiniDrawer";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BookScreen from "./BookScreen/BookScreen";
import { makeStyles } from "@material-ui/core";
import Profile from "./Profile/Profile";
import HomeIcon from '@material-ui/icons/Home';
import RequestScreen from "./Requests/RequestScreen";
import React from "react";
// import Badge from '@material-ui/core/Badge';
// import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

export default function UserScreen(props){
    const paths = [
        {
            path: "/user/home",
            component: <BookScreen key={1} {...props} />
        },
        {
            path: "/user/profile",
            component: <Profile key={2} {...props}/>
        },
        {
            path: "/user/requests",
            component: <RequestScreen key={3} {...props} />
        }
    ]

    // const Component = ;
    // console.log(Component);

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
        // {
        //     name: "Notifications",
        //     icon: <Badge badgeContent={4} color="primary"><NotificationsActiveIcon /></Badge>,
        //     function: () => {
        //         props.history.push('/user/notifications')
        //     }
        // },
        {
            name: "Request",
            icon: <AssignmentReturnedIcon />,
            function: () => {
                props.history.push('/user/requests')
            }  
        },
    ]

    const userToolList = [
        {
            name: "Log Out",
            icon: <ExitToAppIcon />,
            function: () => {
                props.history.go('/login')
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
            {
                paths.filter(r => r.path === props.location.pathname)[0].component
            }
        </div>
    );
}