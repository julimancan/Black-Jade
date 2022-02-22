import { useEffect, useState } from "react";
import {
  getNavigationMenu,
  getPhotoContent,
  getSiteSettings,
} from "../lib/api";
import { useGlobalState } from "../state";
import Head from "next/head";
import styled from "@emotion/styled";
import { getAspectRatio } from "../utils/helpers";

const StyledPhotoPage = styled.main`
  ul {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 0 1rem;
  }
`;

const StyledListItem = styled.li`
  width: 100%;
  grid-row: ${({ aspRatio }) => aspRatio < 1 && "span 2 / auto"};
  img {
    height: 100%;
    width: 100%;
    aspect-ratio: ${({ aspRatio }) => aspRatio};
  }
`;

const SelectedOption = styled.p`
  border-bottom: ${({ selected }) => (selected ? "1px solid" : "none")};
  cursor: pointer;
  margin-right: 0.5ch;
`;

const PhotoNav = styled.div`
  display: flex;
  align-items: center;
  h1 {
    margin-right: 1rem;
  }
  div {
    display: flex;
    margin: 0 auto;
    transform: translateX(-50%);
  }
`;

export async function getServerSideProps() {
  const siteConfig = await getSiteSettings();
  const navMenuItems = await getNavigationMenu();
  const photoContent = await getPhotoContent();
  return {
    props: {
      siteConfig,
      navMenuItems,
      photoContent,
    },
  };
}

export default function photo({ siteConfig, navMenuItems, photoContent }) {
  const pageOptions = ["all -", "weddings -", "portraits"];
  const [mode, setMode] = useState(pageOptions[0]);

  const setSiteSettings = useGlobalState("siteSettings")[1];
  const setNavMenuItems = useGlobalState("navMenuItems")[1];
  useEffect(() => {
    setSiteSettings(siteConfig);
    setNavMenuItems(navMenuItems.items);
  },  [])
  console.log("photoContent", photoContent);
  const modeClickHandler = (mode) => setMode(mode);

  return (
    <StyledPhotoPage>
      <Head>
        <title>{photoContent.title}</title>
        <meta name="description" content={photoContent.description} />
      </Head>
      <PhotoNav>
        <h1>{photoContent.title}</h1>
        {pageOptions.map((option, index) => (
          <SelectedOption
            selected={mode === option}
            key={index}
            onClick={() => modeClickHandler(option)}
          >
            {option}
          </SelectedOption>
        ))}
      </PhotoNav>
      <ul>
        {mode !== pageOptions[2] &&
          photoContent.weddings.map((photo, index) => (
            <StyledListItem key={index} aspRatio={getAspectRatio(photo.url)}>
              <img src={photo.url} alt="" />
            </StyledListItem>
          ))}
        {mode !== pageOptions[1] &&
          photoContent.portraits.map((photo, index) => (
            <StyledListItem key={index} aspRatio={getAspectRatio(photo.url)}>
              <img src={photo.url} alt="" />
            </StyledListItem>
          ))}
      </ul>
    </StyledPhotoPage>
  );
}
