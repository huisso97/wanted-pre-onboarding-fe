import axios from "axios";
import React, { useCallback, useState } from "react";
import { InputWrapper } from "../components/todo/Form";
import { signUp } from "../utils/auth";
import { setToken } from "../utils/token";
import { Box, BtnBox, FormBox, InputBox, SemiTitle } from "./Login";
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
    try {
      signUp(data).then((res) => {
        console.log("response:", res);
        if (res.status === 201) {
          const {
            data: { access_token: accessToken },
          } = res;
          setToken(JSON.stringify(accessToken));
          window.location.reload();
        } else if (res.status === 400) {
          alert("이미 사용자가 있습니다. 다른 정보를 입력해주세요");
        }
      });
    } catch (err) {
      console.error(err);
    }
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
      <Box>
        <Title>Signup</Title>
        <FormBox onSubmit={onSubmit}>
          <SemiTitle>이메일 : </SemiTitle>
          <InputWrapper type="text" onChange={handleEmail} />
          {email.length > 0 && <span>{emailAlert}</span>}
          <SemiTitle>비밀번호 :</SemiTitle>
          <InputBox type="password" onChange={handlePassword} />
          {password.length > 0 && <span>{passwordAlert}</span>}
          <SemiTitle>비밀번호 확인 :</SemiTitle>
          <InputBox type="password" onChange={handlePasswordConfirm} />
          {passwordConfirm.length > 0 && <span>{passwordConfirmAlert}</span>}
          <BtnBox type="submit" disabled={!isEmail && !isPassword && !isPasswordConfirm}>
            회원가입
          </BtnBox>
        </FormBox>
      </Box>
    </Container>
  );
}

export default Signup;
