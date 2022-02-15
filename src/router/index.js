import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TaskManager from '../views/TaskManager.vue'
import Chat from '../views/Chat.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tasks',
    name: 'Task Manager',
    component: TaskManager,
    props: true
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
