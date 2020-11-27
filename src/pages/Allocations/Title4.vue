<template>
  <q-page class="q-pa-sm">
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Allocations" />
        <q-breadcrumbs-el label="Title IV" />
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
                <q-icon name="local_atm" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7"
                  >Total Allocation</q-item-label
                >
                <q-item-label class="text-dark text-h6 text-weight-bolder"
                  >$ {{ total }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <div class="q-pa-sm q-mt-sm q-gutter-sm">
      <q-table
        title="Title IV"
        :data="data"
        :columns="columns"
        :filter="filter"
        row-key="id"
        :loading="loading"
        binary-state-sort
        :pagination.sync="pagination"
      >
        <!-- Loading -->
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>

        <!-- Table Header -->
        <template v-slot:top-right="props">
          <q-select
            class="q-mr-md"
            style="min-width: 200px; max-width: 200px"
            dense
            outlines
            clearable
            v-model="schoolYear"
            :options="schoolYears"
            label="School year"
            @input="filterAllocation"
          />

          <q-input
            class="q-mr-md"
            outlines
            dense
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-select
            class="q-mr-md"
            style="min-width: 200px; max-width: 200px"
            dense
            outlines
            clearable
            v-model="model"
            :options="options"
            label="Allocation"
            @input="filterAllocation"
          />

          <q-btn
            square
            class="q-mr-md"
            style="background-color: #546bfa"
            text-color="white"
            icon="add"
            @click="show_dialog = true"
            no-caps
            >Add</q-btn
          >
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
            v-if="mode === 'list'"
            class="q-px-sm"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
            </q-tooltip>
          </q-btn>

          <div class="q-pa-sm q-gutter-sm">
            <q-dialog v-model="show_dialog">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Create</div>
                </q-card-section>

                <q-card-section>
                  <div class="row">
                    <div class="col-sm-6 col-xs-12 q-mb-sm q-pr-sm">
                      <q-select
                        outlined
                        v-model="editedItem.school"
                        :options="schools"
                        label="Choose a school"
                      />
                    </div>

                    <div class="col-md-6">
                      <q-input outlined v-model="editedItem.date">
                        <template v-slot:prepend>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                v-model="editedItem.date"
                                mask="YYYY-MM-DD"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Close"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>

                    <div class="col-md-6 q-pr-sm">
                      <q-input
                        :disable="editedItem.status"
                        outlined
                        v-model="editedItem.allocation"
                        label="Preliminary Allocations"
                      />
                    </div>

                    <div class="col-md-6">
                      <q-input
                        :disable="!editedItem.status"
                        outlined
                        v-model="editedItem.finalAllocation"
                        label="Final Allocations"
                      />
                    </div>

                    <div class="col-md-12 q-mt-md q-mb-md">
                      <div class="q-gutter-sm text-right">
                        <q-checkbox
                          v-model="editedItem.status"
                          label="Allocation is Final"
                        />
                      </div>
                    </div>

                    <div class="col-md-12">
                      <q-input
                        type="textarea"
                        v-model="editedItem.notes"
                        outlined
                        label="Notes"
                      />
                    </div>

                    <q-chip
                      outline
                      square
                      class="q-mt-md"
                      color="blue"
                      text-color="white"
                    >
                      Previous Year Allocations: $ {{editedItem.previousYear}}
                    </q-chip>
                  </div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="Confirm"
                    color="primary"
                    v-close-popup
                    @click="addRow"
                  ></q-btn>
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-dialog v-model="confirm" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <span class="q-ml-sm">Are you sure to delete this item?</span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="No, thanks"
                    color="primary"
                    v-close-popup
                  />
                  <q-btn
                    label="Yes"
                    color="red"
                    v-close-popup
                    @click="deleteItem"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </template>

        <!-- Table Body -->
        <template v-slot:body="props">
          <q-tr
            :props="props"
            @click="copyRowData(props.rowIndex)"
            :class="{ 'bg-red-2' : props.row.changed }"
          >
            <q-td auto-width>
              <q-btn
                size="sm"
                flat
                color="black"
                @click="props.expand = !props.expand"
                :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
              >
              </q-btn>
            </q-td>

            <q-td key="creation_date" :props="props">
              
              <div class="cursor-pointer">
                {{ props.row.creation_date }}
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="props.row.creation_date" mask="YYYY-MM-DD" @input="detectChange(props.rowIndex)">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Cancel" color="primary" flat v-close-popup />
                      <q-btn label="OK" color="primary" flat v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </div>

            </q-td>

            <q-td key="school" :props="props">
              <div class="text-pre-wrap cursor-pointer">{{ props.row.school.school_name }}</div>
            </q-td>

            <q-td key="grandTotal" :props="props">
              <div class="cursor-pointer">
                $ {{ props.row.grand_total }}
              </div>

              <q-popup-edit
                v-model="props.row.grand_total"
                title="Grand Total"
                buttons
              >
                <q-input
                  @input="detectChange(props.rowIndex)"
                  type="text"
                  v-model="props.row.grand_total"
                  dense
                  autofocus
                />
              </q-popup-edit>
            </q-td>

            <q-td key="roundedEducation" :props="props">
              <div class="cursor-pointer">
                $
                {{  (props.row.grand_total * props.row.well_rounded_percentage / 100).toFixed(2)  }}
              </div>

              <q-popup-edit
                title="Rounded Education"
                buttons
                v-model="props.row.well_rounded_percentage"
              >
                <p>
                  $
                  {{  (props.row.grand_total * props.row.well_rounded_percentage / 100).toFixed(2)  }}
                </p>

                <q-input
                  type="number"
                  label="Well Rounded %"
                  v-model="props.row.well_rounded_percentage"
                  :hint="props.row.well_rounded_percentage < 20 ? 'Percentage must be greater than 20' : props.row.well_rounded_percentage > 80 ? 'Percentage must be smaller than 80' : ''"
                  @change="props.row.well_rounded_percentage < 20 ? props.row.well_rounded_percentage = 20 : props.row.well_rounded_percentage > 80 ? props.row.well_rounded_percentage = 20  : null "
                />
              </q-popup-edit>
            </q-td>

            <q-td key="healthyStudents" :props="props">
              <div class="cursor-pointer">
                $
                {{  (props.row.grand_total * props.row.safe_healthy_percentage / 100).toFixed(2)  }}
              </div>

              <q-popup-edit
                title="Healthy Students"
                buttons
                v-model="props.row.safe_healthy_percentage"
              >
                <p>
                  $
                  {{  (props.row.grand_total * props.row.safe_healthy_percentage / 100).toFixed(2)  }}
                </p>
                <q-input
                  type="number"
                  label="Healthy Students %"
                  v-model="props.row.safe_healthy_percentage"
                  :hint="props.row.safe_healthy_percentage < 20 ? 'Percentage must be greater than 20' : ''"
                  @change="props.row.safe_healthy_percentage < 20 ? props.row.safe_healthy_percentage = 20 : props.row.safe_healthy_percentage > 80 ? props.row.safe_healthy_percentage = 20  : null "
                />
              </q-popup-edit>
            </q-td>

            <q-td key="techPD" :props="props">
              <div class="cursor-pointer">
                $
                {{ props.row.grand_total - ( (props.row.grand_total * props.row.well_rounded_percentage / 100) + (props.row.grand_total * props.row.safe_healthy_percentage / 100)  ) - (((  props.row.grand_total - ((props.row.grand_total * props.row.well_rounded_percentage / 100) +  (props.row.grand_total * props.row.safe_healthy_percentage / 100) ))) * props.row.teach_instruction_percentage / 100) }}
              </div>
            </q-td>

            <q-td key="teachInfrastructure" :props="props">
              <div class="cursor-pointer">
                $
                {{  (((  props.row.grand_total - ((props.row.grand_total * props.row.well_rounded_percentage / 100) +  (props.row.grand_total * props.row.safe_healthy_percentage / 100) ))) * props.row.teach_instruction_percentage / 100).toFixed(2) }}
              </div>

              <q-popup-edit
                title="Teach Infrastructure"
                buttons
                v-model="props.row.teach_instruction_percentage"
              >
                <p>
                  $
                  {{ (((  props.row.grand_total - ((props.row.grand_total * props.row.well_rounded_percentage / 100) +  (props.row.grand_total * props.row.safe_healthy_percentage / 100) ))) * props.row.teach_instruction_percentage / 100).toFixed(2)  }}
                </p>
                <q-input
                  type="number"
                  label="Teach Infrastructure %"
                  v-model="props.row.teach_instruction_percentage"
                />
              </q-popup-edit>
            </q-td>

            <q-td key="status" :props="props">
                <q-chip class="cursor-pointer" square color="purple" text-color="white" v-if="props.row.status_string == 'Final'">
                  FN
                  <q-tooltip 
                      anchor="top middle" self="bottom middle" :offset="[10, 10]"
                      transition-show="flip-right"
                      transition-hide="flip-left"
                  >
                    <strong>FN</strong>
                  </q-tooltip>
                </q-chip>

                <q-chip class="cursor-pointer" square color="green" text-color="white" v-else>
                  PR
                  <q-tooltip 
                      anchor="top middle" self="bottom middle" :offset="[10, 10]"
                      transition-show="flip-right"
                      transition-hide="flip-left"
                  >
                    <strong>PR</strong>
                  </q-tooltip>
                </q-chip>

                <q-popup-edit v-model="props.row.status_string" title="Allocation" buttons>
                  <q-select  @input="detectChange(props.rowIndex)" v-model="props.row.status_string" :options="options"/>
                </q-popup-edit>  
            </q-td>

            <q-td key="actions" :props="props" style="min-width: 132px">
              <div v-if="props.row.changed">
                <q-btn
                  @click="cancellChange(props.rowIndex)"
                  class="q-mr-sm"
                  icon="cancel"
                  color="orange"
                  size="sm"
                  no-caps
                  round
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                    transition-show="flip-right"
                    transition-hide="flip-left"
                  >
                    <strong>Cancel</strong>
                  </q-tooltip>
                </q-btn>

                <q-btn
                  @click="props.row.changed = false"
                  class="q-mr-sm"
                  icon="save"
                  color="green"
                  size="sm"
                  no-caps
                  round
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                    transition-show="flip-right"
                    transition-hide="flip-left"
                  >
                    <strong>Save</strong>
                  </q-tooltip>
                </q-btn>
              </div>
              <div v-if=" props.row.showEditButton && !props.row.changed">
                <q-btn
                  icon="delete_forever"
                  color="red"
                  @click="openDeleteModal(props.row)"
                  size="sm"
                  no-caps
                  round
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                    transition-show="flip-right"
                    transition-hide="flip-left"
                  >
                    <strong>Delete</strong>
                  </q-tooltip>
                </q-btn>
              </div>
            </q-td>
            
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%" class="q-td--no-hover">
              <div class="row">
                <div class="col-md-4 q-mt-lg q-mb-lg">
                  <div class="text-subtitle2 q-mb-md">Notes</div>
                  <q-input type="textarea" outlined v-model="props.row.notes" />
                </div>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
    import {exportFile} from 'quasar'
    import lodash from 'lodash'
    import axios from 'axios'
    import config from '../../../config'

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
    let oldObject = {}

export default {
    data() {
      return {
        confirm: false,
        loading: true,
        pages: 3,
        currentPage: 1,
        pagination: {
          sortBy: 'name',
          page: 1,
          rowsPerPage: 5,
          // rowsNumber: 5
        },
        model: null,
        options: [
          'Preliminary', 'Final'
        ],
        schoolYear: null,
        schoolYears: [
          'School Year 20-21',
          'School Year 19-20',
          'School Year 18-19'
        ],
        filter: '',
        mode: 'list',
        isFinal: false,
        show_dialog: false,
        editedIndex: -1,
        editedItem: {
          date: "",
          school: "",
          previousYear: "",
          difference: "",
          roundedEducation: "",
          healthyStudents: "",
          techPD: "",
          teachInfrastructure: "",
          status: false,
          notes: ""
        },
        defaultItem: {
          date: "",
          school: "",
          previousYear: "",
          difference: "",
          status: false,
          notes: ""
        },
        columns: [
          {
            name: "toggle",
            style: 'width: 30px'
          },
          {
            name: "creation_date",
            align: "left",
            label: "Date",
            field: "creation_date",
            sortable: true
          },
          {
            name: "school",
            align: "left",
            label: "School",
            field: "school",
            sortable: true
          },
          {
            name: "grandTotal",
            align: "left",
            label: "Grand Total",
            field: "grandTotal",
            sortable: true
          },
          {
            name: "roundedEducation",
            align: "left",
            label: "Rounded Education",
            field: "roundedEducation",
            sortable: true
          },
          {
            name: "healthyStudents",
            align: "left",
            label: "Healthy Students",
            field: "healthyStudents",
            sortable: true
          },
          {
            name: "techPD",
            align: "left",
            label: "Tech PD",
            field: "techPD",
            sortable: true
          },
          {
            name: "teachInfrastructure",
            align: "left",
            label: "Teach Infrastructure",
            field: "teachInfrastructure",
            sortable: true
          },
          {
            name: "status",
            align: "left",
            label: "Status",
            field: "status",
            sortable: true
          },
          {
            name: "actions",
            align: "left",
            label: "Actions",
            field: "actions"
          }
        ],
        data: [],
        tempData: [],
        schools: [],
      };
    },
    methods: {
      calculateNumber(val) {
        console.log('calculate number works', val)
        if(val < 20) {
          alert('20 ic poqr')
        }
      },
      addRow() {

        let previousYear = this.editedIndex > -1 ? this.editedItem.previousYear :  Math.floor(Math.random() * 100),
             allocation,
            finalAllocation,
            roundedEducation,
            healthyStudents,
            techPD,
            teachInfrastructure,
            difference = allocation - previousYear

        if(this.editedItem.status) {
          finalAllocation = this.editedItem.finalAllocation
          difference = finalAllocation - previousYear

          roundedEducation = finalAllocation * 20 / 100
          healthyStudents = finalAllocation * 20 / 100
          techPD = finalAllocation * 51 / 100
          teachInfrastructure = finalAllocation * 9 / 100
        } else {
          allocation = this.editedItem.allocation
          difference = allocation - previousYear

          roundedEducation = allocation * 20 / 100
          healthyStudents = allocation * 20 / 100
          techPD = allocation * 51 / 100
          teachInfrastructure = allocation * 9 / 100
        }


        let obj = {
          date: this.editedItem.date,
          school: this.editedItem.school,

          allocation: allocation,
          finalAllocation: finalAllocation,

          previousYear: previousYear,
          difference: difference,

          roundedEducation: roundedEducation,
          healthyStudents: healthyStudents,
          techPD: techPD,
          teachInfrastructure: teachInfrastructure,

          status: this.editedItem.status,
          notes: this.editedItem.notes
        }

        if (this.editedIndex > -1) {
          Object.assign(this.data[this.editedIndex], obj);
        } else {
          this.data.unshift(obj);
        }

        this.close()
      },
      openDeleteModal(item) {
        this.confirm = true
        this.item = item
      },
      deleteItem() {
        let item = this.item
        const index = this.data.indexOf(item)
        this.data.splice(index, 1)
      },
      editItem(item) {
          this.editedIndex = this.data.indexOf(item);
          this.editedItem = Object.assign({}, item);
          this.show_dialog = true;
      },
      close () {
        this.show_dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
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
      changePagination(val) {
        this.currentPage = val
        this.loading = true
        this.pagination.page = val

        setTimeout(()=> {

          this.loading = false
          let dataTest = []
          for(let i=0; i<5; i++) {
            let r = Math.floor(Math.random() * 10)
            if(r % 2) r = true
            else r = false

            let previousYear = Math.floor(Math.random() * 100),
                allocation,
                finalAllocation,
                roundedEducation,
                healthyStudents,
                techPD,
                teachInfrastructure,
                difference = allocation - previousYear

            if(r) {
              finalAllocation = Math.floor(Math.random() * 100)
              difference = finalAllocation - previousYear

              roundedEducation = finalAllocation * 20 / 100
              healthyStudents = finalAllocation * 20 / 100
              techPD = finalAllocation * 51 / 100
              teachInfrastructure = finalAllocation * 9 / 100
            } else {
              allocation = Math.floor(Math.random() * 100)
              difference = allocation - previousYear

              roundedEducation = allocation * 20 / 100
              healthyStudents = allocation * 20 / 100
              techPD = allocation * 51 / 100
              teachInfrastructure = allocation * 9 / 100
            }


            let obj = {
              date: "2020-09-1" + i+1,
              school: "American School N" + i+1,

              allocation: allocation,
              finalAllocation: finalAllocation,

              previousYear: previousYear,
              difference: difference,

              roundedEducation: roundedEducation,
              healthyStudents: healthyStudents,
              techPD: techPD,
              teachInfrastructure: teachInfrastructure,

              status: r,
              notes: "",
            }

              dataTest.push(obj)
          }

          this.data = dataTest
          this.tempData = dataTest

        }, 650)
      },
      filterAllocation() {
        if(this.model) {
          if(this.model == 'Preliminary') {
            this.data = this.tempData.filter(a => a.allocation == 'Preliminary');
          }else {
            this.data = this.tempData.filter(a => a.allocation == 'Final');
          }
        }else {
          this.data = this.tempData
        }
      },
      copyRowData(index) {
        oldObject = JSON.stringify(this.tempData[index])
        console.log('Copy Row Data : ', oldObject)
      },
      detectChange(index) {
        let d = JSON.parse(oldObject)
        let f = JSON.stringify(this.data[index])
            f = JSON.parse(f)

        let status = _.isEqual(d, f)

        if(status) {
          this.data[index].changed = false
        }else {
          this.data[index].changed = true
        }

      },
      cancellChange(index) {
        let d = JSON.parse(oldObject)
        Object.assign(this.data[index], d);
        this.data[index].changed = false
      },


      // Requests
      getAllocationByType(type) {
        const conf = {
          method: 'GET',
          url: config.getAllocationByTitle + type,
          headers: {
            Accept: 'application/json',
          }
        }
        axios(conf).then(res => {

            let data = res.data.allocations

            for(let i=0; i<data.length; i++) {
              
              data[i].changed = false
              data[i].showEditButton = true

              if(data[i].is_final) {
                data[i].status_string = 'Final'
              }
              else {
              data[i].status_string = 'Preliminary'
              }

            }

            this.data = data
            this.tempData = data

            console.log('DATA = ', this.data)

            this.loading = false
        })
      }
  },
    created() {
      this.getAllocationByType(4)
      // let dataTest = []
      // for(let i=0; i<5; i++) {

      //   let r = Math.floor(Math.random() * 10)
      //   if(r % 2) r = true
      //   else r = false

      //   let allocation,
      //       finalAllocation,
      //       roundedEducation,
      //       healthyStudents,
      //       techPD,
      //       teachInfrastructure;

      //   if(r) {
      //     finalAllocation = Math.floor(Math.random() * 1000)
      //     // roundedEducation = finalAllocation * 20 / 100
      //     // healthyStudents = finalAllocation * 20 / 100
      //     techPD = finalAllocation * 51 / 100
      //     teachInfrastructure = (techPD * 15) / 100
      //     // finalAllocation * 9 / 100
      //   } else {
      //     allocation = Math.floor(Math.random() * 1000)
      //     // roundedEducation = allocation * 20 / 100
      //     // healthyStudents = allocation * 20 / 100
      //     techPD = allocation * 51 / 100
      //     teachInfrastructure = (techPD * 15) / 100
      //     // allocation * 9 / 100
      //   }


      //   let obj = {
      //     id: i,
      //     date: "2020-09-1" + i+1,
      //     school: "American School N" + i+1,

      //     allocation: allocation,
      //     finalAllocation: finalAllocation,

      //     roundedEducation: roundedEducation,
      //     healthyStudents: healthyStudents,
      //     techPD: techPD,
      //     teachInfrastructure: teachInfrastructure.toFixed(2),

      //     roundedEducationPercentage: 20,
      //     healthyStudentsPercentage: 20,
      //     teachInfrastructurePercentage: 15,

      //     status: r ? "Final" : "Preliminary",
      //     notes: "",
      //     showEditButton: true,
      //     changed: false,
      //   }

      //   dataTest.push(obj)

      // }
      // this.data = dataTest
      // this.tempData = dataTest

      // let schoolArr = []
      // for(let j=0; j<this.data.length; j++) {
      //   schoolArr.push(this.data[j].school)
      // }
      // this.schools = schoolArr
    },
    computed: {
      total() {
        let total = 0;
        for(let i=0; i<this.data.length; i++) {

          let allocation
          if(this.data[i].status) {
            allocation = parseFloat( this.data[i].finalAllocation )
          }else {
            allocation = parseFloat( this.data[i].allocation )
          }
          total += allocation

        }
        return total.toFixed(2)
      }
    }
}
</script>
