<template>
  <div class="navigation">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'Task Manager' }">Task Manager</router-link>
    <router-link :to="{ name: 'Chat' }">Chat</router-link>
    <p>{{ username }}</p>
  </div>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config";
import { ref } from "@vue/reactivity";
export default {
  components: {},
  setup() {
    let username = ref("");
    onAuthStateChanged(auth, (acc) => {
      if (acc) {
        username.value = acc.displayName;
      }
    });
    return { username };
  },
};
</script>

<style>
.navigation {
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  margin-left: 4vw;
  background-color: #414141;
  margin: 0;
  position: fixed;
  padding-top: 10px;
  padding-bottom: 10px;
}
.navigation p {
  margin: 0;
  color: rgb(230, 230, 230);
}
.navigation a {
  text-decoration: none;
  color: rgb(230, 230, 230);
  margin-left: 8vw;
}
/* colors are as follows
red #91001F
dred #59000F
white #E6E6E6
grey #8A8D91
black #414141 */
</style>