import { ModeCtx } from '../context';
import { useContext } from 'react';
import { Mode } from '../types';

type SelectModeProps = {
	mode: Mode;
	text: string;
};

export function SelectMode(props: SelectModeProps) {
	const { mode, text } = props;
	const [selectedMode, setMode] = useContext(ModeCtx);
	return (
		<button className={mode === selectedMode ? 'active' : ''} onClick={() => setMode(mode)}>
			{text}
		</button>
	);
}

export function ModeSelection() {
	return (
		<div className='options card'>
			<SelectMode mode='url' text='URL' />
			<SelectMode mode='origin' text='ORIGIN' />
			<SelectMode mode='list' text='URL LIST' />
		</div>
	);
}
