import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    logo: `'BMEuljiro10yearslater', 'Spoqa Han Sans Neo', sans-serif`,
    heading: `'Spoqa Han Sans Neo', sans-serif`,
    body: `'Spoqa Han Sans Neo', sans-serif`,
  },
  colors: {
    logo: '#40BFB8',
    brandPrimary: '#4B587C',
    brandAccent: '#21293C',
  },
  components: {
    Link: {
      variants: {
        noUnderline: {
          _hover: {
            textDecoration: 'none',
          },
        },
      },
    },
  },
});

export default theme;
