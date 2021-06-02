<template>
  <div class="q-pa-sm q-mt-sm q-gutter-sm">

    <div class="edx-header-parent">
      <span class="edx-header-text">{{ titleHeader }}</span>
    </div>

    <q-table
      class="overflow-auto my-sticky-column-table"
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
        <!-- <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" 
            dense outlines 
            v-model="schoolYear" 
            :options="schoolYears" 
            label="School year" 
            @input="filterAllocation"
          >
            <template v-if="schoolYear" v-slot:append>
              <q-icon name="cancel" @click.stop="schoolYear = '', filterAllocation()" class="cursor-pointer" />
            </template>

          </q-select> -->

        <q-input
          label="Search"
          class="q-mr-md"
          outlines
          dense
          v-model="filter"
          @keyup="keyUpFilter"
          @keydown="keyDownFilter"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
<!-- 
        <q-select
          class="q-mr-md"
          style="min-width: 200px; max-width: 200px"
          dense
          outlines
          v-model="model"
          :options="options"
          label="Status"
          @input="filterAllocation"
        >
          <template v-if="model" v-slot:append>
            <q-icon
              name="cancel"
              @click.stop="model = '', filterAllocation()"
              class="cursor-pointer"
            />
          </template>
        </q-select> -->

        <q-btn
          square
          class="q-mr-md edx-add-btn"
          text-color="white"
          icon="add"
          @click="isEditAllocation=false, openAllocationModal(data[0], 0)"
          no-caps
          >Add</q-btn
        >

        <q-btn
            round 
            icon="mdi-file-excel-box"
            size="10px"
            class="edx-excel-btn" text-color="white"
            no-caps
            @click="exportTable"
        >
            <q-tooltip content-class="edx-tooltip">Export to Excel</q-tooltip>
        </q-btn>

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
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm">Are you sure to delete this item?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="No, thanks" color="primary" v-close-popup />
                <q-btn
                  label="Yes"
                  color="edx-delete-btn"
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
          @click="isEditAllocation=true, openAllocationModal(props.row, props.rowIndex)"
          :props="props"
          class="cursor-pointer"
        >
        
          <q-td key="creation_date" :props="props">
            <div v-if="props.row[0]" class="cursor-pointer">
              {{ props.row[0].creation_date }}
            </div>
          </q-td>

          <q-td key="school" :props="props">
            <div class="text-pre-wrap cursor-pointer">
              {{ props.row.school.label }}
            </div>
          </q-td>

          <!-- ########## -->

          <q-td v-for="i in props.row" :key="i.edxName" :props="props">
            <div>
              {{i.amount}}
            </div>
          </q-td>

          <!-- ########## -->

          <q-td key="status" :props="props">
            <q-chip square class="cursor-pointer edx-white" :class="props.row.status.id == 1 ? 'edx-bg-green' : 'edx-delete-btn' ">
              {{props.row.status.abbr}}

              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <strong>{{props.row.status.label}}</strong>
              </q-tooltip>
            </q-chip>
          </q-td>

          <q-td key="actions" :props="props" style="min-width: 132px">
            <q-fab padding="xs" @click.stop color="edx-action-btn" icon="toc" active-icon="menu_open"  direction="left">
                            
                <q-fab-action
                    icon="delete_forever"
                    color="edx-delete-btn" 
                    size=sm 
                    no-caps
                    round
                    @click="openDeleteModal(props.row)" 
                >
                    <q-tooltip 
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                        <strong>Delete</strong>
                    </q-tooltip>
                </q-fab-action>

            </q-fab>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:bottom class="justify-end">
        <div class="q-pa-md flex flex-center">
          <q-pagination
            v-model="current"
            :max="pages"
            :direction-links="true"
            @click="changePagination(current)"
            color="edx-pagination"
          >
          </q-pagination>

          <div class="row justify-center items-center">
            <span class="q-mr-md">Rows Per page</span>
            <q-select
              dense
              outlined
              @input="changeRowsPerPage"
              v-model="pagination.rowsPerPage"
              :options="rowsPerPageArr"
            />
          </div>
        </div>
      </template>

    </q-table>

    <dialog-draggable
      :width="800"
      :modelDialog="showAllocationModal"
      :title="'Allocation'"
      @onHide="showAllocationModal=false"
      :icon="'text_format'"
    >
      <q-card-section style="max-height: 70vh" class="scroll">
        <div class="row">
          <div class="col-6">
            <div class="q-mb-md">
              <div class="text-subtitle2 q-mb-sm">School</div>
              <div v-if="isEditAllocation">{{ editedItem.school.label }}</div>
              <q-select
                v-else
                outlined
                dense
                v-model="editedItem.school"
                :options="schools"
              />
            </div>
          </div>

          <div class="col-md-6 q-pl-lg">
            <div class="q-mb-md">
              <div class="text-subtitle2 q-mb-sm">Status</div>
              Preliminary  <q-toggle v-model="isFinal" :label="`Final`"/>
              <!-- <q-select
                v-if="editedItem.final"
                outlined
                dense
                v-model="editedItem.final"
                :options="options"
              /> -->
            </div>
          </div>


          <!-- ##### -->
          <!-- ##### -->
          <!-- ##### -->

          <div
            v-for="i in editedItem"
            :key="i.edxName"
            class="q-mb-md col-md-4 q-pr-lg"
            
          >

            <div v-if="i.allocationFundTemplateId">

              <div class="text-subtitle2 q-mb-sm">{{ i.edxName }} </div>
              
              <!-- {{i.allocationFundTemplateId}} -->
              
              <div v-if=" i.isInput == '1' ">
                    
                <q-input
                  prefix="$"
                  v-model="i.amount"
                  @input="calculateAllocations(i, editedItem)"
                  outlined
                  dense
                />

              </div>

              <div v-if=" i.is_percentage == '1' && i.additionalCheck == '0' ">

                <q-input
                  prefix="$"
                  v-model="i.amount"
                  outlined
                  dense
                  readonly
                  class="q-mb-sm"
                  
                />
                <q-input
                  prefix="%"
                  v-model="i.percentage"
                  
                  outlined
                  dense
                  @input="calculateAllocations(i, editedItem)"
                  type="number"
                  :hint="`Min ${i.min_percentage}%, Max ${i.max_percentage}%`"
                  :rules="[ 
                    val => val >= i.min_percentage || `Min ${i.min_percentage}%`,
                    val => val <= i.max_percentage || `Max ${i.max_percentage}%`
                  ]"
                />

              </div>

              <div v-if=" i.is_percentage == '1' && i.additionalCheck == '1' ">

                <q-input
                  prefix="$"
                  v-model="i.amount"
                  outlined
                  dense
                  readonly
                  class="q-mb-sm"
                />
                <q-input
                  prefix="%"
                  v-model="i.percentage"
                  outlined
                  dense
                  
                  @input="calculateAllocations(i, editedItem)"
                  type="number"
                  :hint="`Min ${i.min_percentage}%, Max ${i.max_percentage}%`"
                  :rules="[ 
                    val => val >= i.min_percentage || `Min ${i.min_percentage}%`,
                    val => val <= i.max_percentage || `Max ${i.max_percentage}%`
                  ]"
                />

              </div>

              <div v-if="i.rule_input && i.rule_input.length > 1 && i.isInput != '1' && i.additionalCheck != '1'">
              
                <q-input
                  prefix="$"
                  v-model="i.amount"
                  outlined
                  dense
                  readonly
                />
                
              </div>

            </div>
          </div>

          <div class="col-md-12">
            <div class="text-subtitle2 q-mb-sm">Note</div>
            <q-input ref="r" outlined v-model="editedItem.note" dense type="textarea" />
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="row justify-end">
        <div>
          <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
          <q-btn
            :disable='validate'
            v-if="!isEditAllocation"
            flat
            label="Confirm"
            color="primary"
            @click="editAllocation"
            :loading="btnLoading"
          ></q-btn>
          <q-btn
            :disable='validate'
            v-else
            flat
            label="Save"
            color="primary"
            :loading="btnLoading"
            @click="editAllocation"
          ></q-btn>
        </div>
      </q-card-actions>
    </dialog-draggable>

  </div>
