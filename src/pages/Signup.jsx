import styled from "styled-components";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../utils/auth";
import { setToken } from "../utils/token";
import { Box, BtnBox, FormBox, InputBox, SemiTitle, SignupBtn } from "./Login";
import { Container, Title } from "./Todo";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 오류문구
  const [emailAlert, setEmailAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");
  const [passwordConfirmAlert, setpasswordConfirmAlert] = useState("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = JSON.stringify({ email: email, password: password });
    signUp(data)
      .then((res) => {
        console.log("response:", res);
        if (res.status === 201) {
          const {
            data: { access_token: accessToken },
          } = res;
          setToken(JSON.stringify(accessToken));
          window.location.reload();
        }
      })
      .catch((res) => {
        if (res.response.status === 400) {
          alert("이미 사용자가 있습니다. 다른 정보를 입력해주세요");
        }
      });
  };

  const handleEmail = useCallback((e) => {
    const emialRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const { value } = e.target;
    setEmail(value);

    if (!emialRegex.test(value)) {
      setEmailAlert("이메일 형식이 틀렸어요!");
      setIsEmail(false);
    } else {
      setEmailAlert("");
      setIsEmail(true);
    }
  }, []);

  const handlePassword = useCallback((e) => {
    const { value } = e.target;
    setPassword(value);

    if (value.length < 8) {
      setPasswordAlert("8자리 이상 입력해주세요.");
      setIsPassword(false);
    } else {
      setPasswordAlert("");
      setIsPassword(true);
    }
  }, []);

  const handlePasswordConfirm = useCallback(
    (e) => {
      const { value } = e.target;
      setPasswordConfirm(value);

      if (password === value) {
        setpasswordConfirmAlert("비밀번호가 같습니다.");
        setIsPasswordConfirm(true);
      } else {
        setpasswordConfirmAlert("비밀번호가 다릅니다.");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  return (
    <Container>
      <SignupBox>
        <Title>Signup</Title>
        <FormBox onSubmit={onSubmit}>
          <SemiTitle>이메일 </SemiTitle>
          <InputBox type="text" onChange={handleEmail} />
          <AlertBox>{email.length > 0 && <Alert>{emailAlert}</Alert>}</AlertBox>
          <SemiTitle>비밀번호</SemiTitle>
          <InputBox type="password" onChange={handlePassword} />
          <AlertBox>{password.length > 0 && <Alert>{passwordAlert}</Alert>}</AlertBox>

          <SemiTitle>비밀번호 확인</SemiTitle>
          <InputBox type="password" onChange={handlePasswordConfirm} />
          <AlertBox>{passwordConfirm.length > 0 && <Alert>{passwordConfirmAlert}</Alert>}</AlertBox>

          <BtnBox type="submit" disabled={!isEmail || !isPassword || !isPasswordConfirm}>
            회원가입
          </BtnBox>
        </FormBox>
        <SignupBtn>
          <Link to="/">로그인</Link>
        </SignupBtn>
      </SignupBox>
    </Container>
  );
}

export default Signup;

const SignupBox = styled(Box)`
  height: 70%;
`;

export const Alert = styled.span`
  display: inline-block;
  position: absolute;
`;

export const AlertBox = styled.div`
  margin-top: 3px;
  margin-bottom: 23px;
`;
