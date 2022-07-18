import styles from './Promo.module.scss'
import i18next from 'i18next'
import dynamic from 'next/dynamic'
import NumbersContext from '../services/NumbersContext'
import { useContext } from 'react'

const DeathTimerNoSSR = dynamic(() => import('./DeathTimer'), { ssr: false })

export default function Promo() {
  const { t } = i18next

  const { killed, injured } = useContext(NumbersContext)

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {/*Russia gets around $1 bn a day from oil and gas exports. Thus - it can finance its war unless we cut the funding at its core - Ban Russian Energy Exports!*/}
          <div className={styles.titleRow1}>{t('headUkr')}</div>
          {t('headChild')}
          <div className={styles.titleRow3}>
            {t('headKeep')}<span> {t('headDying')}</span>
          </div>
        </h1>
        <div className={styles.stats}>
          <div className={styles.statsItem}>
            <div className={styles.statsItemValueMain}>{killed}</div>
            <div className={styles.statsItemTitleMain}>
              <b>{t('headDed')}</b>
            </div>
          </div>
          <div className={styles.statsItem}>
            <div className={styles.statsItemValue}>{injured}</div>
            <div className={styles.statsItemTitle}>{t('headInjured')}</div>
          </div>
        </div>
        <div className={styles.subtitle}>
          {t('headRuSol')}
          <span className={styles.accent}>{t('headKillCh')}</span>{t('headEvery')}
          <span className={styles.red}>{t('headHourUp')}</span>
        </div>
        <div className={styles.timerRow}>
          {t('headOnEvery')}
          <div className={styles.timer}>
            <DeathTimerNoSSR />
          </div>
        </div>

      </div>
    </div>
  )
}
