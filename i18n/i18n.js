import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// import commonEN from './en/common.json'
// import commonDE from './de/common.json'
// import backend from 'i18next-xhr-backend'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import builConfig from '../appConfig/buildConfig'
const { PROD, DEV, STAGE } = require('../build/_mode')

// import builConfig from '../appConfig/buildConfig'
// import _mode from '../build/_mode'

// const resources = {
//   en: {
//     translation: {},
//     common: commonEN
//   },
//   de: {
//     translation: {},
//     common: commonDE
//   }
// }
i18n
  // .use(HttpApi)
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    debug: true,
    // resources,
    fallbackLng: 'en',
    fallbackNS: 'common',
    ns: ['common'],
    // defaultNS: 'common',
    backend: {
      loadPath: (builConfig.STAGE === DEV ? '/locales/' : '/public/locales/') + '{{lng}}/{{ns}}.json'
      // loadPath: '/locales/{{lng}}/{{ns}}.json'
      // customHeaders: () => {
      //   if (builConfig.STAGE !== _mode.DEV) {
      //     const accessToken = window.access_token
      //     return {
      //       Authorization: `Bearer ${accessToken}`
      //     }
      //   } else {
      //     return {}
      //   }
      // }
    },
    useSuspense: true,
    lng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  })

export const loadModuleTxFile = async (module) => {
  await i18n.loadNamespaces(module)
}

export default i18n
