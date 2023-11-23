import styled from "styled-components";
import { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
const validator = require("email-validator");

const LogInWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const FormWrapper = styled.form`
  margin: 100px auto;
  width: 50%;
  height: auto;
  background-color: white;
  border-radius: 5px;
  text-align: center;
  padding: 20px;
`;

const FormTitle = styled.h1`
  font-size: 1.2rem;
  color: gray;
  font-weight: 100;
`;

const RegisterText = styled.p`
  margin: 10px;
  padding: 0;
  text-align: center;
  color: gray;
`;

const AuthInput = styled.input`
  margin-bottom: 5px;
  width: 100%;
  padding: 12px;
  border: 2px solid #a5b4fc;
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 1.2rem;
`;

const AuthTextLink = styled.button`
  text-decoration: underline;
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  cursor: pointer;
  color: #818cf8;
`;

const StyledSVG = styled.svg`
  height: 40px;
  width: full;
  color: #b91c1c;
  display: flex;
`;
const SVGWrapper = styled.div`
  height: 40px;
  width: full;
  color: #b91c1c;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding-bottom: 5px;
`;

export default function LogInForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCred, setInvalidCred] = useState(false);
  const { push } = useRouter();

  function login() {
    push("/api/auth/signin");
  }

  async function register(e) {
    e.preventDefault();
    if (!validator.validate(email)) {
      setInvalidCred(true);
      return;
    }
    setInvalidCred(false);
    try {
      const result = await axios.post("/api/register", { name, email, password });
      if (result.data._id) {
        signIn("credentials", { email, password });
      }
    } catch (error) {
      setInvalidCred(true);
    }
  }

  return (
    <LogInWrapper>
      <FormWrapper>
        <FormTitle>Register</FormTitle>
        <AuthInput value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter username" />
        <AuthInput value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter email" />
        <AuthInput value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
        <RegisterText>
          Already signed up?&nbsp;
          <AuthTextLink type="button" onClick={login}>
            Login here
          </AuthTextLink>
        </RegisterText>
        {invalidCred && (
          <SVGWrapper>
            <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </StyledSVG>
            Invalid Credentials
          </SVGWrapper>
        )}
        <Button onClick={register} $black={1} $size="l" $primary={1} $width="full">
          Register
        </Button>
      </FormWrapper>
    </LogInWrapper>
  );
}
