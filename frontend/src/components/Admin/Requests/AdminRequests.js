import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Paper, Typography, Button, Card } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CardContent } from '@material-ui/core';


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


export default function AdminRequest(props) {
    const classes = useStyles();
    const [requests, setRequests] = useState([]);
    const [updateScreen, setUpdateScreen] = useState(false);


    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/requests`).then(res => {
        setRequests(res.data);
      })
    }, [updateScreen]);

    const BookDetails = ({ bookId, req }) => {
      const [book, setBook] = useState({});
      const [user, setUser] = useState({});

      axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/book/${bookId}`).then(res => {
        setBook(res.data);
      });

      axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get/${req.userId}`).then((res) => {
        setUser(res.data);
      });

      const handleClick = (req, status) => {
        req.status = status
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/admin/requests/update`, req).then(res => {
          if(res.data.status){
            setUpdateScreen(!updateScreen);
          }
        })
      }

      return(
          <CardContent className={classes.cardContent}>
              <Avatar variant="square" src={book.imageUrl} className={classes.image}/>
              <div>
                  <Typography variant="h6" component="p">
                      Status: {req.status}  |  Type: {req.requestType}
                  </Typography>
                  <Typography variant="h6" gutterBottom    component="p">
                      Book Count: {book.count} | Pending Request: {book.requests?.length}
                  </Typography>
                  <Typography variant="h6" component="h2">
                      User Details: {user.email} ( { user._id } )
                  </Typography>
                  <Typography variant="h6" component="h2" gutterBottom>
                      Book Title: { book.title } ( { book._id } )
                  </Typography>
                  {
                    req.status === "PENDING" ?
                    <>
                      <Button variant="contained" color="primary" style={{marginRight: "10px"}} onClick={() => handleClick(req, "APPROVED")}>Approve</Button>
                      <Button variant="contained" color="secondary" onClick={() => handleClick(req, "REJECTED")}>Reject</Button>
                    </>
                    :
                    <></>
                  }
              </div>
          </CardContent>
      )
    }

    return(
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <Paper className={classes.container}>
              <Typography gutterBottom component="h2" variant="h4" color="textSecondary" align="center">
                User Requests
              </Typography>
              <Grid container spacing={2} className={classes.listContainer}>
                {
                  requests.map(req => {
                    return(
                      <Grid item sm={12} key={req._id}>
                        <Card className={classes.root} variant="outlined">
                          <BookDetails bookId={req.bookId} req={req}/>
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