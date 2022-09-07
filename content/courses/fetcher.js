import courses from './content.json';

// export default function Fetcher(second) {
// 	third;
// }

export const getAllCourses = () => {
	return {
		data: courses,
		courseMap: courses.reduce((a, c, i) => {
			a[c.id] = c;
			a[c.id].index = i;
			return a;
		}, {}),
	};
};
