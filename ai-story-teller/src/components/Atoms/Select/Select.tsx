import React, { ChangeEvent } from 'react'

interface selectProps{
    id: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: {  label: string, value: string | number; }[]; 
    placeholder?: string; 
    className?: string;

}


const Select = (props: selectProps) => {

    const{ id, value, onChange, options, placeholder, className }  = props;
  return (
    <select className={className} id={id} value={value} onChange={onChange}>
      {placeholder && (
        <option value="" hidden>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select