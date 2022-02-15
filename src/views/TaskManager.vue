<template>
  <div class="content">
    <Nav />
    <div class="heading">
      <h1>Task Manager</h1>
      <div class="task-controls"></div>
    </div>
    <div class="task-adding">
      <button @click="addTaskStatus">Add Task</button>

      <div v-if="taskCreate" class="task-creation">
        <TaskCreate
          @addedTask="addTaskStatus"
          @userId="console.log('ji')"
          :allData="userTaskData"
        />
      </div>
    </div>
    <div v-for="task in userTaskData" :key="task" class="task-coll">
      <div class="task-single">
        <button @click="startEdit(task.title, task.details)">Edit</button>
        <h3>{{ task.title }}</h3>
        <p>{{ task.details }}</p>
      </div>
      <div class="taskEdit">
        <TaskEdit
          :taskId="userId"
          :TaskData="task"
          v-if="task.status"
          @matching="matching"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Nav from "../components/Navigation.vue";
import TaskCreate from "../components/task-comps/TaskCreate.vue";
import { db } from "../config";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config";
import { useRouter } from "vue-router";
import TaskEdit from "../components/task-comps/TaskEdit.vue";

export default {
  components: { Nav, TaskCreate, TaskEdit },
  setup() {
    //vars
    let userId = ref("");
    let userTaskData = ref([]);
    const router = useRouter();

    //functions
    onAuthStateChanged(auth, (res) => {
      if (res) {
        userId.value = res.uid + "Tasks";
      } else {
        router.push({ name: "Home" });
      }

      let coll = collection(db, userId.value);

      onSnapshot(coll, (snap) => {
        userTaskData.value = [];
        snap.docs.forEach((doc) => {
          userTaskData.value.push(doc.data());
        });
      });
    });

    let taskCreate = ref(false);

    const addTaskStatus = () => {
      taskCreate.value = !taskCreate.value;
    };
    const startEdit = (title, details) => {
      userTaskData.value.forEach((task) => {
        if (title == task.title) {
          task.status = !task.status;
        }
      });
    };
    const matching = (data) => {
      //console.log(userTaskData.value);
    };

    return {
      addTaskStatus,
      taskCreate,
      userTaskData,
      startEdit,
      userId,
      matching,
    };
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.heading {
  background-color: #414141;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  font-size: 1.5vw;
}
.task-coll {
  width: 100vw;
  background-color: #59000f;
  color: rgb(235, 234, 234);
  display: flex;
  padding-top: 1em;
  padding-bottom: 1em;
  max-height: 16em;
}
.taskEdit {
  width: 15em;
  margin-left: 15em;
  margin-bottom: 10em;
  margin-right: 4em;
}
.task-single {
  display: flex;
  flex-direction: column;
  margin-left: 5vw;
  font-size: 1.5vw;
  background-color: #91001f;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
  max-width: 20em;
  min-width: 20em;
  border-radius: 10%;
  min-height: 21em;
  white-space: pre-line;
  white-space: pre-wrap;
  overflow-y: scroll;
}
.task-single button {
  margin-top: 3em;
}
.task-single h3 {
  margin: 0;
  margin-top: 2vw;
}
.task-single p {
  padding-bottom: 5em;
}
.task-adding {
  background-color: #59000f;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3vw;
}
@media only screen and (max-width: 600px) {
  .task-single {
    font-size: 1.5vw;
  }
}
</style>