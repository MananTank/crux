import { Label, LabeledMetric } from '../types';

function bounds(a: number, b: number) {
	return (value: number): Label => {
		if (value < a) return 'good';
		if (value < b) return 'average';
		return 'poor';
	};
}

const rater = {
	CLS: bounds(0.1, 0.5),
	LCP: bounds(2500, 4000),
	FID: bounds(100, 300),
	FCP: bounds(2000, 4000),
};

export function getLabel(metric: LabeledMetric): Label {
	// @ts-ignore
	return rater[metric.acronym](Number(metric.p75));
}
