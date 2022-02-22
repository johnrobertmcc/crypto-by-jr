import styles from "./Transactions.module.css";
import Container from "../../util/Container/Container";
import { useAppContext } from "../../../context/index";
import Wrapper from "../../util/Wrapper/Wrapper";
import { shortenAddress } from "../../../functions/transactions";
import { useState, useEffect } from "react";
import { CRYPTO_API } from "../../../constants";

/**
 * Renders the recent transactions found on the Window.
 *
 * @return {Element}             The Transactions component.
 */
export default function Transactions() {
  const { transactions } = useAppContext();
  const [currency, setCurrency] = useState("ETH");
  const [USD, setUSD] = useState(null);

  const AVAILABLE_CURRENCY = {
    ETH: 1,
    USD: USD || 2590.692,
    WEI: 1000000000000000000,
    GWEI: 1000000000,
  };

  useEffect(() => {
    async function fetchUSD() {
      const data = await fetch(CRYPTO_API)
        .then((res) => {
          try {
            if (res.ok) {
              return res.json();
            }
          } catch (err) {
            throw new Error("USD not available right now.");
          }
        })
        .then((data) => {
          setUSD(data?.USD);
        });

      return data;
    }

    fetchUSD();
  }, []);

  /**
   * Function to return transactions in descending order of data.
   *
   * @return {Array}   Array of table rows.
   */
  function reverseTableRows() {
    const data = [];
    for (let i = transactions.length - 1; i >= 0; i--) {
      const rowAmount = AVAILABLE_CURRENCY[currency] * transactions[i]?.amount;
      data.push(
        <tr key={i} className={styles.tableRow}>
          <td>{currency}</td>
          <td>{rowAmount}</td>
          <td>{shortenAddress(transactions[i]?.addressTo)}</td>
          <td>{shortenAddress(transactions[i]?.addressFrom)}</td>
          <td>{transactions[i]?.message}</td>
          <td>{transactions[i]?.timestamp}</td>
        </tr>
      );
    }
    return data;
  }

  return (
    <Wrapper className={styles.transactionWrap}>
      <Container>
        <div className={styles.innerWrap}>
          <div className={styles.header}>
            <h2>
              Recent <br /> Transactions
            </h2>
            <div className={styles.currency}>
              <label htmlFor="currency">Currency</label>
              <select
                name="currency"
                onChange={(e) => setCurrency(e?.target?.value)}
              >
                {Object.keys(AVAILABLE_CURRENCY).map((currency, i) => {
                  return <option key={i}>{currency}</option>;
                })}
              </select>
            </div>
          </div>
          {!!transactions.length ? (
            <table className={styles.transactions}>
              <thead>
                <tr className={styles.tableHeader}>
                  <th>Currency</th>
                  <th>Amount</th>
                  <th>To</th>
                  <th>From</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>{reverseTableRows()}</tbody>
            </table>
          ) : (
            <div className={styles.noTransactions}>
              <h3 className={styles.message}>No Transactions yet.</h3>
            </div>
          )}
        </div>
      </Container>
    </Wrapper>
  );
}
