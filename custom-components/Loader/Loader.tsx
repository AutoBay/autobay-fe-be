"use client";
import { useTheme } from "next-themes";
import styles from "./Loader.module.css";

const Loader = () => {
  const { theme } = useTheme();

  const cls = [styles.loader, theme === "dark" ? styles.darkLoader : styles.lightLoader].join(" ");

  return <div className={cls} />;
};
export default Loader;
