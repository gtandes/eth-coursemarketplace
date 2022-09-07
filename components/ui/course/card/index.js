import Image from 'next/image';
import Link from 'next/link';
import { AnimateKeyframes } from 'react-simple-animate';

export default function Card({ course, disabled, Footer, state }) {
	return (
		<div className='bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
			<div className='flex h-full'>
				<div className='flex-1 relative w-full h-full'>
					<Image
						className={`object-cover ${disabled && 'filter grayscale'}`}
						layout='fill'
						src={course.coverImage}
						alt={course.title}
					/>
				</div>
				<div className='p-8 pb-8 flex-2'>
					<div className='flex items-center'>
						<div className='uppercase mr-2 tracking-wide text-sm text-indigo-500 font-semibold'>
							{course.type}
						</div>

						<div>
							{state === 'Activated' && (
								<div className='text-xs text-black bg-green-200 p-1 px-3 rounded-full'>
									Activated
								</div>
							)}
							{state === 'Deactivated' && (
								<div className='text-xs text-black bg-red-200 p-1 px-3 rounded-full'>
									Deactivated
								</div>
							)}
							{state === 'Purchased' && (
								<AnimateKeyframes
									play
									duration={2}
									keyframes={['opacity: 0.5', 'opacity: 1']}
									iterationCount='infinite'>
									<div className='text-xs text-black bg-yellow-300 p-1 px-3 rounded-full'>
										Pending
									</div>
								</AnimateKeyframes>
							)}
						</div>
					</div>

					<Link href={`/courses/${course.slug}`}>
						<a className='h-12 block mt-1 text-sm sm:text-base leading-tight font-medium text-black hover:underline'>
							{course.title}
						</a>
					</Link>
					<p className='mt-2 mb-4 text-sm sm:text-base text-gray-500'>
						{course.description.substring(0, 70)}...
					</p>
					{Footer && (
						<div className='mt-4'>
							<Footer />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}