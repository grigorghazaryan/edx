<template>
  <q-page class="q-pa-sm">  

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Teacher Cost"/>
        <q-breadcrumbs-el label="Budget Estimates"/>
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
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ total }}</q-item-label>
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
          <q-tab name="Salaried" label="Salaried" />
          <q-tab name="Hourly" label="Hourly" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>

          <q-tab-panel name="Salaried" class="q-p-sm">

            <q-table
              :data="data" 
              :columns="columns" 
              row-key="name" 
              :loading="loading"
              class="no-shadow"
            >

              <!-- Loading -->
              <template v-slot:loading>
                <q-inner-loading showing color="primary" />
              </template>

              <!-- Table Header -->
              <template v-slot:top-right="props">

                <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" dense outlines clearable v-model="schoolYear" :options="schoolYears" label="School year"/>

                <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" dense outlines clearable v-model="selectedSchool" :options="schools" label="Schools"/>

                <q-btn square class="q-mr-md" style="background-color: #546bfa" text-color="white" icon="add" @click="show_dialog = true" no-caps>Assign Teacher</q-btn>
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

                    <q-td auto-width>
                      <q-btn size="sm" round 
                        @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'">
                      </q-btn>
                    </q-td>

                    <q-td key="teacher" :props="props">
                      {{ props.row.teacher }}
                    </q-td>
                    
                    <q-td key="title" :props="props">
                      <div>{{ props.row.title }}</div>
                    </q-td>

                    <q-td key="benefits" :props="props">
                      <div>$ {{ props.row.benefits }} </div>
                    </q-td>
                    
                    <q-td key="workMonth" :props="props">
                      <div>{{ props.row.workMonth }}</div>
                    </q-td>

                    <q-td key="allocation" :props="props">
                      <div>{{ props.row.allocation }} %</div>
                    </q-td>

                    <q-td key="increase" :props="props">
                      <div>{{ props.row.increase }} %</div>
                    </q-td>

                    <q-td key="currentSalary" :props="props">
                      <div>$ {{ props.row.currentSalary }}</div>
                    </q-td>

                    <q-td key="fringe" :props="props">
                      <div>$ {{ props.row.fringe }}</div>
                    </q-td>

                    <q-td key="semiMonthly" :props="props">
                      <div>$ {{ props.row.semiMonthly }}</div>
                    </q-td>

                    <q-td key="annualCharge" :props="props">
                      <div>$ {{ props.row.annualCharge }}</div>
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

                  <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%">
                      <div class="text-left">4444.</div>
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
            
          </q-tab-panel>

          <q-tab-panel name="Hourly">
            <div class="text-h6">Hourly</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

        </q-tab-panels>
      </q-card>
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
            tab: 'Salaried',
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
            selectedSchool: null,
            schools: [
              'Preliminary', 'Final'
            ],
            schoolYear: null,
            schoolYears: [
              'School Year 20-21',
              'School Year 19-20',
              'School Year 18-19'
            ],
            mode: 'list',
            isFinal: false,
            show_dialog: false,
            editedIndex: -1,
            editedItem: {
              date: "",
              school: "",
              previousYear: "",
              difference: "",
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
                name: "toggle"
              },
              {
                name: "teacher",
                align: "left",
                label: "Teacher",
                field: "teacher",
                sortable: true
              },
              {
                name: "title",
                align: "left",
                label: "Title",
                field: "title",
                sortable: true
              },
              { 
                name: "benefits", 
                align: "left",
                label: "Benefits", 
                field: "benefits",
                sortable: true
              },
              {
                name: "workMonth",
                align: "left",
                label: "Work Month",
                field: "workMonth",
                sortable: true
              },
              {
                name: "allocation",
                align: "left",
                label: "Allocation",
                field: "allocation"
              },
              {
                name: "increase",
                align: "left",
                label: "Increase",
                field: "increase"
              },
              {
                name: "currentSalary",
                align: "left",
                label: "Current Salary",
                field: "currentSalary"
              },
              {
                name: "fringe",
                align: "left",
                label: "Fringe",
                field: "fringe"
              },
              {
                name: "semiMonthly",
                align: "left",
                label: "Semi Monthly",
                field: "semiMonthly"
              },
              {
                name: "annualCharge",
                align: "left",
                label: "Annual Charge",
                field: "annualCharge"
              },
              {
                name: "actions",
                align: "left",
                label: "Actions",
                field: "actions"
              },
            ],
            data: [],
            tempData: [],
            schools: [],
          };
        },
        methods: {
          addRow() {

            let allocation, finalAllocation

            if(this.editedItem.status) {
              finalAllocation = this.editedItem.finalAllocation
            } else {
              allocation = this.editedItem.allocation
            }

            let obj = {
              date: this.editedItem.date,
              school: this.editedItem.school,

              allocation: allocation,
              finalAllocation: finalAllocation,

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

                let allocation, finalAllocation

                if(r) {
                  finalAllocation = Math.floor(Math.random() * 100)
                } else {
                  allocation = Math.floor(Math.random() * 100)
                }

          
                let obj = {
                  date: "2020-09-1" + i+1,
                  school: "American School N" + i+1,

                  allocation: allocation,
                  finalAllocation: finalAllocation,

                  status: r,
                  notes: "",
                }

                  dataTest.push(obj)
              }
              
              this.data = dataTest
              this.tempData = dataTest

            }, 650)
          },
        },
        created() {
            let dataTest = []
            for(let i=0; i<5; i++) {
            
            let obj = {
                teacher: 'Frank Hall',
                title: 'T',
                benefits: false,
                workMonth: 10,
                allocation: 45,
                increase: 4.22,
                currentSalary: 487,
                fringe: 37,
                semiMonthly: 105,
                annualCharge: 369
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