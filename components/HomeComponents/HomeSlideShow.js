import React, { useEffect, useState } from 'react'
import { wrap } from "popmotion";
import styled from '@emotion/styled';
import Image from "next/image";

const ImageComp = styled(Image)`
  position: absolute;
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
  animation: changeOpacity 4s infinite;
  transition: opacity .2s ease-in-out;
  /* @keyframes changeOpacity {
    from {
       opacity: .5; 
    }
    to {
      opacity: 1;
    }
  } */
`



const HomeSlideShow = ({photos}) => {
  const [page, setPage] = useState(0);
  const imageIndex = wrap(0, photos.length, page);

  setTimeout(() => {
    const newPage = page + 1;
    setPage(newPage)
  }, 4000);
  // console.log(images)
  return (
    <>
      {photos.length > 0 && (
        <ImageComp
          key={page}
          src={photos.length > 0 && photos[imageIndex].url}
          alt="Black Jade Image Background"
          // width={photos[imageIndex].width}
          // height={photos[imageIndex].height}
          layout='fill'
        />
      )
      }
    </>
  )
}

export default HomeSlideShow
