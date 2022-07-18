import styles from './CallToAction.module.scss'
import Button from './Button'
import i18next from 'i18next'


export default function CallToAction() {
  const { t } = i18next

  const clickHandler = () => {
    window.scrollTo({
      top: document.getElementById(4)?.offsetTop || 0,
      behavior: 'smooth',
    })
  }
  return(
    <div className={styles.callWrapper}>
      <div className={styles.inner}>
        <Button
          id='what-can-i-do'
          onClick={() => {
            clickHandler()
          }}
          className={styles.button + ' ' + styles.btn}
          text={t('callBtn')}
          color='blue'
        />
        <p>{t('callText')}
        </p>
      </div>
    </div>
  )
}