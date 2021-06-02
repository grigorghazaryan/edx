<template>
  <q-page class="q-pa-sm edx-background">

    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm">
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section
                side
                style="background-color: #fff"
                class="q-pa-lg q-mr-none text-white"
              >
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Cost</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder"
                  >$ {{ barInfo.totalCost }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <div class="q-pa-sm q-mt-sm q-gutter-sm">

      <div class="edx-header-parent">
        <span class="edx-header-text">{{ schoolName }}</span>
      </div>

      <q-card>

        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
        >
          <q-tab name="1" label="Title I" />
          <q-tab name="2" label="Title II" />
          <q-tab name="3" label="Title III" />
          <q-tab name="4" label="Title IV" />
          <q-tab name="5" label="ESSER" />
          <q-tab name="6" label="GEER" />
        
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated class="tab-panels-parent">

          <q-tab-panel name="1" class="q-p-sm">
            <InventoryTable :type="1" />
          </q-tab-panel>

          <q-tab-panel name="2" class="q-p-sm">
            <InventoryTable :type="2" />
          </q-tab-panel>

          <q-tab-panel name="3" class="q-p-sm">
            <InventoryTable :type="3" />
          </q-tab-panel>

          <q-tab-panel name="4" class="q-p-sm">
            <InventoryTable :type="4" />
          </q-tab-panel>

          <q-tab-panel name="5" class="q-p-sm">
            <InventoryTable :type="5" />
          </q-tab-panel>

          <q-tab-panel name="6" class="q-p-sm">
            <InventoryTable :type="6" />
          </q-tab-panel>

        </q-tab-panels>

      </q-card>
    </div>
    
  </q-page>
</template>

<script>

import {exportFile} from 'quasar'
import axios from 'axios'
import config from '../../../config'

import InventoryTable from '../../components/inventory/InventoryTable'


export default {
  name: 'Inventory',
  components: {
    InventoryTable
  },
  data() {
    return {
      schoolName: '',
      barInfo: {},
      tab: '1',
     
    }
  },
  methods: {
    getAllocationBar(type, id) {
        const conf = {
          method: 'GET',
          url: config.getInventoryTotalCost + type + '/' + id,
          headers: {
              Accept: 'application/json',
          }
        }
        axios(conf).then(res => {
            this.barInfo = res.data
            console.log('Bar info', this.barInfo)
        })
    },
   
  },
  computed: {
    routeTab() {
      if(this.$route.query.name) {
        return `${this.$route.query.name}`
      }else {
        let name = this.$route.path.substring(1);
        return name
      }
      
    }
  },

  created() {
    this.schoolName = this.$route.query.name

    let title = parseInt(this.tab)
    let id = this.$route.params.id

    this.getAllocationBar(title, id)
  }
}

</script>

<style>

._actions.q-btn-dropdown--simple .q-btn-dropdown__arrow {
  margin-left: 0 !important;
}

._actions .q-btn__wrapper {
  padding: 0 5px !important;
}

.white-space-initial {
  white-space: initial;
}

.fixed-height-for-large-text {
  height: 80px;
  overflow-y: auto;
}

.inline-span {
    height: 34px;
    overflow: hidden;
    display: flex;
    justify-content: start;
    align-items: center;
}

.q-table tbody td {
    font-size: 12px;
}

.q-field__bottom.row.items-start.q-field__bottom--animated {
    padding: 3px 0;
    font-size: .75rem;
}

label.left-arrow-input:after {
    content: '';
    position: absolute;
    width: 10px;
    height: 3px;
    background-color: #bbbbbb;
    right: 138px;
    top: 18px;
}

.q-table__control:nth-child(2) {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
}

.q-card {
  margin-top: 0;
}




</style>
