import { useAdministrator, useManagedCourses } from '@components/hooks/web3';
import { useWeb3 } from '@components/providers';
import { Button, Message } from '@components/ui/common';
import { CourseFilter, ManagedCourseCard } from '@components/ui/course';
import { MarketplaceHeader } from '@components/ui/marketplace';
import { normalizeOwnedCourse } from '@utils/normalize';
import { withToast } from '@utils/toast';
import { useState } from 'react';

const VerificationInput = ({ onVerify }) => {
	const [email, setemail] = useState('');
	return (
		<div className='flex mr-2 relative rounded-md'>
			<input
				value={email}
				onChange={({ target: { value } }) => {
					setemail(value);
				}}
				type='text'
				name='account'
				id='account'
				className='w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md'
				placeholder='0x2341ab...'
			/>
			<Button onClick={() => onVerify(email)}>Verify</Button>
		</div>
	);
};

export default function ManagedCourses() {
	const { web3, contract } = useWeb3();
	const [proofOfOwnership, setproofOfOwnership] = useState({});
	const [searchedCourse, setsearchedCourse] = useState(null);
	const [filters, setfilters] = useState({ state: 'All' });
	const { account } = useAdministrator({ redirectTo: '/marketplace' });
	const { managedCourses } = useManagedCourses(account);

	const verifyCourse = (email, { courseHash, proof }) => {
		if (!email) return;

		const emailHash = web3.utils.sha3(email);
		const proofToCheck = web3.utils.soliditySha3(
			{ type: 'bytes32', value: emailHash },
			{ type: 'bytes32', value: courseHash },
		);

		proofToCheck === proof
			? setproofOfOwnership({ ...proofOfOwnership, [courseHash]: true })
			: setproofOfOwnership({ ...proofOfOwnership, [courseHash]: false });
	};

	const changeCourseState = async (courseHash, method) => {
		try {
			const promiseResult = await contract.methods[method](courseHash).send({
				from: account.data,
			});
			return promiseResult;
		} catch (e) {
			throw new Error(e.message);
		}
	};

	const activateCourse = async (courseHash) => {
		withToast(changeCourseState(courseHash, 'activateCourse'));
	};

	const deactivateCourse = async (courseHash) => {
		withToast(changeCourseState(courseHash, 'deactivateCourse'));
	};

	const renderCard = (course) => {
		return (
			<ManagedCourseCard key={course.ownedCourseId} course={course}>
				<VerificationInput
					onVerify={(email) => {
						verifyCourse(email, {
							courseHash: course.courseHash,
							proof: course.proof,
						});
					}}
				/>

				{proofOfOwnership[course.courseHash] && (
					<div className='mt-2'>
						<Message>Verified!</Message>
					</div>
				)}

				{proofOfOwnership[course.courseHash] === false && (
					<div className='mt-2'>
						<Message type='danger'>
							Owner proof and checked proof mismatch!
						</Message>
					</div>
				)}

				{course.state === 'Purchased' && (
					<div>
						<Button
							className='mt-2'
							variant='green'
							onClick={() => activateCourse(course.courseHash)}>
							Activate
						</Button>

						<Button
							className='mt-2'
							variant='red'
							onClick={() => deactivateCourse(course.courseHash)}>
							Deactivate
						</Button>
					</div>
				)}
			</ManagedCourseCard>
		);
	};

	if (!account.isAdmin) {
		return null;
	}

	const searchText = async (courseHash) => {
		const re = /[0-9A-Fa-f]{6}/g;

		if (courseHash && courseHash.length === 66 && re.test(courseHash)) {
			const course = await contract.methods.getCourseByHash(courseHash).call();

			if (course.owner !== '0x0000000000000000000000000000000000000000') {
				const normalizedCourse = normalizeOwnedCourse(web3)(
					{ courseHash },
					course,
				);

				setsearchedCourse(normalizedCourse);
				return;
			}
		}

		setsearchedCourse(null);
		// alert(courseHash);
	};

	const filterSelector = (value) => setfilters({ state: value });

	const filteredCourses = managedCourses.data
		?.filter((course) => {
			if (filters.state === 'All') {
				return true;
			}

			return course.state === filters.state;
		})
		.map((course) => renderCard(course));

	return (
		<>
			<MarketplaceHeader />
			<CourseFilter
				onSearchSubmit={searchText}
				filterSelector={filterSelector}
			/>

			<section className='grid grid-cols-1'>
				{searchedCourse ? (
					<div>
						<h1 className='text-2xl font-bold px-5 mb-1'>Search Result</h1>
						{renderCard(searchedCourse)}
					</div>
				) : (
					<div>
						<h1 className='text-2xl font-bold px-5 mb-1'>All Courses</h1>
						{filteredCourses}
						{filteredCourses?.length === 0 && (
							<Message type='warning'>There are no courses to manage.</Message>
						)}
					</div>
				)}
			</section>
		</>
	);
}
