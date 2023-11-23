import styled from "styled-components";

const Search = styled.svg`
  margin: 0;
  padding: 0;
  height: 100%;
  font-weight: 900;
  stroke-width: 2;
`;

export default function SearchIcon({ className = "w-6 h-6" }) {
  return (
    <Search xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </Search>
  );
}
