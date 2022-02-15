<template>
  <div class="holder">
    <label>Task Name</label>
    <input type="text" placeholder="Task name" v-model="taskTitle" />
    <label>Task Notes</label>
    <textarea
      placeholder="Write your task notes here"
      v-model="taskDetails"
    ></textarea>
    <button @click="taskAdding">Create Task!</button>
  </div>
</template>

<script>
import { db } from "../../config";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config";
import { ref } from "@vue/reactivity";
export default {
  emits: ["addedTask"],
  props: ["allData"],
  setup(props, setup) {
    //vars
    let collName = ref("");
    let taskTitle = ref("");
    let taskDetails = ref("");
    let taskEditingStatus = ref(false);
    let currentUserData = ref(props.allData);

    onAuthStateChanged(auth, (res) => {
      collName.value = res.uid + "Tasks";
    });

    //function
    const taskAdding = async () => {
      let taskPassed = true;
      let fullTask = {
        title: taskTitle.value,
        details: taskDetails.value,
        status: taskEditingStatus.value,
      };

      currentUserData.value.forEach((data) => {
        if (data.title == fullTask.title) {
          taskPassed = false;
        }
      });
      if (taskPassed) {
        await setDoc(doc(db, collName.value, fullTask.title), fullTask);
        setup.emit("addedTask");
      } else {
        alert("same title");
      }
    };
    //returns
    return { taskAdding, taskTitle, taskDetails };
  },
};
</script>

<style>
</style>