import styled from "styled-components";

const StyledTextArea = styled.textarea`
  margin-bottom: 5px;
  width: 100%;
  padding: 5px;
  border: 1px solid #aaa;
  border-radius: 3px;
  box-sizing: border-box;
  min-height: 200px;
  overflow: auto;
`;

export default function TextArea(props) {
  return (
    <StyledTextArea
      onKeyDown={(e) => {
        e.target.style.height = 0;
        e.target.style.height = e.target.scrollHeight + 16 + "px";
      }}
      {...props}
    />
  );
}
