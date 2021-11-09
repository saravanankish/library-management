import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {  deepPurple } from '@material-ui/core/colors';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import itemData from '../BookScreen/content';



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
    },
    button: {
        marginTop: theme.spacing(3)
    },
    bookInHand: {
        minWidth: 275,
        padding: theme.spacing(1)
    },
    image: {
        width: 300,
        objectFit: "cover",
        objectPosition: "center"
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    itemList: {
        width: "300px",
        height: "100%"
    },
    grid: {
        listStyle: "none",
        padding: theme.spacing(0, 10)
    }
}));

export default function Profile(props){
    const classes = useStyles();
    const [user, setUser] = useState({});
    console.log(localStorage.getItem('id'))
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get/${localStorage.getItem("id")}`).then((res) => {
            setUser(res.data);
        })
    }, [])

    return(
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography color="textSecondary" component="h3" variant="h3">
                                {user.name}
                            </Typography>
                            <Typography variant="subtitle1" component="h1">
                                {user.email}
                            </Typography>
                            <Button variant="contained" color="primary" className={classes.button} onClick={() => props.history.push('/user/home')}>Browse Books</Button>
                        </CardContent>
                        <CardContent>
                            <Avatar className={classes.avatar}>{user.name?.substring(0, 1)}</Avatar>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.bookInHand} variant="outlined">
                        <CardContent>
                            <Typography color="textSecondary" component="div" variant="h6" >
                                Books Taken
                            </Typography>
                        </CardContent>
                        <Grid container spacing={2} className={classes.grid}>
                            {itemData.map((item) => (
                                <Grid item xs={12} md={6} lg={3} xl={2}>
                                    <ImageListItem className={classes.itemList} key={item.imageUrl}>
                                        <img src={item.imageUrl} alt={item.title} className={classes.image}/>
                                        <ImageListItemBar
                                            title={item.title}
                                            subtitle={<span>{item.author}</span>}
                                            actionIcon={
                                            <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                                                <InfoIcon />
                                            </IconButton>
                                            }
                                        />
                                    </ImageListItem>
                                </Grid>
                            ))}
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </main>
    )
}
