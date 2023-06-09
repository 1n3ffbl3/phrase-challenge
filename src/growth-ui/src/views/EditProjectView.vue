<template>
  <v-container>
    <v-container v-if="project === undefined">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-container>
    <v-container v-if="project !== undefined">
      <UpdateProjectForm :project="project" />
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UpdateProjectForm from '@/components/UpdateProjectForm/UpdateProjectForm.vue'
import type { Project } from '@/models/project'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { defaultClient } from '@/growth-api-client/default'
import { ProjectsService } from '@/services/projectsService'

const projectService = new ProjectsService(defaultClient)

export default defineComponent({
  name: 'CreateProjectView',
  components: {
    UpdateProjectForm
  },
  setup() {
    const route = useRoute()
    const project = ref<Project | undefined>()

    onMounted(async () => {
      const id = route.params.id
      const responseProject = await projectService.getProjectById(Number(id))
      project.value = responseProject
    })

    return {
      project
    }
  }
})
</script>
