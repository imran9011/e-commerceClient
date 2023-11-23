import styled from "styled-components";
import StarIcon from "./icons/StarIcon";

const IconContainer = styled.div`
  width: 110px;
`;

export function StarRatings({ rating }) {
  const iconArray = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.round(rating)) {
      iconArray.push(<StarIcon key={i} />);
    } else iconArray.push(<StarIcon key={i} color={"gray"} />);
  }
  return <IconContainer>{...iconArray}</IconContainer>;
}
