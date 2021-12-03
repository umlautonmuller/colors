<template>
  <section class="home">
    <header>
      <icon-button
        :color="'#303030'"
        :colorHover="'#CCCCCC'"
        @click.native="randomize"
        icon="dice"
      ></icon-button>
      <icon-button
        :color="'#303030'"
        :colorHover="'#CCCCCC'"
        @click.native="increment"
        icon="plus"
      ></icon-button>
      <icon-button
        :color="'#303030'"
        :colorHover="'#CCCCCC'"
        @click.native="clear"
        icon="redo"
      ></icon-button>
    </header>
    <transition-group name="list" tag="div">
      <v-color
        :id="id"
        @close="deleteColumn"
        @lock="sendToFront"
        v-for="id of palette.colors"
        :key="id"
        ref="columns"
        :canClose="canClose"
      />
    </transition-group>
  </section>
</template>

<script>
import Vue from "vue";
import Color from "@/components/Color.vue";
import { v4 as uuidv4 } from "uuid";

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
      lockedColumn: [undefined],
    };
  },
  methods: {
    increment() {
      if (this.palette.size < 8) {
        this.palette.size++;
        this.palette.colors.push(uuidv4());
      }
    },
    decrement() {
      this.palette.size--;
    },
    clear() {
      const locked = this.$refs.columns.filter((component) => component.locked);

      this.palette.colors = locked.map((component) => component.id);

      while (this.palette.colors.length < 5) {
        this.palette.colors.push(uuidv4());
      }

      this.palette.size = 5;
    },
    randomize() {
      this.$refs.columns.map((component) => component.randomize());
    },
    deleteColumn(id) {
      if (this.palette.size > 3) {
        this.decrement()
        const position = this.palette.colors.indexOf(id);
        this.palette.colors.splice(position, 1);
      }
    },
    sendToFront(id) {
      const position = this.palette.colors.indexOf(id);
      this.lockedColumn = this.palette.colors.splice(position, 1)
      this.palette.colors.unshift(this.lockedColumn[0])
    },
  },
  computed: {
    canClose: function () {
      if (this.palette.size <= 3) {
        return false
      } else {
        return true
      }
    }
  },
  created() {
    this.palette.colors = Array.from({ length: this.palette.size }, () =>
      uuidv4()
    );
  },
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
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: stretch;
    overflow: hidden;
  }
}

.list-move {
  transition: transform 1s;
}
.list-enter-active,
.list-leave-active {
  transition: flex-grow 0.5s;
}
.list-enter, .list-leave-active  /* .list-leave-active below version 2.1.8 */ {
  flex-grow: 0;
}
</style>
