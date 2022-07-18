import styles from './FacebookButton.module.scss'

export default function FacebookButton() {
  return (
    <a href='' className={styles.link}>
      <img src='/static/images/facebook.svg' alt='' />
      <b>Share</b> 4.7m
    </a>
  )
}
