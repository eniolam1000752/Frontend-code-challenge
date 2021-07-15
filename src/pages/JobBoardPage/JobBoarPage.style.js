import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainPageWrapper: {
    width: "100%",

    "& .jobs-for-you": {
      fontSize: "1.6em",
      marginBottom: 20,
    },
  },
  appHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    color: theme.palette.primary.main,
  },
  appTitle: { fontWeigth: "bold" },
  searchInput: {
    "& input": {
      height: 20,
      borderRadius: 60,
      border: "solid 2px black",
      padding: 10,
      paddingLeft: 38,
      position: "relative",
      "&:focus": {
        border: `solid 2px ${theme.palette.primary.main}`,
      },
    },
  },
  filterDrawerWrapper: {
    width: "60vw",
    backgroundColor: "white",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.15)",
    position: "relative",
    overflow: "unset",
  },
  filterCloseBtn: {
    position: "absolute",
    top: 20,
    left: -20,
    boxShadow: "none",
    paddingLeft: 3,
  },
  drawer: {
    "& .MuiPaper-root": {
      overflow: "unset",
    },
  },
}));

export { useStyles };
