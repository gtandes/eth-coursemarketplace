//use stable version of hdwalletprovider @1.5.1; latest version has bugs
const HDWalletProvider = require('@truffle/hdwallet-provider');
const keys = require('./keys.json');

module.exports = {
	contracts_build_directory: './public/contracts',

	networks: {
		development: {
			host: '127.0.0.1', // Localhost (default: none)
			port: 7545, // Standard Ethereum port (default: none)
			network_id: '*', // Any network (default: none)
		},
		ropsten: {
			// must be a thunk, otherwise truffle commands may hang in CI
			provider: () =>
				new HDWalletProvider({
					mnemonic: {
						phrase: keys.MNEMONIC,
					},

					// MNEMONIC: keys.MNEMONIC,
					// privateKeys: keys.MNEMONIC,
					providerOrUrl: `https://ropsten.infura.io/v3/${keys.INFURA_PROJECT_ID}`,
					addressIndex: 1,
				}),
			network_id: '3',
			gas: 5500000, //gas limit, maximum spend,
			gasPrice: 20000000000, //how much we are willing to pay for every unit of gas
			confirmations: 2, // number of blocks to wait between deployment
			timeoutBlocks: 200, //number of blocks before deployment times out
		},
	},

	// Configure your compilers
	compilers: {
		solc: {
			version: '0.8.16',
		},
	},
};
