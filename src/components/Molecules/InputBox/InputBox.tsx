import { Dispatch, SetStateAction, useState } from "react";
import style from "./InputBox.module.scss";
import Input from "@/components/Atoms/Input/Input";

interface InputBoxProps {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const InputBox = (props: InputBoxProps) => {
  const { label, value, setValue } = props;

  return (
    <div className={style.main}>
      <h3>{label}</h3>
      {/* controlled component */}
      <Input
        value={value}
        setValue={setValue}
        type="text"
      />

    </div>
  );
};

export default InputBox;
