import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainPageWrapper: {
    width: "100%",
    overflowX: "hidden",

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
    position: "fixed",
    backgroundColor: theme.palette.white.main,
    zIndex: 200,
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
    height: "100vh",
    backgroundColor: "white",
    boxShadow: "none",
    position: "relative",
    overflow: "unset",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
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
      height: "100%",
    },
  },
  filterByContainer: {
    width: "100%",
    height: "100%",
    overflow: "scroll",
    padding: 40,
    boxShadow: "none",
    "& .page-title": {
      fontSize: 20,
      paddingLeft: 10,
      fontWeigth: "600",
    },
    [theme.breakpoints.down("sm")]: {
      padding: 5,
      paddingTop: 40,
      "& .page-title": {
        paddingLeft: 40,
      },
    },
  },
  toggleStack: {
    backgroundColor: theme.palette.grey0.main,
    borderRadius: 60,
    "& .switch-button": {
      width: "100%",
      borderRadius: 60,
      paddingTop: 11,
      paddingBottom: 11,
      fontSize: "0.72em",
      fontWeight: "500",
    },
    "& .switch-button.active": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.white.main,
      fontWeight: "700",
    },
  },
  roundFilterBtn: {
    marginRight: 30,
    width: 40,
    height: 40,
  },
}));

export { useStyles };
