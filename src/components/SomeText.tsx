import { Alert, Stack, Typography } from '@mui/material';

const SomeText = () => (
  <Stack spacing={2}>
    <Typography variant="h4">Hello</Typography>

    <Alert severity="info">
      This is a Next.js app with Material-UI v5 and TypeScript setup.
    </Alert>
  </Stack>
);

export default SomeText;
