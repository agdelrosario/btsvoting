
import {signIn, signOut, useSession} from "next-auth/client"
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {

  return (
    <Grid
      container
      className="loading"
      alignItems="center"
      align="center"
      style={{ minHeight: '70vh' }}
    >
      <Grid item xs>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}

export default Loading;