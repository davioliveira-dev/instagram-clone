import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body, input, textarea {
    background: #fafafa;
    font: 14px Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased !important;
    min-width: 270px;
  }
`;
