import styles from './CountUp.module.scss'
import { pad } from './helper'
import { useStopwatch } from 'react-timer-hook'

export default function CountUp() {
  const getOffsetTimestamp = () => {
    const unix_timestamp = 1645668000 // 2022, 24 Feb 04 AM Kyiv
    const diff = new Date() - new Date(unix_timestamp * 1000)
    const offsetStopWatch = new Date(Date.now() + diff)
    return offsetStopWatch
  }

  const { days, hours, minutes, seconds } = useStopwatch({
    autoStart: true,
    offsetTimestamp: getOffsetTimestamp(),
  })

  return (
    <div className={styles.timer}>
      <div className={styles.item}>
        <div className={styles.itemValue}>{pad(days)}</div>
        <div className={styles.itemLabel}>days</div>
      </div>
      <div className={styles.item}>
        <div className={styles.itemValue}>{pad(hours)}</div>
        <div className={styles.itemLabel}>hrs</div>
      </div>
      <div className={styles.item}>
        <div className={styles.itemValue}>{pad(minutes)}</div>
        <div className={styles.itemLabel}>min</div>
      </div>
      <div className={styles.item}>
        <div className={styles.itemValue}>{pad(seconds)}</div>
        <div className={styles.itemLabel}>sec</div>
      </div>
    </div>
  )
}
