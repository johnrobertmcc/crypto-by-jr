import Container from "../../util/Container";
import Wrapper from "../../util/Wrapper";
import styles from "./Footer.module.css";
import { smoothScroll } from "../../../functions/scroll";
import { DONATION_ADDRESS } from "../../../constants";
import { useAppContext } from "../../../context/index";

/**
 * Renders the Footer Component
 *
 * @return {Element}    The Footer component.
 */
export default function Footer({ loading }) {
  const { metaMask, handleChange } = useAppContext();
  /**
   * Function to prefill the addressTo and focus on the amount input :)
   */
  function donate() {
    const amountInput = document.getElementById("input-amount");

    smoothScroll(80);
    handleChange(DONATION_ADDRESS, "addressTo");
    amountInput.focus();
  }

  return (
    <Wrapper className={"siteFooter"} tag="footer" theme="primary" pt={false}>
      <Container className={"footerContainer"}>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/johnrobertmcc"
          className={styles.gitHub}
        >
          GitHub
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/jrmcc/"
          className={styles.linkedIn}
        >
          LinkedIn
        </a>
        <a
          target="_blank"
          href="https://github.com/johnrobertmcc"
          rel="noreferrer"
          className={styles.branding}
        >
          Created by J.R.
        </a>
        {metaMask && (
          <button onClick={() => donate()} className={styles.donate}>
            Donate
          </button>
        )}
      </Container>
    </Wrapper>
  );
}
