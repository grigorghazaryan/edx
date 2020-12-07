<template>
  <q-page class="q-pa-sm">  

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Allocations"/>
        <q-breadcrumbs-el label="GEER"/>
      </q-breadcrumbs>
    </div>

    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="local_atm" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ barInfo.totalAllocation }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

        </div>
      </q-card-section>
    </q-card>
    
    <div class="q-pa-sm q-mt-sm q-gutter-sm">
      <q-table
        :title="titleHeader" 
        :data="data" 
        :columns="columns" 
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

          <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" 
            dense outlines v-model="schoolYear" 
            :options="schoolYears" label="School year" 
            @input="filterAllocation"
          >
            <template v-if="schoolYear" v-slot:append>
              <q-icon name="cancel" @click.stop="schoolYear = null, getAllocationByType(6, 10, 1)" class="cursor-pointer" />
            </template>

          </q-select>

          <q-input label="Search" class="q-mr-md" outlines dense 
          v-model="filter" @keyup="keyUpFilter" @keydown="keyDownFilter">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" dense outlines clearable v-model="model" :options="options" label="Status" @input="filterAllocation"/>

          <q-btn :disabled="addNew" square class="q-mr-md" style="background-color: #546bfa" text-color="white" icon="add" 
          @click="addNew = true, addNewRow()" no-caps>Add</q-btn>

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
            <q-tr :props="props" @click="copyRowData(props.rowIndex)" :class="{ 'bg-red-2' : props.row.changed }">

              <q-td auto-width>
                <q-btn size="sm" flat
                  color="black"
                  @click="props.expand = !props.expand" 
                  :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'">
                </q-btn>
              </q-td>

              <q-td key="creation_date" :props="props">
                {{ props.row.creation_date }}
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="props.row.creation_date"
                    @input="detectChange(props.rowIndex)"
                    mask="YYYY-MM-DD"
                  >
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Cancel" color="primary" flat v-close-popup />
                      <q-btn label="OK" color="primary" flat v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-td>
              
              <q-td key="school" :props="props">
                <div v-if="!props.row.add || props.row.add == false" class="text-pre-wrap cursor-pointer">{{ props.row.school.school_name }}</div>
                <q-select
                  v-else
                  outlined
                  dense
                  v-model="selectedSchool"
                  :options="schools"
                  style="min-width: 200px; max-width: 300px"
                  @input="addSchoolNameToObject"
                />
              </q-td>

              <q-td key="allocation" :props="props">
                <div class="cursor-pointer">$ {{ props.row.total_allocation }} </div>
                

                <q-popup-edit v-model="props.row.total_allocation" title="Allocation" buttons>
                  <q-input  @input="detectChange(props.rowIndex)" type="number" v-model="props.row.total_allocation" dense autofocus/>
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
                    size=sm 
                    no-caps
                    round 
                  >
                    <q-tooltip 
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                      <strong>Cancel</strong>
                    </q-tooltip>
                  </q-btn>
                  
                  <q-btn
                    @click="editAllocation(props.rowIndex)"
                    class="q-mr-sm"
                    icon="save"
                    color="green" 
                    size=sm 
                    no-caps
                    round 
                  >
                    <q-tooltip 
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                      <strong>Save</strong>
                    </q-tooltip>
                  </q-btn>

                </div>
                <div v-if=" props.row.showEditButton && !props.row.changed">
                  <!-- <q-btn 
                    icon="edit"
                    color="blue"
                    @click="editItem(props.row)" 
                    size=sm 
                    no-caps
                    class="q-mr-sm"
                  >
                  </q-btn> -->
                  <q-btn 
                    icon="delete_forever"
                    color="red" 
                    @click="openDeleteModal(props.row)" 
                    size=sm 
                    no-caps
                    round 
                  >
                    <q-tooltip 
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
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

        <!-- Pagination -->
        <template v-slot:bottom class="justify-end">
          <div class="q-pa-md flex flex-center">
            <q-pagination
              v-model="current"
              :max="pages"
              :direction-links="true"
              @click="changePagination(current)"
            >
            </q-pagination>

            <div class="row justify-center items-center">
              <span class="q-mr-md">Rows Per page</span>
              <q-select dense outlined 
                @input="changeRowsPerPage"
                v-model="pagination.rowsPerPage" 
                :options="rowsPerPageArr" 
              />
            </div>
            
          </div>
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
    let typingTimer
    let doneTypingInterval = 500

    export default {
        data() {
          return {
            confirm: false,
            loading: true,
            pages: 1,
            pagination: {
              rowsPerPage: 10
            },
            count: 10,
            current: 1,
            model: '',
            options: [
              'Preliminary', 'Final'
            ],
            schoolYear: '',
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
                field: row => row.name,
                format: val => `${val}`,
                sortable: true
              },
              { 
                name: "allocation", 
                align: "left",
                label: "Grand Total", 
                field: "allocation",
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
            selectedSchool: '',

            addNew: false,
            barInfo: {},
            rowsPerPageArr: ['5', '10', '25', '50', '75', '100'], 
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
              
            const conf = {
              method: 'DELETE',
              url: config.getAllocationByTitle + item.id,
              headers: {
                Accept: 'application/json',
              }
            }

            axios(conf)
              .then(res => {
                console.log('DELETE RES :', res)
                const index = this.data.indexOf(item)
                this.data.splice(index, 1)
                  this.$q.notify({
                    message: res.data,
                    type: 'positive',
                  })
              })
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
          changePagination (val) {

            console.log('change pagination')
            this.current = val
            this.getAllocationByType(6, this.count, val)
            
          },
          changeRowsPerPage() {

            console.log('changeRowsPerPage')
            
            this.count = this.pagination.rowsPerPage
            this.current = 1

            this.getAllocationByType(6, this.count, this.current)

          },
          copyRowData(index) {
            oldObject = JSON.stringify(this.tempData[index])
            console.log('Copy Row Data : ', oldObject)
          },
          detectChange(index) {

            this.editedItem = this.tempData[index]
            
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

            if(this.addNew) {
              this.data.splice(0, 1)
              this.addNew = false
            } else {
              let d = JSON.parse(oldObject)
              Object.assign(this.data[index], d);
              this.data[index].changed = false
            }

          },

          getToday() {
            let dateObj = new Date();
            let month = dateObj.getUTCMonth() + 1; //months from 1-12
            let day = dateObj.getUTCDate();
            let year = dateObj.getUTCFullYear();

            return year + "-" + month + "-" + day;
          },
          getSchoolYears() {
            const conf = {
              method: 'GET',
              url: config.getSchoolYears,
              headers: {
                Accept: 'application/json',
              }
            }
            axios(conf).then(res => {
              console.log('getSchoolYears',  res)

              let data = res.data, schoolsArr = []
              for(let i=0; i<data.length; i++) {
                let obj = {
                  id: data[i].id,
                  label: data[i].year_name,
                  value: data[i].year_name
                }
                schoolsArr.push(obj)
              }
              this.schoolYears = schoolsArr
              console.log(this.schoolYears)
            })
          },

          // Add new Row 
          addNewRow() {
            
            let date = this.getToday()

            const obj  = {
              creation_date: date,
              school: '',

              total_allocation: 0,

              status_string: 'Final',
              changed: true,
              showEditButton: false,
              allocation_type: 6,
              note: '',
              add: true,
            }

            this.data.unshift(obj)
            this.editedItem = obj
          
          },
          addSchoolNameToObject() {
            this.editedItem.school_name = this.selectedSchool.label
            console.log(this.editedItem)
          },

          // Filter key events
          keyUpFilter() {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(this.doneTyping, doneTypingInterval);
          },
          keyDownFilter() {
            clearTimeout(typingTimer);
          },
          doneTyping() {
            console.log('Typing done!')
            if(this.filter.length > 3) {
              console.log('Send Request...')
              this.filterAllocation()
            }
          },

          // Filter Allocation
          filterAllocation() {

            this.loading = true

            let model = '', url = '';            
            
            if(this.filter != '') {
              url += '&search=' + this.filter
            }

            if(this.schoolYear) {
              url += '&year=' + this.schoolYear.id
            }

            if(this.model != '') {
              this.model == 'Preliminary' ? model = 'pr' : model = 'fn'
              url += '&status=' + model
            } 
            

            // 1?search=St&status=fn&year=21

          const conf = {
            method: 'GET',
            url: config.filterAllocation + '6?' + url,
            headers: {
              Accept: 'application/json',
            }
          }

          console.log(conf.url)
            
          axios(conf).then(res => {

            this.loading = false

            let data = res.data.allocations
            this.pages = res.data.pagesCount

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
            
            console.log('Filter result: ', res.data)
          })

          },

          // Requests
          getAllocationByType(type, limit, page) {

            this.loading = true

            const conf = {
              method: 'GET',
              url: config.getAllocationByTitle + type + '?limit=' + limit + '&page=' + page,
              headers: {
                Accept: 'application/json',
              }
            }

            axios(conf).then(res => {

                let data = res.data.allocations
                this.pages = res.data.pagesCount

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
          },
          getAllocationBar(type) {
            const conf = {
              method: 'GET',
              url: config.getAllocationBar + type,
              headers: {
                Accept: 'application/json',
              }
            }
            axios(conf).then(res => {
              this.barInfo = res.data
            })
          },
          editAllocation(index) {

              const data  = {
                is_final:  this.editedItem.status_string == 'Final' ? true : false,
                creation_date: this.editedItem.creation_date,
                total_allocation: this.editedItem.total_allocation,
                note: this.editedItem.note,
                allocation_type: parseInt(this.editedItem.allocation_type)
              }

              console.log(data)

              if(this.addNew) {

                data.school_id = this.selectedSchool.id

                const conf = {
                  method: 'POST',
                  url: config.addAllocation,
                  headers: {
                    Accept: 'application/json',
                  },
                  data: data
                }

                axios(conf)
                  .then(res => {

                    this.$q.notify({
                      message: 'Allocation Added successfully!',
                      type: 'positive',
                    })

                    this.data[index].changed = false
                    this.data[index].showEditButton = true
                    this.data[index].id = res.data.id
                    this.data[index].add = false

                    let school = {
                      school_name: this.selectedSchool.label
                    }

                    this.data[index].school = school
                    this.addNew = false
                  })

              } else {
                
                this.data[index].changed = false

                const conf = {
                  method: 'PUT',
                  url: config.getAllocationByTitle + this.editedItem.id,
                  headers: {
                    Accept: 'application/json',
                  },
                  data: data
                }

                axios(conf)
                  .then(res => {
                    this.$q.notify({
                      message: 'Allocation updated successfully!',
                      type: 'positive',
                    })
                  })
              }

          },
          getSchools() {
            const conf = {
              method: 'GET',
              url: config.getSchools,
              headers: {
                Accept: 'application/json',
              }
            }
            axios(conf).then(res => {
              console.log('schools', res)
              let schoolsArr = []
              for(let i=0; i<res.data.length; i++) {
                let obj = {
                  id: res.data[i].id,
                  label: res.data[i].school_name,
                  value: res.data[i].id
                }
                schoolsArr.push(obj)
              }
              this.schools = schoolsArr
              console.log(this.schools)
            })
          },
        },
        created() {
          this.getSchools()
          this.getAllocationByType(6, this.count, this.current)
          this.getAllocationBar(6)
          this.getSchoolYears()
        },
        computed: {
          titleHeader() {
            let title;
            this.schoolYear == '' 
              ? title = this.schoolYears[0] && this.schoolYears[0].value
              : title = this.schoolYear.value
            return 'GEER - ' + title
          }
        }
    }

</script>

