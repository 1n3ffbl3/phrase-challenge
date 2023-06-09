<template>
  <v-container>
    <CreateProjectForm />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CreateProjectForm from '@/components/CreateProjectForm/CreateProjectForm.vue'

export default defineComponent({
  name: 'CreateProjectView',
  components: {
    CreateProjectForm
  }
})
</script>
