<template>
<div>
  <div class="q-mt-mg q-mb-md tab-parent">
      
    <router-link 
        v-for="(tab, index) in tabss" :key="index"
        :to="tab.path" 
        class="tab-item text-primary"
        :class="{ 'active' : $route.path == tab.path }"
    >

        {{ tab.name }}
        <q-icon v-if="$route.path != tab.path" @click="removeTab(index)" name="close" class="cursor-pointer"/>

    </router-link>

  </div>
  </div>
</template>

<script>
// import { LocalStorage } from 'quasar'

export default {
    name: 'Tab',
    data() {
        return {
            tabs: [],
            tabss: JSON.parse(localStorage.getItem('tabs')),
        }
    },
    methods: {
        removeTab(index) {
            // let tabs = JSON.parse(localStorage.getItem('tabs'))
            this.tabss.splice(index, 1)
            localStorage.setItem('tabs', JSON.stringify(this.tabss))
            // this.tabss = tabs
        }
    },
    created() {
        // let tabs = localStorage.getItem('tabs') 
        if(!this.tabss) {
            localStorage.setItem('tabs', JSON.stringify([]))
        }
        else {
            // tabs = JSON.parse(tabs)
            // this.tabs = tabs
        }
    }
}
</script>

<style lang="scss" scoped>
.tab-parent {

    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #e9e9e9;
        padding: .5rem 0 0;

    .tab-item {

        background: #e6e6e6;
        box-sizing: border-box;
        border: 1px solid #d2d2d2;
        margin-right: 5px;
        padding: 5px 15px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        border-bottom: none;
        text-decoration: none;

        &.active {
            background: green;
            border: 1px solid green;
            color: #fff !important;
        }
    }
}
</style>