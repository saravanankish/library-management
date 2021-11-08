import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    maxHeight: 520,
    height: 520 
  },
  image: {
    padding: theme.spacing(1),
    width: "220px",
    display: "flex",
    margin: "auto"
  },
  description: {
    height: "auto",
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: "12px"
  },
  action: {
    height: "90%",
    overflow: "hidden"
  }
}));

export default function BookCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.action}>
        <CardMedia 
          className={classes.image}
          component="img"
          alt="Contemplative Reptile"
          height="320"
          image={props.src}
          title="Contemplative Reptile"
          
        />
        <CardContent>
          <Typography variant="h6" component="p">
            {props.title}
          </Typography>
          <Typography gutterBottom variant="body2" component="p">
            {props.author} | {props.publishedDate}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p" className={classes.description}>
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Request
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
