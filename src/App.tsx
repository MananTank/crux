import { Page } from './layouts/Page';
import { Mode } from './types';
import { ModeCtx } from './context';
import { useState, lazy, Suspense } from 'react';
import { ModeSelection } from './components/ModeSelection';
import { Loader } from './components/Loader';
import './App.css';
import { InfoIcon, githubIcon, AnalyticsIcon } from './icons';

const List = lazy(() => import('./layouts/List'));

export default function App() {
	const [mode, setMode] = useState<Mode>('url');

	return (
		<ModeCtx.Provider value={[mode, setMode]}>
			<main className='App container'>
				<div className='top-container'>
					<div className='logo-container'>
						{AnalyticsIcon}
						<h1> CrUX </h1>
					</div>
					<div className='links'>
						<a
							href='https://developer.chrome.com/docs/crux/about/'
							target='_blank'
							aria-label='what is CrUX?'
							title='What is CrUX?'>
							{InfoIcon}
						</a>

						<a href='https://github.com/MananTank/crux' target='_blank' aria-label='View on Github'>
							{githubIcon}
						</a>
					</div>
				</div>
				<ModeSelection />

				<Suspense fallback={<Loader />}>
					{mode === 'list' && <List />}
					{mode === 'url' && <Page key='url' />}
					{mode === 'origin' && <Page key='origin' />}
				</Suspense>
			</main>
			<footer>
				Copyright © 2022 <a href='https://twitter.com/MananTank_'>Manan Tank</a>
			</footer>
		</ModeCtx.Provider>
	);
}
