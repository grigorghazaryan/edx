<template>
  <q-page class="q-pa-sm">  

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Budget"/>
        <q-breadcrumbs-el label="Budget"/>
      </q-breadcrumbs>
    </div>

    <div class="q-pa-sm q-mt-sm q-gutter-sm">
      <q-card>
        <q-table
          :data="data" 
          :columns="columns"
          :loading="loading"
          class="no-shadow"
          row-key="provider"
        >

          <!-- Loading -->
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>

          <!-- Table Header -->
          <template v-slot:top-right="props">
            <q-btn
              icon-right="archive"
              label="Export to Excel"
              color="teal" 
              text-color="white"
              no-caps
              @click="exportTable"
            />
            <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              v-if="mode === 'list'" class="q-px-sm"
            >
              <q-tooltip
                :disable="$q.platform.is.mobile"
                v-close-popup
              >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
              </q-tooltip>
            </q-btn>


            <div class="q-pa-sm q-gutter-sm">
              <q-dialog v-model="show_dialog">
                <q-card>

                  <q-card-section style="width: 450px">
                    <div class="text-h6">Date of activity</div>
                  </q-card-section>

                  <q-card-section>
                    <div class="row">

                      <div class="col-md-12 q-pr-sm q-pb-md">
                        <div class="q-mt-md q-mb-md">
                          <div class="row">
                            <div class="col-12">

                              <div class="q-m-md"> 
                                <q-btn class="q-mb-md">
                                  {{model.from }} - {{ model.to}}
                                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-date v-model="model" range landscape today-btn>
                                      <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-btn>

                                  <div style="width: 300px;display: flex; justify-content-center; align-items: center">
                                    <span style="margin-right: 20px">on</span> 
                                    <q-select dense outlined v-model="selectWeekDay" :options="selectOptionsWeekDays" />
                                    <span class="q-mr-md q-ml-md">(</span>
                                      <q-select dense outlined v-model="numbersX" :options="selectOptionsNumbersX"  /> 
                                      <span class="q-mr-md q-ml-md">a</span>
                                      <q-select dense outlined v-model="selectDayWeekMonth" :options="selectOptionsDayWeekMonth"  />
                                    <span class="q-mr-md q-ml-md">)</span>
                                  </div>

                                  <div style="width: 300px;display: flex; justify-content-center; align-items: center" class="q-mt-md">
                                    <span style="margin-right: 20px">at</span> <q-select dense outlined v-model="select" :options="selectOptions" />
                                  </div>

                                  <div class="q-mt-md">
                                    from 
                                    <q-btn>
                                      {{time1}}
                                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                                        <q-time v-model="time1" mask="HH:mm" format24h>
                                          <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                          </div>
                                        </q-time>
                                      </q-popup-proxy>
                                    </q-btn> 
                                    - 
                                    <q-btn>
                                      {{time2}}
                                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                                        <q-time v-model="time2" mask="HH:mm" format24h>
                                          <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                          </div>
                                        </q-time>
                                      </q-popup-proxy>
                                    </q-btn> 
                                    - 
                                    {{timeTotal}} hours a {{selectDayWeekMonth}}
                                  </div>

                              </div>

                            </div>
                          </div>
                        </div> 
                      </div>
                    
                    </div>
                  </q-card-section>
                
                  <q-card-actions align="right">
                    <q-btn flat label="Confirm" color="primary" v-close-popup @click="alert()"></q-btn>
                  </q-card-actions>

                </q-card>
              </q-dialog>
            </div>
          </template>

          <!-- Table Body -->
          <template v-slot:body="props">
            
              <q-tr :props="props">

                <q-td auto-width>
                  <q-btn size="sm" flat
                    color="black"
                    @click="props.expand = !props.expand" 
                    :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'">
                  </q-btn>
                </q-td>

                <q-td key="provider" :props="props">
                  {{ props.row.provider }}
                </q-td>

                <q-td key="PDActivity" :props="props">
                  {{ props.row.PDActivity }}
                </q-td>
                
                <q-td key="dateOfActivity" :props="props" 
                  :style="{width: '300px', whiteSpace: 'normal'}"
                > 
                  <div @click="editItem(props.row)" >{{ props.row.dateOfActivity }}</div>
                </q-td>

                <q-td key="noAttending" :props="props">
                  <div>{{ props.row.noAttending }} %</div>
                </q-td>

                <q-td key="school" :props="props">
                  <div>{{ props.row.school }}</div>
                </q-td>

                <q-td key="amount" :props="props">
                  <div>$ {{ props.row.amount }}</div>
                </q-td>

                <q-td key="pdHub" :props="props">
                  <div>$ {{ props.row.pdHub }}</div>
                </q-td>

                <q-td key="grossPD" :props="props">
                  <div>$ {{ props.row.grossPD }}</div>
                </q-td>

              </q-tr>

              <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%" class="q-td--no-hover">
                  <q-separator />
                  <div class="q-mt-md q-mb-md">
                    <div class="row">
                      <div class="col-12">
                        <div class="text-subtitle2 q-mb-md">Date of activity</div>
                        <div class="q-m-md"> 
                           <q-btn class="q-mb-md">
                            {{model.from }} - {{ model.to}}
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                              <q-date v-model="model" range landscape today-btn>
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-btn>

                            <div style="width: 300px;display: flex; justify-content-center; align-items: center">
                              <span style="margin-right: 20px">on</span> 
                              <q-select dense outlined v-model="selectWeekDay" :options="selectOptionsWeekDays" />
                              <span class="q-mr-md q-ml-md">(</span>
                                <q-select dense outlined v-model="numbersX" :options="selectOptionsNumbersX"  /> 
                                <span class="q-mr-md q-ml-md">a</span>
                                <q-select dense outlined v-model="selectDayWeekMonth" :options="selectOptionsDayWeekMonth"  />
                              <span class="q-mr-md q-ml-md">)</span>
                            </div>

                            <div style="width: 300px;display: flex; justify-content-center; align-items: center" class="q-mt-md">
                              <span style="margin-right: 20px">at</span> <q-select dense outlined v-model="select" :options="selectOptions" />
                            </div>

                            <div class="q-mt-md">
                              from 
                              <q-btn>
                                {{time1}}
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                  <q-time v-model="time1" mask="HH:mm" format24h>
                                    <div class="row items-center justify-end">
                                      <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                  </q-time>
                                </q-popup-proxy>
                              </q-btn> 
                              - 
                              <q-btn>
                                {{time2}}
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                  <q-time v-model="time2" mask="HH:mm" format24h>
                                    <div class="row items-center justify-end">
                                      <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                  </q-time>
                                </q-popup-proxy>
                              </q-btn> 
                              - 
                              {{timeTotal}} hours a {{selectDayWeekMonth}}
                            </div>

                        </div>
                      </div>
                    </div>
                  </div> 
                  <q-separator />
                </q-td>
              </q-tr>

          </template>

          <!-- Pagination -->
          <template v-slot:bottom class="justify-end">
            <div class="q-pa-md flex flex-center">
              <q-pagination
                v-model="pagination.page"
                :max="pages"
                :max-pages="6"
                ellipsess
                :direction-links="true"
              >
              </q-pagination>
            </div>
          </template>

        </q-table>
      </q-card>
    </div>
  

  </q-page>
