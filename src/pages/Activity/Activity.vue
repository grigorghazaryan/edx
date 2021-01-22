<template>
  <q-page class="q-pa-sm">  

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Activities"/>
        <q-breadcrumbs-el :label="schoolName" />
      </q-breadcrumbs>
    </div>

    <q-card class="bg-transparent no-shadow no-border" v-if="this.barInfo">
      <q-card-section class="q-pa-none">
        {{this.barInfo}}
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">
                  <div>$ {{barInfo.totalsAmount.PD}}</div>
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
                <q-item-label class="text-dark text-h6 text-weight-bolder"
                v-if="this.barInfo">
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

    <!--
    <q-card v-if='tab == "Title2" ' class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7"> Total PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Material</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
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
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used Material</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
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
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="purple" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Remaining Material</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
         

        </div>
      </q-card-section>
    </q-card>

    <q-card v-if='tab == "Title3" ' class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Allocation</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used Instruction</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Remaining Allocation</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

        </div>
      </q-card-section>
    </q-card>

    <q-card v-if='tab == "Title4" ' class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Allocation</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used Well Rounded</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used Safe Healthy</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used TechPD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }} </q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="purple" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used Tech Instruction</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }} </q-item-label>
              </q-item-section>
            </q-item>
          </div>

        </div>
      </q-card-section>
    </q-card>

    <q-card v-if='tab == "ESSER" ' class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Allocation</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Remaining Allocation</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

        </div>
      </q-card-section>
    </q-card> -->


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
            <ActivityTableTitle1 :barInfo="barInfo" @final="finalResult"/>
          </q-tab-panel>

          <q-tab-panel name="2" class="q-p-sm">
            <!-- <BudgetTableTitle2 /> -->
          </q-tab-panel>

          <q-tab-panel name="3" class="q-p-sm">
            <!-- <BudgetTableTitle3 /> -->
          </q-tab-panel>

          <q-tab-panel name="4" class="q-p-sm">
            <!-- <BudgetTableTitle4 /> -->
          </q-tab-panel>

          <q-tab-panel name="5" class="q-p-sm">
            <!-- <BudgetTableEsser /> -->
          </q-tab-panel>

          <q-tab-panel name="6" class="q-p-sm">
            <!-- <BudgetTableEsser /> -->
          </q-tab-panel>


        </q-tab-panels>

      </q-card>
    </div>

  </q-page>
</template>

