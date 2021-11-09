import Grid from '@material-ui/core/Grid';
import BookCard from "../../Card/Card";
import { makeStyles } from '@material-ui/core/styles';
import BooksList from './content';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const Action = ({message}) => {
    return(
        <CardActions>
            <Button size="small" color="primary">
                Request
            </Button>
            <Typography variant="body2" component="p">
                {message}
            </Typography>
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

export default function BookScreen(props){
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
                                        action={<Action message={book.message}/>}
                                    />
                                </Grid>
                            )
                        })
                    }   
                </Grid>
                
            </main>
    );
}