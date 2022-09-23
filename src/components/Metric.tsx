import { Bar } from './Bar';
import { getLabel } from '../utils/getLabel';
import { LabeledMetric } from '../types';
import styles from '../styles/Metric.module.css';

type MetricProps = {
	metric: LabeledMetric;
};

export function Metric({ metric }: MetricProps) {
	let label = getLabel(metric);
	return (
		<article>
			<h3 className={styles.title}>
				<span className={styles.name}> {metric.acronym} </span>
				<span className={`${styles.value} ${styles[label]}`}>
					<span> {metric.p75} </span>
					<span className={styles.unit}>{metric.acronym === 'CLS' ? '' : 'ms'}</span>
				</span>
			</h3>
			<Bar labeledBins={metric.labeledBins} />
		</article>
	);
}
