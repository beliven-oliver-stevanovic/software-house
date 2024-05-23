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
      <button v-if="button" @click="button.onClickFunction()">
        {{ button.label }}
      </button>
    </div>
  </li>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 20px;
  margin-bottom: 0.8rem;
  background-color: whitesmoke;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
div {
  margin: 0 auto;
}
</style>
