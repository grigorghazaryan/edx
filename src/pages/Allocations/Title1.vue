<template>
  <q-page class="q-pa-sm">  

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Allocations"/>
        <q-breadcrumbs-el label="Title I"/>
      </q-breadcrumbs>
    </div>

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
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ instruction }}</q-item-label>
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
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ pd }}</q-item-label>
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
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ totalInstruction }}</q-item-label>
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
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ totalEngagement }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="search" color="pink" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Final/Est Ratio (+/-)</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">% 1.04</q-item-label>
              </q-item-section>
            </q-item>
          </div>

        </div>
      </q-card-section>
    </q-card>

    <div class="q-pa-sm q-mt-sm q-gutter-sm">
      <q-table
        title="Title I" 
        :data="data"
        :columns="columns"
        :filter="filter"
        row-key="id" 
        :loading="loading"
        binary-state-sort
      >
        <!-- Loading -->
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>

        <!-- Table Header -->
        <template v-slot:top-right="props">

          <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" dense outlines clearable v-model="schoolYear" :options="schoolYears" label="School year" @input="filterAllocation"/>

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
              <!-- <vue-drag-resize :isResizable="false" :w="650" :h="710"> -->
              
                <q-card>
                  <q-card-section>
                    <div class="text-h6">Create</div>
                  </q-card-section>

                  <!-- MODAL -->
                  <q-card-section>
                    <div class="row">

                      <div class="col-sm-6 col-xs-12 q-mb-sm q-pr-sm">
                        <q-input outlined v-model="editedItem.school" label="School" />
                      </div>

                      <div class="col-sm-6 col-xs-12">
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

                      <div class="col-md-12 q-mt-md">
                        <p>Preliminary Allocations</p>
                      </div>

                      <div class="col-sm-6 col-xs-12 q-pr-sm">
                        <q-input :disable="editedItem.allocation" outlined v-model="editedItem.totalInstruction" label="Total Instruction" />
                      </div>

                      <div class="col-sm-6 col-xs-12">
                        <q-input :disable="editedItem.allocation" outlined v-model="editedItem.familyEngagemenet" label="Family Engagemenet" />
                      </div>

                      <div class="col-md-12 q-mt-md">
                        <p>Final Allocations</p>
                      </div>

                      <div class="col-sm-6 col-xs-12 q-pr-sm">
                        <q-input :disable="!editedItem.allocation" outlined v-model="editedItem.totalInstructionFinal" label="Total Instruction" />
                      </div>

                      <div class="col-sm-6 col-xs-12">
                        <q-input :disable="!editedItem.allocation" outlined v-model="editedItem.familyEngagemenetFinal" label="Family Engagemenet" />
                      </div>

                      <div class="col-md-12 q-mt-md q-mb-md">
                        <div class="q-gutter-sm text-right">
                          <q-checkbox v-model="editedItem.allocation" label="Allocation is Final" />
                        </div>
                      </div>

                      <div class="col-sm-6 col-xs-12 q-mb-sm"></div>

                      <div class="col-sm-6 col-xs-12 q-mb-sm">
                        <q-input outlined label="PD Percentage %" v-model="editedItem.pdPercentage" />
                      </div>

                      <div class="col-md-12">
                        <q-input type="textarea" outlined v-model="editedItem.notes" label="Notes" />
                      </div>
                    
                    </div>
                  </q-card-section>
                
                  <q-card-actions align="right">
                    <q-btn flat label="Confirm" color="primary" v-close-popup @click="addRow"></q-btn>
                  </q-card-actions>

                </q-card>

              <!-- </vue-drag-resize> -->
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

              <q-td key="date" :props="props">
                
                <div class="cursor-pointer">
                  {{ props.row.date }}
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date v-model="props.row.date" @input="detectChange(props.rowIndex)">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn label="Cancel" color="primary" flat v-close-popup />
                        <q-btn label="OK" color="primary" flat v-close-popup />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </div>

              </q-td>
              
              <q-td key="school" :props="props">
                <div class="text-pre-wrap cursor-pointer">{{ props.row.school }}</div>
                <q-popup-edit v-model="props.row.school" title="School" buttons>
                  <q-input  @input="detectChange(props.rowIndex)" type="text" v-model="props.row.school" dense autofocus/>
                </q-popup-edit>
              </q-td>

              <q-td key="instruction" :props="props">
                $ {{ props.row.instruction }}
              </q-td>

              <q-td key="profDev" :props="props">
                <div class="cursor-pointer">$ {{ props.row.profDev }}</div>
                <q-popup-edit v-model="props.row.profDev" title="Professional Development" buttons>
                  <q-input  @input="detectChange(props.rowIndex)" type="number" v-model="props.row.profDev" dense autofocus/>
                </q-popup-edit>
              </q-td>
              
              <q-td key="totalInstruction" :props="props">

                <div class="cursor-pointer" v-if="props.row.allocation">$ {{ props.row.totalInstructionFinal }} </div>
                <div class="cursor-pointer" v-else> $ {{ props.row.totalInstruction }} </div>

                <q-popup-edit v-if="props.row.allocation" v-model="props.row.totalInstructionFinal" title="Total Instruction" buttons>
                  <q-input  @input="detectChange(props.rowIndex)" type="number" v-model="props.row.totalInstructionFinal" dense autofocus/>
                  <q-input  @input="detectChange(props.rowIndex)" class="q-mt-md"  label="PD Percentage %" v-model="props.row.pdPercentage" />
                </q-popup-edit>
                <q-popup-edit v-else v-model="props.row.totalInstruction" title="Total Instruction" buttons>
                  <q-input  @input="detectChange(props.rowIndex)" type="number" v-model="props.row.totalInstruction" dense autofocus/>
                  <q-input  @input="detectChange(props.rowIndex)" class="q-mt-md"  label="PD Percentage %" v-model="props.row.pdPercentage" />
                </q-popup-edit>

              </q-td>
              
              <q-td key="familyEngagemenet" :props="props">
                <div class="cursor-pointer" v-if="props.row.allocation">$  {{ props.row.familyEngagemenetFinal }} </div>
                <div class="cursor-pointer" v-else> $ {{ props.row.familyEngagemenet }} </div>

                <q-popup-edit v-if="props.row.allocation" v-model="props.row.familyEngagemenetFinal" title="Family Engagemenet" buttons>
                  <q-input  @input="detectChange(props.rowIndex)" type="number" v-model="props.row.familyEngagemenetFinal" dense autofocus/>
                </q-popup-edit>
                <q-popup-edit v-else v-model="props.row.familyEngagemenet" title="Family Engagemenet" buttons>
                  <q-input  @input="detectChange(props.rowIndex)" type="number" v-model="props.row.familyEngagemenet" dense autofocus/>
                </q-popup-edit>
              </q-td>

              <q-td key="total" :props="props">
                  $ {{ props.row.total }}
              </q-td>
              
              <q-td key="allocation" :props="props">

                <q-chip class="cursor-pointer" square color="green" text-color="white" v-if="props.row.allocation == 'Preliminary'">
                  PR
                  <q-tooltip 
                      anchor="top middle" self="bottom middle" :offset="[10, 10]"
                      transition-show="flip-right"
                      transition-hide="flip-left"
                  >
                    <strong>PR</strong>
                  </q-tooltip>
                </q-chip>
                <q-chip class="cursor-pointer" square color="purple" text-color="white" v-else>
                  FN
                  <q-tooltip 
                      anchor="top middle" self="bottom middle" :offset="[10, 10]"
                      transition-show="flip-right"
                      transition-hide="flip-left"
                  >
                    <strong>FN</strong>
                  </q-tooltip>
                </q-chip>

                <!-- <q-chip square class="edx-q-chip-button cursor-pointer" text-color="orange" v-if="props.row.allocation == 'Preliminary'">Preliminary</q-chip> -->
                <!-- <q-chip square class="edx-q-chip-button cursor-pointer" text-color="green" v-else>Final</q-chip> -->

                <q-popup-edit v-model="props.row.allocation" title="Allocation" buttons>
                  <q-select  @input="detectChange(props.rowIndex)" v-model="props.row.allocation" :options="options"/>
                </q-popup-edit>  

              </q-td>
              
              <q-td key="actions" :props="props">

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
                    @click="props.row.changed = false"
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
    import lodash from 'lodash'
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

    export default {
      data() {
        return {
          confirm: false,
          loading: false,
          item: '',
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
          isFinal: false,
          filter: '',
          mode: 'list',
          show_dialog: false,
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
              name: "allocation",
              align: "left",
              label: "Status",
              field: "allocation",
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
          changePagination (val) {
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
      
                let pdPercentage = 4,

                    totalInstruction = Math.floor(Math.random() * 100),
                    totalInstructionFinal = Math.floor(Math.random() * 100),

                    instruction, 
                    profDev, 
                    total, 

                    familyEngagemenetEstimated = Math.floor(Math.random() * 100),
                    familyEngagemenetFinal = Math.floor(Math.random() * 100)

                    // Professional development
                    let p_percentage = parseFloat(pdPercentage) / 100;
                    if (r) {
                      profDev = (parseFloat(totalInstructionFinal) * p_percentage).toFixed(2);
                    } else {
                      profDev = (parseFloat(totalInstruction) * p_percentage).toFixed(2);
                    }

                    // instruction
                    let i_percentage = ( 100 - parseFloat(pdPercentage) ) / 100
                    if (r) {
                      instruction = ( parseFloat(totalInstructionFinal) * i_percentage ).toFixed(2);
                    } else {
                      instruction = ( parseFloat(totalInstruction) * i_percentage ).toFixed(2);
                    }

                    // Total
                    if (r) {
                      total = ( parseFloat(totalInstructionFinal) + parseFloat(familyEngagemenetFinal)  ).toFixed(2);
                    } else {
                      total = ( parseFloat(totalInstruction) + parseFloat(familyEngagemenetEstimated)   ).toFixed(2);
                    }
    
                    let obj = {
                      date: "2020-09-11",
                      school: "American School N" + i+1,
                      instruction: instruction,
                      profDev: profDev,

                      totalInstruction: totalInstruction,
                      familyEngagemenet: familyEngagemenetEstimated,

                      totalInstructionFinal: totalInstructionFinal,
                      familyEngagemenetFinal: familyEngagemenetFinal,

                      allocation: r,
                      pdPercentage: pdPercentage,
                      total: total,
                      totalPercent: 9,
                      notes: "",
                    }

                    dataTest.push(obj)

              }
              this.data = dataTest
              this.tempData = dataTest
            }, 550)
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
      },
      created() {
        let dataTest = []

        for(let i=0; i<5; i++) {

          let r = Math.floor(Math.random() * 10)
          if(r % 2) r = true 
          else r = false
      
          let pdPercentage = 4,
              totalInstruction = Math.floor(Math.random() * 100),
              totalInstructionFinal = Math.floor(Math.random() * 100),
              instruction, 
              profDev, 
              total,
              familyEngagemenetEstimated = Math.floor(Math.random() * 100),
              familyEngagemenetFinal = Math.floor(Math.random() * 100)

          // Professional development
          let p_percentage = parseFloat(pdPercentage) / 100;
          if (r) {
            profDev = (parseFloat(totalInstructionFinal) * p_percentage).toFixed(2);
          } else {
            profDev = (parseFloat(totalInstruction) * p_percentage).toFixed(2);
          }

          // instruction
          let i_percentage = ( 100 - parseFloat(pdPercentage) ) / 100
          if (r) {
            instruction = ( parseFloat(totalInstructionFinal) * i_percentage ).toFixed(2);
          } else {
            instruction = ( parseFloat(totalInstruction) * i_percentage ).toFixed(2);
          }

          // Total
          if (r) {
            total = ( parseFloat(totalInstructionFinal) + parseFloat(familyEngagemenetFinal)  ).toFixed(2);
          } else {
            total = ( parseFloat(totalInstruction) + parseFloat(familyEngagemenetEstimated)   ).toFixed(2);
          }
 
          let obj = {
            id: i,
            date: "2020-09-11",
            school: "American School N" + i+1,
            instruction: instruction,
            profDev: profDev,

            totalInstruction: totalInstruction,
            familyEngagemenet: familyEngagemenetEstimated,

            totalInstructionFinal: totalInstructionFinal,
            familyEngagemenetFinal: familyEngagemenetFinal,

            allocation: r ? 'Preliminary' : 'Final',
            pdPercentage: pdPercentage,
            total: total,
            totalPercent: 9,
            notes: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
            showEditButton: true,
            changed: false,
          }

          dataTest.push(obj)
        }
        this.data = dataTest
        this.tempData = dataTest
      },
      computed: {
        instruction() {
          let inst = 0;
          
          for(let i=0; i<this.data.length; i++) {
            let instruction = parseFloat( this.data[i].instruction )
            inst += instruction
          }
          return inst.toFixed(2)
        },
        pd() {
          let pd = 0;
          for(let i=0; i<this.data.length; i++) {
            let profDev = parseFloat( this.data[i].profDev )
            pd += profDev
          }
          return pd.toFixed(2)
        },
        totalInstruction() {
          let totalInstruction = 0;
          for(let i=0; i<this.data.length; i++) {
            let totalInst = parseFloat( this.data[i].totalInstruction )
            totalInstruction += totalInst
          }
          return totalInstruction.toFixed(2)
        },
        totalEngagement() {
          let totalEngagement = 0;
          for(let i=0; i<this.data.length; i++) {
            let totalEng = parseFloat(this.data[i].familyEngagemenet)
            totalEngagement += totalEng
          }
          return totalEngagement.toFixed(2)
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