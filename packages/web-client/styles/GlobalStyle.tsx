import { Global } from '@emotion/react';

function GlobalStyle() {
  return (
    <Global
      styles={`
        html, body, #__next {
          width: 100%;
          height: 100%;
          margin: 0;
        }
      `}
    />
  );
}

export default GlobalStyle;
