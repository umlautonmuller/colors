<template>
  <v-snackbar
    v-model="snackbar.visible"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    top
    left
  >
    <span class="black--text">{{ snackbar.message }}</span>
  </v-snackbar>
</template>

<script>
import Vue from 'vue'

export default Vue.extend ({
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    }
  }
})
</script>