# Crypto by JR

![alt-text](https://github.com/johnrobertmcc/crypto-by-jr/blob/main/public/assets/readme.png "readme")

A decentralized app used to connect to the blockchain and send Ether to anyone with a MetaMask wallet. Each transaction will take ~60 seconds.

### React.js

`./src`
The frontend is built using React. The dApp's state is managed inside of `src/context`, which is pulling in information from both the browser's window and from Metamask.

### Smart Contract

`./smart_contract`

Written in Solidity, this smart contract securely transfers Ether from one wallet to another by keying into Metamask.

## Installation

- Clone the repo
- `npm i && npm start`

A private MetaMask key will be needed to run this locally; add to `.env.local` your private key from MetaMask

### Pro Tip

Once your wallet is connected, feel free to click the donate button at the bottom of the page &#128579;&#128579;

## Planned Updates

2/22/22:
Currently sending Ether from the Ropsten network only. Will soon update to make mainnet available.
