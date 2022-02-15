<template>
  <div class="navigation">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'Task Manager' }">Task Manager</router-link>
    <div>
      <router-link :to="{ name: 'Chat' }">
        Chat
        <span class="notes">{{ notifications }}</span>
      </router-link>
    </div>
    <p>{{ username }}</p>
  </div>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, collection } from "firebase/firestore";
import { auth, db } from "../config";
import { ref } from "@vue/reactivity";
export default {
  components: {},
  props: ["counterNotify"],
  emits: ["adjust"],
  setup(props, emit) {
    //vars
    let username = ref("");
    let notifications = ref(0);
    let firstLoad = true;
    console.log("notis", props.counterNotify);
    //functions
    onAuthStateChanged(auth, (acc) => {
      if (acc) {
        username.value = acc.displayName;
      }
    });

    onSnapshot(collection(db, "chats"), (snap) => {
      if (props.counterNotify) {
        notifications.value = notifications.value + 1 - props.counterNotify;
      } else {
        notifications.value++;
      }
      if (firstLoad == true) {
        notifications.value = 0;
        firstLoad = false;
      }
      emit.emit("adjust");
    });

    //returns
    return { username, notifications };
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
.clear-notifications {
  padding: 0;
  color: black;
  min-width: 5em;
}
.notes {
  color: black;
  background-color: orange;
  border-radius: 3em;
  text-align: center;
  padding-left: 2px;
  padding-right: 1px;
}
/* colors are as follows
red #91001F
dred #59000F
white #E6E6E6
grey #8A8D91
black #414141 */
</style>