import { Box } from '@mui/material';
import { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <Box marginX="auto">
    <Header />
    <Box
      paddingX={[2, 0]}
      paddingY={[2]}
      maxWidth={['100vw', '100vw', '85vw', '800px']}
      marginX="auto"
    >
      {children}
      <Footer />
    </Box>
  </Box>
);

export default Layout;
