import React from "react";
import { Box, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

export function SearchInput(props) {
  const classes = useStyles();

  return (
    <Box position="relative" width="100%">
      <InputBase inputProps={props} className={classes.searchInput} />
      <SearchIcon
        style={{ position: "absolute", left: 8, top: 12, fontSize: 25 }}
      />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "100%",
    "& input": {
      height: 20,
      borderRadius: 60,
      border: "solid 2px black",
      padding: 10,
      paddingLeft: 38,
      position: "relative",
      fontFamily: "Montserrat",
      fontSize: "0.85em",
      width: "100%",
      "&:focus": {
        border: `solid 2px ${theme.palette.primary.main}`,
      },
    },
  },
}));
