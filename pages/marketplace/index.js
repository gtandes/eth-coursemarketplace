import { CourseCard, CourseList } from '@components/ui/course';
import { Button, Loader } from '@components/ui/common';
import { getAllCourses } from '@content/courses/fetcher';
import { useOwnedCourses, useWalletInfo } from '@components/hooks/web3';
import { OrderModal } from '@components/ui/order/';
import { useState } from 'react';
import { MarketplaceHeader } from '@components/ui/marketplace';
import { useWeb3 } from '@components/providers';
import { withToast } from '@utils/toast';

export default function Marketplace({ courses }) {
	const { web3, contract, isLoading } = useWeb3();
	const { hasConnectedWallet, account } = useWalletInfo();
	const { ownedCourses } = useOwnedCourses(courses, account.data);

	const [isNewPurchase, setisNewPurchase] = useState(true);
	const [selectedCourse, setselectedCourse] = useState(null);
	const [busyCourseId, setbusyCourseId] = useState(null);

	const purchaseCourse = async (order, course) => {
		const hexCourseID = web3.utils.utf8ToHex(course.id);

		const courseHash = web3.utils.soliditySha3(
			{
				type: 'bytes16',
				value: hexCourseID,
			},
			{
				type: 'address',
				value: account.data,
			},
		);

		const value = web3.utils.toWei(String(order.price));

		setbusyCourseId(course.id);

		if (isNewPurchase) {
			const emailHash = web3.utils.sha3(order.email);
			const proof = web3.utils.soliditySha3(
				{
					type: 'bytes32',
					value: emailHash,
				},
				{
					type: 'bytes32',
					value: courseHash,
				},
			);

			withToast(_purchaseCourse({ hexCourseID, proof, value }, course));
		} else {
			withToast(_repurchaseCourse({ courseHash, value }, course));
		}
	};

	const _purchaseCourse = async ({ hexCourseID, proof, value }, course) => {
		try {
			const promiseResult = await contract.methods
				.purchaseCourse(hexCourseID, proof)
				.send({ from: account.data, value: value });

			ownedCourses.mutate([
				...ownedCourses.data,
				{
					...course,
					proof,
					state: 'Purchased',
					owner: account.data,
					price: value,
				},
			]);

			return promiseResult;
		} catch (error) {
			throw new Error(error.message);
		} finally {
			setbusyCourseId(null);
		}
	};

	const _repurchaseCourse = async ({ courseHash, value }, course) => {
		try {
			const promiseResult = await contract.methods
				.repurchaseCourse(courseHash)
				.send({ from: account.data, value: value });

			const index = ownedCourses.data.findIndex((c) => c.id === course.id);

			if (index >= 0) {
				ownedCourses.data[index].state = 'Purchased';
				ownedCourses.mutate(ownedCourses.data);
			} else {
				ownedCourses.mutate();
			}

			return promiseResult;
		} catch (error) {
			throw new Error(error.message);
		} finally {
			setbusyCourseId(null);
		}
	};

	const cleanUpModal = () => {
		setselectedCourse(null);
		setisNewPurchase(true);
	};

	return (
		<>
			<MarketplaceHeader />

			{/* <Button onClick={notify}>Notify</Button> */}

			<CourseList courses={courses}>
				{(course) => {
					const ownedCourse = ownedCourses.proofOfOwnership[course.id];

					return (
						<CourseCard
							disabled={!hasConnectedWallet}
							course={course}
							key={course.id}
							state={ownedCourse?.state}
							Footer={() => {
								// if (requireInstall) {
								// 	return (
								// 		<Button variant='lightPurple' disabled={true}>
								// 			Install
								// 		</Button>
								// 	);
								// }

								if (isLoading) {
									return (
										<Button size='sm' variant='lightPurple' disabled={true}>
											<Loader size='sm' />
										</Button>
									);
								}

								if (!ownedCourses.hasInitialFetch) {
									<Button disabled={true} size='sm' variant='indigo'>
										{hasConnectedWallet ? 'Loading...' : 'Connect'}
									</Button>;
								}

								const isBusy = busyCourseId === course.id;

								if (ownedCourse) {
									return (
										<>
											<div className='flex'>
												<Button variant='green' disabled={true} size='sm'>
													Purchased &#10004;
												</Button>
												{ownedCourse.state === 'Deactivated' && (
													<div className='ml-1'>
														<Button
															size='sm'
															variant='purple'
															disabled={isBusy}
															onClick={() => {
																setisNewPurchase(false);
																setselectedCourse(course);
															}}>
															{isBusy ? (
																<div className='flex'>
																	<Loader size='sm' />
																	<div className='ml-2'> In Progress</div>
																</div>
															) : (
																<div>Repurchase</div>
															)}
														</Button>
													</div>
												)}
											</div>
										</>
									);
								}

								return (
									<Button
										size='sm'
										variant='lightPurple'
										onClick={() => {
											setselectedCourse(course);
										}}
										disabled={!hasConnectedWallet || isBusy}>
										{isBusy ? (
											<div className='flex'>
												<Loader size='sm' />
												<div className='ml-2'> In Progress</div>
											</div>
										) : (
											<div>Purchase</div>
										)}
									</Button>
								);
							}}
						/>
					);
				}}
			</CourseList>

			{selectedCourse && (
				<OrderModal
					onSubmit={(orderData, course) => {
						purchaseCourse(orderData, course);
						cleanUpModal();
					}}
					isNewPurchase={isNewPurchase}
					course={selectedCourse}
					onClose={cleanUpModal}
				/>
			)}
		</>
	);
}

export function getStaticProps() {
	const { data } = getAllCourses();

	return { props: { courses: data } };
}
