import { Metrics, LabeledMetric, Label } from '../types'

const nameToAcronymMap = {
  first_contentful_paint: 'FCP',
  largest_contentful_paint: 'LCP',
  first_input_delay: 'FID',
  cumulative_layout_shift: 'CLS'
}

const standardBinLabels: Label[] = ['good', 'average', 'poor']

export function labelMetricData(metrics: Metrics) {
  const supportedMetrics = Object.keys(metrics).filter(k => k in nameToAcronymMap)

  return supportedMetrics.map(_metricName => {
    const metricName = _metricName as keyof Metrics

    const metricData = metrics[metricName]

    const labeledBins = metricData.histogram.map((bin, i) => {
      return {
        label: standardBinLabels[i],
        percentage: bin.density * 100,
        ...bin
      }
    })

    return {
      acronym: nameToAcronymMap[metricName],
      name: metricName,
      labeledBins,
      p75: metricData.percentiles.p75
    }
  }) as LabeledMetric[]
}
