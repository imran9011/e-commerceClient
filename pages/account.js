import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import Center from "@/components/Center";
import Header from "@/components/Header";
import LogInForm from "@/components/LoginForm";
import ReviewBox from "@/components/ReviewBox";
import Title from "@/components/Title";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TitleSignOutWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AccInfoWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  height: 100%;
`;

const StyledDate = styled.p`
  margin: 0;
  margin-bottom: 5px;
  padding: 0px;
  color: gray;
`;

const ColWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  margin-top: -15px;
  gap: 0px 20px;
`;

const OrderWrapper = styled.div`
  padding: 10px 0px;
  overflow: hidden;
  justify-content: center;
  background-color: white;
  border-radius: 5px;
`;

const ImageWrapper = styled.div`
  box-sizing: border-box;
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 5px;
  background-color: #ccc;
  margin-bottom: 10px;
`;

const Image = styled.img`
  object-fit: cover;
  margin: 5px;
  width: 90px;
  height: 90px;
  border-radius: 5px;
`;

export default function AccountPage({ session }) {
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewLimit, setReviewLimit] = useState(0);
  const [reviewLimitReached, setReviewLimitReached] = useState(false);
  const [orderLimit, setOrderLimit] = useState(0);
  const [orderLimitReached, setOrderLimitReached] = useState(false);

  useEffect(() => {
    if (session) {
      getOrderData();
      getReviewData();
    }
  }, []);

  function getReviewData() {
    const newLimit = reviewLimit + 3;
    setReviewLimit(newLimit);
    const uid = session?.user?.id || null;
    if (uid) {
      axios.post("/api/review", { uid, type: "singleUserReviews", reviewLimit: newLimit }).then((result) => {
        const { singleUserReviews, limitReached } = result.data;
        setReviews(singleUserReviews);
        if (limitReached) {
          setReviewLimitReached(true);
        }
      });
    }
  }

  function getOrderData() {
    const newLimit = orderLimit + 4;
    setOrderLimit(newLimit);
    const email = session?.user?.email || null;
    if (email) {
      axios.post("/api/order", { email, type: "singleUserOrders", orderLimit: newLimit }).then((result) => {
        const { singleUserOrders, limitReached } = result.data;
        setOrders(singleUserOrders);
        if (limitReached) {
          setOrderLimitReached(true);
        }
      });
    }
  }

  function showMoreReviews() {
    getReviewData();
  }

  function showMoreOrders() {
    getOrderData();
  }

  return (
    <>
      <Header />
      <Center>
        <AccInfoWrapper>
          {!session ? (
            <LogInForm />
          ) : (
            <>
              <Button onClick={signOut} $black={1} $size="l">
                Sign out
              </Button>
              <Title>My Orders</Title>
              <ColWrap>
                {orders?.map((order) => (
                  <OrderWrapper key={order._id}>
                    <StyledDate>{new Date(order.createdAt).toLocaleDateString()}</StyledDate>
                    <ImageWrapper>
                      {order.line_items.slice(0, 5).map((item) => (
                        <Image key={item.price_data.product_data?._id} src={item.price_data.product_data?.images} />
                      ))}
                    </ImageWrapper>
                    <ButtonLink $black={1} href={"/order/" + order._id}>
                      Show Order
                    </ButtonLink>
                  </OrderWrapper>
                ))}
              </ColWrap>
              {!orderLimitReached ? (
                <Button onClick={showMoreOrders} $black={1} $size="l">
                  Show more
                </Button>
              ) : (
                <p>All orders loaded</p>
              )}
              <Title>My Reviews</Title>
              <ReviewBox reviews={reviews} />
              {!reviewLimitReached ? (
                <Button onClick={showMoreReviews} $black={1} $size="l">
                  Show more
                </Button>
              ) : (
                <p>All reviews loaded</p>
              )}
            </>
          )}
        </AccInfoWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
