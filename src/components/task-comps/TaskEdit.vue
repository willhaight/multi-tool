<template>
  <div class="edit-container">
    <input type="text" v-model="newTitle" />
    <br />
    <textarea v-model="newDetails"></textarea>
    <button @click="handleSave">Save</button>
    <button @click="handleDelete" class="delete">Delete</button>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { db } from "../../config";
import { auth } from "../../config";
import { collection, deleteDoc, setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
export default {
  emits: ["matching"],
  props: ["TaskData", "taskId"],
  setup(props, setup) {
    const taskObj = ref(props.TaskData);
    const userId = ref(props.taskId);
    let newTitle = ref(taskObj.value.title);
    let newDetails = ref(taskObj.value.details);
    let newTaskEditingStatus = ref(false);
    setup.emit("matching", taskObj.value.title);

    //functions
    const handleDelete = async () => {
      if (confirm("are you sure you want to delete " + newTitle.value)) {
        await deleteDoc(doc(db, userId.value, taskObj.value.title));
      }
    };

    const handleSave = async () => {
      let fullTask = {
        title: newTitle.value,
        details: newDetails.value,
        status: newTaskEditingStatus.value,
      };

      await deleteDoc(doc(db, userId.value, taskObj.value.title));
      await setDoc(doc(db, userId.value, newTitle.value), fullTask);
    };
    return {
      taskObj,
      handleDelete,
      handleSave,
      newTitle,
      newDetails,
    };
  },
};
</script>

<style>
.edit-container {
  background-color: #91001f;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 1em;
  padding-bottom: 1em;
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  max-width: 20em;
}
.edit-container textarea {
  min-height: 10em;
}
.delete {
  background-color: #414141;
  color: rgb(238, 236, 236);
}
.edit-container input {
  width: 70%;
}
</style>