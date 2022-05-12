import { useEffect } from "react";
import { getNavigationMenu, getSiteSettings } from "../lib/api";
import { useGlobalState } from "../state";


export default function Custom404() {
  const setSiteSettings = useGlobalState("siteSettings")[1];
  const setNavMenuItems = useGlobalState("navMenuItems")[1];
  useEffect(() => {
    async () => await getSiteSettings().then(data => setSiteSettings(data));
    async () => await getNavigationMenu().then(data => setNavMenuItems(data));
  });
  return <main><h1>404 - Page Not Found</h1></main>;
}
