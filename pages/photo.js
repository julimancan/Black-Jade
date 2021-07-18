import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";


const PhotoWrapper = styled.main`
padding: 1rem;
section {
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1rem;
  /* background-color: red; */
  justify-content: center;
  align-items: center;
  div {
    margin: 0 auto;
  }
}
`;

const PhotoNav = styled.div`
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

const images = [];

const Photo = () => {
  const [mode, setMode] = useState("images -");


  const pageOptions = ["all -", "images -", "animations"];

  return (
    <PhotoWrapper>
      <PhotoNav>
        <h1>Photography</h1>
        <div>
          {pageOptions.map((option, index) => (
            <SelectedOption selected={mode === option} key={index} onClick={() => modeClickHandler(option)}>{option}</SelectedOption>
          ))}
        </div>
      </PhotoNav>
      <section>
        {mode !== pageOptions[2] && images.map((art, index) => (
          <div key={index}>
            <Image src={art.path} alt={art.name} width="350px" height="350px" />
            {/* <h2>{art.name}</h2> */}
            {/* <h2>{art.artist}</h2> */}
          </div>
        ))}
      </section>

    </PhotoWrapper>
  )
};

export default Photo;
