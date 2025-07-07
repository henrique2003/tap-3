import * as Localization from "expo-localization";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
import zhCn from './locales/zh-cn.json';

const { languageCode } = Localization.getLocales()[0];

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    compatibilityJSON: 'v4',
    lng: languageCode ?? 'en',
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      es: { translation: es },
      'zh-Hans': { translation: zhCn },
      zh: { translation: zhCn },
      'zh-CN': { translation: zhCn },
      'zh-TW': { translation: zhCn },
      'zh-SG': { translation: zhCn },
      'zh-HK': { translation: zhCn }
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
