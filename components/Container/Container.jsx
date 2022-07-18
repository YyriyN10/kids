import styles from './Container.module.scss'

export default function Container(props) {
  const { className } = props
  const classNames = [styles.container, className]

  return <h2 className={classNames.join(' ')}>{props.children}</h2>
}
