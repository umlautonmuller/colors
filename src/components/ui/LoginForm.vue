<template>
  <section class="login-screen" v-if="show">
    <div id="login-form">
      <input type="text" v-model="username" placeholder="Email" />
      <input type="text" v-model="password" placeholder="Password" />
      <button @click="submit" id="submit">Log In</button>
      <icon-button
        :color="'#303030'"
        :colorHover="'#CCCCCC'"
        @click.native="close"
        icon="times"
        id="close"
      ></icon-button>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import AuthRequest from "@/api/requests/auth";
import UserDataRequest from "@/api/requests/user";

export default Vue.extend({
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async submit() {
      try {
        const request = new AuthRequest(this.username, this.password);
        const response = await request.send();
        const token = response.data.data.token;

        localStorage.setItem("colors.token", token);

        const dataRequest = new UserDataRequest(token);
        const dataResponse = await dataRequest.send();
        const user = dataResponse.data;

        this.$store.commit("user/set", user);
        this.close()
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  },
});
</script>

<style lang="scss">
section.login-screen {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);

  > div#login-form {
    position: relative;
    height: 400px;
    width: 500px;
    border-radius: 35px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    > #close {
      position: absolute;
      top: 0%;
      right: 0%;
    }

    > input {
      width: 70%;
      height: 12%;
      color: #303030;
      border: 1px solid #cccccc;
      border-radius: 5px;
      padding-left: 10px;

      > :focus {
        border: 2px solid #303030;
      }
    }

    > #submit {
      width: 70%;
      height: 10%;
      background-color: white;
      color: #303030;
      font-weight: bold;
      letter-spacing: 0.05em;
      border: 2px solid #303030;
      border-radius: 5px;
      text-transform: uppercase;
      transition: 0.3s ease;
    }

    > button#submit:hover {
      border-radius: 10px;
      background-color: #303030;
      color: #cccccc;
    }
  }
}
</style>
