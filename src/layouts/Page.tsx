import { Card } from '../components/Card';
import { useState, Suspense, useContext } from 'react';
import { Loader } from '../components/Loader';
import { ModeCtx } from '../context';
import { Mode } from '../types';

function getInitialURL(mode: Mode) {
	const href = new URL(window.location.href);
	const testURL = href.searchParams.get('url');
	const defaultURL = mode === 'url' ? 'https://web.dev/vitals/' : 'https://web.dev';
	return testURL || defaultURL;
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
	const [mode] = useContext(ModeCtx);
	const [url, setURL] = useState(() => getInitialURL(mode));

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
