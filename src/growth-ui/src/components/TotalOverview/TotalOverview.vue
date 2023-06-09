<template>
  <v-container>
    <v-sheet class="d-flex flex-1-0" style="gap: 32px">
      <OverviewTile title="New projects" :statistic="overview.statusCount.new.toString()">
      </OverviewTile>
      <OverviewTile
        title="Delivered projects"
        :statistic="overview.statusCount.delivered.toString()"
      >
      </OverviewTile>
      <OverviewTile
        title="Completed projects"
        :statistic="overview.statusCount.completed.toString()"
      >
      </OverviewTile>
    </v-sheet>
    <v-sheet class="d-flex flex-1-0" style="margin-top: 32px; gap: 32px">
      <OverviewTile
        title="Due date projects"
        :statistic="overview.dueDateInThePastCount.toString()"
      >
      </OverviewTile>
      <OverviewTile title="Most prominent language" :statistic="overview.prominentLanguage">
      </OverviewTile>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import { useProjectStore } from '@/stores/projectStore'
import { defineComponent, computed } from 'vue'
import { calculateStatistics } from './calculateStatistics'

export default defineComponent({
  name: 'TotalOverview',
  setup() {
    const projectStore = useProjectStore()
    const overview = computed(() => {
      const projects = projectStore.projects
      const statistics = calculateStatistics(projects)
      return statistics
    })

    return {
      overview
    }
  }
})
</script>
