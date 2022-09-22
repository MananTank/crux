import { LabelledBin } from '../types';

type BarProps = {
	labeledBins: LabelledBin[];
};

export function Bar({ labeledBins }: BarProps) {
	return (
		<section>
			<p className='percentage'>
				{labeledBins.map(bin => (
					<span className={bin.label} key={bin.label}>
						{(bin.percentage || 0).toFixed(2)}% {''}
					</span>
				))}
			</p>
			<div className='box-container'>
				{labeledBins.map(bin => {
					return (
						<div
							key={bin.label}
							style={{ width: bin.percentage + '%' }}
							className={`box-${bin.label.replace(' ', '-')}`}>
							{' '}
						</div>
					);
				})}
			</div>
		</section>
	);
}
