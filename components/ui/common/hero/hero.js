import Link from 'next/link';
import Typewriter from 'typewriter-effect';

export default function Hero() {
	return (
		<section className='text-white sm:my-8'>
			<div className='px-4 py-16 mx-auto max-w-screen-xl lg:items-center lg:flex'>
				<div className='mx-auto text-center'>
					<div className='text-4xl font-extrabold text-transparent sm:text-7xl bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-800 pb-4'>
						<Typewriter
							options={{
								strings: ['Grow Your Life', 'As a Developer'],
								autoStart: true,
								loop: true,
							}}
						/>
					</div>

					<div className='space-between flex sm:flex-wrap sm:justify-center mt-8 gap-4'>
						<Link href='/marketplace'>
							<a className='block w-full px-12 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded sm:w-auto active:text-opacity-75 hover:bg-transparent hover:text-black focus:outline-none focus:ring'>
								Get Started
							</a>
						</Link>

						<Link href='/testimonials'>
							<a className='block w-full px-12 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded sm:w-auto active:text-opacity-75 hover:bg-transparent hover:text-black focus:outline-none focus:ring'>
								Learn More
							</a>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
