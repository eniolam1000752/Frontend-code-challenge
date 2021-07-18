import {
  Box,
  Button,
  ButtonBase,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { theme } from "../../utils/globals";

export function ListSelect({
  listItem = [],
  onSelect,
  headerText,
  selected,
  onDeSelect,
}) {
  const classes = useStyles(theme);

  return (
    <Box className={classes.listWrapper}>
      <span className="header-text">{headerText}</span>
      <ul>
        {listItem.map((item, index) => (
          <li key={`list-item-${index}`}> 
            <ButtonBase
              className="list-item"
              onClick={() => {
                const indexOfSelectedOption = selected.indexOf(index);
                indexOfSelectedOption !== -1
                  ? onDeSelect(indexOfSelectedOption)
                  : onSelect(index);
              }}
            >
              <div
                className={`circle ${
                  selected.indexOf(index) !== -1 ? "active" : ""
                }`}
              />
              <span>{item}</span>
            </ButtonBase>
          </li>
        ))}
      </ul>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  listWrapper: {
    padding: 10,
    fontSize: "0.82em",
    "& ul": {
      listStyleType: "none",
    },
    "& > .header-text": {
      marginLeft: 40,
      fontWeight: "600",
      fontSize: 15,
    },
    "& ul li": {},
    "& ul li .list-item": {
      paddingTop: 6,
      paddingBottom: 6,
      display: "flex",
      flexDirection: "row",
      borderRadius: 40,
    },
    "& ul li .list-item > .circle": {
      width: 17,
      height: 17,
      borderRadius: "50%",
      backgroundColor: theme.palette.grey0.main,
      marginRight: 15,
    },
    "& ul li .list-item > .circle.active": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
