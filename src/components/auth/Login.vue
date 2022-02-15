<template>
  <div class="auth">
    <h1>Login</h1>
    <label>Email</label>
    <input type="text" v-model="email" placeholder="Email" />
    <label>Password</label>
    <input
      type="password"
      v-model="password"
      @keypress.enter="login"
      placeholder="Password"
    />
    <button @click="login">Login</button>
  </div>
</template>

<script>
import { db } from "../../config";
import { auth } from "../../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "@vue/reactivity";
export default {
  emits: ["taskEmission"],
  setup(props, setup) {
    let email = ref("");
    let userName = ref("");
    let password = ref("");

    const login = async () => {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      setup.emit("taskEmission");
    };
    return { login, email, userName, password };
  },
};
</script>

<style scoped>
.auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #91001f;
  position: fixed;
  padding-bottom: 2vw;
  padding-right: 2vw;
  padding-left: 2vw;
  left: 36.5vw;
  top: 30%;
}
.auth input {
  width: 100%;
  margin-bottom: 1vw;
}
</style>