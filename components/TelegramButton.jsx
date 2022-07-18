import styles from './TelegramButton.module.scss'

export default function TelegramButton(props) {
  return (
    <a
      id={props.id}
      onClick={props.onClick}
      target='_blank'
      rel='noreferrer'
      href={`https://t.me/${props.account}`}
      className={[styles.link, props.className].join(' ')}>
      <img src='/static/images/telegram.png' alt='' />
      {props.children}
    </a>
  )
}
