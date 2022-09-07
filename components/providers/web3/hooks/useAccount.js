import { useEffect } from 'react';
import useSWR from 'swr';

const adminAddresses = {
	'0x8a3b0c46677195e99de7fa3d63436318a559e4e97272aad0628d207c2e29dbb6': true,
};

export const handler = (web3, provider) => () => {
	// SWR is a better data fetcher
	const { data, mutate, ...rest } = useSWR(
		() =>
			// web3/accounts is a critical identifier
			web3 ? 'web3/accounts' : null,
		async () => {
			const accounts = await web3.eth.getAccounts();
			const account = accounts[0];

			if (!account) {
				throw new Error(
					'No account can be retrieved.  Please refresh browser.',
				);
			}

			return account;
		},
	);

	useEffect(() => {
		const mutator = (accounts) => mutate(accounts[0] ?? null);

		provider?.on('accountsChanged', mutator);

		return () => {
			provider?.removeListener('accountsChanged', mutator);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [provider]);

	return {
		data,
		isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
		mutate,
		...rest,
	};
};

// const [account, setaccount] = useState(null);

// useEffect(() => {
// 	const getAccount = async () => {
// 		const accounts = await web3.eth.getAccounts();
// 		setaccount(accounts[0]);
// 	};

// 	web3 && getAccount();
// 	// eslint-disable-next-line react-hooks/exhaustive-deps
// }, [web3]);
