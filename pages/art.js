import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageNav, SelectedOption } from "../components/pageElements";
import { getArtContent, getNavigationMenu, getSiteSettings } from "../lib/api";
import { useGlobalState } from "../state";
import { getYoutubeId } from "../utils/helpers";

const ArtWrapper = styled.main`
  padding: 0 0.5rem;

  .image-collection {
    margin: 1rem 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 1rem;
    /* background-color: red; */
    justify-content: center;
    align-items: center;
    div,
    iframe {
      margin: 0 auto;
    }
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
  const pageOptions = ["all", "images", "videos/animations"];

  console.log(artItems.animations);

  const modeClickHandler = (mode) => setMode(mode);
  return (
    <ArtWrapper>
      <PageNav>
        <Link href="/">
          <img src="android-chrome-192x192.png" />
        </Link>
        <div className="page-nav">
          <h1>Art/Design</h1>
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
              {!video.uploadOrLink ? (
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
              ) : (
                <video controls="true" width="350px" height="350px">
                  <source src={video.upload} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
      </section>
    </ArtWrapper>
  );
};

export default Art;
