import { useEthPrice } from '@components/hooks/useEthPrice';
import { Button } from '@components/ui/common';
import { Modal } from '@components/ui/course';
import { useState, useEffect } from 'react';

const defaultOrder = { price: '', email: '', confirmationEmail: '' };

const _createFormState = (isDisabled = false, message = '') => ({
	isDisabled,
	message,
});

const createFormState = (
	{ price, email, confirmationEmail },
	hasAgreedToTOS,
	isNewPurchase,
) => {
	if (!price || Number(price) <= 0) {
		return _createFormState(true, 'Price is not a number!');
	}
	if (isNewPurchase) {
		if (email.length === 0 || confirmationEmail.length === 0) {
			return _createFormState(true, 'Please submit valid email.');
		} else if (email !== confirmationEmail) {
			return _createFormState(true, 'Make sure emails match.');
		}
	}

	if (!hasAgreedToTOS) {
		return _createFormState(true, 'Must accept terms of service.');
	}
	return _createFormState();
};

export default function OrderModal({
	course,
	onClose,
	onSubmit,
	isNewPurchase,
}) {
	const [isOpen, setisOpen] = useState(false);
	const [order, setorder] = useState(defaultOrder);
	const [enablePriceCorrection, setenablePriceCorrection] = useState(false);
	const [hasAgreedToTOS, sethasAgreedToTOS] = useState(false);
	const { eth } = useEthPrice();

	useEffect(() => {
		if (!!course) {
			setisOpen(true);
			setorder({ ...defaultOrder, price: eth.perItem });
		}
	}, [course, eth.perItem]);

	const closeModal = () => {
		setisOpen(false);
		setorder(defaultOrder);
		setenablePriceCorrection(false);
		sethasAgreedToTOS(false);
		onClose();
	};

	const formState = createFormState(order, hasAgreedToTOS, isNewPurchase);

	return (
		<Modal isOpen={isOpen}>
			<div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
				<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
					<div className='sm:flex sm:items-start'>
						<div className='mt-3 sm:mt-0 sm:ml-4 sm:text-left'>
							<h3
								className='mb-7 text-lg font-bold leading-6 text-gray-900'
								id='modal-title'>
								{course.title}
							</h3>
							<div className='mt-1 relative rounded-md'>
								<div className='mb-1'>
									<label className='mb-2 font-bold'>Price(eth)</label>
									<div className='text-xs text-gray-700 flex'>
										<label className='flex items-center mr-2'>
											<input
												checked={enablePriceCorrection}
												onChange={(event) => {
													const checked = event.target.checked;

													setorder({
														...order,
														price: checked ? order.price : eth.perItem,
													});

													setenablePriceCorrection(checked);
												}}
												type='checkbox'
												className='form-checkbox'
											/>
										</label>
										<span>
											Adjust Price - only when the price is not correct
										</span>
									</div>
								</div>

								<input
									disabled={!enablePriceCorrection}
									onChange={(event) => {
										const value = event.target.value;

										if (isNaN(value)) {
											return;
										}

										setorder({ ...order, price: value });
									}}
									value={order.price}
									type='text'
									name='price'
									id='price'
									className='disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md'
								/>
								<p className='text-xs text-gray-700'>
									Price will be verified at the time of the order. If the price
									will be lower, order can be declined (+- 2% slippage is
									allowed)
								</p>
							</div>

							{isNewPurchase && (
								<>
									<div className='mt-2 relative rounded-md'>
										<div className='mb-1'>
											<label className='mb-2 font-bold'>Email</label>
										</div>

										<input
											onChange={(event) => {
												const value = event.target.value;

												setorder({ ...order, email: value.trim() });
											}}
											type='email'
											name='email'
											id='email'
											className='w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md'
											placeholder='x@y.com'
										/>

										<p className='text-xs text-gray-700 mt-1'>
											It&apos;s important to fill a correct email, otherwise the
											order cannot be verified. We are not storing your email
											anywhere
										</p>
									</div>

									<div className='my-2 relative rounded-md'>
										<div className='mb-1'>
											<label className='mb-2 font-bold'>Repeat Email</label>
										</div>

										<input
											onChange={(event) => {
												const value = event.target.value;

												setorder({ ...order, confirmationEmail: value.trim() });
											}}
											type='email'
											name='confirmationEmail'
											id='confirmationEmail'
											className='w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md'
											placeholder='x@y.com'
										/>
									</div>
								</>
							)}

							<div className='text-xs text-gray-700 flex mt-5'>
								<label className='flex items-center mr-2'>
									<input
										checked={hasAgreedToTOS}
										onChange={(event) => {
											const checked = event.target.checked;
											sethasAgreedToTOS(checked);
										}}
										type='checkbox'
										className='form-checkbox'
									/>
								</label>
								<span>
									I accept GTA &apos;terms of service&apos; and I agree that my
									order can be rejected in the case data provided above are not
									correct
								</span>
							</div>

							{formState.message && (
								<div className='p-4 my-3 text-yellow-700 bg-yellow-200 rounded-lg text-sm'>
									{formState.message}
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex'>
					<Button
						disabled={formState.isDisabled}
						onClick={() => {
							onSubmit(order, course);
						}}>
						Submit
					</Button>
					<Button variant='red' onClick={closeModal}>
						Cancel
					</Button>
				</div>
			</div>
		</Modal>
	);
}
