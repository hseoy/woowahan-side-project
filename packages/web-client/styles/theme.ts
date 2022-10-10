import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    header: `'BMEuljiro10yearslater', 'Spoqa Han Sans Neo', sans-serif`,
    logo: `'BMEuljiro10yearslater', 'Spoqa Han Sans Neo', sans-serif`,
    heading: `'Spoqa Han Sans Neo', sans-serif`,
    body: `'Spoqa Han Sans Neo', sans-serif`,
  },
  colors: {
    logo: '#40BFB8',
    brandPrimary: '#4B587C',
    brandAccent: '#21293C',
    brandPrimaryAlpha: 'rgba(75, 88, 124, 0.25)',
    veryLightGray: '#EAEAEA',
    mediumLightGray: '#D3D3D3',
    lightGray: '#5B5B5B',
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
