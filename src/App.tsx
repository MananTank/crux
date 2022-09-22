import { Page } from './layouts/Page';
import { Mode } from './types';
import { ModeCtx } from './context';
import { useState, lazy, Suspense } from 'react';
import { ModeSelection } from './components/ModeSelection';
import { Loader } from './components/Loader';
import './App.css';

const List = lazy(() => import('./layouts/List'));

export default function App() {
	const [mode, setMode] = useState<Mode>('url');

	return (
		<ModeCtx.Provider value={[mode, setMode]}>
			<div className='App container'>
				<ModeSelection />

				<Suspense fallback={<Loader />}>
					{mode === 'list' && <List />}
					{mode === 'url' && <Page key='url' />}
					{mode === 'origin' && <Page key='origin' />}
				</Suspense>
			</div>
		</ModeCtx.Provider>
	);
}
