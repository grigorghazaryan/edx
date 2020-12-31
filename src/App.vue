<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
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
