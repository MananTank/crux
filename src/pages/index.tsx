import { Page } from '../layouts/Page';
import { List } from '../layouts/List';
import { Mode } from '../types';
import { ModeCtx } from '../context';
import { useState } from 'react';
import { ModeSelection } from '../components/ModeSelection';
import { Header } from '../components/Header';
import styles from '../styles/App.module.scss';
import Head from 'next/head';

export default function App() {
	const [mode, setMode] = useState<Mode>('url');

	return (
		<div id='root'>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='description' content='Get CrUX data for any webpage' />
				<title>CrUX</title>
			</Head>
			<ModeCtx.Provider value={[mode, setMode]}>
				<main className={styles.app}>
					<Header />
					<ModeSelection />
					{mode === 'list' && <List />}
					{mode === 'url' && <Page key='url' />}
					{mode === 'origin' && <Page key='origin' />}
				</main>
				<footer className={styles.footer}>
					Copyright © 2022 <a href='https://twitter.com/MananTank_'>Manan Tank</a>
				</footer>
			</ModeCtx.Provider>
		</div>
	);
}
