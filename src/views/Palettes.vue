<template>
  <section class="palettes my-4 d-flex">
      <div class="coming-soon d-flex align-center justify-center flex-column">
        <span class="text-h2 white--text font-weight-bold">Under construction!</span>
        <span class="text-h4 white--text font-weight-thin mt-5">Coming soon</span>
        <span class="text-caption white--text font-weight-thin">(probably)</span>
        <v-btn to="/" class="mt-7">Return to home</v-btn>
      </div>
      <div class="palette-container d-flex flex-wrap justify-space-around align-start">
        <palette-card :key="n" v-for="n in 32"></palette-card>
      </div>
  </section>
</template>

<script>
import Vue from "vue";
import PaletteCard from "@/components/ui/PaletteCard.vue";

export default Vue.extend({
  name: "Palettes",
  components: {
    PaletteCard,
  }
});
</script>

<style lang="scss">
section.palettes {
  width: 100%;

  > .palette-container {
    width: 100%;
  }
}

.coming-soon {
  position: fixed;
  width: 100vw;
  height: 100vh;
  right: 0;
  top: 0;
  background-color: rgb(0, 0, 0, 0.6);
}
</style>
