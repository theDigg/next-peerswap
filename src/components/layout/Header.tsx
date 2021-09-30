import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const Header = () => (
  <AppBar elevation={2} color="primary" position="static">
    <Toolbar>
      <Grid container maxWidth="800px" marginX="auto">
        <Link href="/" passHref>
          <Typography variant="h4">nextmui-starter</Typography>
        </Link>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default Header;