</template>

<script>

import {exportFile} from 'quasar'
import axios from 'axios'
import config from '../../../config'
import DialogDraggable from '../../components/DialogDraggable.vue';

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

let typingTimer
let doneTypingInterval = 500

export default {
    components: {
        DialogDraggable,
    },
    props: {
        title: {
            required: true,
            default: 1
        }
    },
    data() {
        return {
          titleId: 1,
          btnLoading: false,
          //
          confirm: false,
          loading: false,
          item: '',
          pages: 1,
          pagination: {
            rowsPerPage: 10
          },
          current: 1,
          count: 10,

          //
          showAllocationModal: false,
          index: 0,
          oneTime: true,
          isEditAllocation: false,

          model: '',
          // options: [
          //     {
          //       id: 0,
          //       label: 'Preliminary'
          //     },
          //     {
          //       id: 1,
          //       label: 'Final'
          //     },
          // ],
          isFinal: false,

          schools: [],
          selectedSchool: null,
          schoolYear: '',
          schoolYears: [
          ],
          isFinal: false,
          filter: '',
          mode: 'list',
          editedIndex: -1,

          editedItem: {},
          tempEditedItem: 0,

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
            // ----------------
            // {
            //   name: "profDev",
            //   align: "left",
            //   label: "Professional Development",
            //   field: "profDev",
            //   sortable: true,
            //   headerClasses: 'hidden'
            // },
            // {
            //   name: "familyEngagemenet",
            //   align: "left",
            //   label: "Family Engagement",
            //   field: "familyEngagemenet",
            //   sortable: true,
            //   headerClasses: 'hidden'
            // },
            // {
            //   name: "instruction",
            //   align: "left",
            //   label: "Instruction",
            //   field: "instruction",
            //   sortable: true,
            //   headerClasses: 'hidden'
            // },
            // -------------------
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
          barInfo: {},
          rowsPerPageArr: ['5', '10', '25', '50', '75', '100'],
        };
    },
    methods: {

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

        // console.log('change pagination')
        this.current = val
        this.getAllocationByType(this.title, this.count, val)

      },
      changeRowsPerPage() {

        // console.log('changeRowsPerPage')

        this.count = this.pagination.rowsPerPage
        this.current = 1

        this.getAllocationByType(this.title, this.count, this.current)

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

        let model = '', 
        url = '';

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
        url: `${config.filterAllocation}/${this.title}?${url}`,
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

        // this.data = data
        // this.tempData = data

        // console.log('Filter result: ', res.data)
        })

      },
      // ##############################
      // ##############################
      // ##############################
      // ##############################
      // ##############################

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
              let fArr= []

              for(let i=0; i<data.length; i++) {

                let parentObj = {}, startNumber = 2;

                data[i] = data[i].sort((a, b) => (a.order > b.order) ? 1 : -1)


                // console.log('DATA DATA DATA ', data[i])

                for(let j=0; j<data[i].length; j++) {

                    // Spliced Name
                    const edxName = data[i][j].templateName
                    data[i][j].edxName = edxName

                    

                    if(parseInt(data[i][j].hasRule) == 1 ) {
                      // if(data[i][j].rule_input) {
                        const ruleInput = data[i][j].rule_input.split(',')
                        data[i][j].rule_input = ruleInput
                      // }
                    }

                    // console.log('EDX name', data[i][j].edxName)

                    parentObj[j] = data[i][j]

                    if(i == 0 && this.oneTime) {

                      let obj = {
                          name: edxName,
                          align: "left",
                          label: data[i][j].edxName,
                          field: edxName,
                          sortable: false
                      }

                      // console.log('column obj = ', obj)

                      this.columns.splice(startNumber, 0, obj);
                      startNumber++

                    }

                }

          
                parentObj.id = data[i][0].allocationId
                // parentObj.id = i+1
                parentObj.changed = false
                parentObj.add = false
                parentObj.showEditButton = true
                // parentObj.allocationTypeId = data[i][0].allocation_id
                

                if(data[i][0].final == '1') {

                  parentObj.final = true
                  parentObj.status = {
                    id: 1,
                    label: "Final",
                    abbr: "FN"
                  }

                }else {
                  parentObj.final = false
                  parentObj.status = {
                    id: 0,
                    label: "Preliminary",
                    abbr: "PR"
                  }
                }

                parentObj.school = {
                    id: data[i][0].schoolId,
                    label: data[i][0].schoolName
                }

                parentObj.note = data[i][0].note || ''

                fArr.push(parentObj)

              }

              this.oneTime = false

              this.data = fArr
              this.tempData = fArr

              this.loading = false
              console.log('fArr=======', fArr)

          })
      },


      calculateAllocations(i, arr) {

        let isInputArr = [],
            ruleInputArr = [],
            isPercentageArr = [];

        for(let i in arr) {
          if(arr[i].allocationFundTemplateId) {

            if(arr[i].isInput == '1') {
              if(arr[i].amount == '') {
                arr[i].amount = 0
              }
              isInputArr.push(arr[i])
            }

            if(arr[i].is_percentage == '1' ) {
              // && arr[i].additionalCheck == '0'

              if(arr[i].percentage == '') {
                arr[i].percentage = 0
              }

              // if(arr[i].percentage > arr[i].max_percentage) {
              //   arr[i].percentage = arr[i].max_percentage
              //   this.$refs.r.$el.click()
              // }

              // if(arr[i].percentage < arr[i].min_percentage) {
              //   arr[i].percentage = arr[i].min_percentage
              //   this.$refs.r.$el.click()
              // }

              isPercentageArr.push(arr[i])
            }

            if(arr[i].rule_input && arr[i].rule_input.length > 1) {
              ruleInputArr.push(arr[i])
            }

            if(arr[i].additionalCheck == '1' && arr[i].isInput == '1') {
              ruleInputArr.push(arr[i])
            }

          }
        }

        let finalArr = [isInputArr, ruleInputArr, isPercentageArr]
        finalArr = finalArr.flat(Infinity)


        for(let i=0; i<finalArr.length; i++) {

          if(finalArr[i].isInput == '0') {

            if(finalArr[i].is_percentage == '1' && finalArr[i].additionalCheck == '0') {

              let count = 0;
              let id = finalArr[i].rule_input[0]
              let item = finalArr.filter(x => x.allocationFundTemplateId == id);

              count =  ( item[0].amount * finalArr[i].percentage ) / 100
              finalArr[i].amount = count.toFixed(2)

            }

            setTimeout(()=>{

              if(finalArr[i].additionalCheck == '1') {

                let amountArr = [];
                let count = 0;

                for(let j=0; j<finalArr[i].rule_input.length; j++) {
                  let item = finalArr.filter(x => x.allocationFundTemplateId == finalArr[i].rule_input[j]);
                  amountArr.push( parseFloat(item[0].amount) )
                }

                if(finalArr[i].is_addition == '1') {
                  // ++++ is_addition
                  count = amountArr.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
                  // console.log('+++++', amountArr, count)
                }

                if(finalArr[i].is_subtraction == '1') {
                  // ----  is_subtraction
                  count = amountArr.reduce((a, b) => parseFloat(a) - parseFloat(b))
                  // console.log('-----', amountArr, count)
                }

                count =  ( count * finalArr[i].percentage ) / 100
                finalArr[i].amount = count.toFixed(2)

              }

            }, 100)


            setTimeout(()=>{

              if(finalArr[i].rule_input && finalArr[i].rule_input.length > 1 && finalArr[i].additionalCheck == '0') {

                let amountArr = [];
                let count = 0;

                for(let j=0; j<finalArr[i].rule_input.length; j++) {
                  let item = finalArr.filter(x => x.allocationFundTemplateId == finalArr[i].rule_input[j]);
                  amountArr.push( parseFloat(item[0].amount) )
                }

                if(finalArr[i].is_addition == '1') {
                  // ++++ is_addition
                  count = amountArr.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
                  // console.log('+++++', amountArr, count)
                }

                if(finalArr[i].is_subtraction == '1') {
                  // ----  is_subtraction
                  count = amountArr.reduce((a, b) => parseFloat(a) - parseFloat(b))
                  // console.log('-----', amountArr, count)
                }

                finalArr[i].amount = count.toFixed(2)

              }

            }, 200)

          }

        }

        this.data = [...this.data]

      },

      getSchools() {

          const conf = {
          method: 'GET',
          url: config.getSchools + '?limit=' + 500 + '&page=' + 1,
          headers: {
              Accept: 'application/json',
          }
          }

          axios(conf).then(res => {

          let schoolsArr = []
          for(let i=0; i<res.data.schools.length; i++) {

              let obj = {
              id: res.data.schools[i].id,
              label: res.data.schools[i].name
              }

              schoolsArr.push(obj)

          }

          this.schools = schoolsArr

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
          })
      },
      filterAllocationsBySchoolName() {

      },

      editAllocation() {

        this.btnLoading = true

        console.log('row = ', this.editedItem)


          const data  = {

            token: localStorage.getItem('access-token'),

            school_id: this.editedItem.school.id,
            status_id:  this.isFinal ? 1 : 0,
            note: this.editedItem.note,
            allocation_type_id: parseInt(this.title),

          }

          let arr = []

          for(let i in this.editedItem) {
            if(this.editedItem[i].allocationFundTemplateId) {

              // percentgage
              let obj = {

                id: this.editedItem[i].allocationFundTemplateId,
                value: this.editedItem[i].amount,
                fundId: this.editedItem[i].fundId

              }

              if(this.editedItem[i].percentage){
                obj.percentage = this.editedItem[i].percentage
              }

              arr.push(obj)
            }
          }

          data.values = arr

          if(this.isEditAllocation) {
     
            const conf = {
              method: 'PUT',
              url: `${config.addAllocation}/${this.editedItem.id}`,
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

                this.showAllocationModal = false
                this.getAllocationByType(this.titleId, this.count, this.current)

                this.btnLoading = false

              })
              .catch(err => {
                this.btnLoading = false
              })


          }else {

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

                this.showAllocationModal = false
                this.getAllocationByType(this.titleId, this.count, this.current)

              this.btnLoading = false

              })
              .catch(err => {
                this.btnLoading = false
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

      getTemplate() {

          const conf = {
          method: 'GET',
          url: config.getTemplates + this.titleId,
          headers: {
              Accept: 'application/json',
          }
          }

          axios(conf).then(res => {
          const logic = res.data.category.reverse()

          for(let i=0; i<logic.length; i++) {

              console.log('@@@@')
              console.log(logic[i])
              console.log('@@@@')

          }
          })

      },

      allocationCalculation(ids, index, parsingBool) {

          if(ids != undefined) {

          let idArr = ids.split(',');
          let data = this.data[index];
          let count = 0;

          for (const i in data) {
              if(idArr.includes(data[i]['allocationFundTemplateId'])) {
              count += parseFloat(data[i]['amount'])
              if(parsingBool) {
                  console.log('LLLL', this.editedItem[index])
                  this.editedItem[index].amount = count
              }
              }
          }



          return count.toFixed(2)

          }
      },

      // allocationAnotherPercentageCalculation(ids, percentage, index, parsingBool) {

      //     let data = this.data[index];
      //     let count = 0;

      //     for (const i in data) {
      //     if( parseInt(ids) == parseInt(data[i]['allocationFundTemplateId']) ) {
      //         count = (parseFloat(data[i]['amount']) * percentage) / 100
      //         if(parsingBool) {
      //         console.log('JJJJ', this.editedItem[index])
      //         this.editedItem[index].amount = count
      //         }
      //     }
      //     }



      //     return count.toFixed(2)

      // },
      // d(percentage) {
      //     console.log(percentage)
      //     this.editedItem.a = 0
      //     console.log(this.editedItem)
      // },

      //
      openAllocationModal(row, index) {

          this.index = index
          this.editedItem = {...row}
          this.showAllocationModal = true
          this.isFinal = this.editedItem.final

      }

    },
    watch: {
      showAllocationModal() {
          console.log(this.editedItem)
      },
      editedItem() {
          console.log(this.editedItem)
      }
    },
    created() {
      this.titleId = this.title
      // Get schools for showing
      this.getSchools()
      // this.getAllocationBar(1)
      this.getAllocationByType(this.titleId, this.count, this.current)
      this.getSchoolYears()
      // this.getTemplate()
    },
    computed: {
      titleHeader() {
          let title = '';

          this.schoolYear == ''
          ? title = this.schoolYears[0] && this.schoolYears[0].value
          : title = this.schoolYear.value


          let rNum = ''

          switch(this.title) {
            case 1:
              rNum = 'Title I -';
              break;
            case 2:
              rNum = 'Title II -';
              break;
            case 3:
              rNum = 'Title III -';
              break;
            case 4:
              rNum = 'Title IV -';
              break;
            case 5:
              rNum = 'ESSER -';
              break;
            case 6:
              rNum = 'GEER -';
              break;
          }

          return `${rNum} ${title}`
      },
      validate() {

        let arr = []

        for(const i in this.editedItem) {
          if(this.editedItem[i].allocationFundTemplateId) {
            let p = this.editedItem[i].percentage

            let mnp = this.editedItem[i].min_percentage
            let mxp = this.editedItem[i].max_percentage



            if(p == '') {
              p = -1
            }
            
            if(p) {
              if(parseFloat(p) < parseFloat(mnp) ||  parseFloat(p) > parseFloat(mxp)) {
                arr.push(true)
              }else {
                arr.push(false)
              }
            }
          }
        }

        let x = false

        console.log(arr, 'arrarrarrarr')

        for(let i=0; i<arr.length; i++) {
          console.log('doc = ', arr[i])
          if(arr[i] == true) {
            // return true
            x = true
            break
          }
        }

        if(x) {
          return true
        }else {
          return false
        }

      }
    },
    watch: {
      data() {
        // console.log('changed')
      }
    }
}
</script>

<style lang="scss">
.q-pr-sm {
  @media (max-width: 599px) {
    padding-right: 0;
  }
}

.hidden {
  display: none !important;
}
</style>
