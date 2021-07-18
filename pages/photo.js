import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import { useWindowSize } from 'react-use';



const PhotoWrapper = styled.main`
padding: 1rem;
position: relative;
* {
  /* border: 1px solid; */
}
section {
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: .5rem;
  /* background-color: red; */
  justify-content: center;
  align-content: center;
  .spinner {
    position: relative;
    margin: 0 auto;
    z-index: 0;
    width: fit-content;
    height: fit-content;
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
    margin-left: 1ch;
    p {
      cursor: pointer;
      margin-right: .5ch;
    }
  }
`;


const ImageContainer = styled.div`
  width: ${({ width }) => width < 700 ? "100%" : width};
  display: flex;
  justify-content: center;
  margin: 0 auto;
  transition: all .2s ease-in-out;
  /* background: red; */
  img {
    /* margin: 0 auto; */
    object-fit: cover;
  }
  @media (min-width: 800px) {
    &:hover {
      transform: scale(1.05);
    }
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({

  });



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
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const { width } = useWindowSize();

  const modeClickHandler = (mode) => setMode(mode);
  const modalClickHandler = (modalInfo, imageDimensions) => {
    if (width < 700) {
      return;
    }
    if (isModalOpen) {
      setIsModalOpen(!isModalOpen);
      setModalInfo({})
    }
    setIsModalOpen(!isModalOpen);
    setModalInfo({
      imageId: modalInfo,
      imageDimensions: imageDimensions
    });
  }

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
          <div className="spinner">
            <Spinner color="black" />
          </div>
        ) : (
          <>
            {mode !== pageOptions[2] && weddingImages.map((image, index) => {
              const imageOrientation = image.width / image.height > 1 ? "horizontal" : "vertical";
              const imageDimensions = {
                width: width < 700 ? `${width-50}px` : "600px",
                height: imageOrientation === "horizontal" ? `${width/1.77}px` : `${width/.86}px`
              };
              return (
                <ImageContainer key={index} onClick={() => modalClickHandler(image.public_id, imageDimensions)} width={width} height={imageDimensions.height}>
                  <Image src={`https://res.cloudinary.com/julianb/image/upload/w_auto,c_scale/${image.public_id}.jpg`} alt={""} width={imageDimensions.width} height={imageDimensions.height} />
                </ImageContainer>
              )
            })}
            {mode !== pageOptions[1] && portraitImages.map((image, index) => {
              const imageOrientation = image.width / image.height > 1 ? "horizontal" : "vertical";
              const imageDimensions = {
                width: width < 700 ? `${width-50}px` : "600px",
                height: imageOrientation === "horizontal" ? `${width/1.77}px` : `${width/.86}px`
              };
              return (
                <ImageContainer key={index} onClick={() => modalClickHandler(image.public_id, imageDimensions)} width={width} height={imageDimensions.height}>
                  <Image src={`https://res.cloudinary.com/julianb/image/upload/w_auto,c_scale/${image.public_id}.jpg`} alt={""} width={imageDimensions.width} height={imageDimensions.height} />
                </ImageContainer>
              )
            })}

          </>
        )}
      </section>
      {isModalOpen && (
        <Modal modalClickHandler={modalClickHandler} modalInfo={modalInfo} />
      )}
    </PhotoWrapper>
  )
};

export default Photo;
