import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { setToken } from "../utils/token";
import { Btn, Container, Title } from "./Todo";
import styled from "styled-components";
import { InputWrapper } from "../components/todo/Form";
import { signIn } from "../utils/auth";

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

    signIn(data)
      .then((res) => {
        if (res.status === 200) {
          const {
            data: { access_token: accessToken },
          } = res;
          setToken(JSON.stringify(accessToken));
          window.location.reload();
        }
      })
      .catch((res) => {
        if (res.response.status === 404) {
          alert("입력 정보가 틀렸습니다.");
        } else if (res.response.status === 401) {
          alert("비밀번호가 틀렸습니다.");
        }
      });
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
        <Title>로그인</Title>
        <FormBox onSubmit={onSubmit}>
          <SemiTitle>이메일 </SemiTitle>
          <InputBox type="text" onChange={handleEmail} />

          <SemiTitle>비밀번호</SemiTitle>
          <InputBox type="password" onChange={handlePassword} />

          <BtnBox type="submit" disabled={!isEmail || !isPassword}>
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
  height: 60%;
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
  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: gray;
    border-color: gray;
    color: ${(props) => props.theme.textColor};
  }
  margin-top: 10px;
  color: ${(props) => props.theme.btnTextColor};
  font-weight: 600;
`;

export const SignupBtn = styled(Btn)`
  border-color: aliceblue;
  color: ${(props) => props.theme.btnTextColor};
`;

export const SemiTitle = styled.span`
  /* margin-top:/x; */
  font-weight: 600;
`;
