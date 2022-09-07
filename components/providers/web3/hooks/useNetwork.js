import { useEffect } from 'react';
import useSWR from 'swr';

const NETWORKS = {
	1: 'Ethereum Mainnet',
	3: 'Ropsten Testnet',
	4: 'Rinkeby Testnet',
	5: 'Goerli Testnet',
	42: 'Kovan Testnet',
	56: 'Binance SmartChain',
	1337: 'Ganache',
};

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

export const handler = (web3) => () => {
	const { data, ...rest } = useSWR(
		() => (web3 ? 'web3/network' : null),

		async () => {
			const chainID = await web3.eth.getChainId();

			if (!chainID) {
				throw new Error('No network can be retrieved. Please refresh browser.');
			}

			return NETWORKS[chainID];
		},
	);

	return {
		data,
		target: targetNetwork,
		isSupported: data === targetNetwork,
		...rest,
	};
};
