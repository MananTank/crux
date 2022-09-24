import { Suspense, useState } from 'react';
import { Loader } from '../components/Loader';
import styles from '../styles/List.module.scss';
import Card from '../components/Card';
import { ClientOnly } from '../components/ClientOnly';

type TextAreaProps = {
	value: string;
	onClick: (str: string) => any;
};

export function TextAreaContainer({ value, onClick }: TextAreaProps) {
	const [input, setInput] = useState(value);

	return (
		<div className={styles.inputContainer}>
			<textarea
				value={input}
				onChange={e => {
					setInput(e.target.value);
				}}
			></textarea>
			<button type='button' onClick={() => onClick(input)}>
				GET CrUX
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
						<div className={styles.compactList} key={url + i}>
							<h2 className={styles.url}> {url}</h2>
							<div>
								<Card formFactor='PHONE' url={url} />
								<hr className={styles.line} />
								<Card formFactor='DESKTOP' url={url} />
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

export function List() {
	const [urlList, setURLList] = useState(defaultURLList);
	const urls = urlList.split('\n').filter(s => s.trim() !== '');
	return (
		<>
			<TextAreaContainer onClick={setURLList} value={urlList} />
			<ClientOnly fallback={<Loader />}>
				<CompactList urls={urls} />
			</ClientOnly>
		</>
	);
}
