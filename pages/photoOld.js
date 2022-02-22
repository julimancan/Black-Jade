import styled from "@emotion/styled";
import { useState } from "react";
import { useGlobalState } from "../state";
import {
  getNavigationMenu,
  getPhotoContent,
  getSiteSettings,
} from "../lib/api";

const PhotoWrapper = styled.main`
  padding: 1rem;
  position: relative;
  * {
    /* border: 1px solid; */
  }
  .photo-grid {
    margin: 1rem 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 0.5rem;
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
  .card-tall {
    grid-row: span 2 / auto;
  }
  .card-wide {
    grid-column: span 2 / auto;
  }
`;

const PhotoNav = styled.div`
  display: flex;
  align-items: center;
  /* background: red;   */
  /* justify-content: space-between; */
  h1 {
    margin-right: 1rem;
  }
  div {
    display: flex;
    margin: 0 auto;
    transform: translateX(-50%);
    /* margin-left: 1ch; */
    p {
      cursor: pointer;
      margin-right: 0.5ch;
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem auto;
  transition: all 0.2s ease-in-out;
  width: 100px;
  background: red;
  position: relative;
  img {
    width: 100%;
    /* border: 1px solid black; */
    /* border-radius: 50px; */
    /* height: 100px; */
    /* max-width: 100px; */
    /* max-height: 500px; */
    /* margin: 0 auto; */
    object-fit: cover;
  }
  /* @media (min-width: 800px) {
    margin: 0 auto;
    min-height: 450px;
    &:hover {
      /* transform: scale(1.05); */
`;

const SelectedOption = styled.p`
  border-bottom: ${({ selected }) => (selected ? "1px solid" : "none")};
`;

export async function getServerSideProps() {
  const siteConfig = await getSiteSettings();
  const navMenuItems = await getNavigationMenu();
  const photoContent = await getPhotoContent();
  return {
    props: {
      siteConfig,
      navMenuItems,
      photoContent,
    },
  };
}

const PhotoOld = ({ siteConfig, navMenuItems, photoContent }) => {
  const [mode, setMode] = useState("all -");
  const [loading, setIsLoading] = useState(true);
  const [weddingImages, setWeddingImages] = useState([]);
  const [portraitImages, setPortraitImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const setSiteSettings = useGlobalState("siteSettings")[1];
  const setNavMenuItems = useGlobalState("navMenuItems")[1];
  // useEffect(() => {
  //   setSiteSettings({ ...siteConfig });
  //   setNavMenuItems(navMenuItems.items);
  // }, []);
  console.log("photoContent", photoContent);

  const pageOptions = ["all -", "weddings -", "portraits"];

    // window.addEventListener("keydown", handleEsc);

    // return () => {
    //   window.removeEventListener("keydown", handleEsc);
    // };
  // }, []);

  const modeClickHandler = (mode) => setMode(mode);
  const modalClickHandler = (modalInfo) => {
    //   if (width < 700) {
    //     return;
    //   }
    //   if (isModalOpen) {
    //     setIsModalOpen(!isModalOpen);
    //     setModalInfo({})
    //   }
    //   setIsModalOpen(!isModalOpen);
    //   setModalInfo({
    //     imageId: modalInfo,
    //   });
  };

  return (
    <PhotoWrapper>
      <PhotoNav>
        <h1>Photography</h1>
        <div>
          {pageOptions.map((option, index) => (
            <SelectedOption
              selected={mode === option}
              key={index}
              onClick={() => modeClickHandler(option)}
            >
              {option}
            </SelectedOption>
          ))}
        </div>
      </PhotoNav>
      <section className="photo-grid">
        {/* {loading ? ( */}
        {/* <div className="spinner">
            <Spinner color="black" />
          </div> */}
        {/* ) : ( */}
        <>
          {mode !== pageOptions[2] &&
            weddingImages.map((image, index) => {
              console.log("image", image);
              return (
                <ImageContainer
                  key={index}
                  onClick={() => modalClickHandler(image.public_id)}
                >
                  <img src={image.url} alt={""} />
                </ImageContainer>
              );
            })}
          {mode !== pageOptions[1] &&
            portraitImages.map((image, index) => {
              return (
                <ImageContainer
                  key={index}
                  onClick={() => modalClickHandler(image.public_id)}
                >
                  <img src={image.url} alt={""} />
                </ImageContainer>
              );
            })}
        </>
        {/* )} */}
      </section>
      {/* {isModalOpen && (
        <Modal modalClickHandler={modalClickHandler} modalInfo={modalInfo} />
      )} */}
    </PhotoWrapper>
  );
};

export default PhotoOld;
