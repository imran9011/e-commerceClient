import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
  padding: 0;
`;
const Desc = styled.p`
  text-align: justify;
  text-justify: inter-word;
`;

const ColumnsWrapper = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 600px) {
    grid-template-columns: 0.9fr 1.1fr;
    div:nth-child(1) {
      order: 0;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const FeaturedImg = styled.img`
  max-height: 400px;
  object-fit: cover;
`;

export default function Featured({ product }) {
  const { addProductToCart } = useContext(CartContext);

  function addFeaturedToCart() {
    addProductToCart(product._id);
  }
  return (
    <Center>
      <ColumnsWrapper>
        <Column>
          <div>
            <Title>{product?.title}</Title>
            <Desc>{product?.description}</Desc>
            <ButtonWrapper>
              <ButtonLink href={"/product/" + product._id} $outline={1} $black={1}>
                read more
              </ButtonLink>
              <Button $black={1} onClick={addFeaturedToCart}>
                <CartIcon />
                Add to cart
              </Button>
            </ButtonWrapper>
          </div>
        </Column>
        <Column>
          <FeaturedImg src={product?.images[0]} />
        </Column>
      </ColumnsWrapper>
    </Center>
  );
}
