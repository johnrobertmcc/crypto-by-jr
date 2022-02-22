import cn from "classnames";
import { createElement } from "react";
import styles from "./Wrapper.module.css";

/**
 * Render the Wrapper component.
 *
 * @param  {object}  props          The component attributes as props.
 * @param  {string}  props.tag      The HTML element to render.
 * @param  {string}  props.theme    Optional theme color.
 * @param  {boolean} props.pt       Should container render top padding.
 * @param  {boolean} props.pb       Should container render bottom padding.
 * @param  {object}  props.children Container children.
 * @param  {object}  props.className Optional classNames..
 * @return {Element}                The Wrapper component.
 */
export default function Wrapper({ tag, theme, pt, pb, children, className }) {
  return createElement(
    tag,
    {
      className: cn(
        theme && styles[theme],
        !pt && styles.noPaddingTop,
        !pb && styles.noPaddingBtm,
        className && styles[className]
      ),
    },
    children
  );
}

Wrapper.defaultProps = {
  tag: "div",
  pt: true,
  pb: true,
  theme: "white",
};
