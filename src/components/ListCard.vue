<script setup>
import { defineProps } from 'vue'

defineProps({
  title: String
})
</script>

<template>
  <div>
    <h3>{{ title }}</h3>
    <ul>
      <slot name="elements">
        <p>No elements available...</p>
      </slot>
    </ul>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background-color: white;
  border: 1px solid black;
  border-radius: 1rem;
}

ul {
  list-style-type: none;
  padding: 0.3rem;
}
</style>
