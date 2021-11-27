<template>
  <div class="color-column" :style="{ backgroundColor: color.base }">
    <div class="toolbar">
      <icon-button :color="color.darken" :borderColor="'transparent'" @click.native="close" icon="times"></icon-button>
      <icon-button :color="color.darken" :borderColor="'transparent'" @click.native="lock" :icon="locked ? 'lock' : 'lock-open'"></icon-button>
      <icon-button :color="color.darken" :borderColor="'transparent'" icon="arrows-alt"></icon-button>
      <icon-button :color="color.darken" :borderColor="'transparent'" @click.native="copy" icon="copy"></icon-button>
    </div>
    <div>
      {{ color.base }}
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import chroma from 'chroma-js';

export default Vue.extend({
  data() {
    return {
      color: {
        base: undefined,
        darken: undefined,
        brighten: undefined
      },
      locked: false,
    };
  },
  props: {
    id: {
      type: String
    }
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
        this.color.base = this.getRandomHex();
        this.color.darken = chroma(this.color.base).darken().hex()
        this.color.brighten = chroma(this.color.base).brighten().hex()
      }
    },
    close() {
      this.$emit('close', this.id)
      this.$destroy()
      this.$el.remove()
    },
    lock() {
      this.locked = !this.locked
    },
    copy() {
      console.log(window.navigator.clipboard)
      window.navigator.clipboard.writeText(this.color.base)
    }
  },
  created() {
    this.randomize();
  },
});
</script>

<style lang="scss">
.color-column {
  display: flex;
  flex-grow: 8;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .toolbar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    > button {
      margin: 10px 0px;
    }
  }
}
</style>