import styles from './CongressForm.module.scss'
import { Skeleton, Spin, message, Select } from 'antd'
import { LoadingOutlined, CloseCircleTwoTone } from '@ant-design/icons'

const { Option } = Select

import TwitterButton from './TwitterButton'
import { useState, useMemo, useEffect } from 'react'
import { bundestagData } from '../utils/ushelper'
import { pickRandom, pushGTMData } from './helper'

import Button from './Button'
import i18next from 'i18next'
import TelegramButton from './TelegramButton'

// TODO
const tweetsTemplatesEn = [
  {
    text: '@_______ As long as Germany continues buying Russian energy, the Russian government will be able to continue invading sovereign nations and murdering innocent civilians',
    tagString: '#EmbargoGegenRusslandSofort',
  },
  {
    text: '@_______ Giving up Russian oil and gas will cost Germany around 1,5% of GDP. What price do you put on a clear conscience and the lives of innocents?',
    tagString: '#EmbargoGegenRusslandSofort',
  },
  {
    text: '@_______ We gave up nuclear energy to prevent a potential catastrophe. Are you willing to give up Russian oil and gas to stop an ongoing catastrophe?',
    tagString: '#EmbargoGegenRusslandSofort',
  },
]

const tweetsTemplatesDe = [
  {
    text: '@_______ Solange Deutschland weiterhin Energie aus Russland kauft, wird die russische Regierung weiterhin souveräne Länder überfallen und unschuldige Zivilisten ermorden können',
    tagString: '#EmbargoGegenRusslandSofort',
  },
  {
    text: '@_______ Der Verzicht auf russisches Öl und Gas wird Deutschland rund 1,5 % des BIP kosten. Was ist der Preis für ein reines Gewissen und das Leben unschuldiger Menschen?',
    tagString: '#EmbargoGegenRusslandSofort',
  },
  {
    text: '@_______ Wir haben die Kernenergie aufgegeben, um eine mögliche Katastrophe zu vermeiden. Sind Sie bereit, auf russisches Öl und Gas zu verzichten, um eine laufende Katastrophe zu stoppen?',
    tagString: '#EmbargoGegenRusslandSofort',
  },
]

const simpleTweetsTemplatesEn = [
  // {
  //   text: 'For 83 days the defenders of Mariupol stood strong against overwhelming odds and with little chance of success. While the brave men and women fought and died for freedom, Germany continued paying Russian government over €220 million per day.',
  //   tagString: '#EmbargoGegenRusslandSofort',
  // },
  {
    text: 'As long as Germany continues buying Russian energy, the Russian government will be able to continue invading sovereign nations and murdering innocent civilians',
    tagString: '#GermanyWakeUp #DeutschlandWachAuf',
  },
  {
    text: 'Giving up Russian oil and gas will cost Germany around 1,5% of GDP. What price do you put on a clear conscience and the lives of innocents?',
    tagString: '#GermanyWakeUp #DeutschlandWachAuf',
  },
  {
    text: 'We gave up nuclear energy to prevent a potential catastrophe. Are you willing to give up Russian oil and gas to stop an ongoing catastrophe?',
    tagString: '#GermanyWakeUp #DeutschlandWachAuf',
  },
]

const simpleTweetsTemplatesDe = [
  {
    text: 'Solange Deutschland weiterhin Energie aus Russland kauft, wird die russische Regierung weiterhin souveräne Länder überfallen und unschuldige Zivilisten ermorden können',
    tagString: '#GermanyWakeUp #DeutschlandWachAuf',
  },
  {
    text: 'Der Verzicht auf russisches Öl und Gas wird Deutschland rund 1,5 % des BIP kosten. Was ist der Preis für ein reines Gewissen und das Leben unschuldiger Menschen?',
    tagString: '#GermanyWakeUp #DeutschlandWachAuf',
  },
  {
    text: 'Wir haben die Kernenergie aufgegeben, um eine mögliche Katastrophe zu vermeiden. Sind Sie bereit, auf russisches Öl und Gas zu verzichten, um eine laufende Katastrophe zu stoppen?',
    tagString: '#GermanyWakeUp #DeutschlandWachAuf',
  },
]

