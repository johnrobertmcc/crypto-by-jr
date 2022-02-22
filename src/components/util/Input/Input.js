import PropTypes from "prop-types";
import styles from "./Input.module.css";
/**
 * Renders the Input Component
 *
 * @param  {object}  props       The component as props.
 * @return {Element}             The Input component.
 */
export default function Input({
  placeholder,
  name,
  type,
  value,
  handleChange,
}) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      step={"0.001"}
      value={value}
      onChange={(e) => handleChange(e?.target?.value, name)}
      className={styles.input}
      id={`input-${name}`}
    />
  );
}

Input.propTypes = {
  component: PropTypes.string,
};
