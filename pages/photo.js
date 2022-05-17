import { useEffect, useState } from "react";
import {
  getNavigationMenu,
  getPhotoContent,
  getSiteSettings,
} from "../lib/api";
import { useGlobalState } from "../state";
import styled from "@emotion/styled";
import { getAspectRatio } from "../utils/helpers";
import { PageNav, SelectedOption } from "../components/pageElements";
import PageSeo from "../components/pageSeo";

const StyledPhotoPage = styled.main`
  .image-collection {
    grid-template-columns: 1fr 1fr;
    /* padding: 0 3.5ch; */
    padding: 0 30px;
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

export async function getStaticProps() {
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

export default function Photo({ siteConfig, navMenuItems, photoContent }) {
  const pageOptions = ["all", "weddings", "portraits"];
  const [mode, setMode] = useState(pageOptions[0]);

  const setSiteSettings = useGlobalState("siteSettings")[1];
  const setNavMenuItems = useGlobalState("navMenuItems")[1];
  useEffect(() => {
    setSiteSettings(siteConfig);
    setNavMenuItems(navMenuItems.items);
  }, []);
  const modeClickHandler = (mode) => setMode(mode);

  return (
    <StyledPhotoPage>
      <PageSeo
        title={photoContent.title}
        description={photoContent.description}
      />
      <PageNav>
        {/* <Link href="/">
          <img className="logo" src="android-chrome-192x192.png" />
        </Link> */}
        <div className="page-nav">
          <h1>{photoContent.title}</h1>
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
      <ul className="image-collection">
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
