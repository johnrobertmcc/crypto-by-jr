import { smoothScroll } from "../../../functions/scroll";
import styles from "./NavBar.module.css";
import Container from "../../util/Container";
import { useAppContext } from "../../../context/index";
import { useEffect, useState } from "react";
import Wrapper from "../../util/Wrapper";
import { shortenAddress } from "../../../functions/transactions";

/**
 * The dapp's header.
 *
 * @return {Element} The NavBar component.
 */
export default function NavBar({ loading }) {
  const { currentAccount, connectWallet } = useAppContext();

  const [accountNumber, setAccountNumber] = useState(null);

  useEffect(() => {
    if (currentAccount) {
      const fragmentedAcctNum = shortenAddress(currentAccount);

      setAccountNumber(fragmentedAcctNum);
    }
  }, [currentAccount]);

  return (
    <Wrapper className={"siteHeader"} pt={false} tag="header">
      <h1 className="sr-only">Crypto by J.R.</h1>
      <Container paddingX={false} className={"headerContainer"}>
        <button onClick={() => smoothScroll(80)} className={styles.logo}>
          <img
            src="./assets/ethereum.webp"
            alt="ethereum"
            className={styles.logoImg}
          />
        </button>
        {loading ? (
          <img
            src="./assets/spinner.gif"
            alt="transferring"
            className={styles.loading}
          />
        ) : (
          <>
            {!!currentAccount ? (
              <div className={styles.signedIn}>
                <p>
                  <span>Account:</span>
                  <br />
                  {accountNumber}
                </p>
              </div>
            ) : (
              <button
                onClick={() => connectWallet()}
                className={styles.connect}
              >
                Connect Wallet
              </button>
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
}
