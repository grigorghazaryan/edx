<template>
  <q-page class="q-pa-sm">    
    <q-card class="bg-transparent no-shadow no-border q-mb-md q-mt-md">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-card>
              <q-item style="background-color: #546bfa" class="q-pa-none">
                <q-item-section class="q-pa-md q-ml-none  text-white">
                  <q-item-label class="text-white text-h6 text-weight-bolder">$ 8,258</q-item-label>
                  <q-item-label>Instruction</q-item-label>
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
                  <q-item-label class="text-white text-h6 text-weight-bolder">$ 4418</q-item-label>
                  <q-item-label>PD</q-item-label>
                </q-item-section>
                <q-item-section side class="q-mr-md text-white">
                  <q-icon name="fas fa-chart-bar" color="white" size="44px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-card>
              <q-item style="background-color: #7cb342" class="q-pa-none ">
                <q-item-section class=" q-pa-md q-ml-none  text-white">
                  <q-item-label class="text-white text-h6 text-weight-bolder">$ 8778</q-item-label>
                  <q-item-label>Total Instructions</q-item-label>
                </q-item-section>
                <q-item-section side class="q-mr-md text-white">
                  <q-icon name="fas fa-chart-line" color="white" size="44px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-card>
              <q-item style="background-color: #f88c2b" class="q-pa-none">
                <q-item-section class=" q-pa-md q-ml-none  text-white">
                  <q-item-label class="text-white text-h6 text-weight-bolder">$ 7600</q-item-label>
                  <q-item-label>Total Engagement</q-item-label>
                </q-item-section>
                <q-item-section side class="q-mr-md text-white">
                  <q-icon name="person" color="white" size="44px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-card>
              <q-item style="background-color: #f88c2b" class="q-pa-none">
                <q-item-section class=" q-pa-md q-ml-none  text-white">
                  <q-item-label class="text-white text-h6 text-weight-bolder">% 1.04</q-item-label>
                  <q-item-label>Final/Est Ratio (+/-)</q-item-label>
                </q-item-section>
                <q-item-section side class="q-mr-md text-white">
                  <q-icon name="person" color="white" size="44px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-card>
              <q-item style="background-color: #f88c2b" class="q-pa-none">
                <q-item-section class=" q-pa-md q-ml-none  text-white">
                  <q-item-label class="text-white text-h6 text-weight-bolder">% 9.42</q-item-label>
                  <q-item-label>Last Year (+/-)</q-item-label>
                </q-item-section>
                <q-item-section side class="q-mr-md text-white">
                  <q-icon name="person" color="white" size="44px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
    
    <div class="q-pa-sm q-gutter-sm">
      <q-table
        title="Title 1" 
        :data="data" 
        :hide-header="mode === 'grid'"
        :columns="columns" 
        :filter="filter"
        row-key="name" 
        binary-state-sort
      >
        <template v-slot:body="props">
            <q-tr :props="props">

              <q-td key="dpi" :props="props">
                {{ props.row.dpi }}
              </q-td>

              <q-td key="date" :props="props">
                {{ props.row.date }}
              </q-td>
              
              <q-td key="school" :props="props">
                <div class="text-pre-wrap">{{ props.row.school }}</div>
              </q-td>

              <q-td key="instruction" :props="props">
                {{ props.row.instruction }}
              </q-td>

              <q-td key="profDev" :props="props">
                {{ props.row.profDev }}
              </q-td>
              
              <q-td key="totalInstruction" :props="props">
                {{ props.row.totalInstruction }}
              </q-td>
              
              <q-td key="familyEngagemenet" :props="props">
                {{ props.row.familyEngagemenet }}
              </q-td>
              
              <q-td key="allocation" :props="props">
                <q-chip square color="orange" text-color="white" v-if="props.row.allocation == 'Preliminary'">
                  {{ props.row.allocation }}
                </q-chip>
                <q-chip class="glossy" square color="teal" text-color="white" v-else>
                  {{ props.row.allocation }}
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
                  @click="deleteItem(props.row)" 
                  size=sm 
                  no-caps
                >
                </q-btn>
              </q-td>

            </q-tr>
        </template>

        <template v-slot:top-right="props">

          <q-input class="q-mr-md" outlines dense v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
          <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" dense outlines clearable v-model="model" :options="options" label="Allocation" />
          <q-select class="q-mr-md" style="min-width: 150px; max-width: 150px" dense outlines clearable v-model="modelDescending" :options="optionsDescending" label="ID Descending" />

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

                    <div class="col-md-6 q-mb-sm q-pr-sm">
                      <q-input outlined v-model="editedItem.school" label="School" />
                    </div>

                    <div class="col-md-6">
                      <q-input outlined v-model="editedItem.date">
                        <template v-slot:prepend>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                              <q-date v-model="editedItem.date" mask="YYYY-MM-DD HH:mm">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>

                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                              <q-time v-model="editedItem.date" mask="YYYY-MM-DD HH:mm" format24h>
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>

                    <div class="col-md-12 q-mt-md">
                      <p>Preliminary Allocations</p>
                    </div>

                    <div class="col-md-6 q-pr-sm">
                      <q-input :disable="isFinal" outlined v-model="editedItem.totalInstruction" label="Total Instruction" />
                    </div>

                    <div class="col-md-6">
                      <q-input :disable="isFinal" outlined v-model="editedItem.familyEngagemenet" label="Family Engagemenet" />
                    </div>

                    <div class="col-md-12 q-mt-md">
                      <p>Final Allocations</p>
                    </div>

                    <div class="col-md-6 q-pr-sm">
                      <q-input :disable="!isFinal" outlined v-model="editedItem.totalInstruction" label="Total Instruction" />
                    </div>

                    <div class="col-md-6">
                      <q-input :disable="!isFinal" outlined v-model="editedItem.familyEngagemenet" label="Family Engagemenet" />
                    </div>

                    <div class="col-md-12 q-mt-md q-mb-md">
                      <div class="q-gutter-sm text-right">
                        <q-checkbox v-model="isFinal" label="Allocation is Final" />
                      </div>
                    </div>

                    <div class="col-md-12 q-mb-sm">
                      <q-input outlined label="PD Percentage %" />
                    </div>

                    <div class="col-md-12">
                      <q-input type="textarea" outlined label="Notes" />
                    </div>
                  
                  </div>
                </q-card-section>
              
                <q-card-actions align="right">
                  <q-btn flat label="Confirm" color="primary" v-close-popup @click="addRow"></q-btn>
                </q-card-actions>

              </q-card>
            </q-dialog>
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
            model: null,
            options: [
              'Preliminary', 'Final'
            ],
            modelDescending: null,
            optionsDescending: [
              'ID Ascending', 'ID Descending'
            ],
            filter: '',
            mode: 'list',
            isFinal: false,
            show_dialog: false,
            editedIndex: -1,
            editedItem: {
              dpi: "",
              date: "",
              school: "",
              instruction: "",
              profDev: "",
              totalInstruction: "",
              familyEngagemenet: "",
              allocation: ""
            },
            defaultItem: {
              dpi: "",
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
                name: "dpi",
                required: true,
                label: "DPI",
                align: "left",
                field: row => row.dpi,
                format: val => `${val}`,
                sortable: true
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
                name: "allocation",
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
            data: [
              {
                dpi: 101,
                date: "21/09/2020",
                school: "American School N1",
                instruction: "$ 189.78",
                profDev: "$ 10.22",
                totalInstruction: "$ 200.00",
                familyEngagemenet: "$ 4455.00",
                allocation: "Preliminary"
              },
              {
                dpi: 102,
                date: "21/09/2020",
                school: "American School N2",
                instruction: "$ 174.78",
                profDev: "$ 17.22",
                totalInstruction: "$ 240.00",
                familyEngagemenet: "$ 7855.00",
                allocation: "Final"
              },
            ]
          };
        },
        methods: {
          addRow() {
            if (this.editedIndex > -1) {
              Object.assign(this.data[this.editedIndex], this.editedItem);
            } else {
              this.data.push(this.editedItem);
            }
            this.close()
          },
          deleteItem(item) {
            const index = this.data.indexOf(item);
            confirm("Are you sure you want to delete this item?") &&
              this.data.splice(index, 1);
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
            }
      },
    }
</script>

<style lang="scss" scoped>
// Refactor needed
.q-item__section--side {
  display: none
}
</style>