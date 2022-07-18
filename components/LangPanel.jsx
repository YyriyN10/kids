import styles from './LangPanel.module.scss'
import Link from 'next/link'
import i18next from 'i18next'

export default function LangPanel() {
  const { language } = i18next
  return(
    <div className={styles.langWrapper}>
      <div className={styles.langList}>
        <Link href='/en' locale='en'>
          <a
            className={language.substring(0, 2) == 'en' ? styles.active : ''}>
            En
          </a>
        </Link>
        <Link href='/de' locale='de'>
          <a
            className={language.substring(0, 2) == 'de' ? styles.active : ''}>
            De
          </a>
        </Link>
      </div>
    </div>
  )
}