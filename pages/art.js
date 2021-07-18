import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { stylingVariables } from "../components/stylingVariables";

const images = [
  {
    name: "Come Home",
    path: "/album-artwork-BJC/ComeHome-AlbumArt-EuniceKeitan.jpg",
  },
  {
    name: "Dreams",
    path: "/album-artwork-BJC/Dreams-Albumart-3000x3000-web.jpg",
  },
  {
    name: "Songs Of Blue",
    path: "/album-artwork-BJC/IMG_1107-SongsOfBlue-smoke-text-IG.jpg",
  },
  {
    name: "Aysen Okabe",
    path: "/album-artwork-BJC/Okabe-EP2-3000x3000.jpg",
  },
  {
    name: "Should I",
    path: "/album-artwork-BJC/Okabe-ShouldI-starrynight-WastedHrs.jpg",
  },
  {
    name: "Wait",
    path: "/album-artwork-BJC/Okabe-Wait-Albumart1400x1400-Final.jpg",
  },
  {
    name: "Salt",
    path: "/album-artwork-BJC/RRL-Salt-Artwork-seadrowning.jpg",
  },
  {
    name: "Smile",
    path: "/album-artwork-BJC/Smile-Artwork-3000x3000-Web.jpg",
  },
];

const videos = [
  {
    title: "Hope Is A Bird animation",
    path: "_Xrhq6vVNME",
  },

  {
    title: "Okabe Should animation",
    path: "suiwRRr1Q9Y",
  },
  {
    title: "Salt Running Red Lights Promo Animation",
    path: "GFlq6CCebxI",
  },
  {
    title: "Come Home Cinemagraph",
    path: "a58yyOY-jco",

  },
  {
    title: "IMU animation",
    path: "Dpk6qjsOO3I",
  },
];

const ArtWrapper = styled.main`
padding: 1rem;
section {
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1rem;
  /* background-color: red; */
  justify-content: center;
  align-items: center;
  div, iframe {
    margin: 0 auto;
  }
}
`;

const ArtNav = styled.div`
  display: flex;
  align-items: center;
  /* background: red;   */
  /* justify-content: space-between; */
  div {
    display: flex;
    margin: 0 auto;
    transform: translateX(-50%);
    p {
      cursor: pointer;
      margin-right: .5ch;
    }
  }
`;

const SelectedOption = styled.p`
  border-bottom: ${({ selected }) => selected ? "1px solid" : "none"}
`;
const Art = () => {
  const [mode, setMode] = useState("images -");

  const pageOptions = ["all -", "images -", "animations"];

  const modeClickHandler = (mode) => setMode(mode);
  return (
    <ArtWrapper>
      <ArtNav>
        <h1>Art/Design</h1>
        <div>
          {pageOptions.map((option, index) => (
            <SelectedOption selected={mode === option} key={index} onClick={() => modeClickHandler(option)}>{option}</SelectedOption>
          ))}
        </div>
      </ArtNav>
      <section>
        {mode !== pageOptions[2] && images.map((art, index) => (
          <div key={index}>
            <Image src={art.path} alt={art.name} width="350px" height="350px" />
            {/* <h2>{art.name}</h2> */}
            {/* <h2>{art.artist}</h2> */}
          </div>
        ))}
        {mode !== pageOptions[1] && videos.map((video, index) => (
          <iframe src={`https://www.youtube.com/embed/${video.path}?controls=0&autoplay=1&loop=1&rel=0&showinfo=0&mute=1&autohide=1`} key={index} width="350px" height="350px" loop muted frameBorder='0'
            // controls="0"
            title='video'

          />
        ))}
      </section>
    </ArtWrapper>
  )
};

export default Art;
