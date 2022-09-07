import { useHooks, useWeb3 } from '@components/providers/web3';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const _isEmpty = (data) => {
	return (
		data == null ||
		data === '' ||
		(Array.isArray(data) && data.length === 0) ||
		(data.constructor === Object && Object.keys(data).length === 0)
	);
};

const enhanceHook = (swrResponse) => {
	const { data, error } = swrResponse;
	const hasInitialFetch = !!(data || error);
	const isEmpty = hasInitialFetch && _isEmpty(data);

	return {
		...swrResponse,
		isEmpty,
		hasInitialFetch,
	};
};

export const useNetwork = () => {
	const swrResponse = enhanceHook(useHooks((hooks) => hooks.useNetwork)());
	return { network: swrResponse };
};

export const useAccount = () => {
	const swrResponse = enhanceHook(useHooks((hooks) => hooks.useAccount)());
	return { account: swrResponse };
};

export const useAdministrator = ({ redirectTo }) => {
	const { account } = useAccount();
	const { requireInstall } = useWeb3();
	const router = useRouter();

	useEffect(() => {
		if (
			requireInstall ||
			(account.hasInitialFetch && !account.isAdmin) ||
			account.isEmpty
		) {
			router.push(redirectTo);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account]);

	return { account };
};

export const useWalletInfo = () => {
	const { account } = useAccount();
	const { network } = useNetwork();
	const hasConnectedWallet = !!(account.data && network.isSupported);
	// const isConnecting = !account.hasInitialFetch && !network.hasInitialFetch;

	return { account, network, hasConnectedWallet };
};

export const useOwnedCourses = (...args) => {
	const swrResponse = enhanceHook(
		useHooks((hooks) => hooks.useOwnedCourses)(...args),
	);

	return { ownedCourses: swrResponse };
};

export const useOwnedCourse = (...args) => {
	const swrResponse = enhanceHook(
		useHooks((hooks) => hooks.useOwnedCourse)(...args),
	);

	return { ownedCourse: swrResponse };
};

export const useManagedCourses = (...args) => {
	const swrResponse = enhanceHook(
		useHooks((hooks) => hooks.useManagedCourses)(...args),
	);

	return { managedCourses: swrResponse };
};
