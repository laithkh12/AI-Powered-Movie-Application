import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
  moviesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    overflow: "scroll", // or "auto", depending on your needs
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
}));
