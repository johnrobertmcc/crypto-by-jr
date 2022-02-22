import styles from "./Loading.module.css";

/**
 * Renders the Loading screen
 *
 * @return {Element}    The Loading component.
 */
export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <img src="./assets/spinner.gif" alt="loading" />
    </div>
  );
}
