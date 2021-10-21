import { en, de } from "vuetify/src/locale";

export enum Locales {
  EN = "en",
  DE = "de",
}

export const defaultLocale = process.env.VUE_APP_I18N_LOCALE || Locales.EN;
export const fallbackDefault =
  process.env.VUE_APP_I18N_FALLBACK_LOCALE || Locales.DE;

export const messages = {
  [Locales.EN]: {
    $vuetify: { ...en, ...require("@/locales/en.json") },
  },
  [Locales.DE]: {
    $vuetify: { ...de, ...require("@/locales/de.json") },
  },
};
