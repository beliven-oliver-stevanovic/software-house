<script setup>
defineProps({
  dimension: {
    type: String,
    default: '2xl'
  }
})
</script>

<template>
  <h1 :class="`text-${dimension} font-bold`">
    <slot></slot>
  </h1>
</template>
