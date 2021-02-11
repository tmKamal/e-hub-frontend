import { Typography } from "@material-ui/core";


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
