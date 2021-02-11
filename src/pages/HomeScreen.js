import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHttpClient } from "../hooks/http-hook";
import Copyrights from "../components/shared/Copyrights";
import { Avatar, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function HomeScreen() {
  const classes = useStyles();
  const { sendRequest } = useHttpClient();
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API}/api/course/get-all-courses`
        );

        setCourseData(response.courses);

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              E-Hub.lk
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Sri lanka's best online platform for e-learning. Here you can find
              valuable courses from top rated lecturers and teachers.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {courseData.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.featuredImage}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>{card.description}</Typography>
                  </CardContent>
                  <CardActions>
                    {card.price !== 0 ? (
                      <Chip
                        avatar={<Avatar>Rs.</Avatar>}
                        color="primary"
                        label={card.price + "/="}
                      />
                    ) : (
                      <Chip
                        avatar={<Avatar>$</Avatar>}
                        color="secondary"
                        label="Free"
                      />
                    )}
                    <Button size="small" color="primary">
                      Enroll
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Amazon.com Never stop learning because life never stops teaching
        </Typography>
        <Copyrights></Copyrights>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
