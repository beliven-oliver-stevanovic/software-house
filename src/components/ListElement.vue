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
  <li>
    <div class="container">
      <span v-for="(value, key) in element" :key="key">
        <p v-if="key != 'id' && key != 'labels'">
          <strong>{{ element.labels[key] }}</strong
          >: {{ value }}
        </p>
      </span>
      <button v-if="button" @click="button.onClickFunction()">{{ button.label }}</button>
    </div>
    <hr />
  </li>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem;
  border-radius: 20px;
}
</style>
