import Head from "next/head";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import { useGlobalState } from "../../state";
import SeoHeader from "./SeoHeader";
import Link from "next/link";
import { urlFor } from "../../lib/api";
import SanityPicture from "../SanityPicture";

const Header = ({ currentPage }) => {
  const [navOpen, setNavOpen] = useState(false);
  const siteSettings = useGlobalState("siteSettings")[0];

  const closeCheckoutAndNav = () => {
    setNavOpen(false);
  };
  return (
    <>
      {/* <Head>
        <title>{siteSettings.title}</title>
        <meta
          name="apple-mobile-web-app-status-bar"
          content={siteSettings.colors?.pageBgColor}
        />
        <meta name="description" content={siteSettings.description} />
        <meta property="og:url" content={"blackjadecollective.com"} /> 
        <meta property="og:title" content={siteSettings.title} key="ogtitle" />
        <meta
          property="og:description"
          content={siteSettings.description}
          key="ogdesc"
        />
        <script async defer data-website-id="7415c05b-8e6e-4d98-a1d0-1937fe96ff4b" src="https://analytics-julimancan.vercel.app/umami.js"></script>
      </Head> */}

      <div className="logo-container">
        {/* <picture>
          
          <Link href="/">
            <img
              className="logo"
              src={siteSettings.logo && urlFor(siteSettings.logo).width(200)}
            />
          </Link>
        </picture> */}
        {siteSettings.logo && (
          <Link href="/" passHref>
            <SanityPicture
              image={siteSettings.logo}
              alt="Black Jade Collective"
              classNames="logo"
            />
          </Link>
        )}
      </div>
      <SeoHeader
        title={siteSettings.title}
        description={siteSettings.description}
        pageBgColor={siteSettings.colors?.pageBgColor}
        url={"blackjadecollective.com"}
      />
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
