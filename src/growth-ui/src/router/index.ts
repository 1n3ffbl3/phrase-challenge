import { createRouter, createWebHistory } from 'vue-router'
import ProjectsView from '../views/ProjectsView.vue'
import CreateProjectView from '../views/CreateProjectView.vue'
import EditProjectView from '../views/EditProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProjectsView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView
    },
    {
      path: '/projects/new',
      name: 'new-project',
      component: CreateProjectView
    },
    {
      path: '/projects/:id/edit',
      name: 'edit-project',
      component: EditProjectView
    }
  ]
})

export default router
