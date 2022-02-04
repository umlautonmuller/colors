<template>
  <div class="palette-card rounded-lg elevation-5 ma-4 pa-4 d-flex flex-column justify-space-between">
    <div class="card-header d-flex align-start">
      <span>Palette Title</span>
    </div>  
    <div class="color-container d-flex">
      <div class="color red flex-grow-1 rounded-l-lg"></div>
      <div class="color pink flex-grow-1"></div>
      <div class="color purple flex-grow-1"></div>
      <div class="color blue flex-grow-1"></div>
      <div class="color green flex-grow-1 rounded-r-lg"></div>
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
    width: 200px;
    height: 150px;
  }

  .color-container {
    width: 100%;
    height: 60%;
  }
</style>