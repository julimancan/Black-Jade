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
  console.log('siteSettings', siteSettings)

  return (
    <div>
      <Head>
        <html lang="en" />
        <link
          rel="preload"
          href={siteSettings.h1}
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href={`/fonts/${siteFonts.h1Font}-Regular.ttf`}
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href={`/fonts/${siteFonts.pFont}-Regular.ttf`}
          as="font"
          crossOrigin=""
        />
        <link rel="shortcut icon" href="/EuniceKeitan-LYWD.ico" />
        <title>Black Jade Collective</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta name="description" content={"site description here"} />
        <meta property="og:url" content={"site url"} />
        <meta
          property="og:image"
          content={"img source for seo"}
        />
        <meta property="og:title" content={"title for seo"} key="ogtitle" />
        <meta
          property="og:site_name"
          content={"site title for seo"}
          key="ogsitename"
        />
        <meta property="og:description" content={"site description"} key="ogdesc" />
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
