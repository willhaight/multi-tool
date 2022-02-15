<template>
  <div class="clock">
    <h3>{{ clock.name }}</h3>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: ["clockInfo"],
  setup(props) {
    //vars
    let clock = ref(props.clockInfo);
    console.log(clock);

    //returns
    return { clock };
  },
};
</script>

<style>
</style>