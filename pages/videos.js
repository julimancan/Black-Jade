import styled from "@emotion/styled";
import Link from "next/link";
import { useEffect } from "react";
import PageSeo from "../components/pageSeo";
import VideoGrid from "../components/VideoGrid";
import {
  getNavigationMenu,
  getSiteSettings,
  getVideosPageContent,
} from "../lib/api";
import { useGlobalState } from "../state";

const StyledVideoPage = styled.main`
  background-color: red;
  /* margin-top: 8rem; */
  padding: 2rem 30px;
  text-align: center;
  h1 {
    /* transform: translateY(-1ch); */
    position: absolute;
    /* margin-top: -1rem; */
    left: 50%;
    transform: translateX(-50%) translateY(-3rem);
  }
  article {
    margin-top: 3rem;
  }

`;

export const getStaticProps = async () => {
  const pageContent = await getVideosPageContent();
  const siteConfig = await getSiteSettings();
  const navMenuItems = await getNavigationMenu();
  return {
    props: {
      pageContent,
      siteConfig,
      navMenuItems,
    },
  };
};

const Videos = ({ pageContent, siteConfig, navMenuItems }) => {
  const setSiteSettings = useGlobalState("siteSettings")[1];
  const setNavMenuItems = useGlobalState("navMenuItems")[1];
  useEffect(() => {
    setSiteSettings(siteConfig);
    setNavMenuItems(navMenuItems.items);
  });
  return (
    <StyledVideoPage>
      <PageSeo
        title={pageContent.seo.title}
        description={pageContent.seo.description}
      />
      <h1>Videos</h1>
      
      <article>
        <VideoGrid videos={pageContent.videos} />
      </article>
    </StyledVideoPage>
  );
};

export default Videos;
