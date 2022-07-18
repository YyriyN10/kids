import Button from '../Button'
import Container from '../Container/Container'
import Title from '../Title/Title'
import styles from './Key.module.scss'

export default function Key() {
  return (
    <div className={styles.section}>
      <Container>
        <Title className={styles.title}>
          The key <br /> <span>to the power of the Russian army</span>{' '}
          is&nbsp;money from the EU
        </Title>
        <div className={styles.subtitle}>
          <span>No</span> tanks and guns, no <span>war</span>
        </div>

        <div className={styles.btnWrap}>
          <Button text='what can I do ?' color='red' size='lg' />
        </div>
      </Container>
    </div>
  )
}
