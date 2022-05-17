import styled from "@emotion/styled";
import { useState } from "react";
import YoutubePicture from "./YoutubePicture";

const VideoPageContainer = styled.section`
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    list-style: none;
    gap: 1rem;
    padding: 0;
    /* background-color: violet; */
    li {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
      /* align-items: center; */
      /* background: red; */
      h3 {
        font-size: 1rem;
      }
      .image-wrapper {
        width: 100%;
        overflow: hidden;
        /* 16:9 aspect ratio */
        padding-top: 56.25%;
        position: relative;
        img {
          object-fit: cover;
          border: 0;
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
        }
      }
    }

    @media (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 700px) {
      grid-template-columns: 1fr;
    }
  }
`;

const VideoModal = styled.div`
  /* * { border: 1px solid } */
  background: black;
  display: ${({ isModalOpen }) => (isModalOpen ? "flex" : "none")};

  position: fixed;
  height: 100vh;
  width: 100vw;

  top: 0rem;
  z-index: 100;
  /* opacity: .8; */
  left: 0;
  align-items: center;
  justify-content: center;
  padding: 0 2rem 0 1rem;
  .modal-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .container-for-container {
      width: 100%;

      .video-container {
        position: relative;
        overflow: hidden;
        padding-top: 56.25%;
        width: 100%;
        .youtube-video {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          border: 0;
        }
      }
    }
    section {
      width: 100%;
      h4,
      p {
        color: white;
      }
    }
    @media (min-width: 700px) {
      .container-for-container {
        width: 80%;
      }
    }
    @media (min-width: 1200px) {
      flex-direction: row;

      .container-for-container {
        padding: 2rem;
      }
    }
  }
  .close-btn {
    background: white;
    width: 30px;
    height: 5px;
    position: absolute;
    right: 2rem;
    top: 2rem;
    transform: rotate(-45deg);
    cursor: pointer;
    border-radius: 5px;
    border: none;
    z-index: 110;
    &:after {
      content: "";
      cursor: pointer;
      border-radius: 5px;
      border: none;
      position: absolute;
      width: 30px;
      height: 5px;
      background: white;
      transform: rotate(90deg) translateY(15px);
    }
  }
`;

export default function VideoGrid({ videos }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const modalClickHandler = () => {
    setIsModalOpen(!isModalOpen);
    if (modalInfo === {}) return;
    setModalInfo({});
  };

  const getFirstParagraph = (string) => string.split("**")[0];

  const getVideoId = (string) => string.split("=")[1];

  return (
    <VideoPageContainer>
      <ul>
        {videos &&
          videos.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  modalClickHandler();
                  setModalInfo({
                    title: item.title,
                    videoId: getVideoId(item.url),
                    description: item.description,
                  });
                }}
              >
                <YoutubePicture
                  classNames={"image-wrapper"}
                  youtubeId={getVideoId(item.url)}
                  alt={item.title}
                />

                <h3>{item.title}</h3>
              </li>
            );
          })}
      </ul>
      <VideoModal isModalOpen={isModalOpen}>
        <div className="close-btn" onClick={modalClickHandler}></div>
        {modalInfo && (
          <div className="modal-info">
            <div className="container-for-container">
              <div className="video-container">
                <iframe
                  className="youtube-video"
                  src={`https://www.youtube.com/embed/${modalInfo.videoId}`}
                ></iframe>
              </div>
            </div>
            <section>
              <p>
                {modalInfo.title && getFirstParagraph(modalInfo.description)}
              </p>
              <br />
            </section>
          </div>
        )}
      </VideoModal>
    </VideoPageContainer>
  );
}
