<template>
  <div class="palette-card rounded elevation-5 ma-4 d-flex flex-column align-center justify-space-around">
    <span>Palette Title</span>
    <div class="color-container d-flex">
      <div class="color red"></div>
      <div class="color pink"></div>
      <div class="color purple"></div>
      <div class="color blue"></div>
      <div class="color green"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "PaletteCard",
});
</script>

<style lang="scss">
  .palette-card {
    width: 150px;
    height: 100px;
  }

  .color {
    width: 30px;
    height: 50px;
  }
</style>