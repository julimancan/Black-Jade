import React, { useEffect, useState } from "react";
import { wrap } from "popmotion";
import styled from "@emotion/styled";
// import Image from "next/image";

const ImageComp = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100vh;
  img {
    width: 100%;
    height: 100vh;
    margin-left: auto;
    margin-right: auto;
    object-fit: cover;
    top: 0;
    left: 0;
    filter: grayscale(100%);
    /* opacity: 1; */
    background: black;
    background-size: 100vw 100% cover;
    background-position: center;
    animation: changeOpacity 5s infinite;
    /* transition: opacity 0.2s ease-in-out; */
    @keyframes changeOpacity {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(1.1);
      }
    }
  }
`;

const HomeSlideShow = ({ photos }) => {
  const [page, setPage] = useState(0);
  const imageIndex = wrap(0, photos.length, page);

  setTimeout(() => {
    const newPage = page + 1;
    setPage(newPage);
  }, 4000);
  console.log({ photos });
  return (
    <ImageComp>
      {photos && (
        <img
          key={page}
          src={photos && photos[imageIndex].url}
          alt="Black Jade Image Background"
          // width={photos[imageIndex].width}
          // height={photos[imageIndex].height}
          // layout='fill'
        />
      )}
    </ImageComp>
  );
};

export default HomeSlideShow;
