import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import Header from "./HeaderComponents/Header";
import { siteFonts, stylingVariables } from "./stylingVariables";



const LayoutWrapper = styled.div`



@font-face {
  font-family: ${siteFonts.h2Font};
  src: url("/fonts/"${siteFonts.h2Font}".ttf");
  font-display: swap;
}
@font-face {
  font-family: ${siteFonts.h1Font};
  src: url("/fonts/"${siteFonts.h1Font}"-Regular.ttf");
  font-display: swap;
}
@font-face {
  font-family: ${siteFonts.pFont};
  src: url("/fonts/"${siteFonts.pFont}"-Regular.ttf");
  font-display: swap;
}

h1 {
  font-family: ${siteFonts.h1Font};
  font-size: clamp(1.5rem, -0.875rem + 8.333vw, 3.5rem);
  font-weight: 400;
  color: ${({ currentPage }) => currentPage === "/" ? stylingVariables.menuBarColor : stylingVariables.pageTextcolor};
  white-space: nowrap;
}
h2 {
  font-family: ${siteFonts.h2Font};
  font-size: clamp(.7rem, -0.875rem + 5.333vw, 1.5rem);
  color: ${({ currentPage }) => currentPage === "/" ? stylingVariables.menuBarColor : stylingVariables.pageTextcolor};
}
p {
  font-family: ${siteFonts.pFont};
  font-size: clamp(.7rem, -0.875rem + 5.333vw, 1rem);
  color: ${({ currentPage }) => currentPage === "/" ? stylingVariables.menuBarColor : stylingVariables.pageTextcolor}; 
}
main {
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: ${({ currentPage }) => currentPage === "/" ? stylingVariables.pageTextcolor : stylingVariables.menuBarColor};
  justify-content: center;


  article, section {
    width: 100%;
    @media (min-width: 800px) {
    }
  }
}
`;

const Layout = ({ children }) => {
  const route = useRouter();
  const currentPage = route.pathname;
  return (
    <LayoutWrapper currentPage={currentPage}>
      <Header currentPage={currentPage}/>
      { children}
    </LayoutWrapper>
  )
}

export default Layout
