
import { Dispatch, SetStateAction } from "react";
import Switch from "@/components/Atoms/Switch/Switch";
import style from './SwitchBox.module.scss';
 

interface SwitchBoxProps{
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
}

const SwitchBox = (props: SwitchBoxProps) => {

    const{value, setValue} = props;

    return(
        <div className={style.main}>
            <Switch active={value} setActive={setValue}/>
        </div>
    )
}

export default SwitchBox