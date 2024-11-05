import { createGlobalStyle, css } from "styled-components";

interface BodyProps {
  readonly isThemeChanging: boolean;
}

export const GlobalStyle = createGlobalStyle<BodyProps>`
    /*
    Josh's Custom CSS Reset
    https://www.joshwcomeau.com/css/custom-css-reset/
    */

    /* 1. Use a more-intuitive box-sizing model. */
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* 2. Remove default margin */
    * {
        margin: 0;
    }

    /* Typographic tweaks!
        3. Add accessible line-height
        4. Improve text rendering
    */
    body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }

    /* 5. Improve media defaults */
    img,
    picture,
    video,
    canvas,
    svg {
        display: block;
        max-width: 100%;
    }

    /* 6. Remove built-in form typography styles */
    input,
    button,
    textarea,
    select {
        font: inherit;
    }

    /* 7. Avoid text overflows */
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        overflow-wrap: break-word;
    }

    /* 8. Create a root stacking context */
    #root,
    #__next {
        isolation: isolate;
    }

    body {
        font-family: "Merriweather", "Gowun Batang",serif;
        font-weight: 600;
        font-style: normal;
        
        background-color: ${({ theme }) => theme.background.primary};
        color: ${({ theme }) => theme.text.primary};
         ${({ isThemeChanging }) =>
           isThemeChanging &&
           css`
             transition:
               background-color 0.3s ease,
               color 0.3s ease;
           `}
    }
    h2 {
        font-weight: 600; // 원하시는 두께로 조정
        }
    h3 {
        font-weight: 600; // 원하시는 두께로 조정
        }

`;
