import { ModeCtx } from '../context';
import { useContext } from 'react';
import { Mode } from '../types';
import styles from '../styles/ModeSelection.module.scss';

type SelectModeProps = {
	mode: Mode;
	text: string;
};

export function SelectMode(props: SelectModeProps) {
	const { mode, text } = props;
	const [selectedMode, setMode] = useContext(ModeCtx);
	return (
		<button className={mode === selectedMode ? styles.active : ''} onClick={() => setMode(mode)}>
			{text}
		</button>
	);
}

export function ModeSelection() {
	const [mode] = useContext(ModeCtx);
	return (
		<div className={styles.options} data-mode={mode}>
			<div className={styles.bg}></div>
			<SelectMode mode='url' text='URL' />
			<SelectMode mode='origin' text='ORIGIN' />
			<SelectMode mode='list' text='URL LIST' />
		</div>
	);
}
