import { Card } from '../components/Card';
import { useState, Suspense } from 'react';
import { Loader } from '../components/Loader';

function getInitialURL() {
	const href = new URL(window.location.href);
	const testURL = href.searchParams.get('url');
	return testURL || 'https://www.google.com';
}

type InputProps = {
	onSubmit: (url: string) => any;
	value: string;
};

export function Input({ onSubmit, value }: InputProps) {
	const [input, setInput] = useState(value);

	return (
		<div className='input-container'>
			<input
				onChange={event => {
					setInput(event.target.value);
				}}
				value={input}
				type='url'
				onKeyDown={event => {
					if (event.key === 'Enter') onSubmit(input);
				}}
			/>
			<button type='button' onClick={() => onSubmit(input)}>
				FETCH CRUX
			</button>
		</div>
	);
}

export function Page() {
	const [url, setURL] = useState(getInitialURL);

	return (
		<>
			<Input onSubmit={url => setURL(url)} value={url} />
			<Suspense fallback={<Loader />}>
				<main>
					<Card formFactor='PHONE' url={url} />
					<Card formFactor='DESKTOP' url={url} />
				</main>
			</Suspense>
		</>
	);
}
