import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageNav, SelectedOption } from "../components/pageElements";
import PageSeo from "../components/pageSeo";
import { getArtContent, getNavigationMenu, getSiteSettings } from "../lib/api";
import { useGlobalState } from "../state";
import { getYoutubeId } from "../utils/helpers";

const ArtWrapper = styled.main`
  padding: 0 0px;
  overflow-x: unset ;
  .image-collection {
    /* background-color: violet; */
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    /* background-color: red; */
    padding: 0;
    gap: 1%;
    div,
    iframe {
      margin: 0 auto;
    }
  }
  .page-nav {
  }
`;

export async function getStaticProps() {
  const siteConfig = await getSiteSettings();
  const navMenuItems = await getNavigationMenu();
  const artItems = await getArtContent();
  return {
    props: {
      siteConfig,
      navMenuItems,
      artItems,
    },
  };
}
const Art = ({ siteConfig, navMenuItems, artItems }) => {

  const [mode, setMode] = useState("all");
  const setSiteSettings = useGlobalState("siteSettings")[1];
  const setNavMenuItems = useGlobalState("navMenuItems")[1];
  useEffect(() => {
    setSiteSettings(siteConfig);
    setNavMenuItems(navMenuItems.items);
  });
  const pageOptions = ["all", "art", "animations"];

  const modeClickHandler = (mode) => setMode(mode);
  return (
    <ArtWrapper>
       <PageSeo
        title={artItems.title}
        description={artItems.description}
      />
      <PageNav>
     
        <div className="page-nav">
          <h1>Art / Media</h1>
          <ul>
            {pageOptions.map((option, index) => (
              <SelectedOption
                selected={mode === option}
                key={index}
                onClick={() => modeClickHandler(option)}
              >
                <p>{option}</p>
              </SelectedOption>
            ))}
          </ul>
        </div>
      </PageNav>
      <section className="image-collection">
        {mode !== pageOptions[2] &&
          artItems.images.map((art, index) => (
            <div key={index}>
              <Image
                src={art.url}
                alt={art.alt}
                width="350px"
                height="350px"
                objectFit="cover"
              />
            </div>
          ))}
        {mode !== pageOptions[1] &&
          artItems.animations.map((video, index) => (
            <div className="animation" key={index}>
              {video.uploadOrLink ? (
                <video controls="true" width="350px" height="500px">
                  <source src={video.upload} type="video/mp4" />
                </video>
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeId(
                    video.url
                  )}?controls=0&autoplay=1&loop=1&rel=0&showinfo=0&mute=1&autohide=1`}
                  key={index}
                  width="350px"
                  height="350px"
                  loop
                  muted
                  frameBorder="0"
                  title="video"
                  alt={video.alt}
                />
              )}
            </div>
          ))}
      </section>
    </ArtWrapper>
  );
};

export default Art;