</template>

<script>
    import {exportFile} from 'quasar'
    import router from 'src/router'

    function wrapCsvValue(val, formatFn) {
        let formatted = formatFn !== void 0
            ? formatFn(val)
            : val

        formatted = formatted === void 0 || formatted === null
            ? ''
            : String(formatted)

        formatted = formatted.split('"').join('""')
        /**
         * Excel accepts \n and \r in strings, but some other CSV parsers do not
         * Uncomment the next two lines to escape new lines
         */
        // .split('\n').join('\\n')
        // .split('\r').join('\\r')

        return `"${formatted}"`
    }

    export default {
        data() {
          return {
            model: { from: '2020/07/08', to: '2020/07/17' },
            select: "",
            selectOptions: ['Kansas', 'New York', 'Yerevan'],
            selectWeekDay: "",
            selectOptionsWeekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            numbersX: '',
            selectOptionsNumbersX: ['1x', '2x', '3x', '31x'],
            selectDayWeekMonth: "",
            selectOptionsDayWeekMonth: ['day', 'week', 'month'],
            time1: '00:00',
            time2: '00:00',
            show_dialog: false,



            loading: false,
            pages: 10,
            currentPage: 1,
            pagination: {
              sortBy: 'name',
              page: 1,
              rowsPerPage: 10,
              // rowsNumber: 10
            },
            
            columns: [
              {
                label: "",
              },
              {
                name: "provider",
                align: "left",
                label: "Provider",
                field: "provider",
                sortable: true
              },
              { 
                name: "PDActivity", 
                align: "left",
                label: "T-I PD Activity", 
                field: "PDActivity",
                sortable: true
              },
              {
                name: "dateOfActivity",
                align: "left",
                label: "Date Of Activity",
                field: "dateOfActivity",
                sortable: true,
                style: 'max-width: 300px',
                headerStyle: 'max-width: 500px',
              },
              {
                name: "noAttending",
                align: "left",
                label: "No. Attending",
                field: "noAttending"
              },
              {
                name: "school",
                align: "left",
                label: "School",
                field: "school"
              },
              {
                name: "amount",
                align: "left",
                label: "Amount",
                field: "amount"
              },
              {
                name: "pdHub",
                align: "left",
                label: "PD Hub",
                field: "pdHub"
              },
              {
                name: "grossPD",
                align: "left",
                label: "Gross PD",
                field: "grossPD"
              }
            ],
            data: []
          };
        },
        methods: {
          exportTable() {
                // naive encoding to csv format
                const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
                    this.data.map(row => this.columns.map(col => wrapCsvValue(
                        typeof col.field === 'function'
                            ? col.field(row)
                            : row[col.field === void 0 ? col.name : col.field],
                        col.format
                    )).join(','))
                ).join('\r\n')

                const status = exportFile(
                    'table-export.csv',
                    content,
                    'text/csv'
                )

                if (status !== true) {
                    this.$q.notify({
                        message: 'Browser denied file download...',
                        color: 'negative',
                        icon: 'warning'
                    })
                }
          },
          editItem(item) {
              // this.editedIndex = this.data.indexOf(item);
              // this.editedItem = Object.assign({}, item);
              this.show_dialog = true;
          },
         
        },
        created() {

            let dataTest = []

            for(let i=0; i<5; i++) {

              let amount = Math.floor(Math.random() * 600),
                  pdHub = Math.floor(Math.random() * 1400),
                  grossPd = Math.floor(Math.random() * 1400);

              let obj = {
                  toggle: '',
                  provider: 'WEI ' + i+1,
                  PDActivity: 'Balanced Literacy for Readers, #2-133 with Chris VB',
                  dateOfActivity: 'August, 2019 - May 2020 on Mondays (2 X a month) at Kansas from 8am - 12pm - 7.5 hours a month',
                  noAttending: '12 TI teachers and 30 TII Teachers',
                  school: 'APA',
                  amount: amount,
                  pdHub: pdHub,
                  grossPD: grossPd
              }

              dataTest.push(obj)
            }

            this.data = dataTest
        },
        computed: {
        },
        computed: {
          timeTotal() {
            let t1 = parseInt(this.time1.substring(0,2))
            let t2 = parseInt(this.time2.substring(0,2))
            let result = t2 - t1
            return result
          }
        }
    }

</script>

<style lang="scss" scoped>

.border {
  border: 1px solid #e0e0e0;
}
</style>