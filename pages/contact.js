import styled from "@emotion/styled";
import Link from "next/link"
import { useEffect } from "react";
import { getNavigationMenu, getSiteSettings } from "../lib/api";
import { useGlobalState } from "../state";



const ContactWrapper = styled.main`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin-bottom: 3rem;
  }
`;

export async function getStaticProps() {
  const siteConfig = await getSiteSettings();
  const navMenuItems = await getNavigationMenu();
  return {
    props: {
      siteConfig,
      navMenuItems,
    },
  };
}


const Contact = ({siteConfig, navMenuItems}) => {
  const setSiteSettings = useGlobalState("siteSettings")[1];
  const setNavMenuItems = useGlobalState("navMenuItems")[1];
  useEffect(() => {
    setSiteSettings(siteConfig);
    setNavMenuItems(navMenuItems.items);
  })
  return (
    <ContactWrapper>
      <h1>Contact Us</h1>
      <p>
        We would love to discuss your projects and how we can help you make it better.
      </p>
      <br/>
      <p>
        email us at <Link href="mailto:blackjadecollective@gmail.com">blackjadecollective@gmail.com</Link>
      </p>
    </ContactWrapper>
  )
}

export default Contact
