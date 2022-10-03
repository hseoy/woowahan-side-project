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
        @font-face {
          font-family: 'BMEuljiro10yearslater';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/BMEuljiro10yearslater.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }
      `}
    />
  );
}

export default Fonts;
