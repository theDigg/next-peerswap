import { Stack } from '@mui/material';
import { NextPage } from 'next';

import CTASection from 'components/CTASection';
import SomeImage from 'components/SomeImage';
import SomeText from 'components/SomeText';

const Home: NextPage = () => (
  <Stack spacing={4}>
    <SomeText />
    <SomeImage />
    <CTASection />
  </Stack>
);

export default Home;
