import Input from "../../util/Input";
import styles from "./Wallet.module.css";
import { INPUTS } from "../../../constants";
import Container from "../../util/Container";
import { useAppContext } from "../../../context";
import Wrapper from "../../util/Wrapper/Wrapper";

/**
 * Renders the Wallet Component
 *
 * @return {Element}   The Wallet of the dapp.
 */
export default function Wallet() {
  const { sendTransaction, formData, handleChange, loading } = useAppContext();

  function handleSubmit(e) {
    const { addressTo, amount, message } = formData;

    e.preventDefault();
    if (!addressTo || !amount || !message) return;

    sendTransaction();
  }

  return (
    <Wrapper theme="primary">
      <Container>
        <div className={styles.innerWrap}>
          <div className={styles.leftLayout}>
            <h1 className={styles.header}>
              Sending Ethereum <br /> Made Easy
            </h1>
          </div>
          <div className={styles.rightLayout}>
            {INPUTS.map((input, i) => {
              return (
                <Input
                  key={i}
                  placeholder={input?.placeholder}
                  name={input?.name}
                  type={input?.type}
                  value={formData[input?.name]}
                  handleChange={(e) => handleChange(e, input?.name)}
                />
              );
            })}
            {loading ? (
              <img
                src="./assets/spinner.gif"
                alt="transferring"
                className={styles.loading}
              />
            ) : (
              <button
                onClick={(e) => handleSubmit(e)}
                className={styles.submitBtn}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
}
