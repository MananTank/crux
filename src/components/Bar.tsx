import { LabelledBin } from '../types';
import styles from '../styles/Bar.module.scss';

type BarProps = {
	labeledBins: LabelledBin[];
};

export function Bar({ labeledBins }: BarProps) {
	return (
		<div>
			<p className={styles.percentageContainer}>
				{labeledBins.map(bin => (
					<span className={styles[bin.label]} key={bin.label}>
						{(bin.percentage || 0).toFixed(2)}% {''}
					</span>
				))}
			</p>
			<div className={styles.barContainer} data-bar-container>
				{labeledBins.map(bin => {
					return (
						<div
							key={bin.label}
							style={{ width: bin.percentage + '%' }}
							className={styles[bin.label]}
						>
							{' '}
						</div>
					);
				})}
			</div>
		</div>
	);
}
