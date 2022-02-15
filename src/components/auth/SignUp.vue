<template>
  <div class="auth">
    <h1>Create an Account</h1>
    <label>Email</label>
    <input type="text" v-model="email" placeholder="Email" />
    <label>Username</label>
    <input type="text" v-model="userName" placeholder="Username" />
    <label>Password</label>
    <input
      type="password"
      v-model="password"
      @keypress.enter="signUp"
      placeholder="Password"
    />
    <button @click="signUp">Create Account</button>
  </div>
</template>

<script>
import { auth } from "../../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "@vue/reactivity";
export default {
  emits: ["taskEmission"],
  setup(props, setup) {
    let email = ref("");
    let password = ref("");
    let userName = ref("");

    let signUp = async () => {
      console.log("signing up");
      const res = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      await updateProfile(res.user, { displayName: userName.value });
      setup.emit("taskEmission");
    };
    return { signUp, email, password, userName };
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
  left: 32.5vw;
  top: 30%;
}
.auth input {
  width: 100%;
  margin-bottom: 1vw;
}
</style>