const GovernerInnerComponent = ({ governer }) => {
  return (
    <div className={styles.info}>
      <div className={styles.infoCol}>
        <ul>
          <li>
            {' '}
            <b className={styles.governerState}>{governer.party}</b>
          </li>
          <li>
            {/* <b>
              {' '}
              {governer.type == 'congress'
                ? 'Congress Representative'
                : 'Senator'}
            </b> */}
          </li>
          <li>
            <img
              className={styles.governerImg}
              src={`/static/bundestag/${governer.tw.toLowerCase()}.jpg`}></img>
          </li>
          <li>
            <b>{governer.name}</b>
          </li>
        </ul>
      </div>
    </div>
  )
}

const GovernerComponent = ({ governer, isGovernerLoading, errorMessage }) => {
  return (
    <>
      {' '}
      {Object.keys(governer).length == 0 ? (
        <>
          {isGovernerLoading && (
            <Spin
              style={{ height: 48 }}
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
          )}
          {errorMessage && (
            <div style={{ height: 48, fontSize: 18 }}>
              <CloseCircleTwoTone
                twoToneColor={'#e32929'}
                style={{ fontSize: 18, marginRight: 8 }}
              />
              {errorMessage}
            </div>
          )}
          <Skeleton active={isGovernerLoading} />
        </>
      ) : (
        <GovernerInnerComponent governer={governer} />
      )}
    </>
  )
}

const partyOptions = Object.keys(bundestagData)

