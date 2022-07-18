import Head from 'next/head'
import LangPanel from "../../components/LangPanel";
import Promo from '../../components/Promo'
import CallToAction from "../../components/CallToAction";
import TellYourOfficials from "../../components/TellYourOfficials";
import StepBlock from "../../components/StepBlock";
import Thanks from "../../components/Thanks";
import NumbersProvider from '../../components/NumbersProvider'
import Footer from '../../components/Footer'
import styles from '../../styles/Home.module.scss'

import i18next from 'i18next'
import { getAllLanguageSlugs, getLanguage } from '../../i18n'

export default function Home(props) {
  const { t, language } = i18next

  return (
    <div className={styles.wrapper}>
      <LangPanel/>
      <Head>
        <title>{t('seoTitle')}</title>
        <meta name='description' content={t('seoDescription')} />
        <link rel='icon' href='/favicon.ico' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={t('seoTitle')} />
        <meta
          property='twitter:image'
          // todo
          content={`https://kids.embargorussianow.info/static/opengraf-${t('lang')}.jpg`}
        />
        <meta
          property='og:url'
          content={`https://kids.embargorussianow.info/${language.substring(0, 2)}`}
        />
        <meta property='og:title' content={t('seoTitle')} />
        <meta property='og:description' content={t('seoDescription')} />
        <meta
          property='og:image'
          //todo
          content={`https://kids.embargorussianow.info/static/opengraf-${t('lang')}.jpg`}
        />
      </Head>
      <NumbersProvider>
        <Promo />
        <CallToAction/>
        <TellYourOfficials />
        <StepBlock ReactPixel={props.ReactPixel}/>
        <Thanks />
        <Footer />
      </NumbersProvider>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = getAllLanguageSlugs()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const language = getLanguage(params.lang)
  return {
    props: {
      language,
    },
  }
}
