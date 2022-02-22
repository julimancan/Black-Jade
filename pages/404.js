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

export default function Custom404({siteConfig, navMenuItems}) {
  const setSiteSettings = useGlobalState("siteSettings")[1];
  const setNavMenuItems = useGlobalState("navMenuItems")[1];
  useEffect(() => {
    setSiteSettings(siteConfig);
    setNavMenuItems(navMenuItems.items);
  })
  return <h1>404 - Page Not Found</h1>
}