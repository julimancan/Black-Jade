import styled from "@emotion/styled";
import { useEffect } from "react";
import HomeSlideShow from "../components/HomeComponents/HomeSlideShow";
import ServiceItem from "../components/HomeComponents/ServiceItem";
import {
  getHomepageItems,
  getNavigationMenu,
  getSiteSettings,
  urlFor,
} from "../lib/api";
import { useGlobalState } from "../state";
import getConfig from "next/config";

const HomeWrapper = styled.main`
  display: flex;
  transform: translateY(-6.5ch);
  li {
    &::after {
      content: "";
      position: absolute;
      color: white;
      top: 50%;
      right: -1.7rem;
      height: 10px;
      display: none;
      width: 10px;
      transform: translateY(-35%);
      background: white;
      border-radius: 50%;
      @media (min-width: 700px) {
        display: block;
      }
    }
  }
  li:last-of-type {
    &::after {
      display: none;
    }
  } 
`;
const ServiceList = styled.ul`
  position: relative;
  z-index: 10;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 700px) {
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

export async function getStaticProps() {
  const siteConfig = await getSiteSettings();
  const navMenuItems = await getNavigationMenu();
  const content = await getHomepageItems();
  const zipUrl = siteConfig?.faviconZip;
  const AdmZip = require("adm-zip");
  const http = require("https");

  const publicPath = `${getConfig().serverRuntimeConfig.PROJECT_ROOT}\\public`;

  http.get(zipUrl, (res) => {
    const data = [];
    let dataLen = 0;

    res
      .on("data", (chunk) => {
        data.push(chunk);
        dataLen += chunk.length;
      })
      .on("end", () => {
        const buf = Buffer.alloc(dataLen);

        for (let i = 0, len = data.length, pos = 0; i < len; i++) {
          data[i].copy(buf, pos);
          pos += data[i].length;
        }
        const zip = new AdmZip(buf);
        zip.extractAllTo(publicPath, true);
      });
  });

  return {
    props: {
      siteConfig,
      content,
      navMenuItems,
    },
  };
}
export default function Home({ siteConfig, content, navMenuItems }) {
  const [siteSettings, setSiteSettings] = useGlobalState("siteSettings");
  const setNavMenuItems = useGlobalState("navMenuItems")[1];
  useEffect(() => {
    setSiteSettings(siteConfig);
    setNavMenuItems(navMenuItems.items);
  }, []);
  if (!siteSettings) return "loading...";

  return (
    <HomeWrapper>

      <ServiceList>
        {content.links.map((link, index) => (
          <ServiceItem
            serviceId={index}
            key={index}
            url={link.linkTo}
            name={link.linkName}
          />
        ))}
      </ServiceList>
      <HomeSlideShow photos={content.bgPhotos} />
    </HomeWrapper>
  );
}
