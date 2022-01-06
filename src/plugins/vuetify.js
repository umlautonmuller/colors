import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import { colors } from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "fa",
  },
  theme: {
    themes: {
      light: {
        primary: "#303030",
      },
      dark: {
        primary: colors.green.base,
      },
    },
  },
});
