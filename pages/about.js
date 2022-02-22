import { useEffect } from "react";
import { getNavigationMenu, getSiteSettings } from "../lib/api";
import { useGlobalState } from "../state";


export async function getServerSideProps() {
  const siteConfig = await getSiteSettings();
  const navMenuItems = await getNavigationMenu();
  return {
    props: {
      siteConfig,
      navMenuItems,
    },
  };
}

const About = ({siteConfig, navMenuItems}) => {
  const setSiteSettings = useGlobalState("siteSettings")[1];
  const setNavMenuItems = useGlobalState("navMenuItems")[1];
  useEffect(() => {
    setSiteSettings(siteConfig);
    setNavMenuItems(navMenuItems.items);
  })
  return (
    <div>
      This is going to be our about page    
    </div>
  )
};

export default About;
