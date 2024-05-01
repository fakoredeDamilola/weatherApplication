import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import zh from "./translations/zh.json";
import es from "./translations/es.json";
import fr from "./translations/fr.json";

// const apiKey = "WLLhAJq8nWzkHWPx5xMGCg";
// const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
  // .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    // fallbackLng: "en",

    // ns: ["default"],
    // defaultNS: "default",

    // supportedLngs: ["en","fr","zh","hi"],
    resources: {
      en: {
        translation: en,
      },
      zh: {
        translation: zh,
      },
      es: {
        translation: es,
      },
      fr: {
        translation: fr,
      },
    },
    // backend: {
    //   loadPath: loadPath
    // }
  });
