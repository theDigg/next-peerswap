import { Box, Link, Stack } from '@mui/material';
import Image from 'next/image';

import HelperIconImage from './HelperIconImage';

const SomeImage = () => (
  <Stack alignItems="center" spacing={2}>
    <Box textAlign="center">
      <Box position="relative" width={[250, 300, 400]}>
        <Image
          src="/assets/Rocket-rafiki.svg"
          alt="launch"
          width={400}
          height={400}
        />
      </Box>
      <Link
        href="https://stories.freepik.com/web"
        sx={{ textDecoration: 'none' }}
      >
        Illustration by Freepik Stories
      </Link>
    </Box>

    <Stack direction="row">
      <HelperIconImage src="/assets/nextjs-icon-light.svg" label="Next.js" />
      <HelperIconImage src="/assets/mui-logo.svg" label="Material-UI v5" />
      <HelperIconImage src="/assets/ts-logo-512.svg" label="TypeScript" />
    </Stack>
  </Stack>
);

export default SomeImage;
