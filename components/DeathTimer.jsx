import styles from './DeathTimer.module.scss'
import { pad } from './helper'
import { useContext } from 'react'
import NumbersContext from '../services/NumbersContext'

export default function DeathTimer() {
  const { hoursLeft, minutesLeft, secondsLeft } = useContext(NumbersContext)

  return (
    <div className={styles.deathTimer}>
      ~{pad(hoursLeft)}:{pad(minutesLeft)}:{pad(secondsLeft)}
    </div>
  )
}
