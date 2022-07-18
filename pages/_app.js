import '../i18n'
import '../styles/globals.css'
import { useState, useEffect } from 'react'
// import { hotjar } from 'react-hotjar'
import i18next from 'i18next'

import { defaultLanguage, languages } from '../i18n'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { asPath, query } = router

  // Detect current language
  const slug = asPath.split('/')[1]
  const langSlug = languages.includes(slug) && slug
  const language = query.lang || langSlug || defaultLanguage

  const [clientLanguage, setClientLanguage] = useState(language)

  useEffect(() => {
    setClientLanguage(language)
  }, [language])

  // Don't trigger `i18next.changeLanguage()` on root folder, use `router` to redirect to the specific language
  if (asPath !== '/' && asPath !== '/404') {
    i18next.changeLanguage(clientLanguage)
  }

  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const params = Object.fromEntries(urlSearchParams.entries())
        ReactPixel.init(params.id)
        ReactPixel.pageView()
      })
    // hotjar.initialize(2927296, 6)
  }, [])

  return (
    // <NumbersProvider>
    <Component {...pageProps} />
    // {/* </NumbersProvider> */}
  )
}

export default MyApp
