import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
  margin-top: 50px;
`;

const StyledTable = styled.table`
  width: auto;
  border-collapse: collapse;
  th {
    text-align: left;
    text-transform: uppercase;
    font-weight: 700;
    color: #aaa;
    border: 1px solid #aaa;
    padding: 5px;
  }
  td {
    border: 1px solid #ccc;
    padding: 5px;
  }
  border: 1px solid #aaa;
  border-radius: 5px;
  background-color: white;
`;

const TotalText = styled.div`
  font-weight: bold;
`;

export default function AccountPage({ session }) {
  const [order, setOrder] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (session) {
      axios.post("/api/order", { id }).then((result) => {
        setOrder(result.data);
      });
    }
  }, []);

  return (
    <>
      <Header />
      <Center>
        <TableWrapper>
          <Title>Order id: {id}</Title>
          <StyledTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Q</th>
                <th>Unit Price (GBP)</th>
                <th>Total Price (GBP)</th>
              </tr>
            </thead>
            <tbody>
              {order?.line_items.map((item) => {
                return (
                  <tr key={item.price_data.product_data._id}>
                    <td>{item.price_data.product_data.name}</td>
                    <td>{item.quantity}</td>
                    <td>£{item.price_data.unit_amount / 100}</td>
                    <td>£{(item.price_data.unit_amount * item.quantity) / 100}</td>
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td>
                  <TotalText>TOTAL:</TotalText>
                </td>
                <td>
                  <TotalText>£{order?.total / 100}</TotalText>
                </td>
              </tr>
            </tbody>
          </StyledTable>
        </TableWrapper>
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
