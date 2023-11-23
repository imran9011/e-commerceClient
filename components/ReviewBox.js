import styled from "styled-components";
import { StarRatings } from "./StarRatings";
import Link from "next/link";

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ReviewWrap = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid gray;
  margin-bottom: 5px;
  padding-bottom: 5px;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 0.8rem;
    color: #5a5a5a;
    padding: 3px;
    margin: 0;
  }
`;

const ReviewAuthor = styled.p`
  font-size: 0.8rem;
  color: #5a5a5a;
  padding: 2px 0;
  margin: 0;
`;

const ReviewTitle = styled.p`
  font-size: 1.2rem;
  padding: 1px 0;
  margin: 0;
`;

const ProductName = styled(Link)`
  margin: 3px 2px;
  font-size: 0.8rem;
  text-decoration: none;
  color: gray;
  display: inline-block;
`;

export default function ReviewBox({ reviews }) {
  return (
    <ReviewsContainer>
      {reviews.map((review) => (
        <ReviewWrap key={review._id}>
          {review?.product?.title && <ProductName href={"/product/" + review.product._id}>{review.product.title}</ProductName>}
          <RatingWrapper>
            <StarRatings rating={review.rating} />
            <p>{review.rating} star(s)</p>
            {review?.user?.name && <p>by {review.user.name}</p>}
          </RatingWrapper>
          <ReviewTitle>{review.title}</ReviewTitle>
          {review.comment}
          {review?.user?.name && <ReviewAuthor>by {review.user.name}</ReviewAuthor>}
        </ReviewWrap>
      ))}
    </ReviewsContainer>
  );
}
