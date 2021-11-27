<template>
  <section class="home">
    <header>
      <icon-button @click.native="randomize" icon="dice"></icon-button>
      <icon-button @click.native="increment" icon="plus"></icon-button>
      <icon-button @click.native="clear" icon="redo"></icon-button>
    </header>
    <div>
      <v-color :id="id" @close="deleteColumn" v-for="id of palette.colors" :key="id" ref="columns"/>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import Color from "@/components/Color.vue";
import { v4 as uuidv4 } from 'uuid';

export default Vue.extend({
  name: "Home",
  components: {
    "v-color": Color,
  },
  data() {
    return {
      palette: {
        colors: [],
        originals: [],
        size: 5,
      },
    };
  },
  methods: {
    increment() {
      this.palette.size++;
      this.palette.colors.push(uuidv4())
    },
    decrement() {
      this.palette.size--;
    },
    clear() {
      const locked = this.$refs.columns.filter((component) => component.locked);
      
      this.palette.colors = locked.map((component) => component.id);

      while(this.palette.colors.length < 5) {
        this.palette.colors.push(uuidv4());
      }

      this.palette.size = 5;
    },
    randomize() {
      this.$refs.columns.map((component) => component.randomize());
    },
    deleteColumn(id) {
      this.palette.size--;
      const position = this.palette.colors.indexOf(id)
      this.palette.colors.splice(position, 1)
    }
  },
  created() {
    this.palette.colors = Array.from({length: this.palette.size}, () => uuidv4())
  }
});
</script>

<style lang="scss">
section.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    height: 100px;
    justify-content: center;
    align-items: center;

    > button {
      margin: 0 10px;
    }
  }

  > div {
    flex-grow: 8;
    display: flex;
    justify-content: center;
    align-items: stretch;
  }
}
</style>
