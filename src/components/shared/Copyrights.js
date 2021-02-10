import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Copyrights() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      
        Sllit AF - Final Exam
      {" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
