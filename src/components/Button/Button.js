import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { theme } from "../../utils/globals";

export function TaikaiButton({ isRound, children, bgColor }) {
  const classes = useStyles(theme);

  return <Button color={bgColor || "primary"}>{children}</Button>;
}

const useStyles = makeStyles((theme) => {
  buttonWrapper: {
  }
});
