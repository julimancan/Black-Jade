import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import siteSettings from "../../studio/schemas/siteSettings";
import HomeSlideShow from "../components/HomeComponents/HomeSlideShow";
import ServiceItem from "../components/HomeComponents/ServiceItem";
import { getHomepageItems, getNavigationMenu, getSiteSettings } from "../lib/api";
import { useGlobalState } from "../state";

const HomeWrapper = styled.main`
  display: flex;
`;
const ServiceList = styled.ul`
  position: relative;
  z-index: 10;
  list-style: none;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  gap: 2rem;
  @media (min-width: 768px) {
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
  }
  li {
    animation-name: animateIn;
    animation-duration: 350ms;
    
    animation-fill-mode: both;
    animation-timing-function: ease-in-out;
  }
  @keyframes animateIn {
  0% {
    opacity: 0;
    transform: scale(0.6) translateY(-8px);
  }
  
  100% {
    opacity: 1;
  }
}
`;

export async function getServerSideProps() {
  const siteConfig = await getSiteSettings();
  const navMenuItems = await getNavigationMenu();
  const content = await getHomepageItems();

  return {
    props: {
      siteConfig,
      content,
      navMenuItems
    }
  }
}
export default function Home({siteConfig, content, navMenuItems}) {
  const setSiteSettings = useGlobalState("siteSettings")[1];
  const setNavMenuItems = useGlobalState("navMenuItems")[1];
  useEffect(() => {
    setSiteSettings({...siteConfig});
    setNavMenuItems(navMenuItems.items);
  }, []);
  console.log('navmenuItems', navMenuItems)
  return (
    <HomeWrapper>
       <ServiceList>
        {content.links.map((link, index) => (
          <ServiceItem serviceId={index} key={index} url={link.linkTo} name={link.linkName} />
        ))}
      </ServiceList> 
      <HomeSlideShow photos={content.bgPhotos}/>
    </HomeWrapper>
  )
}
