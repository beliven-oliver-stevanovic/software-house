<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink class="router-link" to="/production"
      ><img src="../assets/programming.png" alt="Production"
    /></RouterLink>
    <RouterLink class="router-link" to="/sales"
      ><img src="../assets/sales.png" alt="Sales"
    /></RouterLink>
    <RouterLink class="router-link" to="/human-resources"
      ><img src="../assets/approved.png" alt="HR"
    /></RouterLink>
  </nav>
</template>

<style>
nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  position: fixed;
  bottom: 0;
  height: 10vh;
  background-color: whitesmoke;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 1rem;
}

img {
  width: 2rem;
}

.router-link {
  text-decoration: none;
  color: black;
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 1rem;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.router-link:hover {
  background-color: lightgrey;
}
</style>
