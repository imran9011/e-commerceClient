import Link from "next/link";
import styled from "styled-components";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import { useSession } from "next-auth/react";
import SearchIcon from "./icons/SearchIcon";
import { useRouter } from "next/router";

const Wrap = styled.div`
  margin-bottom: 80px;
`;

const StyledHeader = styled.header`
  background-color: white;
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Logo = styled(Link)`
  color: black;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  position: relative;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  max-width: 1000px;
  padding: 0 20px;
`;

const StyledNav = styled.nav`
  ${(props) =>
    props.$sidebaractive === "true"
      ? `
  transform: translateX(0); 
  transition: transform .1s ease-in-out; 
  `
      : `
  transform: translateX(-100%); 
  transition: transform .1s ease-in-out; 
  `}
  display:block;
  gap: 10px;
  position: fixed;
  top: 60px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: white;
  width: 150px;
  @media screen and (min-width: 700px) {
    top: 0px;
    display: flex;
    position: static;
    width: auto;
    transform: translateX(0);
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: black;
  text-decoration: none;
  padding: 5px 20px;
  @media screen and (min-width: 700px) {
    padding: 0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  border: none;
  height: 20px;
  color: black;
  cursor: pointer;
  position: relative;
  z-index: 3;
  padding: 0;
  margin: 0;
  align-items: center;
  @media screen and (min-width: 700px) {
    display: none;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  gap: 0px;
  width: 40%;
`;

const StyledSearch = styled.input`
  margin: 0px 5px 0 15px;
  padding: 3px;
  width: 80%;
  border: none;
  border-bottom: 1px solid #aaa;
`;

const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [sideBarActive, setSideBarActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { data: session } = useSession();
  const { push } = useRouter();

  function clickSearch() {
    if (searchText === "") return;
    push({
      pathname: "/products",
      query: { product: searchText },
    });
  }

  return (
    <Wrap>
      <StyledHeader>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <SearchWrapper>
            <StyledSearch value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" />
            <SearchButton onClick={clickSearch}>
              <SearchIcon />
            </SearchButton>
          </SearchWrapper>
          <StyledNav $sidebaractive={sideBarActive.toString()}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/account"}>{session ? session.user.name : "Account"}</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButton onClick={() => setSideBarActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </StyledHeader>
    </Wrap>
  );
}
