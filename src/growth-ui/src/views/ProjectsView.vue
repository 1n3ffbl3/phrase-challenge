<template>
  <v-container>
    <TotalOverview />

    <v-sheet class="d-flex flex-1-0" style="gap: 16px">
      <v-text-field v-model="name" label="Name" outlined />

      <v-select v-model="status" :items="statuses" label="Status" outlined />
    </v-sheet>

    <ProjectsTable :projects="projects" />
  </v-container>
</template>

<script lang="ts">
import ProjectsTable, { type ProjectRow } from '@/components/ProjectsTable/ProjectsTable.vue'
import type { Project } from '@/models/project'
import { type ProjectStatus, Status } from '@/models/status'
import { useProjectStore } from '@/stores/projectStore'
import { defineComponent, onMounted, computed, ref } from 'vue'

export default defineComponent({
  name: 'ProjectsView',
  components: {
    ProjectsTable
  },
  setup() {
    const name = ref<string | undefined>(undefined)
    const status = ref<ProjectStatus | undefined>(undefined)
    const projectStore = useProjectStore()

    onMounted(() => {
      projectStore.loadProjects()
    })

    const baseProjectRows = computed(() => {
      const mapProjectToRow = (project: Project): ProjectRow => ({
        id: project.id,
        name: project.name,
        status: project.status,
        dueDate: project.dueDate.toISOString(),
        sourceLanguage: project.sourceLanguage,
        targetLanguages: project.targetLanguages.join(', ')
      })

      const projects = projectStore.projects
      return (projects ?? []).map(mapProjectToRow)
    })

    const filteredProjectRows = computed(() => {
      return baseProjectRows.value.filter((projectRow) => {
        const nameMatches =
          !name.value || projectRow.name.toLowerCase().includes(name.value.toLowerCase())
        const statusMatches =
          !status.value || projectRow.status.toLowerCase() === status.value.toLowerCase()
        return nameMatches && statusMatches
      })
    })

    return {
      name,
      status,
      statuses: [undefined, ...Object.values(Status)],
      projects: filteredProjectRows
    }
  }
})
</script>
