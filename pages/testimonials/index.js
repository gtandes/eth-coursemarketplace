/* eslint-disable @next/next/no-img-element */
export default function Testimonials() {
	return (
		<section className='bg-white'>
			<div className='px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8 sm:py-24'>
				<div className='max-w-xl mx-auto text-center'>
					<h2 className='text-4xl font-bold tracking-tight sm:text-5xl'>
						Read trusted reviews from our customers
					</h2>

					{/* <p className='max-w-lg mx-auto mt-4 text-gring-offset-warm-gray-500'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
						praesentium natus sapiente commodi. Aliquid sunt tempore iste
						repellendus explicabo dignissimos placeat, autem harum dolore
						reprehenderit quis! Quo totam dignissimos earum.
					</p> */}
				</div>

				<div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-16'>
					<div>
						<img
							src='https://www.hyperui.dev/photos/man-4.jpeg'
							alt=''
							className='object-cover w-24 h-24 mx-auto rounded-full shadow-xl'
						/>

						<blockquote className='flex flex-col justify-between p-12 -mt-6 text-center rounded-lg shadow-xl'>
							<p className='text-lg font-bold text-gray-700'>GTA</p>
							<p className='mt-1 text-xs font-medium text-gray-500'>
								Digital Marketing at Studio
							</p>
							<p className='mt-4 text-sm text-gray-500'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Deserunt voluptatem alias ut provident sapiente repellendus.
							</p>

							<div className='flex space-x-0.5 justify-center mt-8 text-green-500'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
							</div>
						</blockquote>
					</div>

					<div>
						<img
							src='https://www.hyperui.dev/photos/man-4.jpeg'
							alt=''
							className='object-cover w-24 h-24 mx-auto rounded-full shadow-xl'
						/>

						<blockquote className='flex flex-col justify-between p-12 -mt-6 text-center rounded-lg shadow-xl'>
							<p className='text-lg font-bold text-gray-700'>GTA</p>
							<p className='mt-1 text-xs font-medium text-gray-500'>
								Digital Marketing at Studio
							</p>
							<p className='mt-4 text-sm text-gray-500'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Deserunt voluptatem alias ut provident sapiente repellendus.
							</p>

							<div className='flex space-x-0.5 justify-center mt-8 text-green-500'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
							</div>
						</blockquote>
					</div>

					<div>
						<img
							src='https://www.hyperui.dev/photos/man-4.jpeg'
							alt=''
							className='object-cover w-24 h-24 mx-auto rounded-full shadow-xl'
						/>

						<blockquote className='flex flex-col justify-between p-12 -mt-6 text-center rounded-lg shadow-xl'>
							<p className='text-lg font-bold text-gray-700'>GTA</p>
							<p className='mt-1 text-xs font-medium text-gray-500'>
								Digital Marketing at Studio
							</p>
							<p className='mt-4 text-sm text-gray-500'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Deserunt voluptatem alias ut provident sapiente repellendus.
							</p>

							<div className='flex space-x-0.5 justify-center mt-8 text-green-500'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
							</div>
						</blockquote>
					</div>

					<div>
						<img
							src='https://www.hyperui.dev/photos/man-4.jpeg'
							alt=''
							className='object-cover w-24 h-24 mx-auto rounded-full shadow-xl'
						/>

						<blockquote className='flex flex-col justify-between p-12 -mt-6 text-center rounded-lg shadow-xl'>
							<p className='text-lg font-bold text-gray-700'>GTA</p>
							<p className='mt-1 text-xs font-medium text-gray-500'>
								Digital Marketing at Studio
							</p>
							<p className='mt-4 text-sm text-gray-500'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Deserunt voluptatem alias ut provident sapiente repellendus.
							</p>

							<div className='flex space-x-0.5 justify-center mt-8 text-green-500'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
							</div>
						</blockquote>
					</div>

					<div>
						<img
							src='https://www.hyperui.dev/photos/man-4.jpeg'
							alt=''
							className='object-cover w-24 h-24 mx-auto rounded-full shadow-xl'
						/>

						<blockquote className='flex flex-col justify-between p-12 -mt-6 text-center rounded-lg shadow-xl'>
							<p className='text-lg font-bold text-gray-700'>GTA</p>
							<p className='mt-1 text-xs font-medium text-gray-500'>
								Digital Marketing at Studio
							</p>
							<p className='mt-4 text-sm text-gray-500'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Deserunt voluptatem alias ut provident sapiente repellendus.
							</p>

							<div className='flex space-x-0.5 justify-center mt-8 text-green-500'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
							</div>
						</blockquote>
					</div>

					<div>
						<img
							src='https://www.hyperui.dev/photos/man-4.jpeg'
							alt=''
							className='object-cover w-24 h-24 mx-auto rounded-full shadow-xl'
						/>

						<blockquote className='flex flex-col justify-between p-12 -mt-6 text-center rounded-lg shadow-xl'>
							<p className='text-lg font-bold text-gray-700'>GTA</p>
							<p className='mt-1 text-xs font-medium text-gray-500'>
								Digital Marketing at Studio
							</p>
							<p className='mt-4 text-sm text-gray-500'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Deserunt voluptatem alias ut provident sapiente repellendus.
							</p>

							<div className='flex space-x-0.5 justify-center mt-8 text-green-500'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
								</svg>
							</div>
						</blockquote>
					</div>
				</div>
			</div>
		</section>
	);
}
