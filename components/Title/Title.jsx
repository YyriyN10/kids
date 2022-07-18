import styles from './Title.module.scss'

export default function Title(props) {
  const { className } = props
  const classNames = [styles.title, className]

  return <h2 className={classNames.join(' ')}>{props.children}</h2>
}
