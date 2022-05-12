import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import { useGlobalState } from "../state";
import Footer from "./Footer";
import Header from "./HeaderComponents/Header";

const LayoutWrapper = styled.div`
  height: 100vh;
  overflow: ${({ currentPage }) => currentPage === "/" && "hidden"};
  @font-face {
    font-family: ${({ siteSettings }) => siteSettings.fonts?.h1?.title};
    src: ${({ siteSettings }) =>
      `url(${siteSettings.fonts?.h1?.fontUrl}) format('truetype')`};
    font-display: swap;
  }
  @font-face {
    font-family: ${({ siteSettings }) => siteSettings.fonts?.h2?.title};
    src: ${({ siteSettings }) =>
      `url(${siteSettings.fonts?.h2?.fontUrl}) format('truetype')`};
    font-display: swap;
  }
  @font-face {
    font-family: ${({ siteSettings }) => siteSettings.fonts?.p?.title};
    src: ${({ siteSettings }) =>
      `url(${siteSettings.fonts?.p?.fontUrl}) format('truetype')`};
    font-display: swap;
  }

  h1 {
    font-family: ${({ siteSettings }) => siteSettings.fonts?.h1?.title};
    font-weight: 400;
    color: ${({ currentPage, siteSettings }) =>
      currentPage === "/"
        ? siteSettings.colors?.menuBarColor
        : siteSettings.colors?.menuBgColor};
    white-space: nowrap;
    letter-spacing: 2px;
  }
  h2 {
    letter-spacing: 2px;
    font-family: ${({ siteSettings }) => siteSettings.fonts?.h2?.title};
    color: ${({ siteSettings }) => siteSettings.colors?.menuBarColor};
  }
  h3 {
    font-family: ${({ siteSettings }) => siteSettings.fonts?.h1?.title};
    font-weight: 400;
    color: ${({ currentPage, siteSettings }) =>
      currentPage === "/"
        ? siteSettings.colors?.menuBarColor
        : siteSettings.colors?.menuBgColor};
    white-space: nowrap;
  }
  p {
    font-family: ${({ siteSettings }) => siteSettings.fonts?.p?.title};
    font-size: clamp(0.7rem, -0.875rem + 5.333vw, 1rem);
    color: ${({ currentPage, siteSettings }) =>
      currentPage === "/"
        ? siteSettings.colors?.menuBarColor
        : siteSettings.colors?.menuBgColor};
  }
  main {
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background: ${({ currentPage, siteSettings }) =>
      currentPage === "/"
        ? siteSettings.colors?.homepageTextcolor
        : siteSettings.colors?.menuBarColor};
    justify-content: center;
    margin-top: 1ch;
    overflow-x: hidden;
    max-width: 100vw;
    article,
    section {
      width: 100%;
      @media (min-width: 800px) {
      }
    }
  }
  .logo {
    margin: 0.5ch 3ch;
  }
  .image-collection {
    margin: 3ch 0;
    display: grid;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    list-style: none;
  }
`;

const Layout = ({ children }) => {
  const route = useRouter();
  const currentPage = route.pathname;
  const [siteSettings] = useGlobalState("siteSettings");
  return (
    <LayoutWrapper currentPage={currentPage} siteSettings={siteSettings}>
      <Header currentPage={currentPage} />
      {children}
      {siteSettings.email && (
        <Footer siteSettings={siteSettings} currentPage={currentPage} />
      )}
    </LayoutWrapper>
  );
};

export default Layout;
