import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    margin: theme.spacing(3, 0),
    textAlign: 'center',
    fontSize: '2rem',
  },
  card: {
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.03)',
    },
    boxShadow: '0px 0px 5px 5px rgba(204, 204, 204, 1)',
    
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    textAlign: 'center',
  },
  media: {
    width: "50%",
    height: 200,
    objectFit: 'cover',
    margin: '0 auto',
    display: 'block', 
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    padding: theme.spacing(2),
  },
  titleProd: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  price: {
    fontSize: '1.2rem',
    color: theme.palette.secondary.main,
  },
  ratingContainer: {
    marginTop: theme.spacing(1),
  },
  ratingStars: {
    fontSize: '1rem',
  },
  actions: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  summary: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  emptyButton: {
    marginBottom: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
  },
  checkoutButton: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px', 
  },
  quantityButton: {
    minWidth: '36px',
    height: '36px',
    fontSize: '1.2rem',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  removeButton: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },

  summary: {
    padding: theme.spacing(3),
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    margin: theme.spacing(2, 0),
  },
  subtotalText: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    color: theme.palette.primary.dark,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  emptyButton: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  checkoutButton: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));
