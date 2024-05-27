<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  text: String,
  type: {
    type: String,
    default: 'button'
  },
  onClick: Function,
  positive: {
    type: Boolean,
    default: false
  },
  negative: {
    type: Boolean,
    default: false
  }
})

const classes = computed(() => {
  let bgClass = 'bg-gray-500'
  if (props.positive) {
    bgClass = 'bg-green-500'
  } else if (props.negative) {
    bgClass = 'bg-red-500'
  }
  return 'text-md font-semibold text-white p-2 rounded-lg ' + bgClass
})
</script>

<template>
  <button @click="onClick" :class="classes" :type="type">{{ text }}</button>
</template>
