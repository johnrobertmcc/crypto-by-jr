import transactions from "./transactions.json";
export const NAV_LINKS = [{ text: "Log In", url: "/" }];

export const CONTRACT_ABI = transactions?.abi;

export const CONTRACT_ADDRESS = "0x630f9a9d787E380ee00BA014e1ABF9B776B3a0A4";

export const INPUTS = [
  { placeholder: "Address To", name: "addressTo", type: "text" },
  { placeholder: "Amount", name: "amount", type: "number" },
  { placeholder: "Enter Message", name: "message", type: "text" },
];

export const CRYPTO_API =
  "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";

export const DONATION_ADDRESS = "0xC1BAC87AE3A78fE0A32245D80A88d96a5192E9Bf";
