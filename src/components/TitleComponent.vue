<script setup>
defineProps(['dimension'])
</script>

<template>
  <h1 :class="`text-${dimension} font-bold`">
    <slot></slot>
  </h1>
</template>
