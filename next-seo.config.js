/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: 'Peerswap',
  titleTemplate: '%s | Peerswap',
  defaultTitle: 'Peerswap',
  description: 'Next.js + mui v5 + TypeScript template',
  canonical: 'https://peerswap.org',
  openGraph: {
    url: 'https://peerswap.org',
    title: 'Peerswap',
    description: 'Next.js + mui v5 + TypeScript template',
    images: [
      {
        url: 'https://og-image.sznm.dev/**nextmui-starter**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250',
        alt: 'nextmui-starter.sznm.dev og-image',
      },
    ],
    site_name: 'peerswap',
  },
  twitter: {
    handle: '@sozonome',
    cardType: 'summary_large_image',
  },
};

export default defaultSEOConfig;