<script>

    // import {exportFile} from 'quasar'
    import router from 'src/router'
    // import lodash from 'lodash'

    import axios from 'axios'
    import config from '../../../config'

    import ActivityTableTitle1 from '../../components/activity/ActivityTableTitle1'
    
    // function wrapCsvValue(val, formatFn) {
    //     let formatted = formatFn !== void 0
    //         ? formatFn(val)
    //         : val

    //     formatted = formatted === void 0 || formatted === null
    //         ? ''
    //         : String(formatted)

    //     formatted = formatted.split('"').join('""')
    //     /**
    //      * Excel accepts \n and \r in strings, but some other CSV parsers do not
    //      * Uncomment the next two lines to escape new lines
    //      */
    //     // .split('\n').join('\\n')
    //     // .split('\r').join('\\r')

    //     return `"${formatted}"`
    // }
    // const adminFee = 12;
    // let oldObject = {}


    export default {
        components: {
          ActivityTableTitle1,
          // BudgetTableTitle2
          // BudgetTableTitle2,BudgetTableTitle3,BudgetTableTitle4, BudgetTableEsser
        },
        data() {
          return {
            schoolName: '',
            tab: '1',
            mode: 'list',
            isFinal: false,

            // startdate: '2019-02-01',
            // endDate: '2019-02-01',

            // model: { from: '2020/07/08', to: '2020/07/17' },
            // select: "",
            // selectOptions: ['Kansas', 'New York', 'Yerevan'],
            // selectWeekDay: "",
            // selectOptionsWeekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            // numbersX: '',
            // selectOptionsNumbersX: ['1x', '2x', '3x', '31x'],
            // selectDayWeekMonth: "",
            // selectOptionsDayWeekMonth: ['Daily', 'Weekly', 'Monthly'],
            // time1: '00:00',
            // time2: '00:00',
            // allDayEvent: false,
            // show_dialog: false,
            // show_dialog_child: false,
            // show_attending_dialog: false,
            // splitActivity: false,
            // confirmAttendeeModal: false,

            // approval : ['Approved', 'Declined', 'Pending'],
            // status : ['Active', 'Canceled'],

            // optionsApp: [
            //   { label: 'Needs Assessment', value: 'Needs Assessment' },
            //   { label: 'Catalog', value: 'Catalog', color: 'green' },
            //   { label: 'Blanket Approval', value: 'Blanket Approval', color: 'red' },
            //   { label: 'Pre Approval', value: 'Pre-Approved', color: 'green' }
            // ],
            // approvedName: '',
            
            // numbersOfAttendees: [1, 2, 3],
            // attendeesColumn: [
            //   {
            //     name: "no",
            //     align: "left",
            //     label: "No",
            //     field: "no",
            //     sortable: true
            //   },
            //   {
            //     name: "type",
            //     align: "center",
            //     label: "Type",
            //     field: "type",
            //     sortable: true
            //   },
            //   {
            //     name: "all",
            //     align: "left",
            //     label: "All",
            //     field: "type",
            //     sortable: true
            //   },
            //   {
            //     name: "attendeeList",
            //     align: "left",
            //     label: "Attendees",
            //     field: "attendeeList",
            //     sortable: true
            //   },
            // ],
            // attendeesData: [
            // ],

            loading: false,
            // pages: 10,
            // currentPage: 1,
            // pagination: {
            //   // sortBy: 'name',
            //   // page: 1,
            //   rowsPerPage: -1,
            //   // rowsNumber: 10
            // },
            // childDateOfActivityColumns: [
            //   {
            //     name: "startdate",
            //     align: "left",
            //     label: "Start Date",
            //     field: "startdate"
            //   },
            //   {
            //     name: "endDate",
            //     align: "left",
            //     label: "End Date",
            //     field: "endDate"
            //   },
            //   {
            //     name: "time1",
            //     align: "left",
            //     label: "Start Time",
            //     field: "time1"
            //   },
            //   {
            //     name: "time2",
            //     align: "left",
            //     label: "End Time",
            //     field: "time2"
            //   },
            //   {
            //     name: "location",
            //     align: "left",
            //     label: "Location",
            //     field: "location"
            //   },
            //   {
            //     name: "repeats",
            //     align: "left",
            //     label: "Repeats",
            //     field: "repeats"
            //   },
            //   {
            //     name: "repeatEvery",
            //     align: "left",
            //     label: "Repeat every",
            //     field: "repeatEvery"
            //   },
            //   {
            //     name: "repeatOn",
            //     align: "left",
            //     label: "Repeat on",
            //     field: "repeatOn"
            //   },
            //   {
            //     name: "actions",
            //     align: "left",
            //     label: "Actions",
            //     field: "actions"
            //   }
            // ],
            // dateOfActivityColumns: [
            //   {
            //     name: "startdate",
            //     align: "left",
            //     label: "Start Date",
            //     field: "startdate"
            //   },
            //   {
            //     name: "endDate",
            //     align: "left",
            //     label: "End Date",
            //     field: "endDate"
            //   },
            //   {
            //     name: "time1",
            //     align: "left",
            //     label: "Start Time",
            //     field: "time1"
            //   },
            //   {
            //     name: "time2",
            //     align: "left",
            //     label: "End Time",
            //     field: "time2"
            //   },
            //   {
            //     name: "location",
            //     align: "left",
            //     label: "Location",
            //     field: "location"
            //   },
            //   {
            //     name: "repeats",
            //     align: "left",
            //     label: "Repeats",
            //     field: "repeats"
            //   },
            //   {
            //     name: "repeatEvery",
            //     align: "left",
            //     label: "Repeat every",
            //     field: "repeatEvery"
            //   },
            //   {
            //     name: "repeatOn",
            //     align: "left",
            //     label: "Repeat on",
            //     field: "repeatOn"
            //   },
            //   {
            //     name: "note",
            //     align: "left",
            //     label: "Note",
            //     field: "note"
            //   },
            //   {
            //     name: "actions",
            //     align: "left",
            //     label: "Actions",
            //     field: "actions"
            //   }
            // ],
            // dateOfActivityData: [
            //   {
            //     startDate: '2020/06/14',
            //     endDate: '2020/06/24',
            //     startTime: '16:00',
            //     endTime: "19:00",
            //     location: "Armenia, Yerevan, Isahakyan 46",
            //     note: "This is note. please don't read.",
            //     repeats: '',
            //     repeatEvery: '',
            //     repeatOn: '',
            //   }
            // ],
            // columns: [
            //   {
            //     name: "toggle",
            //     style: 'width: 30px'
            //   },
            //   {
            //     name: "provider",
            //     align: "left",
            //     label: "Provider",
            //     field: "provider",
            //     sortable: true
            //   },
            //   {
            //     name: "status",
            //     align: "left",
            //     label: "Status",
            //     field: "status",
            //     sortable: true
            //   },
            //   {
            //     name: "approvals",
            //     align: "left",
            //     label: "Approval",
            //     field: "approvals",
            //     sortable: true
            //   },
            //   { 
            //     name: "PDActivity", 
            //     align: "left",
            //     label: "Activity", 
            //     field: "PDActivity",
            //     sortable: true
            //   },
            //   {
            //     name: "dateOfActivity",
            //     align: "left",
            //     label: "Date Of Activity",
            //     field: "dateOfActivity",
            //     sortable: true,
            //     style: 'max-width: 300px',
            //     headerStyle: 'max-width: 500px',
            //   },
            //   {
            //     name: "noAttending",
            //     align: "left",
            //     label: "No. Attending",
            //     field: "noAttending"
            //   },
            //   {
            //     name: "amount",
            //     align: "left",
            //     label: "Amount",
            //     field: "amount"
            //   },
            //   {
            //     name: "type",
            //     align: "left",
            //     label: "Type",
            //     field: "type"
            //   },
            //   {
            //     name: "grossPD",
            //     align: "left",
            //     label: "Charge",
            //     field: "grossPD"
            //   },
            //   {
            //     name: "actions",
            //     align: "left",
            //     label: "Actions",
            //     field: "actions"
            //   }
            // ],
            // data: [],
            // tempDataX: [],


            // editedIndex: null,
            // editedItem: {
            //   provider: '',
            //   PDActivity: '',
            //   dateOfActivity: '',
            //   noAttending: '',
            //   amount:'',
            //   pdHub:'',
            //   grossPD: '',
            //   repeat: '',
            //   multi: false,
            //   attendies: false,
            //   dateOfActivityArr: [{
            //     startdate: '2020/06/14',
            //     endDate: '2020/06/24',
            //     time1: '00:00',
            //     time2: '00:00',
            //     location: 'Location...',
            //     note: 'Note ...',
            //     repeats: 'T',
            //     repeatEvery: 'Every',
            //     repeatOn: 'On'
            //   }],
            //   noAttendingArr: {
            //     attendees: '',
            //     amount: 0,
            //     split: false,
            //     attendeesData: [
            //     ],
            //   },
            // },

            // schoolYear: null,
            // schoolYears: [
            //   'School Year 20-21',
            //   'School Year 19-20',
            //   'School Year 18-19'
            // ],
            // filter: "",
            // options: [
            //   'Professional Development', 
            //   'Family Engagement'
            // ],
            // typeModel: '',

            // attendingTeacherList: [
            //   // {id: 1, name: 'Luke Skywalker'},
            //   // {id: 2, name: 'Han Solo'},
            //   // {id: 3, name: 'Jar Jar Binks'},
            //   // {id: 4, name: 'R2-D2'},
            //   // {id: 5, name: 'Yoda'}
            // ],
            // attendingSearch: '',
            // teachersSearchLength: 0,

            // item: '',
            // confirm: false,
            // confirmDate: false,
            // confirmTeacherModal: false,
            // teachersTypeArr: [
            //   {
            //     label: 'Teachers',
            //     value: 'teachers',
            //     disable: false
            //   },
            //   {
            //     label: 'Students',
            //     value: 'students',
            //     disable: false
            //   },
            //   {
            //     label: 'Parents',
            //     value: 'parents',
            //     disable: false
            //   },
            //   {
            //     label: 'Staff',
            //     value: 'staff',
            //     disable: false
            //   }
            // ],
            // typeArr: ['PD', 'FE'],
            // typeArr2: ['PD', 'M'],
            // typeArr3: ['PD', 'I'],
            // typeArr4: ['WR', 'SH', 'PD', 'TI'],
            // typeEssr: ['PD', 'M', 'S'],
            // type1test: [
            //   {
            //     label: 'PD',
            //     value: true
            //   },
            //   {
            //     label: 'FE',
            //     value: false
            //   },
            // ],

            // tempDateOfActivity: {
            //   startdate: '2020/06/14',
            //   endDate: '2020/06/24',
            //   time1: '00:00',
            //   time2: '00:00',
            //   location: 'Location...',
            //   selectDayWeekMonth: '',
            //   selectWeekDay: '',
            //   note: 'Note...',
            //   selectDayWeekMonth: '',
            //   selectWeekDay: '',
            //   repeats: '',
            //   repeatOn: 'Wednesday',
            //   repeat: false,
            //   multi: false,
            //   child: true,
            //   attendies: false,
            // },
            // key: null,
            barInfo: {},
          };
        },
        methods: {
          finalResult(data) {
            console.log('props from child', data)
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
            })
          },
          // optionsFn (date) {
          //   // let start = this.editedItem.dateOfActivityArr[0].startdate
          //   // let end = this.editedItem.dateOfActivityArr[0].endDate
          //   return date >= '2020/06/14' && date <= '2020/06/25'
          // },
          // cancellChange(index) {
            
          //   let d = JSON.parse(oldObject)
          //   console.log('ddd =', d)
          //   Object.assign(this.data[index], d);
          //   this.data[index].changed = false

          // },
          // detectChange(index) {
            
          //   let d = JSON.parse(oldObject)
          //   // let d = oldObject
          //   let f = JSON.stringify(this.data[index])
          //       f = JSON.parse(f)

          //   console.log('OLD OBJECT', d)
          //   console.log('NEW OBJECT', f)

          //   let status = _.isEqual(d, f)


          //   // console.log('status', status)
          //   if(status) {
          //     this.data[index].changed = false
          //   }else {
          //     this.data[index].changed = true
          //   }

          // },
          // copyRowData(index) {
            
          //   oldObject = JSON.stringify(this.tempDataX[index])
          //   console.log('Copy Row Data', oldObject)

          // },
          // copyRow(row, index) {

          //         oldObject = JSON.stringify(row)

          //   console.log('tempDataX', JSON.stringify(this.data[index]))
          //   let old = JSON.stringify(this.data[index])

          //   let newData = this.data[index]
          //   newData.id =  Math.floor(Math.random() * 50)
          //   newData.changed = true
          //   let ddd = JSON.stringify(newData)
          //   console.log('new data', JSON.stringify(newData))

          //   let i = index+1
            
          //   this.data.splice(i, 0, JSON.parse(ddd));
            
          //   Object.assign(this.data[index], JSON.parse(old));

          // },
          // addEmptyRow() {
          //   let obj = {
          //         // toggle: '',
          //         provider: '',
          //         status: '',
          //         approvals: '',
          //         PDActivity: '',
          //         dateOfActivity: '',
          //         noAttending: 's',
          //         amount: 0,
          //         type: 0,
          //         typeTest: 0,
          //         grossPD: 0,
          //         repeat: false,
          //         notes: '',
          //         attendies: false,
          //         dateOfActivityArr: {
          //           startdate: '06/14/2020',
          //           endDate: '06/24/2020',
          //           time1: '00:00',
          //           time2: '00:00',
          //           selectDayWeekMonth: '',
          //           selectWeekDay: '',
          //         },
          //         noAttendingArr: {
          //           attendees: 0,
          //           split: false,
          //           attendeesData: [],
          //           teacherCount: 0,
          //         },
          //     }
          //   this.data.unshift(obj)
          // },
          // selfTitleTeacherCount(count) {
          //   console.log('selfTitleTeacherCount...', count )
          //   this.editedItem.noAttendingArr.teacherCount = count
          //   console.log(this.editedItem.noAttendingArr.attendeesData.no)

          // },
          // searchEnter() {
          //   if(this.teachersSearchLength == 0) {
          //     let obj = {
          //       id: Math.floor(Math.random() * 1000),
          //       name: this.attendingSearch
          //     }
          //     this.attendingTeacherList.push(obj)
          //     this.attendingSearch = ''
          //   }
          // },
          // exportTable() {
          //       // naive encoding to csv format
          //       const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
          //           this.data.map(row => this.columns.map(col => wrapCsvValue(
          //               typeof col.field === 'function'
          //                   ? col.field(row)
          //                   : row[col.field === void 0 ? col.name : col.field],
          //               col.format
          //           )).join(','))
          //       ).join('\r\n')

          //       const status = exportFile(
          //           'table-export.csv',
          //           content,
          //           'text/csv'
          //       )

          //       if (status !== true) {
          //           this.$q.notify({
          //               message: 'Browser denied file download...',
          //               color: 'negative',
          //               icon: 'warning'
          //           })
          //       }
          // },
          // editDateOfActivity(item) {
              
          //     this.editedIndex = this.data.indexOf(item);
          //     this.editedItem = Object.assign({}, item);
          //     this.show_dialog = true;
          //     console.log(this.editedItem)

          // },
          // confirmDateOfActivity() {

          //   if (this.editedIndex > -1) {
          //     Object.assign(this.data[this.editedIndex], this.editedItem);
          //   } 
          //   this.close()

          // },
          // editAttendingitem(item) {
          //   this.editedIndex = this.data.indexOf(item);
          //   this.editedItem = Object.assign({}, item);
          //   this.show_attending_dialog = true;
          // },
          // confirmNoAttending() {
          //   console.log('ok', this.editedItem)
          //   if (this.editedIndex > -1) {
          //     Object.assign(this.data[this.editedIndex], this.editedItem);
          //   } 
          //   this.close()
          // },
          // close () {
          //   this.show_dialog = false
          //   this.show_attending_dialog = false
          //   this.confirmAttendeeModal = false
          // },
          // filterType() {
          //   console.log(this.typeModel)
          //   if(this.typeModel) {
          //     if(this.typeModel == 'Professional Development') {
          //       this.data = this.tempDataX.filter(a => a.typeTest == true);
          //     }else {
          //       this.data = this.tempDataX.filter(a => a.typeTest == false);
          //     }
          //   }else {
          //     this.data = this.tempData
          //   }
          // },
          // openDeleteModal(item) {
          //   this.item = item
          //   this.confirm = true
          // },
          // openDeleteDate(item) {
          //   this.item = item
          //   this.confirmDate = true
          // },
          // deleteItem() {
          //   let item = this.item
          //   const index = this.data.indexOf(item)
          //   this.data.splice(index, 1)
          // },
          // deleteDate() {
          //   let item = this.item
          //   const index = this.data[this.key].dateOfActivityArr.indexOf(item)
          //   this.data[this.key].dateOfActivityArr.splice(index, 1)
          // },
          // openDeleteTeacherModal(item) {
          //   this.item = item
          //   this.confirmTeacherModal = true
          // },
          // openAttendeDeleteModal(item) {
          //   this.item = item
          //   this.confirmAttendeeModal = true
          // },
          // deleteAttendee() {
          //   let item = this.item
          //   const index = this.editedItem.noAttendingArr.attendeesData.indexOf(item)
          //   this.editedItem.noAttendingArr.attendeesData.splice(index, 1)
          // },
          // deleteTeacherItem() {
          //   let item = this.item
          //   const index = this.filteredList.indexOf(item)
          //   this.filteredList.splice(index, 1)
          //   console.log('787878', this.filteredList)
          // },
          // addAttRow() {
          //   let obj = {   
          //     no: '',
          //     type: '',
          //     all: false,
          //     attendeeList: 'View'
          //   }
          //   console.log('++++++')
          //   console.log(this.editedItem.noAttendingArr.attendeesData)
          //   this.editedItem.noAttendingArr.attendeesData.push(obj)
          //   console.log(this.editedItem.noAttendingArr.attendeesData)
          // },
          // addDate(key) {
          //   console.log('99999999999', key)
          //   this.show_dialog_child = true
          //   this.key = key
          //   // this.s = '06/14/2020'
          //   // this.editedItem.dateOfActivityArr[0].startdate
          //   // this.e = '06/26/2020'
          //   // this.editedItem.dateOfActivityArr[0].endDate
          // },
          // confirmNewDate() {
          //   // console.log(this.tempDateOfActivity)
          //   this.data[this.key].dateOfActivityArr.push(this.tempDateOfActivity)
          //   console.log( this.data[this.key] )
          // },
          // createData() {
          //   console.log('Create data function works ...')
          //   let dataTest = []

          //   for(let i=0; i<5; i++) {

          //     let r = Math.floor(Math.random() * 10), 
          //         pd = Math.floor(Math.random() * 10);

          //       if(r % 2) r = true 
          //       else r = false

          //       if(pd % 2) pd = true 
          //       else pd = false

          //     let amount = Math.floor(Math.random() * 600),
          //         pdHub = Math.floor(Math.random() * 1400),
          //         charge = amount + ((amount * adminFee) / 100);

          //     let type1 = {
          //       label: 'PD',
          //       value: true
          //     };
          //     let type2 = {
          //       label: 'FE',
          //       value: false
          //     }

          //     let no = Math.floor(Math.random() * 12)
          //     let approvalStatus = Math.floor(Math.random() * 3),
          //         appStatus;

          //     switch(approvalStatus) {
          //       case 0:
          //         appStatus = 'Needs Assessment'
          //         break;
          //       case 1:
          //         appStatus = 'Catalog'
          //         break;
          //       case 2:
          //         appStatus = 'Blanket Approval'
          //         break;
          //       case 3:
          //         appStatus = 'Pre-Approved'
          //         break;
          //     }

          //     let obj = {
          //         // toggle: '',
          //         id: i,
          //         provider: 'WEI ' + i+1,
          //         status: r ? 'Active' : 'Canceled',
          //         approvals: r ? 'Approved' : 'Declined',
          //         PDActivity: 'Balanced Literacy for Readers, #2-133 with Chris VB',
          //         dateOfActivity: 'August, 2019 - May 2020 on Mondays',
          //         noAttending: '12 TI teachers and 30 TII Teachers',
          //         amount: amount,
          //         type: pd ? type1 : type2,
          //         typeTest: pd,
          //         grossPD: charge.toFixed(2),
          //         repeat: false,
          //         multi: true,
          //         attendies: false,
          //         notes: 'Lorem Ipsum – Generator, Origins and Meaning',
          //         dateOfActivityArr: [
          //         {
          //           startdate: '06/14/2020',
          //           endDate: '06/24/2020',
          //           time1: '00:00',
          //           time2: '00:00',
          //           location: 'Location...',
          //           selectDayWeekMonth: '',
          //           repeatEvery: '',
          //           note: 'Note...',
          //           selectDayWeekMonth: '',
          //           selectWeekDay: '',
          //           repeats: '',
          //           repeatOn: 'Wednesday',
          //                         attendies: false,
          //         }],
          //         childDateOfActivityArr: [
          //         ],
          //         noAttendingArr: {
          //           attendees: 0,
          //           split: r,
          //           attendeesData: [],
          //           teacherCount: no,
          //         },
          //         changed: false,
          //         approvalStatus: appStatus,
          //         showEditButton: true,
          //     }

          //     dataTest.push(obj)
          //   }

          //   this.data = dataTest
          //   this.tempDataX = dataTest
          // }
        },
        created() {
            console.log('activity created....')
            this.schoolName = this.$route.query.name
            this.getActivityBar(parseInt(this.tab), this.$route.params.id)

        },
        computed: {
          // popupAmount() {
          //     let attendees = this.editedItem.noAttendingArr.attendeesData,
          //         amount = 0;

          //     for(let i=0; i<attendees.length; i++) {
          //       if(attendees[i].amount != '') {
          //         amount += parseFloat(attendees[i].amount)
          //       }
          //     }
              
          //     return parseFloat(amount)
          // },
          // filteredList() {
          //     let searchString = this.attendingSearch.toLowerCase();
          //     let x = this.attendingTeacherList.filter(item => item.name.toLowerCase().includes(searchString));
          //     this.teachersSearchLength = x.length
          //     return x
          // },
          // timeTotal() {
          //   let t1 = parseInt(this.editedItem.dateOfActivityArr[0].time1.substring(0,2))
          //   let t2 = parseInt(this.editedItem.dateOfActivityArr[0].time2.substring(0,2))

          //   let result = t2 - t1
          //   console.log(t2, t1, result)
          //   return result
          // },
          // totalMinute() {
          //   let m1 = parseInt(this.editedItem.dateOfActivityArr[0].time1.substring(3,5));
          //   let m2= parseInt(this.editedItem.dateOfActivityArr[0].time2.substring(3,5));

          //   let m1res = 0, m2res = 0;

          //   if(m1 != 0) {
          //     m1res = 60 - m1
          //   }

          //   if(m2 != 0) {
          //     m2res = 60 - m2
          //   }  

          //   let result =  m1res - m2res

          //   return result
          // },
          // totalPD() {
          //   let pd = 0;
          //   for(let i=0; i<this.data.length; i++) {
          //     let amount = parseFloat( this.data[i].amount )
          //     pd += amount
          //   }
          //   return pd.toFixed(2)
          // },
          // totalFE() {
          //   return Math.floor(Math.random() * 1000).toFixed(2)
          // },
          // usedPD() {
          //   return Math.floor(Math.random() * 1000).toFixed(2)
          // },
          // usedPE() {
          //   return Math.floor(Math.random() * 1000).toFixed(2)
          // },
          // remainingPD() {
          //   return Math.floor(Math.random() * 1000).toFixed(2)
          // },
          // remainingFE() {
          //   return Math.floor(Math.random() * 1000).toFixed(2)
          // },

        },
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