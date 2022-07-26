import styled from "@emotion/styled";

const StyledImage = styled.picture`
  width: ${({width}) => width};
  height: ${({height}) => height};
  img {
    object-fit: cover;
    object-position: 50% 50%;
  }
`;

const CloudinaryImage = ({ src, alt, width, height, classNames = "" }) => {
  return (
    <StyledImage className={`${classNames}`} width={width} height={height}>
      <img src={src} alt={alt}  />
     </StyledImage>
  );
};

export default CloudinaryImage;
