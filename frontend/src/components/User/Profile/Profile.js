import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {  deepPurple } from '@material-ui/core/colors';
import axios from 'axios';
import { useEffect, useState } from 'react';


const useStyles = makeStyles((theme) => ({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    root: {
        minWidth: 275,
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center',
        padding: theme.spacing(2)
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        fontSize: theme.spacing(6),
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],   
    }
}));

export default function Profile(props){
    const classes = useStyles();
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get/${localStorage.getItem("id")}`).then((res) => {
            setUser(res.data);
        })
    }, [])

    return(
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" component="h3" variant="h3">
                        {user.name}
                    </Typography>
                    <Typography variant="subtitle1" component="h1">
                        {user.email}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Avatar className={classes.avatar}>{user.name?.substring(0, 1)}</Avatar>
                </CardContent>
            </Card>
        </main>
    )
}
