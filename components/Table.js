import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th {
    text-align: left;
    text-transform: uppercase;
    font-weight: 700;
    color: #aaa;
  }
  td {
    border-top: 1px solid #aaa;
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />;
}
