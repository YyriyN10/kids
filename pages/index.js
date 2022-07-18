import { useEffect } from 'react'
import { useRouter } from 'next/router'
import i18next from 'i18next'
import Head from 'next/head'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const lang = i18next.language.substring(0, 2)
    if (router.pathname === '/') {
      if (['de', 'en'].includes(lang)) {
        router.push(`/${lang}`)
      } else {
        router.push('/en')
      }
    }
  })

  return (
    <Head>
      <title>#EmbargoGegenRusslandSofort #EmbargoRussiaNow Putin Is Not Gonna Stop In Ukraine…</title>
      <meta
        name='description'
        content={'Stop Funding Putin. Stop Buying Russian Oil & Gas!'}
      />
      <link rel='icon' href='/favicon.ico' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta
        name='twitter:title'
        content={'Putin Is Not Gonna Stop In Ukraine…'}
      />
      <meta
        property='twitter:image'
        // todo
        content='https://embargorussianow.com/static/twitter-card.png'
      />
      <meta property='og:url' content={`https://embargorussianow.com`} />
      <meta
        property='og:title'
        content={'Putin Is Not Gonna Stop In Ukraine…'}
      />
      <meta
        property='og:description'
        content={'Stop Funding Putin. Stop Buying Russian Oil & Gas!'}
      />
      <meta
        property='og:image'
        //todo
        content='https://embargorussianow.com/static/twitter-card.png'
      />
    </Head>
  )
}
