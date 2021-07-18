import React, { useEffect, useState } from 'react'
import { wrap } from "popmotion";
import styled from '@emotion/styled';


const ImageComp = styled.img`
  position: absolute;
  width: 100%;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  object-fit: cover;
  top: 0;
  left: 0;
  filter: grayscale(100%);
  opacity: .5;
  /* background: black; */
  background-size: 100vw 100% cover;
  background-position: center;
  animation: changeOpacity 4s infinite;
  transition: opacity .2s ease-in-out;
  @keyframes changeOpacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`



const HomeSlideShow = () => {
  const [page, setPage] = useState(0);

  const [images, setImages] = useState([]);
  const imageIndex = wrap(0, images.length, page);

  useEffect(() => {
    fetch("https://res.cloudinary.com/julianb/image/list/home-slider.json")
      .then(res => res.json())
      .then(data => setImages(data.resources))
      .catch(err => console.log(err))
    return () => {
    }
  }, []);

  setTimeout(() => {
    const newPage = page + 1;
    setPage(newPage)
  }, 4000);
  // console.log(images)
  return (
    <>
      {images.length > 0 && (
        <ImageComp
          key={page}
          src={images.length > 0 && `https://res.cloudinary.com/julianb/image/upload/v${images[imageIndex].version}/${images[imageIndex].public_id}.jpg`}
          alt=""
        />
      )
      }
    </>
  )
}

export default HomeSlideShow
