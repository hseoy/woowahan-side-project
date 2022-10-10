import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import Fonts from '../styles/Fonts';
import theme from '../styles/theme';
import { serviceName } from '@/constants/service';
import GlobalStyle from '@/styles/GlobalStyle';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>{serviceName}</title>
      </Head>
      <Fonts />
      <GlobalStyle />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
