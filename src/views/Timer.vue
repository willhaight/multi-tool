<template>
  <div class="content">
    <Nav />
    <div class="heading">
      <h1>Timer</h1>
    </div>
    <div class="main-body">
      <div class="add-clock">
        <button @click="beginClockMake" id="clockInit">Add Clock</button>
        <div class="clock-gen" v-if="clockMaking">
          <h3>Create A Clock</h3>
          <label>Name</label>
          <input v-bind="clockName" type="text" />
          <!-- <label>limit in hours</label>
          <input type="number" />
          <label>limit in minutes</label>
          <input type="number" />
          <label>limit in seconds</label>
          <input type="number" /> -->
          <button @click="addClock">Create</button>
        </div>
      </div>
      <div v-for="clock in clocks" :key="clock.id" class="clock-wall">
        <Clock :clockInfo="clock" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Nav from "../components/Navigation.vue";
import Clock from "../components/timer/clock.vue";
export default {
  components: { Nav, Clock },
  setup() {
    //vars
    let clocks = ref([]);
    let clockCount = 0;
    let clockMaking = ref(false);
    let clockName = ref("");

    //functions
    const addClock = () => {
      clockCount++;
      let clock = {
        name: clockName.value,
        id: clockCount,
      };
      clocks.value.push(clock);
    };
    const beginClockMake = () => {
      clockMaking.value = !clockMaking.value;
    };
    //returns
    return { clocks, addClock, clockMaking, beginClockMake, clockName };
  },
};
</script>

<style scoped>
.heading {
  background-color: #414141;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  font-size: 1.5vw;
}
.main-body {
  background-color: #91001f;
  width: 100%;
}
.clock-gen {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #59000f;
  width: 50%;
  border-radius: 1em;
}
.add-clock {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.add-clock #clockInit {
  margin-top: 2em;
  margin-bottom: 2em;
}
</style>