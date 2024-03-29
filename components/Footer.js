import styled from "@emotion/styled";
import Link from "next/link";

const StyledFooter = styled.footer`
  position: ${({ currentPage }) =>
    currentPage === "/" ? "absolute" : "relative"};
  bottom: 1rem;
  color: ${({ currentPage, siteSettings }) =>
    currentPage === "/"
      ? siteSettings.colors?.menuBarColor
      : siteSettings.colors?.menuBgColor};
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  margin: 3rem auto;
  text-align: center;
  padding-bottom: 1rem;
`;

function Footer({ siteSettings, currentPage }) {
  return (
    <StyledFooter currentPage={currentPage} siteSettings={siteSettings}>
      <Link href={`mailto:${siteSettings.email}`}>contact us</Link>
    </StyledFooter>
  );
}

export default Footer;
