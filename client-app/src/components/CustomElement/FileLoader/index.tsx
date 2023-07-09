import { ComponentProps } from "react";
import styles from "./styles.module.css";

interface FileLoaderPropsType extends ComponentProps<"input"> {}

const FileLoader = ({}: FileLoaderPropsType) => {
  return (
    <input
      className={styles.loader}
      type="file"
      accept=".jpg, .jpeg, .png, .svg"
    />
  );
};

export default FileLoader;
