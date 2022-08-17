import axios from "axios";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { setToken } from "../utils/token";
import { Btn, Container, Title } from "./Todo";
import styled from "styled-components";
import { InputWrapper } from "../components/todo/Form";

const BASE_URL = "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 오류문구
  const [emailAlert, setEmailAlert] = useState("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = JSON.stringify({ email: email, password: password });
    try {
      await axios.post(BASE_URL + "/auth/signin", data, { headers: { "Content-Type": "application/json" } }).then((res) => {
        if (res.status === 200) {
          const {
            data: { access_token: accessToken },
          } = res;
          console.log(res);
          setToken(JSON.stringify(accessToken));
          window.location.reload();
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  // dfadf
  const handleEmail = useCallback((e) => {
    const emialRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const { value } = e.target;
    setEmail(value);

    if (!emialRegex.test(value)) {
      setEmailAlert("이메일 형식이 틀렸어요!");
      setIsEmail(false);
    } else {
      setEmailAlert("올바른 이메일 양식이에요");
      setIsEmail(true);
    }
  }, []);

  const handlePassword = useCallback((e) => {
    const { value } = e.target;
    setPassword(value);

    if (value.length < 8) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  }, []);

  return (
    <Container>
      <Box>
        <Title>Login</Title>
        <FormBox onSubmit={onSubmit}>
          <SemiTitle>이메일 : </SemiTitle>
          <InputWrapper type="text" onChange={handleEmail} />
          {email.length > 0 && <span>{emailAlert}</span>}
          <SemiTitle>비밀번호 :</SemiTitle>
          <InputBox type="password" onChange={handlePassword} />

          <BtnBox type="submit" disabled={!isEmail && !isPassword}>
            로그인
          </BtnBox>
        </FormBox>
        <SignupBtn>
          <Link to="/signup">회원가입</Link>
        </SignupBtn>
      </Box>
    </Container>
  );
}

export default Login;

export const Box = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  padding: 10px;
  width: 40%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const FormBox = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputBox = styled(InputWrapper)`
  margin-top: 10px;
`;

export const BtnBox = styled(Btn)`
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;

export const SignupBtn = styled(Btn)`
  border-color: aliceblue;
  color: ${(props) => props.theme.textColor};
`;

export const SemiTitle = styled.span`
  margin: 5px 0px;
`;
