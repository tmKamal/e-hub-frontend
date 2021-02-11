import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import pHistoryImage from "../../assets/images/teacher.png";
import paymentImage from "../../assets/images/student.png";
import journeyImage from "../../assets/images/payment.png";
import addImage from "../../assets/images/add.png"
import viewImage from "../../assets/images/view.png"



const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    textAlign: "center",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "60px",
  },
  media: {
    height: 140,
  },
});

const MenuBtn = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const onClickHandler = (e) => {
    console.log(props.url);
    history.push(props.url);
  };

  return (
    <Card data-testid="mbtn" elevation={1} className={classes.root}>
      <CardActionArea onClick={onClickHandler}>
        <CardMedia
          className={classes.media}
          image={
            props.image === "student"
              ? paymentImage
              : props.image === "teacher"
              ? pHistoryImage
              : props.image === "view"
              ? viewImage
              : props.image === "add"
              ? addImage
              : props.image === "other"
              ? paymentImage
              : journeyImage
          }
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default MenuBtn;
