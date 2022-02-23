//https://eth-ropsten.alchemyapi.io/v2/qSOG_a2yp00OHC2bkEfDWyvGDjr5uhG4

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/qSOG_a2yp00OHC2bkEfDWyvGDjr5uhG4",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
