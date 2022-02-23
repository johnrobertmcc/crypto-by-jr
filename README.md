# Crypto by J.R

A decentralized app used to send Ethereum to anyone with a MetaMask wallet. Each transaction will take ~60 seconds.

Currently sending solely through Ropsten network, mainnet is a planned update.

## Tech Stack

React.js
`./src`
The frontend is built using React. The dApp's state is managed inside of `src/context`, which is pulling in information from both the browser's window and from Metamask.

Solidity
`./smart_contract`

Written in Solidity, this smart contract securely transfers Ether from one wallet to another by keying into Metamask.

## Installation

- Clone the repo
- `npm i && npm start`

A private MetaMask key will be needed to run this locally; add to `.env.local` your private key from MetaMask
