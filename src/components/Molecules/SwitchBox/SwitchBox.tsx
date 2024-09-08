
import { Dispatch, SetStateAction } from "react";
import Switch from "@/components/Atoms/Switch/Switch";
import style from './SwitchBox.module.scss';
 

interface SwitchBoxProps{
    value: boolean;
    label: string;
    setValue: Dispatch<SetStateAction<boolean>>;
}

const SwitchBox = (props: SwitchBoxProps) => {

    const{value, label, setValue} = props;

    return(
        <div className={style.main}>
            <h3 className={style.main}>{label}</h3>
            <Switch active={value} setActive={setValue}/>
        </div>
    )
}

export default SwitchBox