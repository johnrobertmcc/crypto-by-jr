import styles from "./Layout.module.css";
import NavBar from "./NavBar";
import Wallet from "./Wallet";
import Transactions from "./Transactions";
import Footer from "./Footer";
import Loading from "./Loading";
import { useRef, useState, useEffect } from "react";
import Wrapper from "../util/Wrapper";
import { useAppContext } from "../../context/index";
import Container from "../util/Container";

/**
 * Renders the Default Layout of the dapp.
 *
 * @return {Element}     The Layout component.
 */
export default function Layout() {
  const [loading, isLoading] = useState(true);
  const isMounted = useRef(false);
  const { metaMask, currentAccount } = useAppContext();

  useEffect(() => {
    if (!isMounted.current) {
      isLoading(true);
      setTimeout(() => {
        isLoading(false);
      }, 2000);
      isMounted.current = true;
    }
  }, [isMounted]);

  return (
    <>
      <NavBar loading={loading} />
      {loading ? (
        <Loading />
      ) : (
        <Wrapper tag="main" className={"content"}>
          {!metaMask ? (
            <Container className={"noWallet"}>
              <h2>
                Please install MetaMask extension to continue using this dApp.
              </h2>
              <a target="_blank" rel="noreferrer" href="https://metamask.io/">
                &rarr; Install MetaMask Here &larr;
              </a>
            </Container>
          ) : !!currentAccount ? (
            <>
              <Wallet />
              <Transactions />
            </>
          ) : (
            <Container className={"noWallet"}>
              <h2>Please Log in to MetaMask Browser Extension to continue.</h2>
            </Container>
          )}
        </Wrapper>
      )}

      <Footer loading={loading} />
    </>
  );
}
