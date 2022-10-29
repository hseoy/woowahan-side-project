import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    header: `'BMEuljiro10yearslater', 'Spoqa Han Sans Neo', sans-serif`,
    logo: `'BMEuljiro10yearslater', 'Spoqa Han Sans Neo', sans-serif`,
    heading: `'Spoqa Han Sans Neo', sans-serif`,
    body: `'Spoqa Han Sans Neo', sans-serif`,
    dohyeon: `'BMDOHYEON', 'Spoqa Han Sans Neo', sans-serif`,
  },
  colors: {
    logo: '#40BFB8',
    iconColor: '#a5a5a5',
    brandPrimary: '#4B587C',
    brandAccent: '#21293C',
    brandPrimaryAlpha: 'rgba(75, 88, 124, 0.25)',
    veryLightGray: '#EAEAEA',
    mediumLightGray: '#D3D3D3',
    lightGray: '#5B5B5B',
    mint: {
      100: '#EDFDFC',
      300: '#83E8E2',
      500: '#2AC1BC',
      700: '#1E8A86',
      900: '#125351',
    },
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
