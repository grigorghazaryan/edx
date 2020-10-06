<template>
  <q-page class="q-pa-sm">    
    <q-card class="bg-transparent no-shadow no-border q-mb-md q-mt-md">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-card>
              <q-item style="background-color: #546bfa" class="q-pa-none">
                <q-item-section class="q-pa-md q-ml-none  text-white">
                  <q-item-label class="text-white text-h6 text-weight-bolder">$ {{ total }}</q-item-label>
                  <q-item-label>Total Allocation</q-item-label>
                </q-item-section>
                <q-item-section side class="q-mr-md text-white">
                  <q-icon name="fas fa-dollar-sign" color="white" size="44px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-card>
              <q-item style="background-color: #3a9688" class="q-pa-none">
                <q-item-section class=" q-pa-md q-ml-none  text-white">
                  <q-item-label class="text-white text-h6 text-weight-bolder">$ 0.0</q-item-label>
                  <q-item-label>From Last Year (+/-)</q-item-label>
                </q-item-section>
                <q-item-section side class="q-mr-md text-white">
                  <q-icon name="fas fa-chart-bar" color="white" size="44px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
    
    <div class="q-pa-sm q-gutter-sm">
      <q-table
        title="Title 4" 
        :data="data" 
        :columns="columns" 
        :filter="filter"
        row-key="name" 
        :loading="loading"
        binary-state-sort
      >

        <!-- Loading -->
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>

        <!-- Table Header -->
        <template v-slot:top-right="props">

          <q-input class="q-mr-md" outlines dense v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>

          <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" dense outlines clearable v-model="model" :options="options" label="Allocation" @input="filterAllocation"/>

          <q-btn square class="q-mr-md" style="background-color: #546bfa" text-color="white" icon="add" @click="show_dialog = true" no-caps>Add</q-btn>
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
            <q-dialog v-model="show_dialog" >
              <q-card>
                <q-card-section>
                  <div class="text-h6">Create</div>
                </q-card-section>

                <q-card-section>
                  <div class="row">

                    <div class="col-sm-6 col-xs-12 q-mb-sm q-pr-sm">
                      <q-select outlined v-model="editedItem.school" :options="schools" label="Choose a school" />
                    </div>

                    <div class="col-md-6">
                      <q-input outlined v-model="editedItem.date">
                        
                        <template v-slot:prepend>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                              <q-date v-model="editedItem.date" mask="YYYY-MM-DD">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>

                      </q-input>
                    </div>

                    <div class="col-md-6 q-pr-sm">
                      <q-input :disable="editedItem.status" outlined v-model="editedItem.allocation" label="Preliminary Allocations" />
                    </div>

                    <div class="col-md-6">
                      <q-input :disable="!editedItem.status" outlined v-model="editedItem.finalAllocation" label="Final Allocations" />
                    </div>

                    <div class="col-md-12 q-mt-md q-mb-md">
                      <div class="q-gutter-sm text-right">
                        <q-checkbox v-model="editedItem.status" label="Allocation is Final" />
                      </div>
                    </div>

                    <div class="col-md-12">
                      <q-input type="textarea" v-model="editedItem.notes" outlined label="Notes" />
                    </div>

                    <q-chip outline square class="q-mt-md" color="blue" text-color="white">
                      Previous Year Allocations: $ {{editedItem.previousYear}}
                    </q-chip>
                  
                  </div>
                </q-card-section>
              
                <q-card-actions align="right">
                  <q-btn flat label="Confirm" color="primary" v-close-popup @click="addRow"></q-btn>
                </q-card-actions>

              </q-card>
            </q-dialog>
            
            <q-dialog v-model="confirm" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <span class="q-ml-sm">Are you sure to delete this item?</span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="No, thanks" color="primary" v-close-popup />
                  <q-btn label="Yes" color="red" v-close-popup @click="deleteItem" />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
     
        </template>

        <!-- Table Body -->
        <template v-slot:body="props">
            <q-tr :props="props">

              <q-td key="date" :props="props">
                {{ props.row.date }}
              </q-td>
              
              <q-td key="school" :props="props">
                <div class="text-pre-wrap">{{ props.row.school }}</div>
              </q-td>

              <q-td key="allocation" :props="props">
                <div v-if="props.row.status">$ {{ props.row.finalAllocation }} </div>
                <div v-else> $ {{ props.row.allocation }} </div>
              </q-td>
              
              <q-td key="previousYear" :props="props">
                $ {{ props.row.previousYear }}
              </q-td>
              
              <q-td key="difference" :props="props">
                <div :style="{ color: props.row.difference < 0 ? 'red' : 'green' }">
                  {{props.row.difference }}
                </div>
              </q-td>

              <q-td key="roundedEducation" :props="props">
                $ {{ props.row.roundedEducation }}
              </q-td>

              <q-td key="healthyStudents" :props="props">
                $ {{ props.row.healthyStudents }}
              </q-td>

              <q-td key="techPD" :props="props">
                $ {{ props.row.techPD }}
              </q-td>

              <q-td key="teachInfrastructure" :props="props">
                $ {{ props.row.teachInfrastructure }}
              </q-td>
              
              <q-td key="status" :props="props">
                <q-chip square color="orange" text-color="white" v-if="props.row.status != true">
                  Preliminary
                </q-chip>
                <q-chip class="glossy" square color="teal" text-color="white" v-else>
                  Final
                </q-chip>
              </q-td>
              
              <q-td key="actions" :props="props">
                <q-btn 
                  icon="edit"
                  color="blue"
                  @click="editItem(props.row)" 
                  size=sm 
                  no-caps
                  class="q-mr-sm"
                >
                </q-btn>
                <q-btn 
                  icon="delete_forever"
                  color="red" 
                  @click="openDeleteModal(props.row)" 
                  size=sm 
                  no-caps
                >
                </q-btn>
              </q-td>

            </q-tr>
        </template>

        <!-- Pagination -->
        <template v-slot:bottom class="justify-end">
          <div class="q-pa-md flex flex-center">
            <q-pagination
              v-model="pagination.page"
              :max="pages"
              :max-pages="5"
              ellipsess
              :direction-links="true"
              @input="changePagination"
            >
            </q-pagination>
          </div>
        </template>

      </q-table>
    </div>

  </q-page>
</template>

<script>
    import {exportFile} from 'quasar'

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
            confirm: false,
            loading: false,
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
                name: "date",
                align: "left",
                label: "Date",
                field: "date",
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
                name: "allocation", 
                align: "left",
                label: "Allocation", 
                field: "allocation",
                sortable: true
              },
              { 
                name: "previousYear", 
                align: "left",
                label: "Previous Year", 
                field: "previousYear",
                sortable: true
              },
              {
                name: "difference",
                align: "left",
                label: "Difference",
                field: "difference",
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
                this.data = this.tempData.filter(a => a.status == false);
              }else {
                this.data = this.tempData.filter(a => a.status == true);
              }
            }else {
              this.data = this.tempData
            }
          },
      },
      created() {
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

        let schoolArr = []
        for(let j=0; j<this.data.length; j++) {
          schoolArr.push(this.data[j].school)
        }
        this.schools = schoolArr
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

<style lang="scss" scoped>
// Refactor needed
.q-item__section--side {
  display: none
}
</style>