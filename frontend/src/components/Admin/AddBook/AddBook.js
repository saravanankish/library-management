import { useEffect, useState } from 'react';
import { Button, CssBaseline, Grid, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { format } from 'date-fns';


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
      padding: theme.spacing(8, 1),
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          padding: theme.spacing(3),
        },
      },
      grid: {
          marginTop: theme.spacing(4)
      },
      button: {
        width: "100%",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
      },
}));



export default function AddBook(props) {
    const classes = useStyles();
    const id = props.location.state ? props.location.state.bookId : "";
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [author, setAuthor] = useState('');
    const [count, setCount] = useState(1);
    const [publishedDate, setPublishedDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(id !== ""){
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/book/${id}`).then((res) => {
                setTitle(res.data.title);
                setImageUrl(res.data.imageUrl);
                setAuthor(res.data.author);
                setCount(parseInt(res.data.count));
                setPublishedDate(format(new Date(res.data.publishedDate), "yyyy-MM-dd"));
                setDescription(res.data.description);
            })
        }
    }, [id]);

    const validate = () => {
        let temp = {};
        let res = imageUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g)
        temp.title = title ? "" : "This field is required";
        temp.author = author ? "" : "This field is required";
        temp.imageUrl = imageUrl ? res !== null ? "" : "Enter correct URL" : "This field is required";
        temp.count = parseInt(count) >= 1 ? "" : "Count should be greater than 1";
        temp.description = description ? "" : "This field is required";
        temp.publishedDate = publishedDate ? "" : "This field is required";
        setErrors(temp);
        return Object.values(temp).every(x => x === "")
    }

    const handleClick = (e) => {
        e.preventDefault();
        const bookDetails = {
            "title": title,
            "author": author,
            "imageUrl": imageUrl,
            "count": count,
            "publishedDate": publishedDate,
            "description": description
        }
        if(id === ""){
            
            if(validate()){
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/book/new`, bookDetails).then((res) => {
                    if(res.data._id !== null){
                        props.history.push('/admin/home');
                    }
                })
            }
        }else{
            bookDetails.id = id;
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/admin/book/save`, bookDetails).then((res) => {
                if(res.data._id !== null)
                    props.history.push('/admin/home');
            })
        }
    }

    return (
        <div className={classes.content}>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper} >
                    <Typography component="h1" variant="h4" align="center">
                        {props.title}
                    </Typography>
                    <Grid container spacing={2} className={classes.grid}>
                        <Grid item xs={12} sm={12}>
                            <TextField 
                                required
                                id="title"
                                name="title"
                                label="Book Title"
                                fullWidth
                                type="text"
                                autoComplete="book-title"
                                variant="outlined"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                {...(errors.title && {error: true, helperText: errors.title})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField 
                                required
                                id="author"
                                name="author"
                                label="Book Author"
                                fullWidth
                                autoComplete="book-author"
                                variant="outlined"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                {...(errors.author && {error: true, helperText: errors.author})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField 
                                required
                                id="imageUrl"
                                name="imageUrl"
                                label="Image Url"
                                fullWidth
                                type="url"
                                autoComplete="image-url"
                                variant="outlined"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                {...(errors.imageUrl && {error: true, helperText: errors.imageUrl})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                required
                                id="count"
                                name="count"
                                label="Book Count"
                                fullWidth
                                type="number"
                                autoComplete="book-count"
                                variant="outlined"
                                value={count}
                                onChange={(e) => setCount(e.target.value)}
                                {...(errors.count && {error: true, helperText: errors.count})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                required
                                id="published"
                                name="published"
                                label="Published Date"
                                fullWidth
                                autoComplete="published-date"
                                type="date"
                                variant="outlined"
                                value={publishedDate}
                                onChange={(e) => setPublishedDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...(errors.publishedDate && {error: true, helperText: errors.publishedDate})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField 
                                required
                                id="description"
                                name="description"
                                label="Book Description"
                                fullWidth
                                multiline
                                rows={6}
                                autoComplete="book-description"
                                variant="outlined"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                {...(errors.description && {error: true, helperText: errors.description})}
                            />
                        </Grid>
                    </Grid>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={handleClick}
                    >
                            {props.btn}
                    </Button>
                </Paper>
            </main>
        </div>
    )
}