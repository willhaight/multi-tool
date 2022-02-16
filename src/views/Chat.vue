<template>
  <div class="content">
    <Nav :counterNotify="notifyCancel" @adjust="fix" />
    <div class="header">
      <h1>Chatroom</h1>
    </div>
    <div class="window">
      <div class="chat-display">
        <div v-for="message in messageColl" :key="message" class="sent-message">
          <p>{{ message.message }}</p>
        </div>
      </div>
      <div class="inputs">
        <input
          type="text"
          v-model="message"
          @keypress.enter="sendMessage"
          placeholder="Write a message..."
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import Nav from "../components/Navigation.vue";
import { auth, db } from "../config";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  addDoc,
  orderBy,
  serverTimestamp,
  query,
} from "firebase/firestore";
export default {
  components: { Nav },
  setup() {
    //vars
    let message = ref("");
    let notifyCancel = ref(0);
    let user = ref("");
    let messageColl = ref([]);
    let router = useRouter();
    let noteAdjust = 0;
    //functions
    onAuthStateChanged(auth, (acc) => {
      if (acc) {
        user.value = acc.displayName;
      } else {
        router.push({ name: "Home" });
      }
    });

    onSnapshot(
      query(collection(db, "chats"), orderBy("time", "desc")),
      (snap) => {
        messageColl.value = [];
        snap.docs.forEach((doc) => {
          messageColl.value.push(doc.data());
          if (messageColl.value.length > 10) {
            for (let i = 0; i < 50; i++) {
              messageColl.value.splice(10, 1);
            }
          }
        });
      }
    );

    const sendMessage = async () => {
      let fullMessage = {
        message: user.value + ": " + message.value,
        time: serverTimestamp(),
      };
      notifyCancel.value = 2 + noteAdjust;
      await addDoc(collection(db, "chats"), fullMessage);
      console.log(user.value, message.value);
      message.value = "";
    };

    const fix = (noteAmount) => {
      notifyCancel.value = 0;
      noteAdjust = noteAmount
    };

    //returns
    return { message, sendMessage, messageColl, fix, notifyCancel };
  },
};
</script>

<style>
.header {
  background-color: #414141;
  width: 100vw;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  margin-top: 30px;
  font-size: 1.5vw;
}
.window {
  width: 100vw;
  padding-bottom: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #59000f;
  color: rgb(237, 237, 237);
}
.chat-display {
  max-height: 15em;
  width: 50vw;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
}
.sent-message {
  border: solid #414141 2px;
  margin-bottom: 2vw;
  background-color: #91001f;
  border-radius: 10%;
}
.sent-message p {
  margin-left: 2vw;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
input {
  padding-top: 0.3vw;
  padding-bottom: 0.3vw;
  width: 35%;
}
.inputs {
  width: 100vw;
  display: flex;
  justify-content: center;
}
</style>