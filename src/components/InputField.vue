<script setup>
defineProps({
  modelValue: String,
  type: String,
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
    :placeholder="placeholder"
    :class="`shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:border-gray-500 ${error ? 'border-red-500' : ''}`"
  />
</template>
