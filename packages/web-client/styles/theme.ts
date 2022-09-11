import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Spoqa Han Sans Neo', sans-serif`,
    body: `'Spoqa Han Sans Neo', sans-serif`,
  },
  colors: {
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
