<script setup>
import { defineProps } from 'vue'

defineProps({
  element: Object,
  button: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <li class="container">
    <span v-for="(value, key) in element" :key="key">
      <p v-if="key != 'id' && key != 'labels'">
        <strong>{{ element.labels[key] }}</strong
        >: {{ value }}
      </p>
    </span>
    <div>
      <button v-if="button" @click="button.onClickFunction()">{{ button.label }}</button>
    </div>
  </li>
</template>

<style scoped>
li {
  margin-bottom: 1rem;
  background-color: gainsboro;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 20px;
  border: 1px solid black;
}
</style>
