import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainPageWrapper: {
    width: "100%",
    height: "100%",
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
    overflow: "hidden",
    height: 40,
    "& img": {
      width: "100%",
      opacity: 0.06,
      position: "absolute",
      zIndex: -1,
    },
  },
  appTitle: {
    fontWeigth: "bold",
    fontSize: 35,
    [theme.breakpoints.down("sm")]: {
      fontSize: 30,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 25,
    },
  },
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
  emptyText: {
    textAlign: "center",
    width: "70%",
    fontSize: "13px",
    marginTop: 40,
    opacity: 0.9,
    "& span": {
      opacity: 0.5,
      fontWeight: 500,
      paddingTop: 20,
    },
  },
  filterBodyContainer: {
    marginTop: "10px",
    marginLeft: "-20px",
    width: "calc(100% - 0px)",
    height: "calc(100% - 110px)",
    overflow: "hidden scroll",
    zIndex: -10000,
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {
      width: "calc(100% - 0px)",
      marginLeft: "-40px",
    },
  },
  updateButtonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    width: "calc(100% - 50px)",
    backgroundColor: theme.palette.white.main,
    zIndex: 50,
    paddingBottom: 20,
    "& .page-title": {
      fontSize: 20,
      paddingLeft: 10,
      fontWeigth: "600",
      position: "absolute",
      left: 25,
    },
    "& button": {
      right: 40,
      [theme.breakpoints.down("xs")]: {
        transform: "scale(0.8)",
        right: -40,
        top: 30,
      },
    },
  },
}));

export { useStyles };
