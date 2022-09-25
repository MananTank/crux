import { getData } from '../API/getData'
import { FormFactor } from '../types'
import { labelMetricData } from '../utils/labelMetricData'
import { Metric } from './Metric'
import useSWR from 'swr'
import { mobileIcon, desktopIcon } from '../icons'
import { useContext } from 'react'
import { ModeCtx } from '../context'
import styles from '../styles/Card.module.scss'

type CardProps = {
  formFactor: FormFactor
  url: string
}

export default function Card(props: CardProps) {
  const [mode] = useContext(ModeCtx)
  const { formFactor, url } = props
  const key = url + mode + formFactor
  const { data } = useSWR(key, () => getData(url, formFactor, mode), {
    suspense: true
  })

  if (!data) return null
  const hasError = 'error' in data
  const cardClass = `${styles.card} ${hasError ? styles.error : ''}`

  return (
    <div className={cardClass} data-card>
      <h2 className={styles.deviceIcon} title={formFactor} data-device-icon>
        {formFactor === 'PHONE' ? mobileIcon : desktopIcon}
      </h2>

      {hasError ? (
        <p className={styles.error}> {data.error.message}</p>
      ) : (
        <div className={styles.metricsContainer}>
          {labelMetricData(data.record.metrics).map(metric => (
            <Metric metric={metric} key={metric.name} />
          ))}
        </div>
      )}
    </div>
  )
}
