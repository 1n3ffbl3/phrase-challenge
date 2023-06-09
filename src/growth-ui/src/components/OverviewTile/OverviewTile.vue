<template>
  <v-card :title="title" variant="tonal">
    <v-card-item>
      <v-card-text>
        {{ statistic }}
      </v-card-text>
    </v-card-item>
  </v-card>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OverviewTile',
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
      validator: (value: string) => {
        return value.length >= 0
      }
    },
    statistic: {
      type: String as PropType<string>,
      required: true,
      validator: (value: string) => {
        return value.length >= 0
      }
    }
  }
})
</script>
