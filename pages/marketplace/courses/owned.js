import { useOwnedCourses, useWalletInfo } from '@components/hooks/web3';
import { useWeb3 } from '@components/providers';
import { Button, Message } from '@components/ui/common';
import { OwnedCourseCard } from '@components/ui/course';
import { MarketplaceHeader } from '@components/ui/marketplace';
import { getAllCourses } from '@content/courses/fetcher';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function OwnedCourses({ courses }) {
	const { requireInstall } = useWeb3();
	const router = useRouter();
	const { account } = useWalletInfo();
	const { ownedCourses } = useOwnedCourses(courses, account.data);

	return (
		<>
			<MarketplaceHeader />

			<section className='grid grid-cols-1'>
				{ownedCourses.isEmpty && (
					<div className='w-1/2'>
						<Message type='warning'>
							<div>You do not own any courses yet.</div>
							<Link href='/marketplace'>
								<a className='font-normal hover:underline'>
									<i>Purchase course.</i>
								</a>
							</Link>
						</Message>
					</div>
				)}

				{account.isEmpty && (
					<div className='w-1/2'>
						<Message type='warning'>
							<div>Please connect your account to Metamask.</div>
						</Message>
					</div>
				)}

				{requireInstall && (
					<div className='w-1/2'>
						<Message type='warning'>
							<div>Please install Metamask.</div>
						</Message>
					</div>
				)}

				{ownedCourses.data?.map((course) => (
					<OwnedCourseCard key={course.id} course={course}>
						<Button onClick={() => router.push(`/courses/${course.slug}`)}>
							Watch the course
						</Button>
					</OwnedCourseCard>
				))}
			</section>
		</>
	);
}

export function getStaticProps() {
	const { data } = getAllCourses();

	return { props: { courses: data } };
}
