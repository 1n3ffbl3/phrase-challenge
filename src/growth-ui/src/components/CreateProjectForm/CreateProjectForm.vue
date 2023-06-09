<template>
  <v-form @submit.prevent="handleSubmit" class="create-project-form">
    <v-text-field v-model="form.name" :rules="nameRules" label="Name" required></v-text-field>
    <v-select
      v-model="form.sourceLanguage"
      :items="languageOptions"
      label="Source Language"
      required
      :rules="sourceLanguageRules"
    ></v-select>
    <v-autocomplete
      v-model="form.targetLanguages"
      :items="languageOptions"
      label="Target Languages"
      multiple
      chips
      :rules="targetLanguagesRules"
    ></v-autocomplete>
    <v-btn type="submit" color="primary">Submit</v-btn>
  </v-form>
  <v-card vclass="mx-auto" max-width="344" variant="outlined">
    <v-card-title>New Project</v-card-title>
    <v-card-text v-if="createState.data !== undefined">
      <v-card-item>
        <div>
          <div class="text-overline mb-1">Name: {{ createState.data.name }}</div>
          <div class="text-caption">Id:{{ createState.data.id }}</div>
          <div class="text-caption">Source language: {{ createState.data.sourceLanguage }}</div>
          <div class="text-caption">
            Target language(s): {{ createState.data.targetLanguages.join(', ') }}
          </div>
        </div>
      </v-card-item>
    </v-card-text>
    <v-card-text v-else-if="createState.error !== undefined">
      An error has occured when
    </v-card-text>
  </v-card>
  <div class="come-back-to-projects-btn-wrapper">
    <RouterLink to="/projects">
      <v-btn color="primary" class="come-back-to-projects">Come back to projects</v-btn>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { sourceLanguageRules, nameRules, targetLanguagesRules } from '@/shared/rules'
import { languageOptions } from '@/shared/language'
import { defaultClient } from '@/growth-api-client/default'
import { ProjectsService } from '@/services/projectsService'
import { RouterLink } from 'vue-router'

const projectsService = new ProjectsService(defaultClient)

const schema = z.object({
  name: z.string().nonempty('Name is required'),
  sourceLanguage: z.string().length(2, 'Source Language must be a two-letter code'),
  targetLanguages: z
    .array(z.string().length(2, 'Target Languages must be two-letter codes'))
    .optional()
})

interface FormValues {
  name: string
  sourceLanguage: string
  targetLanguages?: string[]
}

const form = ref<FormValues>({
  name: '',
  sourceLanguage: '',
  targetLanguages: []
})

const dialogVisible = ref<boolean>(false)
const createState = ref<{
  isLoading: boolean
  data:
    | {
        id: number
        name: string
        sourceLanguage: string
        targetLanguages: string[]
      }
    | undefined
  error: unknown
}>({
  isLoading: false,
  data: undefined,
  error: undefined
})

const showDialog = () => {
  dialogVisible.value = true
}

const handleSubmit = async () => {
  const validationResult = schema.safeParse(form.value)
  if (validationResult.success) {
    createState.value = { isLoading: true, data: undefined, error: undefined }
    try {
      const response = await projectsService
        .createProject({
          name: validationResult.data.name,
          sourceLanguage: validationResult.data.sourceLanguage,
          targetLanguages: validationResult.data.targetLanguages ?? [],
          status: 'NEW'
        })
        .then((resp) => {
          return {
            id: resp.id,
            name: resp.name,
            sourceLanguage: resp.sourceLanguage,
            targetLanguages: resp.targetLanguages
          }
        })
      createState.value = { ...createState.value, data: response }
    } catch (error: unknown) {
      createState.value = { ...createState.value, error: true }
    } finally {
      createState.value = { ...createState.value, isLoading: true }
      showDialog()
    }
  } else {
    console.error(validationResult.error)
  }
}
</script>

<style scoped>
.create-project-form {
  margin: 16px;
}
.come-back-to-projects-btn-wrapper {
  margin: 16px;
}
</style>
