import Grid from '@material-ui/core/Grid';
import BookCard from "../../Card/Card";
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    success: {
        color: "green",
        display: "flex",
        alignItems: 'center'
    }
}));


export default function BookScreen(props){
    const classes = useStyles();
    const [bookList, setBookList] = useState([]);
    const [updateScreen, setUpdateScreen] = useState(true);
    const [bookRequest, setBookRequest] = useState([]);
    const [bookRequests, setBookRequests] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/request/?userId=${localStorage.getItem("id")}`).then((res) => {
            var temp = [];
            res.data.forEach((res) => {
                temp.push(res.bookId);
            })
            setBookRequest(temp);
            setBookRequests(res.data);
        })
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/book`).then((res) => {
            setBookList(res.data);
        })
    }, [updateScreen]) 


    const Action = ({message, book, request }) => {
        const handleRequest = (e) => {
            setSnackbarOpen(true);
            e.preventDefault();
            const requestData = {
                "requestType": "BORROW",
                "userId": localStorage.getItem("id"),
                "bookId": book._id,
                "status": "PENDING"
            }
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/request/new`, requestData).then(res => {
                if(res._id !== null){
                    setUpdateScreen(!updateScreen);
                }
            })
        }  
    
        const cancelRequest = (id) => {
            let temp = bookRequests.find(req => req.bookId === id)
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/user/request/delete/${temp._id}`).then(res => {
                if(res.data)
                    setUpdateScreen(!updateScreen);
            })
        }
        
        return(
            <CardActions>
                {
                    request ?
                    <Button size="small" color="primary" onClick={() => {cancelRequest(book._id)}} className={classes.success}>
                        <CheckCircleIcon style={{marginRight: "4px"}}/> Requested
                    </Button>
                    :
                    <Button size="small" color="primary" onClick={handleRequest}>
                        Request
                    </Button>
                }
                <Typography variant="body2" component="p">
                    {message}
                </Typography>
            </CardActions>
        )
    }   

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
      
        setSnackbarOpen(false);
    }
    
    

    return(
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    message="Request Sent"
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
                <Grid container spacing={2} justifyContent="center" alignContent="center">
                    {
                        bookList.map((book) => {
                            return (
                                <Grid xs={12} item md={4} sm={6} lg={3} xl={2} key={book._id}>
                                    <BookCard 
                                        src={book.imageUrl} 
                                        title={book.title} 
                                        description={book.description} 
                                        author={book.author} 
                                        publishedDate={format(new Date(book.publishedDate), "MMM yyyy")}
                                        action={
                                            <Action 
                                                message={parseInt(book.count) > 0 ? "Available" : "Unavailable"} 
                                                book={book} 
                                                request={bookRequest.indexOf(book._id) !== -1}
                                            />
                                        }
                                    />
                                </Grid>
                            )
                        })
                    }   
                </Grid>
                
            </main>
    );
}