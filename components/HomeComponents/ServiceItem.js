import styled from "@emotion/styled";
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
  letter-spacing: 2px;
  &:hover {
    transform: scale(1.06);
  }
  @media (min-width: 768px) {
    /* font-size: 3rem; */
  }
  `
const ServiceLink = styled(Link)`
  text-decoration: none;
  a {
    font-weight: 800;
    font-size: 6.5rem;
    line-height: 2.5rem;
    text-transform: uppercase;
    color: white;
  }
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
