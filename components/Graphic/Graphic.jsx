import i18next from 'i18next'
import Container from '../Container/Container'
import Title from '../Title/Title'
import styles from './Graphic.module.scss'

export default function Graphic() {
  const { t } = i18next
  return (
    <div className={styles.section}>
      <Container>
        <Title className={styles.title}>
          <div
            dangerouslySetInnerHTML={{ __html: t('howCanWeStopRussia') }}></div>
        </Title>

        <Title className={styles.title}>
          <div dangerouslySetInnerHTML={{ __html: t('russiaMakes') }}></div>
        </Title>

        <div className={styles.chart}>
          <div className={styles.chartLine}>
            <div className={styles.chartLabel}>$850M</div>
          </div>
          <div className={styles.chartLine}>
            <div className={styles.chartLabel}>$750M</div>
          </div>
          <div className={styles.chartLine}>
            <div className={styles.chartLabel}>$650M</div>
          </div>
          <div className={styles.chartLine}>
            <div className={styles.chartLabel}>$550M</div>
          </div>
          <div className={styles.chartLine}>
            <div className={styles.chartLabel}>$450M</div>
          </div>
          <div className={styles.chartLine}>
            <div className={styles.chartLabel}>$350M</div>
          </div>
          <div className={styles.chartLine}>
            <div className={styles.chartLabel}>$250M</div>
          </div>
          <div className={styles.chartLine}>
            <div className={styles.chartLabel}>$150M</div>
          </div>
          <div className={styles.chartLine}>
            <div className={styles.chartLabel}>$50M</div>
          </div>
          <div className={styles.chartData}>
            <div className={styles.chartItem}>
              <div
                className={styles.chartItemLabel}
                dangerouslySetInnerHTML={{ __html: t('russianRevenue') }}
              />
              <div className={styles.chartItemValue}>
                $850M
                <span>{t('perDay')}</span>
              </div>
              <a
                href='https://apnews.com/article/russia-ukraine-covid-business-health-boycotts-bf058c0ddc6deb04a84508fa6490fc3f'
                target='_blank'
                rel='noreferrer'
                className={styles.chartItemSource}>
                <span>{t('source')}</span>
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M11.0303 7.64957V11.6617C11.0303 12.0164 10.8894 12.3566 10.6386 12.6074C10.3878 12.8582 10.0476 12.9991 9.69294 12.9991H2.33738C1.98268 12.9991 1.64251 12.8582 1.39171 12.6074C1.1409 12.3566 1 12.0164 1 11.6617V4.30613C1 3.95143 1.1409 3.61126 1.39171 3.36046C1.64251 3.10965 1.98268 2.96875 2.33738 2.96875H6.3495'
                    strokeWidth='1.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M9.77734 1H13.0014V4.22403'
                    strokeWidth='1.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M7.08984 6.91073L13.0006 1'
                    strokeWidth='1.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </a>
            </div>
            <div className={styles.chartItem}>
              <div
                className={styles.chartItemLabel}
                dangerouslySetInnerHTML={{ __html: t('russianExpenses') }}
              />
              <div className={styles.chartItemValue}>
                $180M
                <span>{t('perDay')}</span>
              </div>
              <a
                href='https://en.wikipedia.org/wiki/List_of_countries_by_military_expenditures'
                target='_blank'
                rel='noreferrer'
                className={styles.chartItemSource}>
                <span>{t('source')}</span>
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M11.0303 7.64957V11.6617C11.0303 12.0164 10.8894 12.3566 10.6386 12.6074C10.3878 12.8582 10.0476 12.9991 9.69294 12.9991H2.33738C1.98268 12.9991 1.64251 12.8582 1.39171 12.6074C1.1409 12.3566 1 12.0164 1 11.6617V4.30613C1 3.95143 1.1409 3.61126 1.39171 3.36046C1.64251 3.10965 1.98268 2.96875 2.33738 2.96875H6.3495'
                    strokeWidth='1.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M9.77734 1H13.0014V4.22403'
                    strokeWidth='1.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M7.08984 6.91073L13.0006 1'
                    strokeWidth='1.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div
          style={{ paddingTop: 56, paddingBottom: 32 }}
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: t('ifEuropeStopsBuying') }}></div>

        <div className={styles.center}>
          <img src='/static/images/key-img-2.png'></img>
        </div>
      </Container>
    </div>
  )
}
