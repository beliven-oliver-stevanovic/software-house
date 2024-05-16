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
      <hr />
      <slot name="elements">
        <p>Nessun elemento disponibile</p>
      </slot>
    </ul>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  width: 90%;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 1rem;
}

ul {
  list-style-type: none;
  padding: 1rem;
}
</style>
