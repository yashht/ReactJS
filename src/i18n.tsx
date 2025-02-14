import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import eng from "./locales/en/translation.json";

/**
 * Object containing resources for different languages.
 * @type {Object}
 * @property {Object} eng - English translations
 */
const resources = {
  eng: {
    translation: eng,
  },
};

const language = localStorage.getItem("I18N_LANGUAGE");

/**
 * If the language is not set, it sets the language to English ("eng") in the local storage.
 * @param {string} language - The language code to check if it is set.
 * @returns None
 */
if (!language) {
  localStorage.setItem("I18N_LANGUAGE", "eng");
}

/**
 * Initializes i18n with the provided configuration settings.
 * @param {Object} resources - The language resources to be used for translation.
 * @param {string} lng - The language to use for translation, defaults to "eng" if not found in localStorage.
 * @param {string} fallbackLng - The fallback language to use if the translation for the selected language is not available.
 * @param {boolean} keySeparator - Whether to use a key separator for nested keys in the resources.
 * @param {Object} interpolation - The interpolation settings for translating dynamic values.
 * @returns None
 */
i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("I18N_LANGUAGE") || "eng",
    fallbackLng: "eng",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
