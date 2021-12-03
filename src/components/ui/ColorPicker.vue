<template>
  <div class="color-picker">
    <icon-button
      :color="color"
      :colorHover="colorHover"
      icon="palette"
      @click.native="trigger"
    ></icon-button>
    <input
      class="color-picker-input"
      type="color"
      name="color-picker-input"
      ref="input"
      :value="color"
      @input="updateColor($event.target.value)"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { v4 as uuidv4 } from "uuid";

export default Vue.extend({
  data() {
    return {
      id: uuidv4(),
    };
  },

  props: {
    color: {
      type: String,
      default: "#000000",
    },
    colorHover: {
      type: String,
      default: "#ffffff",
    },
  },

  methods: {
    trigger() {
      this.$refs.input.click();
    },
    updateColor(newColor) {
      this.$emit("change", newColor);
    },
  },
});
</script>

<style>
.color-picker-input {
  width: 0px;
  height: 0px;
  visibility: hidden;
}
</style>
