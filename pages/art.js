import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getArtContent, getNavigationMenu, getSiteSettings } from "../lib/api";
import { useGlobalState } from "../state";
import { getYoutubeId } from "../utils/helpers";

const ArtWrapper = styled.main`
  padding: 1rem;
  section {
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

const ArtNav = styled.div`
  display: flex;
  align-items: center;
  /* background: red;   */
  /* justify-content: space-between; */
  div {
    display: flex;
    margin: 0 auto;
    transform: translateX(-50%);
    p {
      cursor: pointer;
      margin-right: 0.5ch;
    }
  }
`;

const SelectedOption = styled.p`
  border-bottom: ${({ selected }) => (selected ? "1px solid" : "none")};
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
  const [mode, setMode] = useState("images -");
  const setSiteSettings = useGlobalState("siteSettings")[1];
  const setNavMenuItems = useGlobalState("navMenuItems")[1];
  useEffect(() => {
    setSiteSettings(siteConfig);
    setNavMenuItems(navMenuItems.items);
  })
  const pageOptions = ["all -", "images -", "animations"];

  const modeClickHandler = (mode) => setMode(mode);
  return (
    <ArtWrapper>
      <ArtNav>
        <h1>Art/Design</h1>
        <div>
          {pageOptions.map((option, index) => (
            <SelectedOption
              selected={mode === option}
              key={index}
              onClick={() => modeClickHandler(option)}
            >
              {option}
            </SelectedOption>
          ))}
        </div>
      </ArtNav>
      <section>
        {mode !== pageOptions[2] &&
          artItems.images.map((art, index) => (
            <div key={index}>
              <Image src={art.url} alt={art.alt} width="350px" height="350px" />
            </div>
          ))}
        {mode !== pageOptions[1] &&
          artItems.animations.map((video, index) => (
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
          ))}
      </section>
    </ArtWrapper>
  );
};

export default Art;
