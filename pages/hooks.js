import { useEthPrice } from '@components/hooks/useEthPrice';
import { useState, useEffect } from 'react';

const useCounter = () => {
	const [count, setcount] = useState(0);

	useEffect(() => {
		setInterval(() => {
			setcount((c) => c + 1);
		}, 1000);
	}, []);

	return count;
};

const SimpleComponent = () => {
	const { eth } = useEthPrice();
	return <div>Simple Component {eth.data}</div>;
};

export default function HooksPage() {
	// const count = useCounter();
	// console.log('CALLING HOOKS PAGE');

	const { eth } = useEthPrice();

	return (
		<>
			<h1>nihao - {eth.data}</h1>
			<SimpleComponent />
		</>
	);
}
