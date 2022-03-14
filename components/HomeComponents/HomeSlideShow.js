import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useInterval } from "usehooks-ts";
import { securePhoto } from "../../utils/helpers";
import Image from "next/image";

const ImageComp = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  `;

const StyledImage = styled.div`
  position: absolute;
  opacity: ${({ selected }) => (selected ? 1 : 0)};
  transition: opacity 5s;
  .image {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: black;
    img {
      margin-left: auto;
      margin-right: auto;
      object-fit: cover;
      top: 0;
      left: 0;
      filter: grayscale(80%);
      background-size: 100vw 100% cover;
      background-position: center;
      /* animation: changeScale 6s infinite alternate-reverse; */
    }
  }
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
  const [isPlaying, setIsPlaying] = useState(false);
  const nextImage = () => {
    setSelected((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  useInterval(
    () => {
      nextImage();
    },
    isPlaying ? 6000 : null
  );

  return (
    <ImageComp arrLength={photos.length}>
      {photos.map((photo, index) => {
        return (
          <StyledImage
            key={index}
            selected={selected === index}
            onClick={nextImage}
          >
            <div className="image">
              <Image
                src={securePhoto(photo.url)}
                alt={`Black Jade Image Background ${index + 1}`}
                layout="fill"
              />
            </div>
          </StyledImage>
        );
      })}
    </ImageComp>
  );
};

export default HomeSlideShow;
