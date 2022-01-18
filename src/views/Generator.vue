<template>
  <section class="generator">
    <transition-group name="list" tag="div">
      <v-color
        :id="id"
        :locked="locked"
        @close="$store.dispatch('palette/deleteColorById', id)"
        @lock="$store.dispatch('palette/sendToFront', id)"
        v-for="{ id, locked } of $store.state.palette.colors"
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

export default Vue.extend({
  name: "Generator",
  components: {
    "v-color": Color,
  },
  methods: {
    keyDownHandler(e) {
      if (e.code === "Space") {
        this.$store.dispatch("palette/randomize");
      }
    },
  },
  computed: {
    canClose: function () {
      if (this.$store.state.palette.size <= 3) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.keyDownHandler);
  },
});
</script>

<style lang="scss">
section.generator {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    height: 100px;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;

    > button {
      margin: 0 10px;
    }

    > .user-buttons {
      position: absolute;
      right: 0;
      margin-right: 15px;
      display: flex;
      align-items: center;

      > button {
        margin: 0 20px;
        padding: 15px;
        background-color: white;
        color: #303030;
        font-weight: bold;
        letter-spacing: 0.05em;
        border: 2px solid #303030;
        border-radius: 5px;
        text-transform: uppercase;
        transition: 0.3s ease;
      }

      > button:hover {
        border: 2px solid #303030;
        border-radius: 10px;
        background-color: #303030;
        color: #cccccc;
      }
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
