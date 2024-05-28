<script setup>
import { defineProps } from 'vue'
import ButtonComponent from './ButtonComponent.vue'

defineProps({
  element: Object,
  button: {
    type: Object,
    default: null
  },
  horizontal: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <li
    :class="{
      flex: true,
      'flex-col': !horizontal,
      'items-start rounded gap-0.5 shadow-md bg-neutral-200 p-2 mb-2': true
    }"
  >
    <div>
      <span v-for="(value, key) in element" :key="key">
        <p v-if="key != 'id' && key != 'labels'">
          <strong>{{ element.labels[key] }}</strong
          >{{ value }}
        </p></span
      >
    </div>

    <div :class="!horizontal ? 'self-center' : 'self-center ml-auto'">
      <ButtonComponent
        v-if="button"
        :text="button.label"
        :positive="true"
        @click="button.onClickFunction()"
      />
    </div>
  </li>
</template>
