<template>
  <div class="q-mt-mg q-mb-md tab-parent">
      <router-link 
        v-for="(tab, index) in tabs" :key="index"
        :to="tab.path" 
        class="tab-item text-primary">
        {{ tab.name }}
        <q-icon name="close" class="cursor-pointer"/>
      </router-link>
  </div>
</template>

<script>
export default {
    name: 'Tab',
    data() {
        return {
            tabs: []
        }
    },
    methods: {

    },
    created() {
        console.log('Tab. Created!')
        let tabs = localStorage.getItem('tabs') 
        if(!tabs) {
            localStorage.setItem('tabs', JSON.stringify([]))
        }
        else {
            tabs = JSON.parse(tabs)
            console.log(tabs)
            this.tabs = tabs
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
    }
}
</style>