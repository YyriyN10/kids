import styles from './TellYourOfficials.module.scss'
import i18next from 'i18next'

const TellYourOfficials = () => {
  const { t } = i18next

  return (
    <div className={styles.header} id='4'>
      <img
        className={styles.imgLeft}
        src='/static/images/img-left.png'
        alt=''
      />
      <div className={styles.title}>
        {t('telStr1')}
        <span>{t('telStr2')}</span> <b>{t('telStr3')}</b>
        {t('telStr4')}
      </div>
      <img
        className={styles.imgRight}
        src='/static/images/img-right.png'
        alt=''
      />
    </div>
  )
}

export default TellYourOfficials
