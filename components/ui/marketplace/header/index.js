import { useAccount } from '@components/hooks/web3';
import { Breadcrumbs } from '@components/ui/common';
import { EthRates, WalletBar } from '@components/ui/web3/web3';

const LINKS = [
	{ href: '/marketplace', value: 'Buy' },
	{ href: '/marketplace/courses/owned', value: 'My Courses' },
	{
		href: '/marketplace/courses/managed',
		value: 'Manage Courses',
		requireAdmin: true,
	},
];

export default function Header() {
	const { account } = useAccount();

	return (
		<>
			{account.data && (
				<div className='py-4'>
					<WalletBar />
				</div>
			)}

			<EthRates />

			<div className='flex flex-row-reverse p-4 sm:px-6 lg:px-8'>
				<Breadcrumbs items={LINKS} isAdmin={account.isAdmin} />
			</div>
		</>
	);
}
