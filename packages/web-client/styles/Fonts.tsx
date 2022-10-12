import { Global } from '@emotion/react';

// 을지로10년후체는 용량이 크기 때문에(7MB) 헤더 영역 등, 한정된 영역에서만 사용하며 서브셋으로 생성하여 사용
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
          src: url('./BMEuljiro10yearslater/BMEuljiro10yearslater.subset.woff2') format('woff2'),
          url('./BMEuljiro10yearslater/BMEuljiro10yearslater.subset.woff') format('woff'),
          url('./BMEuljiro10yearslater/BMEuljiro10yearslater.subset.ttf') format('truetype');
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
