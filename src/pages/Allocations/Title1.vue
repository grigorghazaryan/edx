<template>
  <q-page class="q-pa-sm">  

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Allocations"/>
        <q-breadcrumbs-el label="Title I"/>
      </q-breadcrumbs>
    </div>

    <Tabs />

    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">
          
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="school" color="deep-orange-6" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Instruction</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ barInfo.totalInstruction }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="groups" color="light-blue" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ barInfo.pdTotal }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="menu_book" color="pink" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Instructions</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ barInfo.totalInstruction }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="family_restroom" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Engagement</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ barInfo.familyEngTotal }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

        </div>
      </q-card-section>
    </q-card>


    <div class="q-pa-sm q-mt-sm q-gutter-sm">
      
      <div class="edx-header-parent">
        <span class="edx-header-text">{{ titleHeader }}</span>
      </div>

      <q-table
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
            dense outlines 
            v-model="schoolYear" 
            :options="schoolYears" 
            label="School year" 
            @input="filterAllocation"
          >
            <template v-if="schoolYear" v-slot:append>
              <q-icon name="cancel" @click.stop="schoolYear = '', filterAllocation()" class="cursor-pointer" />
            </template>

          </q-select>

          <q-input label="Search" class="q-mr-md" outlines dense 
          v-model="filter" @keyup="keyUpFilter" @keydown="keyDownFilter">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" 
            dense outlines v-model="model" :options="options" label="Status" 
            @input="filterAllocation"
          >
            <template v-if="model" v-slot:append>
              <q-icon name="cancel" @click.stop="model = '', filterAllocation()" class="cursor-pointer" />
            </template>

          </q-select>

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

                <div v-if="!props.row.add || props.row.add == false" class="text-pre-wrap cursor-pointer">{{ props.row.school.name }}</div>
                <q-select
                  v-else
                  outlined
                  dense
                  v-model="selectedSchool"
                  :options="schools"
                  style="max-width: 300px"
                  @input="addSchoolNameToObject"
                />

              </q-td>

              <q-td key="instruction" :props="props">
                $ {{ (props.row.total_instruction - ( props.row.total_instruction * props.row.professional_development_percentage / 100 )).toFixed(2) }}
              </q-td>

              <q-td key="profDev" :props="props">
                <div class="cursor-pointer">$ {{ ( props.row.total_instruction * props.row.professional_development_percentage / 100 ).toFixed(2) }}</div>

              </q-td>
              
              <q-td key="totalInstruction" :props="props">

                <div class="cursor-pointer">$ {{ parseFloat(props.row.total_instruction).toFixed(2) }} </div>
                
                <q-popup-edit v-model="props.row.total_instruction" title="Total Instruction" buttons>
                  <q-input  @input="detectChange(props.rowIndex)" type="number" v-model="props.row.total_instruction" dense autofocus/>
                  <q-input  @input="detectChange(props.rowIndex)" type="number" v-model="props.row.professional_development_percentage" label="PD Percentage" dense autofocus/>
                </q-popup-edit>

              </q-td>
              
              <q-td key="familyEngagemenet" :props="props">
                <div class="cursor-pointer">$  {{ props.row.family_engagement }} </div>
               
                <q-popup-edit  v-model="props.row.family_engagement" title="Family Engagemenet" buttons>
                  <q-input  @input="detectChange(props.rowIndex)" type="number" v-model="props.row.family_engagement" dense autofocus/>
                </q-popup-edit>
                
              </q-td>

              <q-td key="total" :props="props">
                  $ {{ ( parseFloat(props.row.total_instruction) + parseFloat(props.row.family_engagement) ).toFixed(2) }}
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

                  <div v-if="props.row.showEditButton && !props.row.changed">
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

            <q-tr v-show="props.expand" :props="props"  @click="copyRowData(props.rowIndex)" :class="{ 'bg-red-2' : props.row.changed }">
              <q-td colspan="100%" class="q-td--no-hover">
                <div class="row">
                  <div class="col-md-4 q-mt-lg q-mb-lg">
                    <div class="text-subtitle2 q-mb-md">Notes</div>
                    <q-input type="textarea" outlined v-model="props.row.note" class="q-mb-md"/>  
                    <q-popup-edit v-model="props.row.note" title="Note" buttons>
                      <q-input @input="detectChange(props.rowIndex)" type="textarea" outlined v-model="props.row.note" />
                    </q-popup-edit> 
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

    import Tabs from 'components/tab/Tab'
    import {exportFile} from 'quasar'
    import lodash from 'lodash'
    import axios from 'axios'
    import config from '../../../config'

    // Popup draggable functionality I will fix later

    // import Vue from 'vue'
    // import VueDragResize from 'vue-drag-resize'
    // Vue.component('vue-drag-resize', VueDragResize)

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
      components: { Tabs },
      data() {
        return {
          confirm: false,
          loading: true,
          item: '',
          pages: 1,
          pagination: {
            rowsPerPage: 10
          },
          current: 1,
          count: 10,
          
          model: '',
          options: [
            'Preliminary', 'Final'
          ],
          schools: [],
          selectedSchool: null,
          schoolYear: '',
          schoolYears: [
          ],
          isFinal: false,
          filter: '',
          mode: 'list',
          editedIndex: -1,
          editedItem: {

            date: "",
            school: "",
            instruction: "",

            totalInstruction: "",
            familyEngagemenet: "",

            totalInstructionFinal: "",
            familyEngagemenetFinal: "",

            allocation: false,
            pdPercentage: 0,
            notes: "",

          },
          defaultItem: {
            date: "",
            school: "",
            instruction: "",
            profDev: "",
            totalInstruction: "",
            familyEngagemenet: "",
            allocation: ""
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
              name: "instruction", 
              align: "left",
              label: "Instruction", 
              field: "instruction",
              sortable: true
            },
            { 
              name: "profDev", 
              align: "left",
              label: "Professional Development", 
              field: "profDev",
              sortable: true
            },
            { 
              name: "totalInstruction", 
              align: "left",
              label: "Total Instruction", 
              field: "totalInstruction",
              sortable: true
            },
            {
              name: "familyEngagemenet",
              align: "left",
              label: "Family Engagemenet",
              field: "familyEngagemenet",
              sortable: true
            },
            {
              name: 'total',
              align: "left",
              label: "Grand Total",
              field: "total",
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
          addNew: false,
          barInfo: {},
          rowsPerPageArr: ['5', '10', '25', '50', '75', '100'], 
        };
      },
      methods: {
          addRow() {

              let pdPercentage = this.editedItem.pdPercentage,
                  totalInstruction = this.editedItem.totalInstruction,
                  totalInstructionFinal = this.editedItem.totalInstructionFinal,
                  instruction, 
                  profDev, 
                  total, 
                  familyEngagemenetEstimated = this.editedItem.familyEngagemenet,
                  familyEngagemenetFinal = this.editedItem.familyEngagemenetFinal;

                  // Professional development
                  let p_percentage = parseFloat(pdPercentage) / 100;
                  if (this.editedItem.allocation) {
                    profDev = (parseFloat(totalInstructionFinal) * p_percentage).toFixed(2);
                  } else {
                    profDev = (parseFloat(totalInstruction) * p_percentage).toFixed(2);
                  }

                  // instruction
                  let i_percentage = ( 100 - parseFloat(pdPercentage) ) / 100
                  if (this.editedItem.allocation) {
                    instruction = ( parseFloat(totalInstructionFinal) * i_percentage ).toFixed(2);
                  } else {
                    instruction = ( parseFloat(totalInstruction) * i_percentage ).toFixed(2);
                  }

                  // Total
                  if (this.editedItem.allocation) {
                    total = ( parseFloat(totalInstructionFinal) + parseFloat(familyEngagemenetFinal)  ).toFixed(2);
                  } else {
                    total = ( parseFloat(totalInstruction) + parseFloat(familyEngagemenetEstimated)   ).toFixed(2);
                  }
 
              let obj = {
                date: this.editedItem.date,
                school: this.editedItem.school,
                instruction: instruction,
                profDev: profDev,

                totalInstruction: totalInstruction,
                familyEngagemenet: familyEngagemenetEstimated,

                totalInstructionFinal: totalInstructionFinal,
                familyEngagemenetFinal: familyEngagemenetFinal,

                allocation: this.editedItem.allocation,
                pdPercentage: pdPercentage,
                total: total,
                totalPercent: 9,
                notes: this.editedItem.notes,
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
          editItem(item) {
              this.editedIndex = this.data.indexOf(item);
              this.editedItem = Object.assign({}, item);
          },
          close () {
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
            this.getAllocationByType(1, this.count, val)
            
          },
          changeRowsPerPage() {

            console.log('changeRowsPerPage')
            
            this.count = this.pagination.rowsPerPage
            this.current = 1

            this.getAllocationByType(1, this.count, this.current)

          },
          copyRowData(index) {
            oldObject = JSON.stringify(this.tempData[index])
          },
          detectChange(index) {

            this.editedItem = this.tempData[index]
            console.log(this.editedItem)

            let d = JSON.parse(oldObject)
            let f = JSON.stringify(this.data[index])
                f = JSON.parse(f)

            let status = _.isEqual(d, f)
            console.log(status)

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

          // Add new Row 
          addNewRow() {
            
            let date = this.getToday()

            const obj  = {
              creation_date: date,
              school: '',
              total_instruction: 0,
              total_instruction: 0,
              professional_development_percentage: 0,
              family_engagement: 0,
              total: 0,
              status_string: 'Final',
              changed: true,
              showEditButton: false,
              allocation_type: 1,
              note: '',
              add: true,
            }

            this.data.unshift(obj)
            this.editedItem = obj
          
          },

          // Filter key events
          keyUpFilter() {
            console.log('Key up')
            clearTimeout(typingTimer);
            typingTimer = setTimeout(this.doneTyping, doneTypingInterval);
          },
          keyDownFilter() {
            console.log('Key down')
            clearTimeout(typingTimer);
          },
          doneTyping() {
            console.log('Typing done!')
            if(this.filter.length > 1 || this.filter.length == 0) {
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
            url: config.filterAllocation + '1?' + url,
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

              this.loading = false
          })
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
        getSchoolYears() {
          const conf = {
            method: 'GET',
            url: config.getSchoolYears,
            headers: {
              Accept: 'application/json',
            }
          }
          axios(conf).then(res => {

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
        // filterAllocation() {
          
        //   // if(this.schoolYear.id) {

        //   //   this.loading = true
        //   //   const conf = {
        //   //     method: 'GET',
        //   //     url: config.getAllocationByYears + 1 + '/' + this.schoolYear.id ,
        //   //     headers: {
        //   //       Accept: 'application/json',
        //   //     }
        //   //   }

        //   //   axios(conf).then(res => {
        //   //     console.log('getAllocationByYears',  res)
        //   //     let data = res.data.allocations
            
              
        //   //       for(let i=0; i<data.length; i++) {
                  
        //   //         data[i].changed = false
        //   //         data[i].showEditButton = true

        //   //         if(data[i].is_final) {
        //   //           data[i].status_string = 'Final'
        //   //         }
        //   //         else {
        //   //         data[i].status_string = 'Preliminary'
        //   //         }

        //   //       }

        //   //       this.data = data
        //   //       this.tempData = data
              

        //   //       this.loading = false
        //   //   })
        //   // }
          
        // },
        filterAllocationsBySchoolName() {

        },

        editAllocation(index) {

          const data  = {
            is_final:  this.editedItem.status_string == 'Final' ? true : false,
            creation_date: this.editedItem.creation_date,
            total_instruction: parseFloat(this.editedItem.total_instruction),
            professional_development_percentage: parseFloat(this.editedItem.professional_development_percentage),
            family_engagement: parseFloat(this.editedItem.family_engagement),
            note: this.editedItem.note,
            allocation_type: parseInt(this.editedItem.allocation_type)
          }

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
            const index = this.data.indexOf(item)
            this.data.splice(index, 1)
              this.$q.notify({
                message: res.data,
                type: 'positive',
              })
          })

        },
        addSchoolNameToObject() {
          this.editedItem.school_name = this.selectedSchool.label
          console.log(this.editedItem)
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
        }
        
      },
      created() {

        // Get schools for showing
        this.getSchools()
        this.getAllocationBar(1)
        this.getAllocationByType(1, this.count, this.current)
        this.getSchoolYears()

      },
      computed: {
        titleHeader() {
          let title = '';

          this.schoolYear == '' 
            ? title = this.schoolYears[0] && this.schoolYears[0].value
            : title = this.schoolYear.value
          return 'Title I - ' + title
        }
      }
    }
</script>

<style lang="scss" scoped>

.q-pr-sm {
  @media (max-width: 599px) {
    padding-right: 0
  }
}

</style>