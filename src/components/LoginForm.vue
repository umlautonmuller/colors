<template>
  <v-dialog width="500" class="login-screen" v-model="show">
    <v-form ref="form" id="login-form" class="pa-4">
      <v-row justify="end">
        <v-col cols="2" class="pa-0">
          <icon-button
            class="pa-2"
            :color="'#303030'"
            :colorHover="'#CCCCCC'"
            @click.native="close"
            icon="times"
            id="close"
          ></icon-button>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="8">
          <v-text-field outlined type="text" :rules="username.validation" v-model="username.value" label="E-mail"></v-text-field>
          <v-text-field outlined type="password" :rules="password.validation" v-model="password.value" label="Password"></v-text-field>
          <v-btn :loading="false" color="primary" block @click="submit" id="submit">Log In</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import AuthRequest from "@/api/requests/auth";
import UserDataRequest from "@/api/requests/user";
import { colors } from "vuetify/lib";

export default Vue.extend({
  name: "LoginForm",
  data() {
    return {
      loading: false,
      username: {
        value: "",
        validation: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ] 
      },
      password: {
        value: "",
        validation: [
          v => !!v || 'Password is required',
        ] 
      },
      show: false,
    };
  },
  methods: {
    close() {
      this.show = false
    },
    async submit() {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
          const request = new AuthRequest(this.username.value, this.password.value);
          const response = await request.send();
          const token = response.data.data.token;
  
          localStorage.setItem("colors.token", token);
  
          const dataRequest = new UserDataRequest(token);
          const dataResponse = await dataRequest.send();
          const user = dataResponse.data;
  
          this.$store.commit("user/set", user);
          this.close();
        } else {
          this.$store.commit("snackbar/show", {
            message: "Preenche certo amigão!",
            color: colors.red.base,
            timeout: 4000,
          });
        }
      } catch (error) {
        this.$store.commit("snackbar/show", {
          message: error.response.data.message,
          color: colors.red.base,
          timeout: 4000,
        });
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style lang="scss">
#login-form {
  border-radius: 5px;
  background-color: #fff;

  > span {
    text-decoration: none;
    font-weight: bold;
    color: #303030;
    margin-top: 8%;
  }

}
</style>
