import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import Fonts from '../styles/Fonts';
import theme from '../styles/theme';
import { serviceName } from '@/constants/service';
import GlobalStyle from '@/styles/GlobalStyle';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Head>
          <title>{serviceName}</title>
          <link rel="icon" href="./favicon/favicon.ico" />
          <link rel="shortcut icon" href="./favicon/favicon.ico" />
        </Head>
        <Fonts />
        <GlobalStyle />
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
