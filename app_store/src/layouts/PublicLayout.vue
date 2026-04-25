<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
    <PublicHeader />
    
    <main class="flex-1">
      <slot />
    </main>
    
    <PublicFooter />
  </div>
</template>

<script setup>
import PublicFooter from "./PublicFooter.vue"
import PublicHeader from "./PublicHeader.vue"
</script>
