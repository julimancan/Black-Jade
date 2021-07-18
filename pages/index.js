import styled from "@emotion/styled";
import HomeSlideShow from "../components/HomeComponents/HomeSlideShow";
import ServiceItem from "../components/HomeComponents/ServiceItem";


const serviceItems = [
  { name: "Design/Art", url: "/art" },
  { name: "Photography", url: "/photo" },
];

const HomeWrapper = styled.main`
  display: flex;
`;
const ServiceList = styled.ul`
  position: relative;
  z-index: 10;
  list-style: none;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  gap: 2rem;
  @media (min-width: 768px) {
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
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
`
export default function Home() {
  return (
    <HomeWrapper >
       <ServiceList>
        {serviceItems.map((service, index) => (
          <ServiceItem serviceId={index} key={index} url={service.url} name={service.name} />
        ))}
      </ServiceList> 
      <HomeSlideShow />
    </HomeWrapper>
  )
}
