import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

import { setupHooks } from './hooks/setupHooks';
import { loadContract } from '@utils/loadContract';

const Web3Context = createContext(null);

const chainChangeListener = (provider) =>
	provider?.on('chainChanged', (_) => window.location.reload());

const createWeb3State = ({ web3, provider, contract, isLoading }) => {
	return {
		web3,
		provider,
		contract,
		isLoading,
		hooks: setupHooks({ web3, provider, contract }),
	};
};

export default function Web3Provider({ children }) {
	// set up web3 bridge to metamask
	const [web3Api, setWeb3Api] = useState(
		createWeb3State({
			web3: null,
			provider: null,
			contract: null,
			isLoading: true,
		}),
	);

	// set up provider
	useEffect(() => {
		const loadProvider = async () => {
			const provider = await detectEthereumProvider();
			// console.log(provider);

			if (provider) {
				const web3 = new Web3(provider);
				const contract = await loadContract('CourseMarketPlace', web3);

				chainChangeListener(provider);

				setWeb3Api(
					createWeb3State({
						web3,
						provider,
						contract,
						isLoading: false,
					}),
				);
			} else {
				setWeb3Api((api) => ({ ...api, isLoading: false }));
				console.error('Please install Metamask.');
			}
		};

		loadProvider();
	}, []);

	// connect to metamask
	const _web3API = useMemo(() => {
		const { web3, provider, isLoading } = web3Api;

		return {
			...web3Api,

			requireInstall: !isLoading && !web3,

			connect: provider
				? async () => {
						try {
							await provider.request({ method: 'eth_requestAccounts' });
						} catch {
							location.reload();
						}
				  }
				: () => {
						console.error(
							'Web3: Cannot connect to Metamask. Try to reload your browser.',
						);
				  },
		};
	}, [web3Api]);

	// return value of web3 provider wrapper component with context
	return (
		<Web3Context.Provider value={_web3API}>{children}</Web3Context.Provider>
	);
}

export function useWeb3() {
	return useContext(Web3Context);
}

export function useHooks(cb) {
	const { hooks } = useWeb3();

	return cb(hooks);
}
