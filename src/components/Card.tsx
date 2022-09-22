import { getData } from '../API/getData';
import { CRUXRequestBody } from '../types';
import { labelMetricData } from '../utils/labelMetricData';
import { Metric } from './Metric';
import useSWR from 'swr';
import { mobileIcon, desktopIcon } from '../icons';
import { useContext } from 'react';
import { ModeCtx } from '../context';

type CardProps = {
	formFactor: 'PHONE' | 'DESKTOP';
	url?: string;
	origin?: string;
	compact?: boolean;
};

export function Card(props: CardProps) {
	const [mode] = useContext(ModeCtx);
	const { formFactor, url, compact } = props;

	const request: CRUXRequestBody = { formFactor };
	if (mode === 'origin') {
		request.origin = url;
	} else {
		request.url = url;
	}

	const { data } = useSWR(url + mode, () => getData(request), {
		suspense: true,
	});

	if (!data) return null;

	return (
		<article>
			<div
				className={`card web-vitals-card ${compact ? 'compact' : ''} ${
					'error' in data ? 'error' : ''
				}`}>
				<h2 className='device' title={formFactor}>
					{formFactor === 'PHONE' ? mobileIcon : desktopIcon}
				</h2>

				{'error' in data ? (
					<p className='error'> {data.error.message}</p>
				) : (
					<div className='web-vitals-container'>
						{labelMetricData(data.record.metrics).map(metric => (
							<Metric compact={compact} metric={metric} key={metric.name} />
						))}
					</div>
				)}
			</div>
		</article>
	);
}
