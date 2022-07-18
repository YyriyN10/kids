import { useMemo, useState, useEffect } from 'react'
import NumbersContext from '../services/NumbersContext'
import { useTimer } from 'react-timer-hook'

const NumbersProvider = ({ children }) => {
  const INITIAL_KILLED = 34
  const INITIAL_INJURED = 21
  const INTERVAL_DYING = 8 * 3.6e6 // every 6.5 hours in milliseconds
  const INTERVAL_INJURED = INTERVAL_DYING / 2
  const INITIAL_DATE = useMemo(
    () => Date.parse('2022-03-31T09:51:00.000+03:00'),
    []
  )

  const [killed, setKilled] = useState(INITIAL_KILLED)
  const [injured, setInjured] = useState(INITIAL_INJURED)

  const { seconds, minutes, hours, restart } = useTimer({
    onExpire: () => {
      setTimeout(() => {
        updateStats()
      }, 1000)
    },
  })

  const calculateNextDeath = () => {
    const diffMillis = Math.abs(INITIAL_DATE - Date.now())
    const timeLeftMillis = INTERVAL_DYING - (diffMillis % INTERVAL_DYING)

    const additionalKilled = Math.floor(diffMillis / INTERVAL_DYING)
    const additionalInjured = Math.floor(diffMillis / INTERVAL_INJURED)
    const expiryTimestamp = new Date(Date.now() + timeLeftMillis)
    return { expiryTimestamp, additionalKilled, additionalInjured }
  }

  const updateStats = () => {
    const { expiryTimestamp, additionalKilled, additionalInjured } =
      calculateNextDeath()
    setKilled(INITIAL_KILLED + additionalKilled)
    setInjured(INITIAL_INJURED + additionalInjured)
    restart(expiryTimestamp)
  }

  useEffect(() => {
    updateStats()
  }, [])

  return (
    <NumbersContext.Provider
      value={{
        killed,
        injured,
        hoursLeft: hours,
        minutesLeft: minutes,
        secondsLeft: seconds,
      }}>
      {children}
    </NumbersContext.Provider>
  )
}

export default NumbersProvider
