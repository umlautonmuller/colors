<template>
  <div
    :class="{ 'color-column': true }"
    :style="{ backgroundColor: color }"
    v-on:mouseover="hover = true"
    v-on:mouseleave="hover = false"
  >
    <div class="toolbar" v-show="hover" ref="toolbar">
      <icon-button
        :color="foregroundColor"
        :colorHover="backgroundColor"
        @click.native="close"
        v-show="canClose"
        icon="times"
      ></icon-button>
      <color-picker
        :color="foregroundColor"
        :colorHover="backgroundColor"
        @change="updateColor"
      ></color-picker>
      <icon-button
        :color="foregroundColor"
        :colorHover="backgroundColor"
        @click.native="lock"
        :icon="locked ? 'lock' : 'lock-open'"
      ></icon-button>
      <icon-button
        :color="foregroundColor"
        :colorHover="backgroundColor"
        @click.native="copy"
        icon="copy"
      ></icon-button>
    </div>
    <input
      v-model="color"
      placeholder="color"
      :style="{ color: foregroundColor }"
    />
  </div>
</template>

<script>
import Vue from "vue";
import chroma from "chroma-js";
import ColorPicker from "@/components/ui/ColorPicker.vue";

export default Vue.extend({
  components: {
    ColorPicker,
  },
  data() {
    return {
      color: undefined,
      newColor: undefined,
      foregroundColor: undefined,
      backgroundColor: undefined,
      bright: false,
      hover: false,
    };
  },
  props: {
    id: {
      type: String,
    },
    locked: {
      type: Boolean,
      default: false,
    },
    canClose: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    getRandomHex() {
      const hex = [];

      for (let i = 0; i < 6; i++) {
        hex.push(Math.floor(Math.random() * 16).toString(16));
      }

      return `#${hex.join("").toUpperCase()}`;
    },
    randomize() {
      if (!this.locked) {
        this.color = this.getRandomHex();
      }
    },
    close() {
      this.$emit("close", this.id);
    },
    async lock() {
      const locked = await this.$store.dispatch(
        "palette/toggleLockById",
        this.id
      );
      if (locked === true) {
        this.$emit("lock", this.id);
      }
    },
    copy() {
      window.navigator.clipboard.writeText(this.color);
      this.$store.commit("snackbar/show", {
        message: "Copied!",
        color: this.color,
        timeout: 2000,
      });
    },
    updateColor(newColor) {
      this.color = newColor;
    },
    checkLuminance() {
      if (chroma(this.color).luminance() > 0.5) {
        this.bright = true;
      } else {
        this.bright = false;
      }
    },
    brighten() {
      return chroma(this.color).brighten(2).hex();
    },
    darken() {
      return chroma(this.color).darken(2).hex();
    },
  },
  watch: {
    color() {
      if (this.bright) {
        this.foregroundColor = this.darken();
        this.backgroundColor = this.brighten();
      } else {
        this.foregroundColor = this.brighten();
        this.backgroundColor = this.darken();
      }
    },
  },
  created() {
    this.randomize();
  },
  beforeDestroy() {
    this.$refs.toolbar.remove();
  },
  updated() {
    this.checkLuminance();
  },
});
</script>

<style lang="scss">
.color-column {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 0px;
  transition: width 1s ease-in-out;
  transition: transform 0.1s ease-out;

  .toolbar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > button {
      margin: 10px 0px;
    }
  }
  > input {
    border: none;
    margin-bottom: 80px;
    width: 100%;
    text-align: center;
    border-radius: 10px;
    padding: 5px;
    font-size: 30px;
    font-weight: 600;
    outline: none;
    text-transform: uppercase;
    background-color: transparent;
  }
}
</style>
