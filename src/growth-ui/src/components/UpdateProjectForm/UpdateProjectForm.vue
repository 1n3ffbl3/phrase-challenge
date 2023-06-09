<template>
  <v-form @submit.prevent="handleSubmit" class="update-project-form">
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
  <v-card>
    <v-card-title> Result </v-card-title>
    <v-card-text v-if="updateState.data !== undefined">
      {{ updateState.data.id }}
      {{ updateState.data.name }}
      {{ updateState.data.sourceLanguage }}
      {{ updateState.data.targetLanguages.join(', ') }}
    </v-card-text>
    <v-card-text v-else-if="updateState.error !== undefined">
      An error has occured when
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { DefaultGrowthApiClient } from '@/growth-api-client'
import type { Project } from '@/models/project'
import { languageOptions } from '@/shared/language'
import { sourceLanguageRules, nameRules, targetLanguagesRules } from '@/shared/rules'
import { toRefs } from 'vue'
import { ref, type PropType } from 'vue'
import { z } from 'zod'

const params = defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true
  }
})
const { project } = toRefs(params)

interface FormValues {
  name: string
  sourceLanguage: string
  targetLanguages?: string[]
}
const form = ref<FormValues>({
  name: project.value.name,
  sourceLanguage: project.value.sourceLanguage,
  targetLanguages: project.value.targetLanguages
})

const client = new DefaultGrowthApiClient('http://localhost:5173/api')

const schema = z.object({
  name: z.string().nonempty('Name is required'),
  sourceLanguage: z.string().length(2, 'Source Language must be a two-letter code'),
  targetLanguages: z
    .array(z.string().length(2, 'Target Languages must be two-letter codes'))
    .optional()
})

const dialogVisible = ref<boolean>(false)
const updateState = ref<{
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
    updateState.value = { isLoading: true, data: undefined, error: undefined }
    try {
      const response = await client
        .updateProject(project.value.id, {
          name: validationResult.data.name,
          sourceLanguage: validationResult.data.sourceLanguage,
          targetLanguages: validationResult.data.targetLanguages ?? []
        })
        .then((resp) => {
          // resetFields()
          return {
            id: resp.id,
            name: resp.name,
            sourceLanguage: resp.sourceLanguage,
            targetLanguages: resp.targetLanguages
          }
        })
      updateState.value = { ...updateState.value, data: response }
    } catch (error: unknown) {
      updateState.value = { ...updateState.value, error: true }
    } finally {
      updateState.value = { ...updateState.value, isLoading: true }
      showDialog()
    }
  } else {
    console.error(validationResult.error)
  }
}
</script>

<style scoped>
.update-project-form {
  margin: 16px;
}
</style>
