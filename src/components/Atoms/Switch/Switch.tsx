import { Dispatch, SetStateAction } from "react";
import style from "./Switch.module.scss";

interface SwitchProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

const Switch = (props: SwitchProps) => {
  const { active, setActive } = props;

  return (
    <div className={style.switchContainer}>
      <label className={style.switch}>
        <input
          type="checkbox"
          checked={active}
          onChange={() => setActive(!active)}
        />
        <span className={`${style.slider} ${style.round}`}></span>
      </label>
    </div>
  );
};

export default Switch;

