import styled from "@emotion/styled";
import { stylingVariables } from "../stylingVariables";
import Link from "next/link";



const ServiceName = styled.h3`
  /* font-weight: 800; */
  font-size: 3rem;
  line-height: 2.5rem;
  text-transform: uppercase;
  margin: 0 auto;
  color: white;
  transition: all .2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  @media (min-width: 768px) {
    /* font-size: 3rem; */
  }
  `
const ServiceLink = styled(Link)`
  text-decoration: none;
  /* color: ${stylingVariables.homePageTextColor}; */
  a {
    font-weight: 800;
    font-size: 6.5rem;
    line-height: 2.5rem;
    text-transform: uppercase;
    color: white;
  }
  background: red;
`;

const ServiceItem = ({ serviceId, url, name }) => {
  return (
    <li
      index={serviceId}
      key={serviceId}
    >
      <ServiceLink href={url}>
        <ServiceName>
        {name}
        </ServiceName>
      </ServiceLink>
    </li>
  );
};

export default ServiceItem;
