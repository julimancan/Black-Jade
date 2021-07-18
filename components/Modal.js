import styled from "@emotion/styled";
import { stylingVariables } from "./stylingVariables";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import Spinner from "./Spinner";

const ModalWrapper = styled.div`
  background: ${stylingVariables.pageTextcolor};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 2;
    img {
      object-fit: cover;
    }
  }
  svg {
    cursor: pointer;
    font-size: 3rem;
    position: absolute;
    top: 2rem;
    left: 2rem;
    z-index: 100;
  }
  .spinner {
    position: relative;
    margin: 0 auto;
    z-index: 0;
    background: red;
    width: fit-content;
    height: fit-content;
  }
`;

const Modal = ({ modalClickHandler, modalInfo }) => {
  return (
    <ModalWrapper>

      <AiOutlineClose onClick={modalClickHandler} />
      <div>
        <Image src={`https://res.cloudinary.com/julianb/image/upload/w_auto,c_scale/${modalInfo.imageId}.jpg`} alt={""}
          // width={modalInfo.imageDimensions.width} 
          // height={modalInfo.imageDimensions.height}
          layout="fill"
        />
      </div>
      <div className="spinner">

        <Spinner color="white" />
      </div>
    </ModalWrapper>
  )
};

export default Modal;
