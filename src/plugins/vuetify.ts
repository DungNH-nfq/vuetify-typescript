import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import i18n from "@/i18n";
import "@/sass/overrides.sass";

Vuetify.config.silent = false;

Vue.use(Vuetify);

const theme = {
  dark: false,
  default: "light",
  disable: false,
  options: {
    cspNonce: undefined,
    customProperties: true,
    minifyTheme: undefined,
    themeCache: undefined,
  },
  themes: {
    light: {
      primary: "#1976D2",
      secondary: "#424242",
      accent: "#82B1FF",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FB8C00",
    },
    dark: {
      primary: "#2196F3",
      secondary: "#424242",
      accent: "#FF4081",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FB8C00",
    },
  },
};
const breakpoint = {
  scrollBarWidth: 16,
  thresholds: {
    xs: 600,
    sm: 960,
    md: 1280,
    lg: 1920,
  },
};

export default new Vuetify({
  theme,
  breakpoint,
  lang: {
    t: (key, ...params) => i18n.t(key, params).toString(),
  },
});
