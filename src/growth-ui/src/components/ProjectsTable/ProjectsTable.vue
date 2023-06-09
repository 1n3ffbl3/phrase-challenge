<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            class="text-left"
            @click="header.sortable ? sortBy(header.key) : undefined"
            :class="{
              'sort-active': !!header.sortable,
              'sort-asc': !!header.sortable,
              'sort-desc': sortKey === header.key && sortDirection === 'desc'
            }"
          >
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.status }}</td>
          <td>{{ row.dueDate }}</td>
          <td>{{ row.sourceLanguage }}</td>
          <td>{{ row.targetLanguages }}</td>
          <v-btn @click="goEditProject(row.id)">Edit</v-btn>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType, ref } from 'vue'
import { sort } from './sort'
import { projectListHeaders } from './headers'
import { useRouter } from 'vue-router'

export type ProjectRow = {
  id: number
  name: string
  status: string
  dueDate: string
  sourceLanguage: string
  targetLanguages: string
}

export type ColumnKey = keyof ProjectRow

export type Column = {
  title: string
  sortable: boolean
  key: ColumnKey
}

export default defineComponent({
  name: 'ProjectsTable',
  props: {
    projects: {
      type: Array as PropType<ProjectRow[]>,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const projects = computed(() => props?.projects ?? [])
    const sortKey = ref<ColumnKey>('id')
    const sortDirection = ref('asc')

    const sortedProjects = computed(() => {
      const sorted = [...(projects?.value ?? [])]

      sorted.sort((row1, row2) => sort(row1, row2, sortKey.value, sortDirection.value))

      return sorted
    })

    const sortBy = (key: ColumnKey) => {
      if (sortKey.value === key) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
      } else {
        sortKey.value = key
        sortDirection.value = 'asc'
      }
    }

    const goEditProject = async (id: number) => {
      return await router.push(`/projects/${id}/edit`)
    }

    return {
      rows: sortedProjects,
      sortBy,
      sortKey,
      sortDirection,
      headers: projectListHeaders,
      mdiPencil,
      goEditProject
    }
  }
})
</script>

<style scoped>
.sort-active {
  cursor: pointer;
}
.sort-asc::after {
  content: ' ▲';
}
.sort-desc::after {
  content: ' ▼';
}
</style>
