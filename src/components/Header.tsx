import { useState } from 'react';
import { InfoIcon, githubIcon, sun, moon } from '../icons';
import styles from '../styles/Header.module.css';

export function Header() {
	const [isLightTheme, setIsLightTheme] = useState(true);
	return (
		<header className={styles.header}>
			<div className={styles.logoContainer}>
				<h1 className={styles.crux}> CrUX </h1>
			</div>
			<div className={styles.links}>
				<button
					aria-label='Switch Theme'
					className={styles.themeSwitcher}
					onClick={() => {
						if (isLightTheme) {
							document.body.classList.add('dark-mode');
						} else {
							document.body.classList.remove('dark-mode');
						}
						setIsLightTheme(!isLightTheme);
					}}>
					{isLightTheme ? sun : moon}
				</button>

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
		</header>
	);
}
