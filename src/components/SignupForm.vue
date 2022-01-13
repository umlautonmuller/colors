<template>
  <v-dialog width="500" class="signup-screen" v-model="show">
    <v-form ref="form" id="signup-form" class="pa-4">
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
          <v-text-field outlined type="text" :rules="name.validation" v-model="name.value" label="Name"></v-text-field>
          <v-text-field outlined type="text" :rules="email.validation" v-model="email.value" label="E-mail"></v-text-field>
          <v-text-field outlined type="password" :rules="password.validation" v-model="password.value" label="Password"></v-text-field>
          <v-text-field outlined type="password" :rules="confirmPassword.validation" v-model="confirmPassword.value" label="Password confirmation"></v-text-field>
          <v-btn :loading="loading" color="primary" block @click="submit" id="submit">Sign Up</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import AuthRequest from "@/api/requests/auth";
import SignupRequest from "@/api/requests/signup";
import UserDataRequest from "@/api/requests/user";
import { colors } from "vuetify/lib";

export default Vue.extend({
  name: "LoginForm",
  data() {
    return {
      loading: false,
      name: {
        value: "",
        validation: [
          v => !!v || 'Name is required',
        ] 
      },
      email: {
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
      confirmPassword: {
        value: "",
        validation: [
          v => !!v || 'Password confirmation is required',
          v => {
            if (v !== this.password.value) return "Passwords must match";
            return true;
          }
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
          this.loading = true

          const request = new SignupRequest({
            email: this.email.value,
            name: this.name.value,
            password: this.password.value
          });
          const response = await request.send();

          if (response.status !== 200) {
            throw "Cadastro deu ruim";
          }

          const authRequest = new AuthRequest(this.email.value, this.password.value);
          const authResponse = await authRequest.send();
          const token = authResponse.data.data.token;
  
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
#signup-form {
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
