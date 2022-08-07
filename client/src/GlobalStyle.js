import * as styled from 'styled-components'

const GlobalStyle = styled.createGlobalStyle`
  @font-face {
    font-family: 'NeoDunggeunmo';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmo.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    font-family: 'NeoDunggeunmo';
    box-sizing: border-box;
  }

  body {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #8fe2ec;
  }

  button {
    font-family: 'NeoDunggeunmo';
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  button:disabled {
    cursor: default;
  }

  p {
    margin: 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  @media (max-width: 319px) {
    /* smartphones, iPhone, portrait 480x320 phones */
    html {
      font-size: 9.5px;
    }
  }
  @media (min-width: 320px) {
    /* smartphones, iPhone, portrait 480x320 phones */
    html {
      font-size: 10px;
    }
  }
  @media (min-width: 481px) {
    /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */
    html {
      font-size: 10px;
    }
  }
  @media (min-width: 641px) {
    /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
    html {
      font-size: 10.5px;
    }
  }
  @media (min-width: 961px) {
    /* tablet, landscape iPad, lo-res laptops ands desktops */
    html {
      font-size: 10.5px;
    }
  }
  @media (min-width: 1025px) {
    /* big landscape tablets, laptops, and desktops */
    html {
      font-size: 10.5px;
    }
  }
  @media (min-width: 1281px) {
    /* hi-res laptops and desktops */
    html {
      font-size: 11px;
    }
  }
`

export default GlobalStyle
