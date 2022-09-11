import { Global } from '@emotion/react';

function Fonts() {
  return (
    <Global
      styles={`
        @font-face {
          font-family: 'Spoqa Han Sans Neo';
          src: url('/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff2') format('woff2'),
            url('/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff') format('woff'),
            url('/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf') format('truetype');
          font-weight: 400;
          font-style: 400;
        }
      `}
    />
  );
}

export default Fonts;
