import MiniDrawer from "../Minidrawer/MiniDrawer";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import AdminBookScreen from "./AdminBookScreen/AdminBookScreen";
import AddBook from "./AddBook/AddBook";
import AdminRequest from "./Requests/AdminRequests";

// import AssessmentIcon from '@material-ui/icons/Assessment';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1
      },
}));


export default function AdminScreen(props){
    const paths = [
        {
            path: "/admin/home",
            component: <AdminBookScreen {...props} />
        },
        {
            path: "/admin/addBook",
            component: <AddBook btn={"Add Book"} title={"Add Book"} {...props}/>
        },
        {
            path: "/admin/editBook",
            component: <AddBook btn={"Save Changes"} title={"Edit Book"}  {...props}/>
        },
        {
            path: "/admin/requests",
            component: <AdminRequest {...props} />
        }
    ]

    const userList = [
        {
            name: "Home",
            icon: <HomeIcon />,
            function: () => {
                props.history.push('/admin/home')
            }
        },
        {
            name: "Add Books",
            icon: <AddCircleIcon />,
            function: () => {
                props.history.push('/admin/addBook')
            }
        },
        {
            name: "Requests",
            icon: <AssignmentReturnedIcon />,
            function: () => {
                props.history.push('/admin/requests')
            }
        },
        // {
        //     name: "Book Info",
        //     icon: <AssessmentIcon />,
        //     function: () => {}  
        // },
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

    const classes = useStyles();

    return(   
        <div className={classes.root}>
            <MiniDrawer title={`${process.env.REACT_APP_TITLE} Admin`} lists={userList} tools={userToolList}/>
            {
                paths.filter(r => r.path === props.location.pathname)[0].component
            }
        </div>
    )
}