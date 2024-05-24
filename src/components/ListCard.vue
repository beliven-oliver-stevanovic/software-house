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
  border-radius: 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

ul {
  list-style-type: none;
  padding: 0.3rem;
  width: 100%;
}
</style>
