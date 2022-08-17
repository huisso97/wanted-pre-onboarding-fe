import React from "react";
import styled from "styled-components";

export default function Form({ setValue, value, handleSubmit }) {
  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <div>
      <FormWrapper className="flex justify-between w-full mt-2" onSubmit={handleSubmit}>
        <InputWrapper type="text" name="value" placeholder="해야할 일을 입력하세요." value={value} onChange={handleChange} />
        <SubmitBtn type="submit" value="입력" />
      </FormWrapper>
    </div>
  );
}

const FormWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  margin-left: 4px;
  padding-right: 4px;
`;

export const InputWrapper = styled.input`
  width: 100%;
  font-size: large;
  border-radius: 6px;
  border-width: 3px;
  margin-right: 5px;
  padding: 5px 5px;
  opacity: 1;
  border-color: ${(props) => props.theme.accentColor};
`;

export const SubmitBtn = styled.input`
  background-color: ${(props) => props.theme.lightBgColor};
  border-radius: 10px;
  padding: 8px 12px;
  border-color: ${(props) => props.theme.lightBgColor};
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.bgColor};

    transition: background-color 0.2s ease-in;
  }
`;
