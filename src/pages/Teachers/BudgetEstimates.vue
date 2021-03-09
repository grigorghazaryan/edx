<template>
  <q-page class="q-pa-sm">  

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Budget"/>
        <q-breadcrumbs-el label="Teacher Costs"/>
        <q-breadcrumbs-el :label="this.$route.query.name"/>
      </q-breadcrumbs>
    </div>

    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="school" color="orange" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Allocations</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{  }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="blue" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Salaries</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">% 0.00</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="pink" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Hourly</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">% 0.00</q-item-label>
              </q-item-section>
            </q-item>
          </div>

        </div>
      </q-card-section>
    </q-card>

        <div class="q-pa-sm q-mt-sm q-gutter-sm">
      
      <div class="edx-header-parent">
        <span class="edx-header-text">{{ this.$route.query.name }}</span>
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
            <TeacherTableTitle :title="1"/>
          </q-tab-panel>

          <q-tab-panel name="2" class="q-p-sm">
            <TeacherTableTitle :title="2"/>
          </q-tab-panel>

          <q-tab-panel name="3" class="q-p-sm">
            <TeacherTableTitle :title="3"/>
          </q-tab-panel>

          <q-tab-panel name="4" class="q-p-sm">
            <TeacherTableTitle :title="4"/>
          </q-tab-panel>

          <q-tab-panel name="5" class="q-p-sm">
            <TeacherTableTitle :title="5"/>
          </q-tab-panel>

          <q-tab-panel name="6" class="q-p-sm">
            <TeacherTableTitle :title="6"/>
          </q-tab-panel>


        </q-tab-panels>

      </q-card>
      
    </div>

  </q-page>
</template>

<script>

import TeacherTableTitle from '../../components/teacher/TeacherTableTitle'


export default {
  name: 'Teacher',
  components: {
    TeacherTableTitle,
  },
  data() {
    return {
      tab: '1',
    }
  },
  methods: {

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
  }
}
</script>

