import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import { useGlobalState } from "../state";
import Footer from "./Footer";
import Header from "./HeaderComponents/Header";

const LayoutWrapper = styled.div`
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
  }
  h2 {
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

    article,
    section {
      width: 100%;
      @media (min-width: 800px) {
      }
    }
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
