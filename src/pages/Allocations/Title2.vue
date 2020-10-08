<template>
  <q-page class="q-pa-sm">    

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Allocations"/>
        <q-breadcrumbs-el label="Title 2"/>
      </q-breadcrumbs>
    </div>

    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">
          
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
                <q-item-label class="text-grey-7">Materials</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ materials }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="local_atm" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Grand Total</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ grandTotal }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="search" color="pink" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total PD (+/-)</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">% 9.04</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="timeline" color="purple" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Last Year (+/-)</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">% 9.42</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="timeline" color="orange" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">From Last Year (+/-)</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">% 8.42</q-item-label>
              </q-item-section>
            </q-item>
          </div>

        </div>
      </q-card-section>
    </q-card>
    
    <div class="q-pa-sm q-mt-sm q-gutter-sm">
      <q-table
        title="Title 2" 
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
              <!-- <vue-drag-resize :isResizable="false" :w="650" :h="710">
              </vue-drag-resize> -->
                <q-card>
                  <q-card-section>
                    <div class="text-h6">Create</div>
                  </q-card-section>

                  <!-- MODAL -->
                  <q-card-section>
                    <div class="row">

                      <div class="col-sm-6 col-xs-12 q-mb-sm q-pr-sm">
                        <q-select outlined v-model="editedItem.school" :options="schools" label="Choose a school" />
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

                      <div class="col-12 q-mt-md">
                        <p>Preliminary Allocations</p>
                      </div>

                      <div class="col-sm-6 col-xs-12  q-mb-sm q-pr-sm">
                        <q-input :disable="editedItem.allocation" outlined v-model="editedItem.profDev" label="Professional Dev" />
                      </div>

                      <div class="col-sm-6 col-xs-12  q-mb-sm">
                        <q-input :disable="editedItem.allocation" outlined v-model="editedItem.materials" label="Materials" />
                      </div>

                      <div class="col-12 q-mt-md">
                        <p>Final Allocations</p>
                      </div>

                      <div class="col-sm-6 col-xs-12  q-mb-sm q-pr-sm">
                        <q-input :disable="!editedItem.allocation" outlined v-model="editedItem.profDevFinal" label="Professional Dev" />
                      </div>

                      <div class="col-sm-6 col-xs-12  q-mb-sm">
                        <q-input :disable="!editedItem.allocation" outlined v-model="editedItem.materialsFinal" label="Materials" />
                      </div>

                      <div class="col-12 q-mt-md q-mb-md">
                        <div class="q-gutter-sm text-right">
                          <q-checkbox v-model="editedItem.allocation" label="Allocation is Final" />
                        </div>
                      </div>

                      <div class="col-12">
                        <q-input type="textarea" outlined v-model="editedItem.notes" label="Notes" />
                      </div>

                      <div class="col-12">
                        <q-chip outline square class="q-mt-md" color="blue" text-color="white" label="Previous Year PD: $45835.58 Previous Year Materials: $185.38" />
                      </div>
                    
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

              <q-td key="profDev" :props="props">
                <div v-if="props.row.allocation">$ {{ props.row.profDevFinal }} </div>
                <div v-else> $ {{ props.row.profDev }} </div>
              </q-td>
              
              <q-td key="materials" :props="props">
                <div v-if="props.row.allocation">$ {{ props.row.materialsFinal }} </div>
                <div v-else> $ {{ props.row.materials }} </div>
              </q-td>
              
              <q-td key="grandTotal" :props="props">
                $ {{ props.row.grandTotal }}
              </q-td>
              
              <q-td key="allocation" :props="props">
                <q-chip square class="edx-q-chip-button" text-color="orange" v-if="props.row.allocation != true">
                  Preliminary
                </q-chip>
                <q-chip square class="edx-q-chip-button" text-color="green" v-else>
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
            profDev: "",
            profDevFinal: "",
            allocation: false,
            materials: "",
            materialsFinal: "",
            notes: ""
          },
          defaultItem: {
            date: "",
            school: "",
            profDev: "",
            profDevFinal: "",
            allocation: "",
            materials: "",
            materialsFinal: "",
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
              name: "profDev", 
              align: "left",
              label: "Professional Development", 
              field: "profDev",
              sortable: true
            },
            { 
              name: "materials", 
              align: "left",
              label: "Materials", 
              field: "materials",
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
              name: 'allocation',
              align: "left",
              label: "Allocation",
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
          schools: [],
        };
      },
      methods: {
          addRow() {

            let profDev= this.editedItem.profDev, 
                profDevFinal = this.editedItem.profDevFinal,
                materials = this.editedItem.materials,
                materialsFinal = this.editedItem.materialsFinal,
                grandTotal;

            if (this.editedItem.allocation) {
              grandTotal = ( parseFloat(profDevFinal) + parseFloat(materialsFinal)  ).toFixed(2);
            } else {
              grandTotal = ( parseFloat(profDev) + parseFloat(materials) ).toFixed(2);
            }
          
            let obj = {
              date: this.editedItem.date,
              school: this.editedItem.school,

              profDev: profDev,
              profDevFinal: profDevFinal,

              materials: materials,
              materialsFinal: materialsFinal,

              grandTotal: grandTotal,
              allocation: this.editedItem.allocation,
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

              let profDev, profDevFinal,
                  materials, materialsFinal,
                  grandTotal;

              if (r) {
                profDevFinal = parseFloat( Math.floor(Math.random() * 1000) ).toFixed(2);
              } else {
                profDev = parseFloat( Math.floor(Math.random() * 1000) ).toFixed(2);
              }

              if (r) {
                materialsFinal = parseFloat( Math.floor(Math.random() * 1000)).toFixed(2);
              } else {
                materials = parseFloat( Math.floor(Math.random() * 1000)).toFixed(2);
              }

              // Grand Total
              if (r) {
                grandTotal = ( parseFloat(profDevFinal) - parseFloat(materialsFinal)  ).toFixed(2);
              } else {
                grandTotal = ( parseFloat(profDev) - parseFloat(materials)   ).toFixed(2);
              }
          
          
              let obj = {
                date: "2020-09-1" + i+1,
                school: "American School N" + i+1,

                profDev: profDev,
                profDevFinal: profDevFinal,

                materials: materials,
                materialsFinal: materialsFinal,

                grandTotal: grandTotal,
                allocation: r,
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
                this.data = this.tempData.filter(a => a.allocation == false);
              }else {
                this.data = this.tempData.filter(a => a.allocation == true);
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

          let profDev, profDevFinal,
              materials, materialsFinal,
              grandTotal;

          if (r) {
            profDevFinal = parseFloat( Math.floor(Math.random() * 1000) ).toFixed(2);
          } else {
            profDev = parseFloat( Math.floor(Math.random() * 1000) ).toFixed(2);
          }

          if (r) {
            materialsFinal = parseFloat( Math.floor(Math.random() * 1000)).toFixed(2);
          } else {
             materials = parseFloat( Math.floor(Math.random() * 1000)).toFixed(2);
          }

          // Grand Total
          if (r) {
            grandTotal = ( parseFloat(profDevFinal) + parseFloat(materialsFinal)  ).toFixed(2);
          } else {
            grandTotal = ( parseFloat(profDev) + parseFloat(materials)   ).toFixed(2);
          }
          
          
          let obj = {
            date: "2020-09-1" + i+1,
            school: "American School N" + i+1,

            profDev: profDev,
            profDevFinal: profDevFinal,

            materials: materials,
            materialsFinal: materialsFinal,

            grandTotal: grandTotal,
            allocation: r,
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
        pd() {
          let pd = 0;
          for(let i=0; i<this.data.length; i++) {
            let p_dev
            if(this.data[i].profDev) {
              p_dev = parseFloat( this.data[i].profDev )
            }else {
              p_dev = parseFloat( this.data[i].profDevFinal )
            }
            pd += p_dev
          }
          return pd.toFixed(2)
        },
        materials() {
          let materials = 0;
          for(let i=0; i<this.data.length; i++) {
            let mat
            if(this.data[i].materials) {
              mat = parseFloat( this.data[i].materials )
            }else {
              mat = parseFloat( this.data[i].materialsFinal )
            }
            materials += mat
          }
          return materials.toFixed(2)
        },
        grandTotal() {
          let grandTotal = 0;
          for(let i=0; i<this.data.length; i++) {
            let g_total = parseFloat( this.data[i].grandTotal )
            grandTotal += g_total
          }
          return grandTotal.toFixed(2)
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