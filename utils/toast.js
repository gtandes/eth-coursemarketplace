import { toast } from 'react-toastify';

export const withToast = (promise) => {
	toast.promise(
		promise,
		{
			pending: {
				render() {
					return (
						<div className='py-2 p-6'>
							<p className='mb-2'>Transaction under process.</p>
							<p>Hang tight...</p>
						</div>
					);
				},
				icon: false,
			},

			success: {
				render({ data }) {
					return (
						<div>
							<p className='font-bold'>
								Tx: {data.transactionHash.slice(0, 15)}...
							</p>
							<p>Successful transaction!</p>
							<a
								href={`https://ropsten.etherscan.io/tx/${data.transactionHash}`}
								target='_blank'
								rel='noreferrer'>
								<i className='text-indigo-600 underline'>
									See transaction details.
								</i>
							</a>
						</div>
					);
				},
				// other options
				icon: '🟢',
			},

			error: {
				render({ data }) {
					// When the promise rejects, data will contain the error
					return <div>{data.message ?? 'Transaction failed.'}</div>;
				},
				icon: '🤯',
			},
		},
		{ closeButton: true },
	);
};
