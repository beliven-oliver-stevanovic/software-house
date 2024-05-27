<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav
    class="flex justify-evenly items-center w-full fixed bottom-0 h-[10vh] bg-neutral-100 shadow p-4"
  >
    <RouterLink
      class="no-underline text-black text-lg font-bold uppercase p-4 rounded-full"
      to="/production"
      ><img src="../assets/programming.png" alt="Production" class="w-8"
    /></RouterLink>
    <RouterLink
      class="no-underline text-black text-lg font-bold uppercase p-4 rounded-full"
      to="/sales"
      ><img src="../assets/sales.png" alt="Sales" class="w-8"
    /></RouterLink>
    <RouterLink
      class="no-underline text-black text-lg font-bold uppercase p-4 rounded-full"
      to="/human-resources"
      ><img src="../assets/approved.png" alt="HR" class="w-8"
    /></RouterLink>
  </nav>
</template>
