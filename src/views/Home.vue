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
      <icon-button
        :color="'#303030'"
        :colorHover="'#CCCCCC'"
        @click.native="unlockAll"
        icon="lock-open"
      ></icon-button>

      <div class="user-buttons" v-if="!$store.state.user.logged">
        <button id="login" @click="showLogin = true">Log In</button>
        <button id="signup">Sign Up</button>
      </div>
      <div class="user-buttons" v-else>
        <div>Olá, {{$store.state.user.user.name}} </div>
        <button id="logout" @click="$store.commit('user/logout')">Logout</button>
      </div>
    </header>

    <v-login-form :show="showLogin" @close="showLogin = false" />

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
import IconButton from "@/components/ui/IconButton.vue";
import LoginForm from "@/components/ui/LoginForm.vue";

export default Vue.extend({
  name: "Home",
  components: {
    "v-color": Color,
    "v-login-form": LoginForm,
    IconButton,
  },
  data() {
    return {
      palette: {
        colors: [],
        originals: [],
        size: 5,
      },
      lockedColumn: [undefined],
      showLogin: false,
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
        this.decrement();
        const position = this.palette.colors.indexOf(id);
        this.palette.colors.splice(position, 1);
      }
    },
    sendToFront(id) {
      const position = this.palette.colors.indexOf(id);
      this.lockedColumn = this.palette.colors.splice(position, 1);
      this.palette.colors.unshift(this.lockedColumn[0]);
    },
    keyDownHandler(e) {
      if (e.code === "Space") {
        this.randomize();
      }
    },
    unlockAll() {
      for (let i = 0; i < this.palette.colors.length; i++) {
        if (this.$refs.columns[i].locked === true) {
          this.$refs.columns[i].locked = false;
        }
      }
    },
  },
  computed: {
    canClose: function () {
      if (this.palette.size <= 3) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    this.palette.colors = Array.from({ length: this.palette.size }, () =>
      uuidv4()
    );
  },
  mounted() {
    window.addEventListener("keydown", this.keyDownHandler);
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
