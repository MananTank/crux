import { Suspense, useState } from 'react';
import { Card } from '../components/Card';
import { Loader } from '../components/Loader';

type TextAreaProps = {
	value: string;
	onClick: (str: string) => any;
};

export function TextAreaContainer({ value, onClick }: TextAreaProps) {
	const [input, setInput] = useState(value);

	return (
		<div className='container card textarea-container'>
			<textarea
				className='url-list'
				value={input}
				onChange={e => {
					setInput(e.target.value);
				}}></textarea>
			<button type='button' onClick={() => onClick(input)}>
				FETCH CRUX
			</button>
		</div>
	);
}

export function CompactList({ urls }: { urls: string[] }) {
	return (
		<main>
			{urls.map((url: string, i: number) => {
				return (
					<Suspense fallback={<Loader />} key={url}>
						<div className='compact-container card' key={url + i}>
							<h2 className='url'> {url}</h2>
							<div className='side-by-side'>
								<Card compact={true} formFactor='PHONE' url={url} />
								<hr className='line' />
								<Card compact={true} formFactor='DESKTOP' url={url} />
							</div>
						</div>
					</Suspense>
				);
			})}
		</main>
	);
}

const defaultURLList = `\
https://web.dev/lcp/
https://web.dev/fid/
https://web.dev/cls/`;

export default function PageListWebVitals() {
	const [urlList, setURLList] = useState(defaultURLList);
	return (
		<>
			<TextAreaContainer onClick={setURLList} value={urlList} />
			<CompactList urls={urlList.split('\n').filter(s => s.trim() !== '')} />
		</>
	);
}
