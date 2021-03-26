<template>
  <q-page class="q-pa-sm edx-background">  

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Budget"/>
        <q-breadcrumbs-el label="Counseling"/>
        <q-breadcrumbs-el :label="schoolName" />
      </q-breadcrumbs>
    </div>

    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">
                  <div>$ {{ barInfo.totalsAmount.PD }}</div>
                  <div v-if="!isFinal" class="fs-1">$ {{ (barInfo.totalsAmount.PD / 2).toFixed(2) }}</div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total FE</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">
                  <div>$ {{barInfo.totalsAmount.FE}}</div>
                  <div v-if="!isFinal" class="fs-1">$ {{ (barInfo.totalsAmount.FE / 2).toFixed(2) }}</div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{barInfo.usedAmount.PD}} </q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used FE</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{barInfo.usedAmount.FE }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="purple" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Remaining PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{barInfo.remaining.PD }} </q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="purple" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Remaining FE</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{barInfo.remaining.FE }} </q-item-label>
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
            <CounselingTableTitle :title="1" :barInfo="barInfo" @final="finalResult"/>
          </q-tab-panel>

          <q-tab-panel name="2" class="q-p-sm">
            <CounselingTableTitle :title="2" :barInfo="barInfo" @final="finalResult"/>
          </q-tab-panel>

          <q-tab-panel name="3" class="q-p-sm">
            <CounselingTableTitle :title="3" :barInfo="barInfo" @final="finalResult"/>
          </q-tab-panel>

          <q-tab-panel name="4" class="q-p-sm">
            <CounselingTableTitle :title="4" :barInfo="barInfo" @final="finalResult"/>
          </q-tab-panel>

          <q-tab-panel name="5" class="q-p-sm">
            <CounselingTableTitle :title="5" :barInfo="barInfo" @final="finalResult"/>
          </q-tab-panel>

          <q-tab-panel name="6" class="q-p-sm">
            <CounselingTableTitle :title="6" :barInfo="barInfo" @final="finalResult"/>
          </q-tab-panel>


        </q-tab-panels>

      </q-card>
      
    </div>

  </q-page>
</template>

<script>
    import axios from 'axios'
    import config from '../../../config'

    import CounselingTableTitle from '../../components/counseling/CounselingTableTitle'
    
    export default {
        components: {
          CounselingTableTitle
        },
        data() {
          return {
            schoolName: '',
            tab: '1',
            mode: 'list',
            isFinal: false,
            loading: false,
            barInfo: {
              remaining: { FE: '', PD: '' },
              totalsAmount: { FE: '', PD: '' },
              usedAmount: { FE: '', PD: '' }
            },
          };
        },
        methods: {
          finalResult(data) {
            console.log('Is Final', data)
            this.isFinal = data
          },
          getActivityBar(type, schoolId) {

            const conf = {
              method: 'GET',
              url: config.getActivityBar + type + '/' + schoolId,
              headers: {
                Accept: 'application/json',
              }
            }

            axios(conf).then(res => {
              this.barInfo = res.data
              console.log('[[[', this.barInfo)
            })

          }
        },
        created() {
          this.schoolName = this.$route.query.name
          this.getActivityBar(parseInt(this.tab), this.$route.params.id)
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