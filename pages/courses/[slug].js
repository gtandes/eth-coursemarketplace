import { useAccount, useOwnedCourse } from '@components/hooks/web3';
import { useWeb3 } from '@components/providers';
import { Message } from '@components/ui/common';
import {
	CourseHero,
	KeyPoints,
	Lectures,
	Modal,
} from '../../components/ui/course';

import { getAllCourses } from '../../content/courses/fetcher';

export default function Course({ course }) {
	const { isLoading } = useWeb3();
	const { account } = useAccount();
	const { ownedCourse } = useOwnedCourse(course, account.data);
	const courseState = ownedCourse.data?.state;
	// const courseState = 'Deactivated';
	// const courseState = 'Activated';
	// const courseState = 'Purchased';

	const isLocked =
		!courseState ||
		courseState === 'Purchased' ||
		courseState === 'Deactivated';

	return (
		<>
			<div className='py-5'>
				<CourseHero
					hasOwner={!!ownedCourse.data}
					title={course.title}
					description={course.description}
					image={course.coverImage}
				/>
			</div>

			<KeyPoints points={course.wsl} />

			{courseState && (
				<div className='max-w-5xl mx-auto'>
					{courseState === 'Purchased' && (
						<Message type='warning'>
							Course is purchased and is awaiting activation. Process can take
							up to 24 hours.
							<i className='block font-normal'>
								In case of any questions, please directly contact
								andesgregthomas@gmail.com
							</i>
						</Message>
					)}

					{courseState === 'Activated' && (
						<Message type='success'>
							GTA Media wishes you get what you want and need out of this
							course.
							<i className='block font-normal'>
								In case of any questions, please directly contact
								andesgregthomas@gmail.com
							</i>
						</Message>
					)}

					{courseState === 'Deactivated' && (
						<Message type='danger'>
							Course has been deactivated due to incorrect purchase data. The
							functionality for viewing the course has been temporarily
							disabled.
							<i className='block font-normal'>
								Please directly contact andesgregthomas@gmail.com
							</i>
						</Message>
					)}
				</div>
			)}

			<Lectures
				isLoading={isLoading}
				locked={isLocked}
				courseState={courseState}
			/>

			<div className='py-5'>
				<Modal />
			</div>
		</>
	);
}

export function getStaticPaths() {
	const { data } = getAllCourses();

	return {
		paths: data.map((course) => ({
			params: {
				slug: course.slug,
			},
		})),
		fallback: false,
	};
}

export function getStaticProps({ params }) {
	const { data } = getAllCourses();
	const filteredCourse = data.filter(
		(course) => course.slug === params.slug,
	)[0];

	return { props: { course: filteredCourse } };
}
