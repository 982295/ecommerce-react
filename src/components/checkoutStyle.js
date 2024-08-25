import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '8px',
  },
  textField: {
    margin: theme.spacing(1, 0),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  orderCard: {
    maxWidth: 400,
    margin: '20px auto',
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
}));
