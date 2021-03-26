<template>
    <div class="q-pa-sm edx-background">

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Inventory" to="/Inventory" />
        <q-breadcrumbs-el label="License" to="/License" />
        <q-breadcrumbs-el :label="schoolName" />
      </q-breadcrumbs>
    </div>

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
                <q-item-label v-if="barInfo" class="text-dark text-h6 text-weight-bolder"
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
          <q-tab name="1" label="Title I"/>
          <q-tab name="2" label="Title II"/>
          <q-tab name="3" label="Title III"/>
          <q-tab name="4" label="Title IV"/>
          <q-tab name="5" label="ESSER"/>
          <q-tab name="6" label="GEER"/>

        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated class="tab-panels-parent">

          <q-tab-panel name="1" class="q-p-sm">
            <LicenseTableTitle1/>
          </q-tab-panel>

          <q-tab-panel name="2" class="q-p-sm">
            <LicenseTableTitle2 />
          </q-tab-panel>

          <q-tab-panel name="3" class="q-p-sm">
            <LicenseTableTitle3 />
          </q-tab-panel>

          <q-tab-panel name="4" class="q-p-sm">
            <LicenseTableTitle4 />
          </q-tab-panel>

          <q-tab-panel name="5" class="q-p-sm">
            <LicenseTableTitle5 />
          </q-tab-panel>

          <q-tab-panel name="6" class="q-p-sm">
            <LicenseTableTitle6 />
          </q-tab-panel>


        </q-tab-panels>

      </q-card>

    </div>
  </div>
</template>


<script>

// import axios from 'axios'
// import config from '../../../config'

import LicenseTableTitle1 from '../../components/license/LicenseTableTitle1'
import LicenseTableTitle2 from '../../components/license/LicenseTableTitle2'
import LicenseTableTitle3 from '../../components/license/LicenseTableTitle3'
import LicenseTableTitle4 from '../../components/license/LicenseTableTitle4'
import LicenseTableTitle5 from '../../components/license/LicenseTableTitle5'
import LicenseTableTitle6 from '../../components/license/LicenseTableTitle6'

export default {
  components: {
    LicenseTableTitle1,
    LicenseTableTitle2,
    LicenseTableTitle3,
    LicenseTableTitle4,
    LicenseTableTitle5,
    LicenseTableTitle6
  },
  data () {
    return {
      schoolName: '',
      loading: true,
      pagination: { rowsPerPage: 10 },
      current: 1,
      count: 10,
      tab: '1',
      columns: [
        {
          name: "name",
          align: "left",
          label: "Name",
          field: "date",
          sortable: true
        },
      ],
      data: [
      ],
      rowsPerPageArr: ['5', '10', '25', '50', '75', '100'], 
      mode: 'list',
      filter: '',
      barInfo: {},
    }
  },
  created() {
    this.schoolName = this.$route.query.name
  }

}
</script>