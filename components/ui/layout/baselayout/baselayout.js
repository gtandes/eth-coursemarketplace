import { Web3Provider } from '../../../providers/index';
import { Navbar, Footer } from '../../common';

export default function BaseLayout({ children }) {
	return (
		<Web3Provider>
			<div className='max-w-7xl mx-auto px-4'>
				<Navbar />
				<div className='fit'>{children}</div>
			</div>
			<Footer />
		</Web3Provider>
	);
}

// npx tailwindcss -i ./styles/globals.css -o ./dist/output.css --watch
