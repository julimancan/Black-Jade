import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useState } from "react";


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
    width: 350px;
    position: relative;
    aspect-ratio: 19/6;
    max-height: 700px;
    min-height: 500px;
    img {
      /* width: 100px; */
      /* position: relative; */
    }
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


const ImageContainer = styled.div`
  width: ${({ width }) => width };
  width: ${({ height }) => height };
  img {
  }
`;

const SelectedOption = styled.p`
  border-bottom: ${({ selected }) => selected ? "1px solid" : "none"}
`;

const photoGalleryOptions = [
  { name: "wedding", albumId: "wedding" },
  { name: "portraits", albumId: "portraits" },
]



const Photo = () => {
  const [mode, setMode] = useState("all -");
  const [loading, setIsLoading] = useState(true);
  const [weddingImages, setWeddingImages] = useState([]);
  const [portraitImages, setPortraitImages] = useState([]);



  const pageOptions = ["all -", "weddings -", "portraits"];


  useEffect(() => {
    fetch(`https://res.cloudinary.com/julianb/image/list/${photoGalleryOptions[0].albumId}.json`)
      .then(res => res.json())
      .then(data => {
        setWeddingImages(data.resources);
      })
      .catch(err => console.log(err))
    fetch(`https://res.cloudinary.com/julianb/image/list/${photoGalleryOptions[1].albumId}.json`)
      .then(res => res.json())
      .then(data => {
        setPortraitImages(data.resources);
        setIsLoading(false);
      })
      .catch(err => console.log(err))

    return () => {
    }
  }, []);

  const modeClickHandler = (mode) => setMode(mode);

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
        {loading ? (
          <h1>Loading!!!</h1>
        ) : (
          <>
            {mode !== pageOptions[2] && weddingImages.map((image, index) => {
              const imageOrientation = image.width/image.height > 1 ? "horizontal" : "vertical";
              const imageDimensions = {
                width:  imageOrientation === "horizontal" ? "700px" : "350px",
                height: "500px"
              }
              return (
              <ImageContainer key={index}  width={imageDimensions.width} height={imageDimensions.height}>
                <Image  src={`https://res.cloudinary.com/julianb/image/upload/v${image.version}/${image.public_id}.jpg`} alt={""} width={imageDimensions.width} height={imageDimensions.height} />
                {console.log({imageOrientation})}
              </ImageContainer>
            )})}
            {mode !== pageOptions[1] && portraitImages.map((image, index) => (
              <ImageContainer key={index} >
                <Image  src={`https://res.cloudinary.com/julianb/image/upload/v${image.version}/${image.public_id}.jpg`} alt={""} width={image.width} height={image.height} />
                {console.log(image.width)}
              </ImageContainer>
            ))}
          </>
        )}
      </section>

    </PhotoWrapper>
  )
};

export default Photo;
