import { ComponentProps } from "react";
import styles from "./styles.module.css";

interface FileLoaderPropsType extends ComponentProps<"input"> {}

const FileLoader = ({...otherProps}: FileLoaderPropsType) => {
  return (
    <input
      className={styles.loader}
      type="file"
      accept=".jpg, .jpeg, .png, .svg"
      {...otherProps}
    />
  );
};

export default FileLoader;
