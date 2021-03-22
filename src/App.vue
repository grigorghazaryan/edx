<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>

import Vue from 'vue'
import RouterTab from 'vue-router-tab'
import 'vue-router-tab/dist/lib/vue-router-tab.css'
Vue.use(RouterTab)

export default {
  name: 'App'
}
</script>

<style lang="scss">

  // Global colors
  .edx-q-chip-button {
    background-color: #e8f4ff;
    border-color: #d1e9ff;
    border: 1px solid #d1e9ff;
  }

</style>
