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

  .tracking-icon-parent {

    width: 30px;
    display: flex;
    flex-wrap: wrap;
    margin: 0 3px;

    & div {
        text-align: center;
    }

    i {
        margin: 0 auto;
    }
}

</style>
