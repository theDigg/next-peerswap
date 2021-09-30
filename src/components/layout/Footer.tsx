import { Grid, Link, Typography } from '@mui/material';

const Footer = () => (
  <Grid container paddingY={2}>
    <Grid item>
      <Typography>
        {new Date().getFullYear()}
        {' | '}
        <Link href="https://sznm.dev" target="_blank" fontWeight="bold">
          sznm.dev
        </Link>
      </Typography>
    </Grid>
  </Grid>
);

export default Footer;
