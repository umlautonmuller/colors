<template>
  <v-app-bar>
    <v-spacer></v-spacer>
    <div class="app-bar-actions">
      <icon-button v-for="(action, index) in actions" :key="index"
        :color="action.color"
        :colorHover="action.colorHover"
        @click.native="action.callback"
        :icon="action.icon"
      ></icon-button>
    </div>
    <v-spacer></v-spacer>
    <div class="app-bar-social-actions">
      <div v-if="!$store.state.user.logged">
        <v-btn class="mr-4" color="primary" id="login" @click="showLogin = true">Log In</v-btn>
        <v-btn class="mr-4" outlined color="primary" id="signup">Sign Up</v-btn>
      </div>
      <div v-else>
        <div>Olá, {{ $store.state.user.user.name }}</div>
        <v-btn id="logout" @click="$store.commit('user/logout')">
          Logout
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      actions: [
        {
          color: '#303030',
          colorHover: '#CCCCCC',
          callback: () => this.$store.dispatch("palette/randomize"),
          icon: 'dice'
        },
        {
          color: '#303030',
          colorHover: '#CCCCCC',
          callback: () => this.$store.dispatch("palette/increment"),
          icon: 'plus'
        },
        {
          color: '#303030',
          colorHover: '#CCCCCC',
          callback: () => this.$store.dispatch("palette/clear"),
          icon: 'redo'
        },
        {
          color: '#303030',
          colorHover: '#CCCCCC',
          callback: () => this.$store.dispatch("palette/unlockAll"),
          icon: 'lock-open'
        },
      ]
    }
  }
});
</script>

<style lang="scss">
  .app-bar-social-actions {
    position: absolute;
    right: 0px;
  }
  
</style>