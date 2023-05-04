require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.10",
  networks: {
		// mumbai: {
    //   url: "https://polygon-mumbai.g.alchemy.com/v2/wmdBOXtEaWvXHg7heyWtrWHHaFFlfBP6",
    //   accounts: ["69b8fcaa5fcdf441cc7785cc75225313ce803f950633b2485486ca81ab1a837a"],
		// },
    mumbai: {
      url: process.env.STAGING_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      chainId: 1,
      url: process.env.PROD_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      chainId: 5,
      url: process.env.GOERLI_ALCHMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  }
};
