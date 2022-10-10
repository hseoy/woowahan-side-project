import { Global } from '@emotion/react';

function Fonts() {
  return (
    <Global
      styles={`
        @font-face {
          font-family: 'Spoqa Han Sans Neo';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'BMEuljiro10yearslater';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/BMEuljiro10yearslater.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: 'BMDOHYEON';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMDOHYEON.woff') format('woff');
          font-weight: normal;
          font-style: normal;
      }
      `}
    />
  );
}

export default Fonts;
