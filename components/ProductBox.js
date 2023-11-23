import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { StarRatings } from "./StarRatings";

const ProductWrapper = styled.div`
  height: 350px;

  display: flex;
  flex-direction: column;
`;

const WhiteBox = styled(Link)`
  background-color: white;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 200px;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: normal;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
`;

const ProductInfoBox = styled.div`
  height: 100%;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PriceRow = styled.div`
  display: block;
  align-items: center;
  margin-top: 2px;
  @media screen and (min-width: 600px) {
    display: flex;
  }
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const ProductImg = styled.img`
  object-fit: contain;
  height: 200px;
`;

export default function ProductBox({ product }) {
  const { _id, title, price, images } = product;
  const { addProductToCart } = useContext(CartContext);
  return (
    <ProductWrapper>
      <WhiteBox href={"/product/" + _id}>
        <div>
          <ProductImg src={images?.[0]} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <div>
          <StarRatings rating={product.averageRating} />
          <Title>{title}</Title>
        </div>
        <div>
          <PriceRow>
            <Price>£{price}</Price>
          </PriceRow>
          <Button $black={1} onClick={() => addProductToCart(_id)} $primary={1} $width="full" $size="m">
            <CartIcon />
            Add to cart
          </Button>
        </div>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
