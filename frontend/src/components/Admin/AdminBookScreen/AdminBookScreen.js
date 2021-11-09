import Grid from '@material-ui/core/Grid';
import BookCard from "../../Card/Card";
import { makeStyles } from '@material-ui/core/styles';
import BooksList from './content';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Action = () => {
    return(
        <CardActions>
            <Link replace to={{pathname: "/admin/editBook", state: {bookId: "1"}}} style={{textDecoration: "none"}}>
                <Button size="small" color="primary" variant="outlined">
                    Edit
                </Button>
            </Link>
            <Button size="small" color="secondary" variant="outlined">
                Delete
            </Button>
        </CardActions>
    )
}


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
    return(
        <main className={classes.content}>
            <div className={classes.toolbar} />
            
            <Grid container spacing={2} justifyContent="center" alignContent="center">
                {
                    BooksList.map((book) => {
                        return (
                            <Grid xs={12} item md={4} sm={6} lg={3} xl={2} key={book.title}>
                                <BookCard 
                                    src={book.imageUrl} 
                                    title={book.title} 
                                    description={book.description} 
                                    author={book.author} 
                                    publishedDate={book.publishedDate}
                                    action={<Action />}
                                />
                            </Grid>
                        )
                    })
                }   
            </Grid>
        </main>
    );
}