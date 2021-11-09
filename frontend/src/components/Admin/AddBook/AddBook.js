import { Button, CssBaseline, Grid, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


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
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField 
                                required
                                id="imageUrl"
                                name="imageUrl"
                                label="Image Url"
                                fullWidth
                                autoComplete="image-url"
                                variant="outlined"
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                            />
                        </Grid>
                    </Grid>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                    >
                            {props.btn}
                    </Button>
                </Paper>
            </main>
        </div>
    )
}