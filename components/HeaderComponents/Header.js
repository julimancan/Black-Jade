import Head from "next/head";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import { useGlobalState } from "../../state";

const Header = ({ currentPage }) => {
  const [navOpen, setNavOpen] = useState(false);
  const siteSettings = useGlobalState("siteSettings")[0];

  const closeCheckoutAndNav = () => {
    setNavOpen(false);
  };
  return (
    <>
      <Head>
        <title>{siteSettings.title}</title>
        <meta
          name="apple-mobile-web-app-status-bar"
          content={siteSettings.colors?.pageBgColor}
        />
        <meta name="description" content={siteSettings.description} />
        {/* TODO!!!!!! */}
        <meta property="og:url" content={"black-jade.com"} /> 
        <meta property="og:title" content={siteSettings.title} key="ogtitle" />
        <meta
          property="og:description"
          content={siteSettings.description}
          key="ogdesc"
        />
      </Head>
      <BurgerMenu
        currentPage={currentPage}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        closeCheckoutAndNav={closeCheckoutAndNav}
      />
    </>
  );
};

export default Header;
