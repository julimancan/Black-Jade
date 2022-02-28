import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useInterval } from 'usehooks-ts'
import { securePhoto } from "../../utils/helpers";

const ImageComp = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100vh;
`;

const StyledImage = styled.img`
  width: 100vw;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  object-fit: cover;
  top: 0;
  left: 0;
  filter: grayscale(80%);
  position: absolute;
  background: black;
  background-size: 100vw 100% cover;
  background-position: center;
  opacity: ${({ selected }) => (selected ? 1 : 0)};
  transition: opacity 5s;
  animation: changeScale 6s infinite alternate-reverse;
  @keyframes changeScale {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }
`;

const HomeSlideShow = ({ photos }) => {
  const [selected, setSelected] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)
  const nextImage = () => {
    setSelected((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    setIsPlaying(true)
  }, []);

  useInterval(
    () => {
      nextImage()
    },
    isPlaying ? 6000 : null
  )

  return (
    <ImageComp arrLength={photos.length}>
      {photos.map((photo, index) => {
        return (
        <StyledImage
          key={index}
          src={securePhoto(photo.url)}
          alt={`Black Jade Image Background ${index + 1}`}
          selected={selected === index}
          onClick={nextImage}
        />
      )})}
    </ImageComp>
  );
};

export default HomeSlideShow;
