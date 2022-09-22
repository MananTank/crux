export type CRUXRequestBody = {
	// use one of these two
	origin?: string;
	url?: string;
	formFactor: 'DESKTOP' | 'PHONE';
	metrics?: ('LCP' | 'FID' | 'CLS' | 'FCP')[];
};

export type Metric = {
	histogram: {
		start: string;
		end: string;
		density: number;
	}[];
	percentiles: {
		p75: string;
	};
};

export type Metrics = {
	cumulative_layout_shift: Metric;
	first_contentful_paint: Metric;
	first_input_delay: Metric;
	largest_contentful_paint: Metric;
};

export type CRUXRecord = {
	key: object;
	metrics: Metrics;
	urlNormalizationDetails: Object;
};

export type CRUXResponse = {
	record: CRUXRecord;
};

export type LabelledBin = {
	start: string;
	end: string;
	density: number;
	label: string;
	percentage: number;
};

export type LabeledMetric = {
	acronym: string;
	name: string;
	labeledBins: LabelledBin[];
	p75: string;
};

export type Mode = 'url' | 'origin' | 'list';
