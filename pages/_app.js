import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '../dist/output.css';

import { BaseLayout } from '../components/ui/layout/layout';

function MyApp({ Component, pageProps }) {
	return (
		<BaseLayout>
			<ToastContainer />
			<Component {...pageProps} />
		</BaseLayout>
	);
}

export default MyApp;
