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
</style>
