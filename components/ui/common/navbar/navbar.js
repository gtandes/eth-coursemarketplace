import { useWeb3 } from '@components/providers';
import { ActiveLink, Button } from '@components/ui/common';
import { useAccount } from '@components/hooks/web3';
import { useRouter } from 'next/router';

export default function Navbar() {
	const { connect, requireInstall, isLoading } = useWeb3();
	const { account } = useAccount();
	const { pathname } = useRouter();

	const LEFTLINKS = [
		{ href: '/', value: 'Home' },
		{ href: '/marketplace', value: 'Marketplace' },
		{ href: '/testimonials', value: 'Testimonials' },
	];

	return (
		<section>
			<div className='relative pt-6 px-4 sm:px-6 lg:px-8'>
				<nav className='relative' aria-label='Global'>
					<div className='flex justify-between items-center'>
						<ol className='flex flex-row items-center leading-none text-indigo-600'>
							{LEFTLINKS.map((item) => {
								return (
									<div
										key={item.href}
										className={`mr-6 sm:mr-8 font-medium text-gray-500 hover:text-gray-900 last:${'justify-self-end'}`}>
										<ActiveLink href={item.href}>
											<a>{item.value}</a>
										</ActiveLink>
									</div>
								);
							})}
						</ol>

						<div className='text-center'>
							<ActiveLink href='/wishlist'>
								<i className='cis-cart-plus'></i>
							</ActiveLink>

							{isLoading ? (
								<Button
									disabled={true}
									className=' text-white bg-indigo-100 disabled:opacity-75 disabled:cursor-not-allowed'>
									Loading...
								</Button>
							) : account.data ? (
								<Button
									className='cursor-default'
									variant='purple'
									hoverable={false}>
									Connected {account.isAdmin && 'Admin!'}
								</Button>
							) : requireInstall ? (
								<Button
									onClick={() => {
										window.open('https://metamask.io/download.html', '_blank');
									}}
									variant='red'>
									Install Metamask
								</Button>
							) : (
								<Button onClick={connect}>Connect Wallet</Button>
							)}
						</div>
					</div>
				</nav>
			</div>

			{account.data && !pathname.includes('/marketplace') && (
				<div className='flex justify-end pt-1 sm:px-6 lg:px-8'>
					<div className=' text-white bg-indigo-600 rounded-md p-2'>
						{account.data}
					</div>
				</div>
			)}
		</section>
	);
}
