<script setup>
import { defineProps } from 'vue'
import TitleComponent from './TitleComponent.vue'

defineProps({
  title: String
})
</script>

<template>
  <div
    class="max-h-full overflow-scroll h-fit flex flex-col items-center p-1 bg-white rounded-lg shadow-xl"
  >
    <TitleComponent>{{ title }}</TitleComponent>
    <ul class="list-none p-1 w-full">
      <slot name="elements">
        <p>No elements available...</p>
      </slot>
    </ul>
  </div>
</template>
