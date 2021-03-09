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

  .q-router-link--exact-active {
    .q-item__section {
      .q-item__label, i {
        color: #409eff !important
      }
    }
  }

  // Global colors
  .edx-q-chip-button {
    background-color: #e8f4ff;
    border-color: #d1e9ff;
    border: 1px solid #d1e9ff;
  }

</style>
