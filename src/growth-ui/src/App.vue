<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-card class="mx-auto" max-width="1080">
    <v-layout>
      <v-app-bar :elevation="1" density="compact">
        <RouterLink to="/">
          <v-btn>Projects</v-btn>
        </RouterLink>
        <RouterLink to="/projects/new">
          <v-btn>New</v-btn>
        </RouterLink>
      </v-app-bar>

      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped></style>
