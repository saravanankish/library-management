import MiniDrawer from "../Minidrawer/MiniDrawer";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import AdminBookScreen from "./AdminBookScreen/AdminBookScreen";
import AddBook from "./AddBook/AddBook";
import Badge from '@material-ui/core/Badge';

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
            component: <AddBook btn={"Add Book"} title={"Add Book"}/>
        },
        {
            path: "/admin/editBook",
            component: <AddBook btn={"Save Changes"} title={"Edit Book"}/>
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
            icon: <Badge badgeContent={4} color="primary"><AssignmentReturnedIcon /></Badge>,
            function: () => {}
        },
        {
            name: "Book Info",
            icon: <AssessmentIcon />,
            function: () => {}  
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

    const classes = useStyles();

    return(   
        <div className={classes.root}>
            <MiniDrawer title={`${process.env.REACT_APP_TITLE} Admin`} lists={userList} tools={userToolList}/>
            {
                paths.map((res) => {
                    return props.location.pathname === res.path ? res.component : <></>
                })
            }
        </div>
    )
}