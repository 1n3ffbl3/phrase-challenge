<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script lang="ts">
import type { Project } from '@/models/project'
import { useProjectStore } from '@/stores/projectStore'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ProjectsView',
  setup() {
    const projectStore = useProjectStore()
    const projects = ref<Project[]>([])

    projectStore.loadProjects()

    return {
      projects: projects
    }
  }
})
</script>
