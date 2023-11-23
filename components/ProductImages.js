import { useState } from "react";
import styled from "styled-components";

const ImageStyles = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
const SelectedImageStyles = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
const SelectedImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;
const ImageButtons = styled.div`
  text-align: center;
  display: block;
  gap: 10px;
  padding-left: 10px;
`;
const ImageButton = styled.div`
  ${(props) =>
    props.$active === "true"
      ? `
  border: 1px solid #aaa;
  `
      : `
  border:none;
  `}
  padding: 2px;
  border-radius: 5px;
  height: 60px;
  width: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
  height: 100%;
`;

export default function ProductImages({ images }) {
  const [selectedImage, setSelectedImage] = useState(images?.[0]);
  return (
    <ImageWrapper>
      <SelectedImageWrapper>
        <SelectedImageStyles src={selectedImage} />
      </SelectedImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton key={image} $active={(image === selectedImage).toString()} onClick={() => setSelectedImage(image)}>
            <ImageStyles src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
    </ImageWrapper>
  );
}
