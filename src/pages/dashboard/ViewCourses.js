import React, { useState, useEffect } from 'react';
import {
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Typography,
    Button,
    makeStyles,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { green, red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { useHttpClient } from "../../hooks/http-hook";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },

    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    table: {
        minWidth: 650
    },

    marginT: {
        marginTop: '2rem'
    }
}));

const ViewCourses = () => {
    const classes = useStyles();
    const [loadedCourses, setLoadedCourses] = useState();
    const { isLoading,  sendRequest} = useHttpClient();
    const [deleteId, setDeleteId] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteSuccMsg, setDeleteSuccMsg] = useState();
    const [reload, setReload] = useState(); //use to fetch courses again, after deleting a course.

    useEffect(() => {
        const fetchingCourses = async () => {
            try {
                setLoadedCourses(
                    await sendRequest(
                        `${process.env.REACT_APP_BACKEND_API}/api/course/get-courses-by-author/6023eba5577c6f30088152ca`
                    )
                );
            } catch (err) {}
        };
        fetchingCourses();
    }, [sendRequest, reload]);

    const deleteDialogOpener = (id) => {
        setDeleteId(id);
        setOpenDialog(true);
    };
    const deleteDialogCloser = () => {
        setOpenDialog(false);
        setDeleteId(null);
    };
    const courseDeleteHandler = () => {
        const deleteCourse = async () => {
            try {
                const delMsg = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_API}/api/course/delete-course/${deleteId}`,
                    'DELETE',
                    null,
                    {}
                );
                if (delMsg) {
                    setDeleteId(null);
                    deleteDialogCloser();
                    setDeleteSuccMsg(true);
                    setReload(!reload);
                }
            } catch (err) {
                deleteDialogCloser();
            }
        };
        deleteCourse();
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography
                    variant='h5'
                    align='center'
                    color='textSecondary'
                    paragraph
                    className={classes.marginT}
                >
                    Courses
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {deleteSuccMsg && (
                    <Alert
                        onClose={() => {
                            setDeleteSuccMsg(false);
                        }}
                    >
                        Course has been successfully deleted.
                    </Alert>
                )}

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>

                                <TableCell align='center'>
                                    Price
                                </TableCell>
                                <TableCell align='center'>
                                    Description
                                </TableCell>
                                <TableCell align='center'>Edit</TableCell>
                                <TableCell align='center'>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!isLoading &&
                                loadedCourses &&
                                loadedCourses.courses.map((course) => (
                                    <TableRow key={course.id}>
                                        <TableCell component='th' scope='row'>
                                            {course.name}
                                        </TableCell>

                                        <TableCell align='center'>
                                            Rs.{course.price}/=
                                        </TableCell>
                                        <TableCell align='center'>
                                            {course.description}
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Link
                                                to={`/update-course/${course._id}`}
                                            >
                                                <IconButton
                                                    color='secondary'
                                                    aria-label='edit the course'
                                                >
                                                    <CreateIcon
                                                        style={{
                                                            color: green[500]
                                                        }}
                                                    />
                                                </IconButton>
                                            </Link>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <IconButton
                                                onClick={() =>
                                                    deleteDialogOpener(
                                                        course._id
                                                    )
                                                }
                                                color='secondary'
                                                aria-label='add an alarm'
                                            >
                                                <DeleteIcon
                                                    style={{ color: red[500] }}
                                                />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {!isLoading &&
                    loadedCourses &&
                    loadedCourses.courses.length === 0 && (
                        <React.Fragment>
                            <Typography
                                variant='h5'
                                align='center'
                                color='textSecondary'
                                paragraph
                                className={classes.marginT}
                            >
                                You haven’t created any courses yet
                            </Typography>
                            <div>
                                <Grid container spacing={2} justify='center'>
                                    <Grid item>
                                        <Button
                                            href='/create-course'
                                            variant='outlined'
                                            color='primary'
                                        >
                                            Create One Now
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </React.Fragment>
                    )}
            </Grid>
            {/* PopUp Dialog for delete confirmation*/}
            <Dialog
                open={openDialog}
                onClose={deleteDialogCloser}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {'Delete confiramtion dialog box?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Are you realy wanted to delete this Building?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={courseDeleteHandler} color='primary'>
                        Yes
                    </Button>
                    <Button
                        onClick={deleteDialogCloser}
                        color='primary'
                        autoFocus
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};
export default ViewCourses;