export default function CongressForm({ ReactPixel }) {
  const { t } = i18next
  // eslint-disable-next-line no-unused-vars
  const [isGovernerLoading, setGovernerLoading] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState('')

  const [governer, setGoverner] = useState({})
  const [fullName, setFullName] = useState('')
  const [party, setParty] = useState('')

  const randomTweet = useMemo(() => {
    console.log(t('lang'))
    const tweetsTemplates =
      t('lang') == 'de' ? tweetsTemplatesDe : tweetsTemplatesEn

    const randomKey = pickRandom(Object.keys(tweetsTemplates))
    const tweetObj = tweetsTemplates[randomKey]
    tweetObj.tagsFinal = tweetObj.tagString
      .split(' ')
      .map((tag) => {
        return tag.slice(1)
      })
      .join(',')
    return tweetObj
  }, [])

  const simpleRandomTweet = useMemo(() => {
    const simpleTweetsTemplates =
      t('lang') == 'de' ? simpleTweetsTemplatesDe : simpleTweetsTemplatesEn

    const randomKey = pickRandom(Object.keys(simpleTweetsTemplates))
    const tweetObject = simpleTweetsTemplates[randomKey]
    tweetObject.tagsFinal = tweetObject.tagString
      .split(' ')
      .map((tag) => {
        return tag.slice(1)
      })
      .join(',')
    return tweetObject
  }, [])

  useEffect(() => {
    if (party == '') {
      return
    }
    const official = pickRandom(bundestagData[party])

    pushGTMData(window, {
      party: party,
      email: official.email,
      name: official.name,
      tw: official.tw,
    })

    setGoverner(official)
  }, [party])

  // useEffect(() => {
  //   setGovernerLoading(false)
  //   if (zipCodeDebounced.length != 5) {
  //     setErrorMessage('ZIP code must be 5 digits')
  //     return
  //   }

  //   let stateDistrict = zipCodeToStateDistrict(zipCodeDebounced)
  //   if (!(stateDistrict in governersDict)) {
  //     stateDistrict = zipCodeToState(zipCodeDebounced)
  //   }
  //   if (!(stateDistrict in governersDict)) {
  //     setErrorMessage('Invalid ZIP code. Please try another one...')
  //     return
  //   }

  //   const governer = pickRandom(governersDict[stateDistrict])

  //   pushGTMData(window, {
  //     zip: zipCodeDebounced,
  //     state: governer.state,
  //     district: governer.district,
  //     type: governer.type,
  //     name: governer.name,
  //   })

  //   setGoverner(governer)
  // }, [zipCodeDebounced])

  const onFullNameChange = (e) => {
    setFullName(e.target.value)
  }

  const subsituteTweetText = (randomTweet, governerTwitter) => {
    let output = randomTweet.text.replace('@_______', '@' + governerTwitter)
    output = encodeURIComponent(output)
    return output
  }

  const isDataProvided = Object.keys(governer).length != 0 && fullName != ''

  const trackOnClickFb = () => {
    try {
      const urlSearchParams = new URLSearchParams(window.location.search)
      const params = Object.fromEntries(urlSearchParams.entries())
      ReactPixel.track(params.evnt, {})
    } catch (err) {
      // empty
    }
  }

  return (
    <div className={styles.section} id='steps'>
      <h2
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: t('letsSave') }}></h2>

      <img
        className={styles.arrow}
        src='/static/images/arrow-down.svg'
        alt=''
      />

      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>
            <span>{t('step')} 1</span>
          </div>
          <div
            className={styles.stepTitle}
            dangerouslySetInnerHTML={{ __html: t('letsSendATweet') }}></div>

          <div className={styles.stepContainer}>
            <div className={styles.formRow}>
              <div className={styles.formCol}>
                <div className={styles.formLabel}>{t('chooseYourParty')}</div>
                <div className={styles.select}>
                  <Select
                    placeholder='Select your party'
                    onSelect={(p) => {
                      console.log(p)
                      setParty(p)
                    }}
                    value={party}>
                    {partyOptions.map((party) => (
                      <Option key={party} value={party}>
                        {t(party)}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className={styles.formCol}>
                <GovernerComponent
                  errorMessage={errorMessage}
                  governer={governer}
                  isGovernerLoading={isGovernerLoading}
                />
              </div>
            </div>

            {!governer.tw && (
              <TwitterButton
                id='tweetAndAsk'
                className={styles.twitterBtn}
                tweetText={simpleRandomTweet.text}
                tweetUrl='embargorussianow.com'
                tweetHashtags={simpleRandomTweet.tagsFinal}
                onClick={() => trackOnClickFb()}>
                {t('shareOnTwitter')}
              </TwitterButton>
            )}
            {governer.tw && (
              <TwitterButton
                id='tweetAndAsk'
                className={styles.twitterBtn}
                tweetText={subsituteTweetText(randomTweet, governer.tw)}
                tweetUrl='embargorussianow.com'
                tweetHashtags={randomTweet.tagsFinal}
                onClick={() => trackOnClickFb()}>
                {t('tweetAndAsk', { nickname: governer.tw.replace('@', '') })}
              </TwitterButton>
            )}
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>
            <span>{t('step')} 2</span>
          </div>
          <div
            className={styles.stepTitle}
            dangerouslySetInnerHTML={{ __html: t('letsSendALetter') }}></div>

          <div className={styles.stepContainer}>
            <div className={styles.formRow}>
              <div className={styles.formCol}>
                <div className={styles.formLabel}>{t('yourFullName')}</div>
                <input
                  maxLength={30}
                  onChange={onFullNameChange}
                  className={styles.formInput}
                  type='text'
                  placeholder={t('enterYourFullName')}
                />
              </div>
              <div className={styles.formCol}>
                <GovernerComponent
                  errorMessage={errorMessage}
                  governer={governer}
                  isGovernerLoading={isGovernerLoading}
                />
              </div>
            </div>

            <div className={styles.text}>
              <div
                style={{ opacity: isDataProvided ? 1 : 0.5 }}
                id='letter'
                className={styles.textInner}>
                <div className={styles.textHeader}>
                  <p>
                    <b>{t('to')}:</b>{' '}
                    {governer.name ? (
                      <>
                        <i>{governer.email.split('\n')[0]}</i>
                        {' <'}

                        {governer.name}
                        {'>'}
                      </>
                    ) : (
                      `[${t('representativeName').toUpperCase()}]`
                    )}
                    <img
                      className={styles.copyLetter}
                      onClick={() => {
                        if (governer.name) {
                          navigator.clipboard.writeText(
                            governer.email.split('\n')[0]
                          )
                          message.info({
                            content: 'Email Address Copied.',
                            style: { fontSize: 24 },
                            duration: 4,
                          })
                        }
                      }}
                      style={{ marginLeft: 8 }}
                      src='/static/images/copy-letter.svg'></img>
                  </p>
                  <p>
                    <b>{t('subject')}:</b> {t('letterSubject')}
                    <img
                      className={styles.copyLetter}
                      onClick={() => {
                        if (governer.name) {
                          navigator.clipboard.writeText(t('letterSubject'))
                          message.info({
                            content: 'Subject Copied.',
                            style: { fontSize: 24 },
                            duration: 4,
                          })
                        }
                      }}
                      style={{ marginLeft: 8 }}
                      src='/static/images/copy-letter.svg'></img>
                  </p>
                </div>
                <div id='letter-inside' className={styles.textBody}>
                  <p>
                    {t('letterTop')}{' '}
                    <b>
                      {governer.name
                        ? governer.name
                        : `[${t('representativeName').toUpperCase()}]`}
                    </b>
                    ,
                    <img
                      className={styles.copyLetter}
                      onClick={() => {
                        if (governer.name) {
                          const copyText =
                            document.getElementById('letter-inside')
                          navigator.clipboard.writeText(copyText.innerText)
                          message.info({
                            content: 'Letter Copied.',
                            style: { fontSize: 24 },
                            duration: 4,
                          })
                        }
                      }}
                      style={{ width: '60px' }}
                      src='/static/images/copy-letter.svg'></img>
                  </p>
                  <p dangerouslySetInnerHTML={{ __html: t('letterInside') }} />
                  <p>
                    {t('letterBottom')},{' '}
                    <b>
                      {fullName
                        ? fullName
                        : `[${t('yourFullName').toUpperCase()}]`}
                    </b>
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                const subject = t('letterSubject')
                const copyText = document.getElementById('letter-inside')
                const body = copyText.innerText
                const link = `https://mail.google.com/mail/?view=cm&fs=1&to=${
                  governer.email.split('\n')[0]
                }&su=${subject}&body=${encodeURIComponent(body)}`
                window.open(link, '_blank')
              }}
              id='sendEmail'
              disabled={!governer.email}
              text={t('sendEmail', {
                name: governer.name ? governer.name : t('partyMember'),
              })}
              icon='/static/images/gmail-icon.png'
              color='blue'
              size='full-width'
            />

            <div className={styles.sendEmailDetails}>
              {t('sendEmailDetails')}
            </div>
          </div>
        </div>
        {/* <div className={styles.step}>
          <div className={styles.stepNumber}>
            <span>{t('step')} 3</span>
          </div>
          <div
            className={styles.stepTitle}
            dangerouslySetInnerHTML={{ __html: t('shareThisWebsite') }}></div>

          <ul className={styles.shareList}>
            <li>
              <a
                target='_blank'
                rel='noreferrer'
                href={`https://facebook.com/sharer/sharer.php?u=germanywakeup.com&t=Let’s voice our support for providing Ukraine with heavy weapons: heavy artillery, heavy armor, air defense systems, and attack aircrafts. #ArmUkraineNow!`}>
                <img src='/static/images/Share/Facebook.svg' alt='' />
              </a>
            </li>
            <li>
              <a
                target='_blank'
                rel='noreferrer'
                href={`https://twitter.com/intent/tweet?text=Let’s voice our support for providing Ukraine with heavy weapons: heavy artillery, heavy armor, air defense systems, and attack aircrafts.&url=stopbucha.com&hashtags=ArmUkraineNow`}>
                <img src='/static/images/Share/Twitter.svg' alt='' />
              </a>
            </li>
            <li>
              <a
                target='_blank'
                rel='noreferrer'
                href={`https://reddit.com/submit?url=https://germanywakeup.com&title=Let’s voice our support for providing Ukraine with heavy weapons: heavy artillery, heavy armor, air defense systems, and attack aircrafts. #ArmUkraineNow`}>
                <img src='/static/images/Share/Reddit.svg' alt='' />
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('https://germanywakeup.com')
                  message.info({
                    content: t('websiteCopied'),
                    style: { fontSize: 24 },
                    duration: 4,
                  })
                }}>
                <img src='/static/images/copy.svg' alt='' />
              </button>
            </li>
          </ul>
        </div> */}
        <div className={styles.step}>
          <div className={styles.stepNumber}>
            <span>{t('step')} 3</span>
          </div>
          <div
            className={styles.stepTitle}
            dangerouslySetInnerHTML={{
              __html: t('subscribeToOurTwitter'),
            }}></div>
          <div className={styles.ourTwitter}>
            <TwitterButton
              id={'germanyWakeTwitter'}
              className={styles.ourTwitterButton}
              account={'EmbargoRussia'}>
              @EmbargoRussia
            </TwitterButton>
            <TelegramButton
              id={'germanyWakeTelegram'}
              className={styles.ourTwitterButton}
              account={'vitsche_berlin'}>
              @vitsche_berlin
            </TelegramButton>
          </div>
        </div>
      </div>
    </div>
  )
}
