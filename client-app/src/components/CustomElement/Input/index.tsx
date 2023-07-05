import { ComponentProps } from "react";
import styles from "./styles.module.css";

interface InputProps extends ComponentProps<"input"> {
  value: string;
}

const CustomInput = ({ value, ...otherProps }: InputProps) => {
  return (
    <input className={styles.custom__input} value={value} {...otherProps} />
  );
};

export default CustomInput;
