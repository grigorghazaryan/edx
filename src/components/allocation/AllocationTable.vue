<template>
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

          <q-btn square class="q-mr-md edx-bg-purple" text-color="white" icon="add" 
          @click="openAllocationModal(data[0], 0)" no-caps>Add</q-btn>
          
          <q-btn
            icon-right="archive"
            label="Export to Excel"
            class="edx-bg-green" text-color="white"
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

            <q-tr @click="isEditAllocation=true, openAllocationModal(props.row, props.rowIndex)" :props="props" class="cursor-pointer">

              <q-td key="creation_date" :props="props">
                
                <div class="cursor-pointer">
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

                <div v-if="i.percentage == null">
                  {{i.amount}}
                  <!-- <div>{{ allocationCalculation(i.rule_input, props.rowIndex) }}</div> -->
                </div>

                <div v-else-if="i.anotherPercentage">
                  {{i.amount}}
                  <!-- <div>{{ allocationAnotherPercentageCalculation(i.rule_input, i.percentage, props.rowIndex, true) }}</div> -->
                </div>

                <div v-else>
                  else
                  <!-- <div>{{ (i.amount * i.percentage) / 100 }}</div> -->
                </div>

              </q-td>

              <!-- ########## -->
              
              <q-td key="status" :props="props">

                <q-chip square class="cursor-pointer edx-bg-purple" text-color="white">
                  {{props.row.final.shortName}}
                  <q-tooltip 
                      anchor="top middle" self="bottom middle" :offset="[10, 10]"
                      transition-show="flip-right"
                      transition-hide="flip-left"
                  >
                    <strong>{{props.row.final.label}}</strong>
                  </q-tooltip>
                </q-chip>

              </q-td>
              
              <q-td key="actions" :props="props" style="min-width: 132px">

                  <div v-if="props.row.changed">
                    <q-btn
                      @click="cancellChange(props.rowIndex)"
                      icon="cancel"
                      text-color="white" 
                      class="q-mr-sm edx-bg-orange"
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
                      text-color="white" 
                      class="q-mr-sm edx-bg-green"
                      icon="save"
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
                      text-color="white" 
                      class="q-mr-sm edx-bg-red"
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

        </template>

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

        <dialog-draggable 
            :width="800" 
            :modelDialog="showAllocationModal" 
            :title="'Allocation'" 
            @onHide="showAllocationModal=false"
            :icon="'text_format'"
            :color="'green'"
        >  
            <q-card-section
                style="max-height: 70vh"
                class="scroll"
            >
                <div class="row">

                    <div class="col-6">

                      <div class="q-mb-md">
                        <div class="text-subtitle2 q-mb-sm">School</div>
                        <q-select
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
                        <q-select
                          v-if="editedItem.final"
                          outlined
                          dense
                          v-model="editedItem.final"
                          :options="options"
                        />
                      </div>

                      

                    </div>

                    <div v-for="i in editedItem" :key="i.edxName" class="q-mb-md col-md-4 q-pr-lg">
                      <div v-if="i.allocationFundTemplateId">
                        <div class="text-subtitle2 q-mb-sm">{{ i.rule_name }}</div>

                        <div v-if="i.percentage == null">
                          <q-input 
                            readonly 
                            prefix="$"
                            :value="allocationCalculation(i.rule_input, index, true)" 
                            outlined 
                            dense
                          />
                        </div>

                        <div v-else-if="i.anotherPercentage">
                          <q-input 
                            prefix="$" 
                            class="q-mb-sm" 
                            readonly 
                            :value="allocationAnotherPercentageCalculation(i.rule_input, i.percentage, index, true)" 
                            outlined 
                            dense
                          />
                          
                          <q-input 
                            prefix="%" 
                            class="q-mb-md" 
                            outlined 
                            type="number" 
                            v-model="i.percentage"
                            @input="d(i.percentage)"
                            dense 
                            autofocus 
                          />
                        </div>

                        <div v-else>
                          <q-input prefix="$" class="q-mb-sm" readonly outlined type="text" :value="(i.amount * i.percentage) / 100" dense autofocus />
                          <q-input prefix="%" class="q-mb-md" outlined type="text" v-model="i.percentage" dense autofocus />
                        </div>

                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="text-subtitle2 q-mb-sm">Note</div>
                      <q-input outlined v-model="editedItem.note"  dense type="textarea" />
                    </div>

                      

                </div>
            </q-card-section>

            <q-card-actions class="row justify-end">
                <div>
                    <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
                    <q-btn v-if="!isEditAllocation" flat label="Confirm" color="primary" @click="editAllocation"></q-btn>
                    <q-btn v-else flat label="Save" color="primary"  @click="editAllocation"></q-btn>
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
          options: [
              {
                id: 0,
                label: 'Preliminary'
              },
              {
                id: 1,
                label: 'Final'
              },
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

        // this.data = data
        // this.tempData = data
        
        // console.log('Filter result: ', res.data)
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
            let fArr= []

            for(let i=0; i<data.length; i++) {

            let parentObj = {}, startNumber = 2;

            for(let j=0; j<data[i].length; j++) {
                
                // Spliced Name
                const edxName = data[i][j].rule_name.replace(/\s/g, '')
                data[i][j].edxName = edxName

                // If another allocation percenatage count needed
                const ruleInput = data[i][j].rule_input.split(',')

                if(ruleInput.length == 1 && data[i][j].percentage != null) {
                data[i][j].anotherPercentage = true

                // console.log('parsing time', data[i][j])
                // console.log('percentage = ', data[i][j].percentage)
                // console.log('id which percentage I will ', ruleInput[0])
                // console.log('my id', data[i][j].allocationFundTemplateId)

                for (const t in data[i]) {
                    if(ruleInput[0] == data[i][t]['allocationFundTemplateId']) {
                    data[i][j].amount = (data[i][t]['amount'] * data[i][j].percentage) / 100
                    }
                }
                
                }

                if(ruleInput.length > 1 && data[i][j].percentage == null) {
                let c = 0;
                for (const t in data[i]) {
                    if(ruleInput.includes(data[i][t]['allocationFundTemplateId'])) {
                    c += parseFloat(data[i][t]['amount'])
                    }
                }
                data[i][j].amount = c.toFixed(2)
                }

                parentObj[j] = data[i][j]

                if(i == 0 && this.oneTime) {

                let obj = { 
                    name: edxName, 
                    align: "left",
                    label: data[i][j].rule_name, 
                    field: edxName,
                    sortable: true
                }

                this.columns.splice(startNumber, 0, obj);
                startNumber++
                
                }

            }

            parentObj.id=i+1
            parentObj.changed = false
            parentObj.add = false
            parentObj.showEditButton = true

            if(data[i][0].final) {
                parentObj.final = {
                id: 1,
                label: 'Final',
                shortName: 'FN',
                }
            }else {
                parentObj.final = {
                id: 0,
                label: 'Preliminary',
                shortName: 'PR'
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
            console.log('fArr', fArr)

        })
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

        console.log('this.editedItem', this.editedItem)
        console.log('this.editedItem temp', this.tempEditedItem)


        // const data  = {
        //   is_final:  this.editedItem.status_string == 'Final' ? true : false,
        //   creation_date: this.editedItem.creation_date,
        //   total_instruction: parseFloat(this.editedItem.total_instruction),
        //   professional_development_percentage: parseFloat(this.editedItem.professional_development_percentage),
        //   family_engagement: parseFloat(this.editedItem.family_engagement),
        //   note: this.editedItem.note,
        //   allocation_type: parseInt(this.editedItem.allocation_type)
        // }

        // if(this.isEditAllocation) {

        //   data.school_id = this.selectedSchool.id

        //   const conf = {
        //     method: 'POST',
        //     url: config.addAllocation,
        //     headers: {
        //       Accept: 'application/json',
        //     },
        //     data: data
        //   }

        //   axios(conf)
        //     .then(res => {

        //       this.$q.notify({
        //         message: 'Allocation Added successfully!',
        //         type: 'positive',
        //       })

        //       this.data[index].changed = false
        //       this.data[index].showEditButton = true
        //       this.data[index].id = res.data.id
        //       this.data[index].add = false

        //       let school = {
        //         school_name: this.selectedSchool.label
        //       }

        //       this.data[index].school = school
        //       this.addNew = false
        //     })

        // } else {
        
        //   this.data[index].changed = false

        //   const conf = {
        //     method: 'PUT',
        //     url: config.getAllocationByTitle + this.editedItem.id,
        //     headers: {
        //       Accept: 'application/json',
        //     },
        //     data: data
        //   }

        //   axios(conf)
        //     .then(res => {
        //       this.$q.notify({
        //         message: 'Allocation updated successfully!',
        //         type: 'positive',
        //       })
        //     })
        // }

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
    allocationAnotherPercentageCalculation(ids, percentage, index, parsingBool) {

        let data = this.data[index];
        let count = 0;

        for (const i in data) {
        if( parseInt(ids) == parseInt(data[i]['allocationFundTemplateId']) ) {
            count = (parseFloat(data[i]['amount']) * percentage) / 100
            if(parsingBool) {
            console.log('JJJJ', this.editedItem[index])
            this.editedItem[index].amount = count
            }
        }
        }


        
        return count.toFixed(2)

    },
    d(percentage) {
        console.log(percentage)
        this.editedItem.a = 0
        console.log(this.editedItem)
    },

    //
    openAllocationModal(row, index) {
        
        this.index = index
        this.editedItem = {...row}
        this.showAllocationModal = true
        
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
        return 'Title I - ' + title
    },
    }
}
</script>

<style lang="scss">

.q-pr-sm {
  @media (max-width: 599px) {
    padding-right: 0
  }
}

.hidden {
  display: none !important
}

</style>