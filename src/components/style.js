import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#fafafa", // Light background color for the page
  },
  media: {
    width: "50%",
    margin: '0 auto', // Center horizontally
    display: 'block', // Ensure block-level styling
  },

  toolbar: theme.mixins.toolbar,
  card: {
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: '0px 0px 5px 5px rgba(204, 204, 204, 1)'
    },
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    textAlign: 'center',
  },
  price: {
    fontSize: '1.2rem',
    color: theme.palette.secondary.main,
  },
  cardActions: {
    justifyContent: "space-between",
  },
  productTitle: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
}));

export default useStyles;
