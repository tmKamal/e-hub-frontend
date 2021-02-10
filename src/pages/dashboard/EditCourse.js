import React, { useState, useContext,useEffect } from "react";
import {
  CssBaseline,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(5),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },

  button: {
    marginTop: theme.spacing(3),
  },
  layout: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const EditCourse = () => {
  const courseId = useParams().cid;
  
  const classes = useStyles();
  const [reload, setReload] = useState();
  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpClient();
  const [msg, setMsg] = useState();
  const [type, setType] = useState("free");
  const [loadedCourse,setLoadedCourse]=useState();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const { name, description, price } = values;

  // fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
        const fetchedCourse = await sendRequest(
            `${process.env.REACT_APP_BACKEND_API}/api/course/get-course/${courseId}`
        );
        console.log(fetchedCourse);
        setLoadedCourse(fetchedCourse.course);
    };
    fetchCourse();
}, [sendRequest, reload]);

useEffect(() => {
    if (loadedCourse) {
        setValues({
            ...values,
            name: loadedCourse.name,
            description: loadedCourse.description,
            price: loadedCourse.price,
        });
    }
}, [loadedCourse]);


  const onChangeHandler = (inputFieldName) => (e) => {
    setValues({ ...values, [inputFieldName]: e.target.value });
    setMsg(null);
    errorPopupCloser();
  };
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    errorPopupCloser();
    const courseInfo = {
      name,
      description,
      price,
    };
    console.log(courseInfo);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_API}/api/course/update-course/${courseId}`,
        "PATCH",
        JSON.stringify(courseInfo),
        { "Content-Type": "application/json" }
      );
      if (error) {
        console.log(error);
      }
      console.log(responseData);
      if (responseData) {
        setValues({
          name: "",
          description: "",
          
          price:0,

        });
        console.log(responseData);
        setMsg(true);
      }
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <Grid
        md={5}
        xs={10}
        style={{ marginTop: "100px" }}
        className={classes.layout}
      >
        <Paper className={classes.paper}>
          <Typography
            style={{ marginBottom: "20px" }}
            component="h1"
            variant="h4"
            align="center"
          >
            Update the Course
          </Typography>

          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={onChangeHandler("name")}
                  value={name}
                  id="name"
                  name="name"
                  variant="outlined"
                  label="Course Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                     onChange={onChangeHandler("description")}
                  id="outlined-multiline-static"
                  label="Description"
                  value={description}
                  multiline
                  rows={4}
                  defaultValue={description}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Course Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={type}
                    onChange={handleChange}
                    label="Type"
                  >
                    <MenuItem value={"free"}>Free</MenuItem>
                    <MenuItem value={"paid"}>Paid</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {type == "paid" && (
                <Grid item xs={12}>
                  <TextField
                    required
                    onChange={onChangeHandler("price")}
                    value={price}
                    id="price"
                    name="price"
                    type="number"
                    variant="outlined"
                    label="Price"
                    fullWidth
                  />
                </Grid>
              )}

              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{error}</strong>
                  </Alert>
                </Grid>
              )}
              {msg && (
                <Grid item xs={12}>
                  <Alert severity="success">
                    <AlertTitle>Success !!</AlertTitle>
                    Course has been updated successfully.
                  </Alert>
                </Grid>
              )}
            </Grid>

            <div className={classes.buttons}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.button}
                href="/"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Update
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};
export default EditCourse;
