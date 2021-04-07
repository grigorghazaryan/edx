<template>
  <q-page class="q-pa-sm edx-background">  

    <!-- <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Budget"/>
        <q-breadcrumbs-el label="Family Engagement"/>
        <q-breadcrumbs-el :label="schoolName" />
      </q-breadcrumbs>
    </div> -->

    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="monetization_on" class="edx-green" size="35px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total FE</q-item-label>
                <q-item-label v-if="barInfo.totalAmount" class="text-dark text-h6 text-weight-bolder">
                  <div >$ {{ barInfo.totalAmount.total.toFixed(2)}}</div>
                </q-item-label>
                <q-item-label>
                  <div class="fs-1" :class="barInfo.totalAmount.preliminary > 0  ? 'edx-green' : 'edx-red' ">$ {{ barInfo.totalAmount.preliminary.toFixed(2) }}</div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="monetization_on" class="edx-red" size="35px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used FE</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{barInfo.usedBalance.toFixed(2)}} </q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="monetization_on" class="edx-orange" size="35px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Remaining FE</q-item-label>
                <q-item-label v-if="barInfo.remainingBalance" class="text-dark text-h6 text-weight-bolder">
                  <div >$ {{ barInfo.remainingBalance.total.toFixed(2) }}</div>
                </q-item-label>
                <q-item-label>
                  <div class="fs-1" :class="barInfo.remainingBalance.preliminary > 0  ? 'edx-green' : 'edx-red' ">$ {{ barInfo.remainingBalance.preliminary.toFixed(2) }}</div>
                </q-item-label>
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
            <ActivityTableTitle :title="1" :barInfo="barInfo" />
          </q-tab-panel>

          <q-tab-panel name="2" class="q-p-sm">
            <ActivityTableTitle :title="2" :barInfo="barInfo" />
          </q-tab-panel>

          <q-tab-panel name="3" class="q-p-sm">
            <ActivityTableTitle :title="3" :barInfo="barInfo" />
          </q-tab-panel>

          <q-tab-panel name="4" class="q-p-sm">
            <ActivityTableTitle :title="4" :barInfo="barInfo" />
          </q-tab-panel>

          <q-tab-panel name="5" class="q-p-sm">
            <ActivityTableTitle :title="5" :barInfo="barInfo" />
          </q-tab-panel>

          <q-tab-panel name="6" class="q-p-sm">
            <ActivityTableTitle :title="6" :barInfo="barInfo" />
          </q-tab-panel>


        </q-tab-panels>

      </q-card>
      
    </div>

  </q-page>
</template>

<script>
    import axios from 'axios'
    import config from '../../../config'

    import ActivityTableTitle from '../../components/activityFE/ActivityTableTitle'
    
    export default {
        components: {
          ActivityTableTitle
        },
        data() {
          return {
            schoolName: '',
            tab: '1',
            mode: 'list',
            isFinal: false,
            loading: false,
            barInfo: {},
          };
        },
        methods: {
          // Title 1 / ShcoolId/ pageType / category
          getActivityBar(type, schoolId, pageType, category) {

            
            const conf = {
              method: 'GET',
              url: config.getActivityBar + type + '/' + schoolId + '/' + pageType + '/' + category,
              headers: {
                Accept: 'application/json',
              }
            }

            axios(conf).then(res => {
              this.barInfo = res.data
              console.log('Bar info = ', this.barInfo)
            });

          }
        },
        watch: {
          tab(val) {
            this.getActivityBar(parseInt(val), this.$route.params.id, 1, 1)
          }
        },
        created() {

          // Page types
          // PD, FE : 1
          // M : 2
          // T : 6

          // Category
          // PD : 1
          // FE : 2
          // I : 3
          // M : 4

          // Title 1 / ShcoolId/ pageType / category

          this.schoolName = this.$route.query.name
          this.getActivityBar(parseInt(this.tab), this.$route.params.id, 1, 1)
        }
    }


</script>

<style lang="scss" scoped>

.border {
  border: 1px solid #e0e0e0;
}

.inline-span {
    height: 34px;
    overflow: hidden;
    display: flex;
    justify-content: start;
    align-items: center;
}

.q-card {
  margin-top: 0;
}

// .q-tab-panel {
//     padding: 0
// }
// .scroll {
//     overflow: inherit
// }

.fs-1 {
  font-size: 1rem;
}
</style>