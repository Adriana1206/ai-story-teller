import React, { Dispatch, SetStateAction } from 'react'


interface InputProps{
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    type: string;
    placeholder?: string;
    className?: string;
}

const Input = (props: InputProps) => {
    const{value, setValue, type, placeholder} = props;

    return (
      <input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        placeholder={placeholder}
      />
    );

}

export default Input;