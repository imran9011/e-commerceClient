import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductImages from "@/components/ProductImages";
import ReviewBox from "@/components/ReviewBox";
import Select from "@/components/SelectRating";
import { StarRatings } from "@/components/StarRatings";
import TextArea from "@/components/TextArea";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-top: 50px;
  @media screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  font-weight: bold;
  font-size: 2rem;
  align-items: center;
`;

const WriteReview = styled.div`
  margin: 0;
  padding: 0;
`;

const RateAndTitleContainer = styled.div`
  margin-bottom: 5px;
  padding: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  p {
    color: #5a5a5a;
    margin: 0;
    padding: 0;
  }
`;

const ProductDesc = styled.p`
  text-align: justify;
  text-justify: inter-word;
  padding: 0;
  margin-top: 5px;
`;

const TitleWrap = styled.div`
  margin-top: 20px;
  border-top: 1px solid black;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 10px;
  margin-top: 5px;
`;

const StarRatingWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const ReviewSpan = styled.span`
  color: gray;
`;

export default function ProductPage({ session }) {
  const { addProductToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userReviewId, setUserReviewId] = useState({});
  const [rating, setRating] = useState("1");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router) {
      axios.post("/api/product", { _id: router.query.id }).then((response) => {
        setProduct(response.data[0]);
      });
    }
    axios.post("/api/review", { _id: router.query.id, type: "singleProductReviews" }).then((response) => {
      setReviews(response.data);
    });
  }, [session]);

  useEffect(() => {
    if (session) {
      const userReview = reviews.filter((review) => session.user.id === review.user._id.toString());
      if (userReview.length > 0) {
        setUserReviewId(userReview[0]._id);
        setRating(userReview[0].rating);
        setTitle(userReview[0].title);
        setComment(userReview[0].comment);
        setEdit(true);
      }
    }
  }, [reviews]);

  async function submitReview() {
    try {
      if (rating === "" || title === "") return;
      if (edit) {
        const { data } = await axios.patch("/api/review", { product: product._id, rating, title, comment });
        window.location.reload();
        return;
      }
      const result = await axios.post("/api/review", { product: product._id, rating, title, comment });
      window.location.reload();
    } catch (error) {}
  }

  async function deleteReview() {
    try {
      if (edit) {
        await axios.delete("/api/review", {
          data: {
            id: userReviewId,
          },
        });
        window.location.reload();
        return;
      }
    } catch (error) {}
  }

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          {product && (
            <>
              <div>
                <Title>{product.title}</Title>
                <StarRatingWrap>
                  <StarRatings rating={product.averageRating} />
                  <ReviewSpan>{product.numOfReviews} reviews</ReviewSpan>
                </StarRatingWrap>
                <ProductDesc>{product.description}</ProductDesc>
                <PriceRow>
                  <div>£{product.price}</div>
                  <Button onClick={() => addProductToCart(product._id)} $primary={1} $size="l">
                    <CartIcon />
                    Add to cart
                  </Button>
                </PriceRow>
              </div>
              <div>
                <ProductImages images={product.images} />
              </div>
            </>
          )}
        </ColWrapper>
        {session && (
          <WriteReview>
            <Title>{edit ? "Edit Review" : "Write a Review"}</Title>
            <RateAndTitleContainer>
              <p>Rating</p>
              <Select value={rating} onChange={(e) => setRating(e.target.value)} />
              <p>Title:</p>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter Title" />
            </RateAndTitleContainer>
            <TextArea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Enter Description" />
            <RateAndTitleContainer>
              <Button type="button" onClick={submitReview} $primary={1}>
                Submit Review
              </Button>
              {edit && (
                <Button type="button" onClick={deleteReview} $black={1}>
                  Delete Review
                </Button>
              )}
            </RateAndTitleContainer>
          </WriteReview>
        )}
        <TitleWrap>
          <Title>Reviews</Title>
          {reviews.length > 0 && (
            <>
              {reviews && <ReviewBox reviews={reviews} product={product} />}
              {reviews.length === 0 && <ReviewSpan>No reviews</ReviewSpan>}
            </>
          )}
        </TitleWrap>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const session = await getSession(context);
  // const reviews = await Review.find({ product }).populate("user", "name").sort({ createdAt: -1 });

  return {
    props: {
      session,
    },
  };
}
