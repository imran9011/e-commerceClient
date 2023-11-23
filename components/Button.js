import styled, { css } from "styled-components";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  font-size: 1rem;
  ${(props) =>
    props.$white &&
    !props.$outline &&
    css`
      background-color: #f9f9f9;
      color: black;
    `}
  ${(props) =>
    props.$white &&
    props.$outline &&
    css`
      background-color: transparent;
      color: white;
      border: 1px solid white;
    `}
  ${(props) =>
    props.$primary &&
    !props.$outline &&
    css`
      background-color: #6d28d9;
      color: white;
      border: 1px solid #6d28d9;
    `}
  ${(props) =>
    props.$size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
      font-weight: bold;
    `};
  ${(props) =>
    props.$size === "m" &&
    css`
      font-size: 1.1rem;
      padding: 8px 8px;
      svg {
        height: 18px;
      }
      font-weight: bold;
    `};
  ${(props) =>
    props.$width === "full" &&
    css`
      width: 100%;
      justify-content: center;
    `};
  ${(props) =>
    props.$block &&
    css`
      display: block;
    `}
  ${(props) =>
    props.$black &&
    css`
      background-color: black;
      color: white;
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
