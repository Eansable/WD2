'use client'
import { ComponentProps, ReactNode } from "react";
import styles from "./styles.module.css";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  typeTheme?: string;
}

const CustomButton = ({ children, typeTheme, ...otherProps }: ButtonProps) => {
  return (
    <button className={`${styles.custom__button}`} {...otherProps}>
      {children}
    </button>
  );
};

export default CustomButton;
