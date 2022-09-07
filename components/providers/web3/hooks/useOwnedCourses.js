import { createCourseHash } from '@utils/createHash';
import { normalizeOwnedCourse } from '@utils/normalize';
import useSWR from 'swr';

export const handler = (web3, contract) => (courses, account) => {
	const swrResponse = useSWR(
		() => (web3 && contract && account ? `web3/ownedCourses/${account}` : null),

		async () => {
			const ownedCourses = [];

			for (let i = 0; i < courses.length; i++) {
				const course = courses[i];

				if (!course.id) {
					continue;
				}

				const courseHash = createCourseHash(web3)(course.id, account);

				const ownedCourse = await contract.methods
					.getCourseByHash(courseHash)
					.call();

				if (
					ownedCourse.owner !== '0x0000000000000000000000000000000000000000'
				) {
					const normalized = normalizeOwnedCourse(web3)(course, ownedCourse);
					ownedCourses.push(normalized);
				}
			}

			return ownedCourses;
		},
	);

	// console.log(swrResponse.data);

	// const swrDataToArray = Object.entries(swrResponse.data);

	return {
		...swrResponse,
		proofOfOwnership:
			swrResponse.data?.reduce((a, course) => {
				a[course.id] = course;
				return a;
			}, {}) ?? {},
	};
};
