import styles from './Button.module.scss'

export default function Button(props) {
  const { className, text, type, href, onClick, icon, color, size } = props

  const classNames = [styles.btn, className]

  switch (size) {
    case 'sm':
      classNames.push(styles.sm)
      break
  }

  switch (color) {
    case 'yellow':
      classNames.push(styles.yellow)
      break
    case 'blue':
      classNames.push(styles.blue)
      break
    case 'green':
      classNames.push(styles.green)
      break
    case 'mail':
      classNames.push(styles.mail)
      break
  }
  if (props.disabled) {
    classNames.push(styles.disabled)
  }

  if (type === 'link' && href) {
    return (
      <a
        id={props.id ? props.id : ''}
        target='_blank'
        href={!props.disabled ? href : undefined}
        onClick={!props.disabled ? onClick : undefined}
        className={classNames.join(' ')}
        rel='noreferrer'>
        {icon && <img src={icon} alt='' />}
        <span>{text}</span>
      </a>
    )
  } else {
    return (
      <button
        id={props.id ? props.id : ''}
        onClick={!props.disabled ? onClick : undefined}
        className={classNames.join(' ')}
        type={type}>
        {icon && <img src={icon} alt='' />}
        <span>{text}</span>
      </button>
    )
  }
}
