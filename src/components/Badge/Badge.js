import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export function Badge({ children }) {
  const classes = useStyles();

  return (
    <Paper className={classes.badgeWrapper}>
      <span>{children}</span>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  badgeWrapper: {
    width: "fit-content",
    borderRadius: 40,
    backgroundColor: "rgba(0,0,0,0.06)",
    padding: 6,
    boxShadow: "none",
    fontFamily: "Montserrat",
    fontSize: 10,
    fontWeight: 300,
    paddingLeft: 11,
    paddingRight: 11,
    margin: 7,
    transition: "all linear 200ms",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      fontWeight: 500,
      color: theme.palette.white.main,
    },
  },
}));
