/* eslint-disable react/jsx-props-no-spreading */
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '@fontsource/plus-jakarta-sans/latin.css';
import '@fontsource/ibm-plex-sans';

import defaultSEOConfig from '../../next-seo.config';
import Layout from 'components/layout';
import theme from 'styles/mui-theme';
import createEmotionCache from 'styles/mui-theme/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  // eslint-disable-next-line react/require-default-props
  emotionCache?: EmotionCache;
}

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => (
  <CacheProvider value={emotionCache}>
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
    </Head>
    <DefaultSeo {...defaultSEOConfig} />
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </CacheProvider>
);

export default MyApp;
