import { LabeledMetric } from '../types';

export function getRating(metric: LabeledMetric) {
	let rating = 'good';
	const acronym = metric.acronym;
	const value = Number(metric.p75);

	if (acronym === 'CLS') {
		if (value > 0.5) rating = 'poor';
		else if (value > 0.1) rating = 'needs-improvement';
	} else if (acronym === 'LCP') {
		if (value > 4000) rating = 'poor';
		else if (value > 2500) rating = 'needs-improvement';
	} else if (acronym === 'FID') {
		if (value > 300) rating = 'poor';
		else if (value > 100) rating = 'needs-improvement';
	} else if (acronym === 'FCP') {
		if (value > 4000) rating = 'poor';
		else if (value > 2000) rating = 'needs-improvement';
	}
	return rating;
}
