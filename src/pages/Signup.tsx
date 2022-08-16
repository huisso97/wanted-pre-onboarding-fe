import axios from "axios";
import React, { useCallback, useState } from "react";

const BASE_URL = "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/";

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  // 오류문구
  const [emailAlert, setEmailAlert] = useState<string>("");
  const [passwordAlert, setPasswordAlert] = useState<string>("");
  const [passwordConfirmAlert, setpasswordConfirmAlert] = useState<string>("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  // const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const data = {
  //     email: email,
  //     password: password
  //   };
  //   try {
  //     await axios.post(BASE_URL,data )
  //   } catch {

  //   }
  // })
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await axios
          .post(BASE_URL, {
            email: email,
            password: password,
          })
          .then((res) => {
            console.log("response:", res);
            if (res.status === 200) {
              console.log(res);
            }
          });
      } catch (err) {
        console.error(err);
      }
    },
    [email, password]
  );

  const handleEmail = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const emialRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const { value } = e.target as HTMLInputElement;
    setEmail(value);

    if (!emialRegex.test(value)) {
      setEmailAlert("이메일 형식이 틀렸어요! @를 확인해주세요");
      setIsEmail(false);
    } else {
      setEmailAlert("올바른 이메일 양식이에요");
    }
  }, []);

  const handlePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,50}$/;
    const { value } = e.target as HTMLInputElement;
    setPassword(value);

    if (!passwordRegex.test(value)) {
      setPasswordAlert("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
    } else {
      setPasswordAlert("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  }, []);

  const handlePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target as HTMLInputElement;
      setPasswordConfirm(value);

      if (password === value) {
        setpasswordConfirmAlert("비밀번호를 똑같이 입력했어요!");
        setIsPasswordConfirm(true);
      } else {
        setpasswordConfirmAlert("비밀번호가 틀려요. 다시 확인해주세요!");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={handleEmail} />
        {email.length > 0 && <span>{emailAlert}</span>}
        <input type="password" onChange={handlePassword} />
        {password.length > 0 && <span>{passwordAlert}</span>}
        <input type="password" onChange={handlePasswordConfirm} />
        {passwordConfirm.length > 0 && <span>{passwordConfirmAlert}</span>}
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Signup;
