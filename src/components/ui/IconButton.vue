<template>
  <button class="icon-button" :style="styleObject">
    <div class="icon-wrapper">
      <fa-icon size="lg" :icon="icon" fixed-width :style="{ color }"></fa-icon>
    </div>
  </button>
</template>

<script>
import Vue from "vue";
import chroma from "chroma-js";

export default Vue.extend({
  name: "IconButton",
  data() {
    return {
      darken: chroma(this.color).darken(),
      brighten: chroma(this.color).brighten(),
    };
  },
  props: {
    icon: {
      type: String,
      default: "times",
    },
    color: {
      type: String,
      default: "#000000",
    },
    colorHover: {
      type: String,
      default: "#ffffff",
    },
  },
  computed: {
    styleObject: function () {
      return {
        "--color-hover": this.colorHover,
      };
    },
  },
});
</script>

<style lang="scss">
:root {
  --color-hover: #ffffff;
}

.icon-button {
  padding: 16px;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.5s ease-out;
  border-radius: 400px;
  border-color: transparent;

  > .icon-wrapper {
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > svg {
    color: white;
  }
}

.icon-button:hover {
  /* backdrop-filter: brightness(150%); */
  background-color: var(--color-hover);

  > svg {
    transform: scale(130%);
  }
}
</style>
