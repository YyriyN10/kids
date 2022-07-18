import styles from './TwitterButton.module.scss'

export default function TwitterButton(props) {
  if (props.account) {
    return (
      <a
        id={props.id}
        onClick={props.onClick}
        target='_blank'
        rel='noreferrer'
        href={`https://twitter.com/${props.account}`}
        className={[styles.link, props.className].join(' ')}>
        <img src='/static/images/twitter.svg' alt='' />
        {props.children}
      </a>
    )
  }

  return (
    <a
      id={props.id}
      onClick={props.onClick}
      target='_blank'
      rel='noreferrer'
      href={`https://twitter.com/intent/tweet?text=${props.tweetText}&url=${props.tweetUrl}&hashtags=${props.tweetHashtags}`}
      className={[styles.link, props.className].join(' ')}>
      <img src='/static/images/twitter.svg' alt='' />
      {props.children}
    </a>
  )
}
