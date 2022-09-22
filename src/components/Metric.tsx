import { Bar } from './Bar';
import { getRating } from '../utils/getRating';
import { LabeledMetric } from '../types';

type MetricProps = {
	metric: LabeledMetric;
	compact?: boolean;
};

export function Metric({ metric, compact }: MetricProps) {
	let rating = getRating(metric);
	return (
		<article className={compact ? 'web-vital-compact' : ''}>
			<h3 className='web-vital--acronym'>
				<span className='web-vital-name'> {metric.acronym}</span>
				<span className={`web-vital-value ${rating}`}>
					<span className={rating}> {metric.p75} </span>
					<span className='unit'>{metric.acronym === 'CLS' ? '' : 'ms'} </span>
				</span>
			</h3>
			<Bar labeledBins={metric.labeledBins} />
		</article>
	);
}
