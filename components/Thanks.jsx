import styles from './Thanks.module.scss'
import i18next from 'i18next'

export default function Thanks() {
  const { t } = i18next
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.title}>
          <img src='/static/images/germany-flag.svg' alt='' />{t('thxText')}
        </div>
        {/*<div className={styles.title}>
          <img src='/static/images/ua-flag.svg' alt='' />
          We’ll Never Forget.
        </div>*/}
        <div className={styles.subtitle}>
          {/*<div>Give Ukraine Heavy Weapons</div>*/}
          <div>#EmbargoRussiaNow</div>
        </div>
      </div>
    </div>
  )
}
