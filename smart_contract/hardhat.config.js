//https://eth-ropsten.alchemyapi.io/v2/qSOG_a2yp00OHC2bkEfDWyvGDjr5uhG4

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/qSOG_a2yp00OHC2bkEfDWyvGDjr5uhG4",
      accounts: [
        "115568e9e270bf10e099269306ce4e019ac06c7bb0b3e5902e076bd40e28a729",
      ],
    },
  },
};
