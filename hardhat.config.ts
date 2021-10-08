import { task } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import dotenv from 'dotenv';

// Load environment variables.
dotenv.config();

task('revert', 'send evm_revert request')
  .addParam('snapshot', 'The snapshot id')
  .setAction(async (args, hre) => {
    await hre.network.provider.send('evm_revert', [args.snapshot]);
    console.log('evm_revert success');
  });

task('accounts', 'Prints the list of accounts', async (args, hre) => {
  // eslint-disable-next-line no-undef
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
  const namedAccounts = await hre.getNamedAccounts();
  for (const name in namedAccounts) {
    console.log(`"${name}"`, namedAccounts[name]);
  }
});

task('contracts', 'Prints the contract addresses for a network').setAction(async (args, hre) => {
  // eslint-disable-next-line no-undef
  const contracts = await hre.deployments.all();
  for (const contract in contracts) {
    console.log(contract, contracts[contract].address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      live: false,
      saveDeployments: true,
      hardfork: 'london',
      chainId: +(process.env.CHAIN_ID || 31337),
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
        blockNumber: 13379500
      },
      initialBaseFeePerGas: 0,
      accounts: [{
        balance: '100000' + '000000000000000000',  // 100000eth
        address: process.env.HARDHAT_DEPLOYER_PUBLIC_KEY,
        privateKey: process.env.HARDHAT_DEPLOYER_PRIVATE_KEY,
      }],
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      timeout: 20 * 60 * 1000,
    },
    'eth-mainnet': {
      url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts: [
        process.env.MAINNET_DEPLOYER_PRIVATEKEY
      ],
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    }
  }
};
