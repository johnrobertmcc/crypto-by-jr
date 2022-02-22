/**
 * Function sued to return a fragmented account number.
 *
 * @return {string} The shortened account number.
 */
export function shortenAddress(accountNum) {
  return `${accountNum.slice(0, 5)}...${accountNum.slice(
    accountNum.length - 5,
    accountNum.length - 1
  )}`;
}
