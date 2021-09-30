import { Box, Button, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const Page404: NextPage = () => (
  <Stack>
    <Box width={['100%', '70%', '60%']} marginX="auto">
      <Image
        src="/assets/Monster 404 Error-amico.svg"
        width={800}
        height={800}
        alt="Error 404"
      />
    </Box>

    <Stack spacing={4} textAlign="center">
      <Typography variant="h5">Page not Found</Typography>

      <Box>
        <Typography>It&apos;s Okay!</Typography>
        <Link href="/" passHref>
          <Button variant="contained" size="small">
            Let&apos;s Go Back
          </Button>
        </Link>
      </Box>
    </Stack>
  </Stack>
);

export default Page404;
