<template>
  <button :style="{borderColor}" class="icon-button">
    <div class="icon-wrapper">
      <fa-icon size="lg" :icon="icon" fixed-width :style="{color}"></fa-icon>
    </div>
  </button>
</template>

<script>
import Vue from 'vue'
import chroma from 'chroma-js';

export default Vue.extend({
  name: 'IconButton',
  data() {
    return {
      darken: chroma(this.color).darken(),
      brighten: chroma(this.color).brighten(),
    }
  },
  props: {
    icon: {
      type: String,
      default: "times"
    },
    color: {
      type: String,
      default: '#000000'
    },
    borderColor: {
      type: String,
      default: '#000000'
    }
  }
})
</script>

<style lang="scss">
  .icon-button {
    padding: 16px;
    background: transparent;
    cursor: pointer;
    transition: background-color 0.5s ease;
    border-radius: 400px;

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
    backdrop-filter: brightness(150%);
    
    > svg {
      transform: scale(130%);
    }
  }
</style>