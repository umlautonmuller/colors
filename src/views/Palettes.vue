<template>
  <section class="palettes my-4 d-flex">
      <div class="palette-container d-flex flex-wrap justify-space-around align-start">
        <palette-card :key="n" v-for="n in 9"></palette-card>
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
  min-height: 100%;

  > .palette-container {
    width: 100%;
  }
}
</style>
