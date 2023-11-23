import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  @media screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (min-width: 850px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductsGrid({ products }) {
  return <StyledProductsGrid>{products?.length > 0 && products.map((product) => <ProductBox key={product._id} product={product} />)}</StyledProductsGrid>;
}
