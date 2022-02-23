# Crypto by J.R

![Preview](https://github.com/johnrobertmcc/crypto-by-jr/tree/main/public/assets/readme.gif "homepage")

A decentralized app used to send Ethereum to anyone with a MetaMask wallet. Each transaction will take ~60 seconds.

Currently sending solely through Ropsten network, mainnet is a planned update.

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
