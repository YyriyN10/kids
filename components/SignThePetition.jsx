import styles from './CongressForm.module.scss'
import Button from './Button'

const SignThePetition = () => {
  return (
    <>
      <div className={styles.step}>
        <div className={styles.stepTitle}>
          <span>SIGN</span> PETITION
        </div>
        <div className={styles.stepSubtitle}>
          The more signatures we have - the more chances we got.{' '}
          <b>Your voice can save someone&apos;s life.</b>
        </div>
        <div className={styles.btns}>
          <Button
            type='link'
            href='https://chng.it/RTgnP2jtmM'
            color='yellow'
            text='Sign The Petition'
            icon='/static/images/link.svg'
          />
        </div>
      </div>
    </>
  )
}

export default SignThePetition
