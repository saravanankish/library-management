import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import format from 'date-fns/format';
import { Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
    container: {
        padding: theme.spacing(3, 4)
    },
    listContainer: {
        marginTop: theme.spacing(4)
    },
    image: {
        width: theme.spacing(15),
        height: theme.spacing(25),
        objectFit: "contain",
        marginRight: theme.spacing(3)
    },
    cardContent: {
        display: "flex",

    },
    root: {
        minWidth: 275,
    },
}));

export default function RequestScreen(props){
    const classes = useStyles();
    const [requests, setRequests] = useState([]);
    const [updateScreen, setUpdateScreen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/request?userId=${localStorage.getItem('id')}`).then(res => {
            setRequests(res.data);
        })
    }, [updateScreen]);

    const BookDetails = ({ bookId, req }) => {
        const [book, setBook] = useState({});

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/book/${bookId}`).then(res => {
            setBook(res.data);
        });

        return(
            <CardContent className={classes.cardContent}>
                <Avatar variant="square" src={book.imageUrl} className={classes.image}/>
                <div>
                    <Typography variant="h6" gutterBottom    component="p">
                        Status: {req.status}  |  Type: {req.requestType}
                    </Typography>
                    <Typography variant="h6" component="h2">
                        { book.title }
                    </Typography>
                    <Typography  variant="body1" component="p">
                        By {book.author}
                    </Typography>
                    <Typography style={{marginBottom: "10px"}} variant="body2" component="p">
                        Published on : { book.publishedDate !== undefined ? format(new Date(book.publishedDate), "MMM yyyy") : ""}
                    </Typography>

                    <Button variant="contained" color="secondary" onClick={() => { handleRequest(req._id) }}>Delete</Button>
                </div>
            </CardContent>
            
        )
    }

    const handleRequest = (id) => {
        setSnackbarOpen(true);
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/user/request/delete/${id}`).then(res => {
            if(res.data)
                setUpdateScreen(!updateScreen);
        })
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
      
        setSnackbarOpen(false);
    }

    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                message="Deleted Request"
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                severity="error"
                action={
                    <React.Fragment>
                      <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </React.Fragment>
                  }
            />

            <Paper className={classes.container}>
                <Typography gutterBottom component="h2" variant="h4" color="textSecondary" align="center">
                    My Requests
                </Typography>
                <Grid container spacing={2} className={classes.listContainer}>
                    {
                        requests.map(req => {
                            return(
                                <Grid item sm={12} key={req._id}>
                                    <Card className={classes.root} variant="outlined">
                                        <BookDetails req={req} bookId={req.bookId}/>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Paper>
        </div>
    )
}