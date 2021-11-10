import { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import BookCard from "../../Card/Card";
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import format from 'date-fns/format';



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
}));

export default function AdminBookScreen(props){
    const classes = useStyles();
    const [bookList, setBookList] = useState([]);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/book`).then((res) => {
            setBookList(res.data);
        })
    }, [deleted]);

    const Action = ({ id }) => {
        const handleDelete = () => {
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/book/delete/${id}`).then((res) => {
                if(res.data.status)
                    setDeleted(!deleted);
            })
        }

        return(
            <CardActions>
                <Link to={{pathname: "/admin/editBook", state: {bookId: id}}} style={{textDecoration: "none"}}>
                    <Button size="small" color="primary" variant="outlined">
                        Edit
                    </Button>
                </Link>
                <Button size="small" color="secondary" variant="outlined" onClick={handleDelete}>
                    Delete
                </Button>
            </CardActions>
        )
    }

    return(
        <main className={classes.content}>
            <div className={classes.toolbar} />
            
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
                                    action={<Action id={book._id}/>}
                                />
                            </Grid>
                        )
                    })
                }   
            </Grid>
        </main>
    );
}