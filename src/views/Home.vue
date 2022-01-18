<template>
  <section class="home d-flex justify-center align-center">
    <div class="welcome d-flex flex-column justify-space-between align-center">
      <h1 class="text-h2 font-weight-bold mb-5">The super original color palette generator!</h1>
      <p class="text-h6 font-weight-regular">Create, share and save color schemes in this brand-new website.</p>
      <div class="d-flex flex-column">
        <v-btn dark class="mb-4" href="/generate" large>Generate!</v-btn>
        <v-btn href="/palettes" large>Browse palettes</v-btn>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Home",
});
</script>

<style lang="scss">
section.home {
  width: 100%;
  height: 100%;

  > .welcome {
    width: 500px;
  }
}
</style>
