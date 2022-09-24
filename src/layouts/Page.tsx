import { useState, Suspense, useContext } from 'react';
import { Loader } from '../components/Loader';
import { ModeCtx } from '../context';
import { Mode } from '../types';
import styles from '../styles/Page.module.scss';
import Card from '../components/Card';
import { ClientOnly } from '../components/ClientOnly';

function getInitialURL(mode: Mode) {
	if (typeof window === 'undefined')
		return mode === 'url' ? 'https://web.dev/vitals/' : 'https://web.dev';
	const href = new URL(typeof window !== 'undefined' ? window.location.href : '');
	const testURL = href.searchParams.get('url');
	const defaultURL = mode === 'url' ? 'https://web.dev/vitals/' : 'https://web.dev';
	return testURL || defaultURL;
}

export function Page() {
	const [mode] = useContext(ModeCtx);
	const [url, setURL] = useState(() => getInitialURL(mode));

	return (
		<>
			<Input onSubmit={url => setURL(url)} value={url} />
			<ClientOnly fallback={<Loader />}>
				<Suspense fallback={<Loader />}>
					<main>
						<Card formFactor='PHONE' url={url} />
						<Card formFactor='DESKTOP' url={url} />
					</main>
				</Suspense>
			</ClientOnly>
		</>
	);
}

type InputProps = {
	onSubmit: (url: string) => any;
	value: string;
};

function Input({ onSubmit, value }: InputProps) {
	const [input, setInput] = useState(value);

	return (
		<div className={styles.inputContainer}>
			<input
				aria-label='Enter URL'
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
				GET CrUX
			</button>
		</div>
	);
}
