import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useGlobalState } from "../state";
import Header from "./HeaderComponents/Header";

const LayoutWrapper = styled.div`

  @font-face {
    font-family: ${({ siteSettings }) => siteSettings.fonts?.h1?.title};
    src: ${({ siteSettings }) => `url(${siteSettings.fonts?.h1?.fontUrl}) format('truetype')`};
    font-display: swap;
  }
  @font-face {
    font-family: ${({ siteSettings }) => siteSettings.fonts?.h2?.title};
    src: ${({ siteSettings }) => `url(${siteSettings.fonts?.h2?.fontUrl}) format('truetype')`};
    font-display: swap;
  }
  @font-face {
    font-family: ${({ siteSettings }) => siteSettings.fonts?.p?.title};
    src: ${({ siteSettings }) => `url(${siteSettings.fonts?.p?.fontUrl}) format('truetype')`};
    font-display: swap;
  }

  h1,
  h3 {
    font-family: ${({ siteSettings }) => siteSettings.fonts?.h1?.title};
    font-size: clamp(1.5rem, -0.875rem + 8.333vw, 3.5rem);
    font-weight: 400;
    color: ${({ currentPage }) =>
      currentPage === "/"
        ? siteSettings.colors?.menuBarColor
        : siteSettings.colors?.homepageTextColor};
    white-space: nowrap;
  }
  h2 {
    font-family: ${({ siteSettings }) => siteSettings.fonts?.h2?.title};
    font-size: clamp(0.7rem, -0.875rem + 5.333vw, 1.5rem);
    color: ${({ currentPage }) =>
      currentPage === "/"
        ? siteSettings.colors?.menuBarColor
        : siteSettings.colors?.homepageTextColor};
  }
  p {
    font-family: ${({ siteSettings }) => siteSettings.fonts?.p?.title};
    font-size: clamp(0.7rem, -0.875rem + 5.333vw, 1rem);
    color: ${({ currentPage }) =>
      currentPage === "/"
        ? siteSettings.colors?.menuBarColor
        : siteSettings.colors?.homepageTextColor};
  }
  main {
    /* display: flex; */
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background: ${({ currentPage }) =>
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
  useEffect(() => {
    console.log("siteSettings.h1", siteSettings.h1);
  }, [siteSettings])
  return (
    <LayoutWrapper currentPage={currentPage} siteSettings={siteSettings}>
      <Header currentPage={currentPage} />
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
