import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 10px;
  font-weight: 500;
`;

export default function NewProducts({ newProducts }) {
  return (
    <Center>
      <Title>All Products</Title>
      <ProductsGrid products={newProducts} />
    </Center>
  );
}
