/* eslint-disable @next/next/no-img-element */
import { GitHub as GithubIcon } from '@mui/icons-material';
import { Button, Link, Stack, Typography } from '@mui/material';

const CTASection = () => (
  <Stack textAlign="center" spacing={2}>
    <Stack justifyContent="center" direction="row" spacing={2}>
      <Link
        target="_blank"
        href="https://vercel.com/import/git?s=https://github.com/sozonome/nextmui-starter"
      >
        <img src="https://vercel.com/button" alt="deploy to vercel" />
      </Link>
      <Link href="https://app.netlify.com/start/deploy?repository=https://github.com/sozonome/nextmui-starter">
        <img
          src="https://www.netlify.com/img/deploy/button.svg"
          alt="deploy to netlify"
        />
      </Link>
    </Stack>

    <Stack spacing={1}>
      <Typography
        style={{ background: 'lightgray', padding: 2, borderRadius: 4 }}
      >
        npx degit sozonome/nextmui-starter {'<YOUR_APP_NAME>'}
      </Typography>

      <Button
        component={Link}
        variant="outlined"
        target="_blank"
        href="https://github.com/sozonome/nextmui-starter/generate"
      >
        Use This Template
      </Button>
    </Stack>

    <Stack direction="row" justifyContent="center">
      <Button
        component={Link}
        href="https://github.com/sozonome/nextmui-starter"
        target="_blank"
        startIcon={<GithubIcon />}
      >
        Open in Github
      </Button>
    </Stack>
  </Stack>
);

export default CTASection;
