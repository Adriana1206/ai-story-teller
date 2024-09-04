
import { Dispatch, SetStateAction } from "react";
import Switch from "@/components/Atoms/Switch/Switch";
import style from './SwitchBox.module.scss';
 

interface SwitchBoxProps{
    label: string;
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
}

const SwitchBox = (props: SwitchBoxProps) => {

    const{label, value, setValue} = props;

    return(
        <div className={style.main}>
            <h3>{label}</h3>
            <Switch active={value} setActive={setValue}/>
        </div>
    )
}

export default SwitchBox