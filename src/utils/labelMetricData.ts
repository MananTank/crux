import { Metrics, LabeledMetric } from '../types';

const nameToAcronymMap = {
	first_contentful_paint: 'FCP',
	largest_contentful_paint: 'LCP',
	first_input_delay: 'FID',
	cumulative_layout_shift: 'CLS',
};

const standardBinLabels = ['good', 'needs-improvement', 'poor'];

export function labelMetricData(metrics: Metrics): LabeledMetric[] {
	const supportedMetrics = Object.keys(metrics).filter(k => k in nameToAcronymMap);

	return supportedMetrics.map(metricName => {
		// @ts-ignore
		const metricData = metrics[metricName];

		// @ts-ignore
		const labeledBins = metricData.histogram.map((bin, i) => {
			// Assign a good/poor label, calculate a percentage, and add retain all existing bin properties
			return {
				label: standardBinLabels[i],
				percentage: bin.density * 100,
				...bin,
			};
		});

		return {
			// @ts-ignore
			acronym: nameToAcronymMap[metricName],
			name: metricName,
			labeledBins,
			p75: metricData.percentiles.p75,
		};
	});
}
