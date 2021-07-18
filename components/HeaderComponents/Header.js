import Head from "next/head";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import { siteFonts } from "../stylingVariables";

const Header = ({ currentPage }) => {
  const [navOpen, setNavOpen] = useState(false);

  
  const closeCheckoutAndNav = () => {
    setNavOpen(false);
  };

  return (
    <div>
      <Head>
        <link rel="preload" href={`/fonts/${siteFonts.h2Font}.ttf`} as="font" crossOrigin="" />
        <link rel="preload" href={`/fonts/${siteFonts.h1Font}-Regular.ttf`} as="font" crossOrigin="" />
        <link rel="preload" href={`/fonts/${siteFonts.pFont}-Regular.ttf`} as="font" crossOrigin="" />
        <link rel="shortcut icon" href="/EuniceKeitan-LYWD.ico" />
        <title>Black Jade Collective</title>
      </Head>
      <BurgerMenu currentPage={currentPage} navOpen={navOpen} setNavOpen={setNavOpen} closeCheckoutAndNav={closeCheckoutAndNav} />

    </div>
  )
}

export default Header
