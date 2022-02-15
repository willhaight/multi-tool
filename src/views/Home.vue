<template>
  <div class="home">
    <Nav />
    <div class="icon-holder">
      <i class="fas fa-tools"></i>
      <h1>Welcome to the Multi-Tool</h1>
      <i class="fas fa-tools"></i>
    </div>
    <div class="auth-controls">
      <!-- <button @click="signUpMod">Sign Up</button> -->
      <button @click="loginMod">Login</button>
      <button @click="logout">Logout</button>
    </div>
    <div class="auth">
      <SignUp v-if="signUpStatus" @taskEmission="signUpMod" />
      <Login v-if="loginStatus" @taskEmission="loginMod" />
    </div>
    <div class="home-content">
      <h4>To sign up please reach out to Will</h4>
      <h5>Updates</h5>
      <h6>Patch 1.4</h6>
      <p>Added notifications in the Navigation for the chat</p>
      <h6>Patch 1.3</h6>
      <p>
        Task Manager Edited to be more user friendly and easier to read tasks.
        Chat was changed so that only ten of the latest messages will be shown
        to avoid crowding the page.
      </p>
      <h6>Patch 1.1 - 1.2</h6>
      <p>
        Fixed some of the scaling issues of the application with the tasks.
        Fixed all of the pop ups that were coming off the screen
      </p>
      <h6>Patch 1.0</h6>
      <p>App was launched</p>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Navigation.vue";
import { ref } from "@vue/reactivity";
import SignUp from "../components/auth/SignUp.vue";
import Login from "../components/auth/Login.vue";
import { auth } from "../config";
import { signOut } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "Home",
  components: { Nav, SignUp, Login },
  setup() {
    //vars
    let signUpStatus = ref(false);
    let loginStatus = ref(false);
    const router = useRouter();

    //functions
    const signUpMod = () => {
      signUpStatus.value = !signUpStatus.value;
      loginStatus.value = false;
    };

    const loginMod = () => {
      loginStatus.value = !loginStatus.value;
      signUpStatus.value = false;
    };

    const logout = async () => {
      await signOut(auth);
      router.go();
    };
    //return
    return { signUpStatus, signUpMod, logout, loginStatus, loginMod };
  },
};
</script>
<style>
.auth {
  /* background-color: #59000f; */
  color: rgb(233, 233, 233);
  border-radius: 10%;
}
body {
  background-color: #e6e6e6;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  font-size: 2vw;
}
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: none;
  min-height: 80%;
}
.icon-holder {
  display: flex;
  justify-content: center;
  width: 100vw;
  background-color: #414141;
  margin-top: 30px;
  font-size: 1.5vw;
}
i {
  margin-top: 2em;
  margin-left: 1em;
  margin-right: 1em;
}
.auth-controls {
  display: flex;
  justify-content: space-evenly;
  background-color: #59000f;
  width: 100vw;
  min-height: 2em;
}
.auth-controls button {
  margin-top: 2vw;
  max-height: 10%;
}
.auth-controls button {
  background-color: #8a8d91;
  border-radius: 15%;
  padding-top: 0.5vw;
  padding-bottom: 0.5vw;
  padding-left: 6vw;
  padding-right: 6vw;
  border-color: #8a8d91;
  margin-right: 1vw;
  margin-left: 1vw;
}
button {
  background-color: #e6e6e6;
  border-color: #414141;
  border-radius: 20%;
  padding-top: 0.3vw;
  padding-bottom: 0.3vw;
  min-width: 15vw;
}
textarea {
  white-space: pre-line;
  white-space: pre-wrap;
}
.home-content {
  background-color: #8a8d91;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-content p {
  text-align: center;
  width: 50%;
  font-size: 0.5em;
  padding-bottom: 5em;
}
.home-content h6 {
  padding: 0;
  margin: 0;
}
</style>


