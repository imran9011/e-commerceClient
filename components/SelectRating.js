import styled from "styled-components";

const StyledSelect = styled.select`
  width: 40px;
  padding: 5px;
  border: 1px solid #aaa;
  border-radius: 3px;
  box-sizing: border-box;
`;

export default function Select(props) {
  return (
    <StyledSelect value={props.value} {...props}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </StyledSelect>
  );
}
