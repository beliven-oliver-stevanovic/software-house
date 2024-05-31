<script setup>
defineProps({
  modelValue: String,
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    default: ''
  },
  placeholder: String,
  error: Boolean
})

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :class="`shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:border-gray-500 ${error ? 'border-red-500' : ''}`"
  />
</template>
