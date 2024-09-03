import { ListOption } from "@/types/common";
import style from "./SelectBox.module.scss";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Select from "@/components/Atoms/Select/Select";

interface SelectBoxProps {
  label: string;
  list: ListOption[];
  setAction: Dispatch<SetStateAction<string>>;
}

const SelectBox = (props: SelectBoxProps) => {
  const { label, list, setAction } = props;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAction(e.target.value);
  };

  return (
    <div className={style.main}>
      <h3>{label}</h3>
      <Select
        id="select"
        value="" 
        onChange={handleChange}
        options={list} 
        //className={style.select} 
        placeholder="seleziona" 
      />
    </div>
  );
};

export default SelectBox;
