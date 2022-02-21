import Head from "next/head";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import { siteFonts } from "../stylingVariables";
import { useGlobalState } from "../../state";

const Header = ({ currentPage }) => {
  const [navOpen, setNavOpen] = useState(false);
  const siteSettings = useGlobalState("siteSettings")[0];

  const closeCheckoutAndNav = () => {
    setNavOpen(false);
  };

  return (
    <div>
      <Head>
        <html lang="en" />
        <link rel="shortcut icon" href={siteSettings.favicon} />
        <title>{siteSettings.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta name="description" content={siteSettings.description} />
        <meta property="og:url" content={"site url"} />
        <meta
          property="og:image"
          content={siteSettings.favicon}
        />
        <meta property="og:title" content={siteSettings.title} key="ogtitle" />
        <meta
          property="og:site_name"
          content={siteSettings.title}
          key="ogsitename"
        />
        <meta property="og:description" content={siteSettings.description} key="ogdesc" />
      </Head>
      <BurgerMenu
        currentPage={currentPage}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        closeCheckoutAndNav={closeCheckoutAndNav}
      />
    </div>
  );
};

export default Header;
