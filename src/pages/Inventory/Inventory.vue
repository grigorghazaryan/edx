<template>
  <q-page class="q-pa-sm">  

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Inventory"/>
        <q-breadcrumbs-el label="Inventory"/>
      </q-breadcrumbs>
    </div>

    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Cost</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{totalCost}}</q-item-label>
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
          <q-tab name="Title1" label="Title I"/>
          <q-tab name="Title2" label="Title II"/>
          <q-tab name="Title3" label="Title III"/>
          <q-tab name="Title4" label="Title IV"/>
          <q-tab name="ESSER" label="ESSER"/>

        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>

          <q-tab-panel name="Title1" class="q-p-sm">
            <q-table
              :data="data" 
              :columns="columns"
              :loading="loading"
              :filter="filter"
              class="no-shadow"
              row-key="id"
              :pagination.sync="pagination"
            >

              <!-- Loading -->
              <template v-slot:loading>
                <q-inner-loading showing color="primary" />
              </template>

              <!-- Table Header -->
              <template v-slot:top-right="props">
                
                <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" dense outlines clearable v-model="schoolYear" :options="schoolYears" label="School year"/>

                <q-input class="q-mr-md" outlines dense v-model="filter" placeholder="Search">
                  <template v-slot:append>
                    <q-icon name="search"/>
                  </template>
                </q-input>

                <q-btn square class="q-mr-md" style="background-color: #546bfa" text-color="white" icon="add" @click="addEmptyRow" no-caps>Add</q-btn>


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
                
                  <q-tr :props="props" :class="{ 'bg-red-2' : props.row.changed }">

                    <q-td auto-width>
                      <q-btn size="sm" flat
                        color="black"
                        @click="props.expand = !props.expand" 
                        :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'">
                      </q-btn>
                    </q-td>

                    <q-td key="qty" :props="props" @click="copyRowData(props.rowIndex)">

                      <div>{{ props.row.qty }}</div>

                      <q-popup-edit v-model="props.row.qty" title="Qty" buttons>
                        <q-input type="text" v-model="props.row.qty" dense autofocus 
                          @input="detectChange(props.rowIndex)"
                        />
                      </q-popup-edit>

                    </q-td>

                    <q-td key="categoryDescription" :props="props" @click="copyRowData(props.rowIndex)">

                      <div>{{ props.row.categoryDescription }}</div>

                      <q-popup-edit v-model="props.row.categoryDescription" title="Category Description" buttons>
                        <q-input type="text" v-model="props.row.categoryDescription" dense autofocus 
                          @input="detectChange(props.rowIndex)"
                        />
                      </q-popup-edit>

                    </q-td>

                    <q-td key="itemName" :props="props" @click="copyRowData(props.rowIndex)">
                      
                      <div>{{ props.row.itemName }}</div>

                      <q-popup-edit v-model="props.row.itemName" title="Item name" buttons>
                        <q-input type="text" v-model="props.row.itemName" dense autofocus 
                          @input="detectChange(props.rowIndex)"
                        />
                      </q-popup-edit>

                    </q-td>

                    <q-td key="vendor" :props="props" @click="copyRowData(props.rowIndex)">
                      
                      <div>{{ props.row.vendor }}</div>

                      <q-popup-edit v-model="props.row.vendor" title="Vendor" buttons>
                        <q-input type="text" v-model="props.row.vendor" dense autofocus 
                          @input="detectChange(props.rowIndex)"
                        />
                      </q-popup-edit>

                    </q-td>

                    <q-td key="costPerItem" :props="props" @click="copyRowData(props.rowIndex)">
                      
                      <div>$ {{ props.row.costPerItem }}</div>

                      <q-popup-edit v-model="props.row.costPerItem" title="Cost Per Item" buttons>
                        <q-input type="text" v-model="props.row.costPerItem" dense autofocus 
                          @input="detectChange(props.rowIndex)"
                        />
                      </q-popup-edit>

                    </q-td>

                    <q-td key="totalCost" :props="props" @click="copyRowData(props.rowIndex)">
                      
                      <div>$ {{ props.row.costPerItem * props.row.qty }}</div>

                    </q-td>

                    <q-td key="dateOfPurchase" :props="props" @click="copyRowData(props.rowIndex)">
                      
                      <div>{{ props.row.dateOfPurchase }}</div>

                    </q-td>

                    <q-td key="condition" :props="props" @click="copyRowData(props.rowIndex)">
                      
                      <div v-if="props.row.condition == 'Excellent'"> 
                        <!-- <q-icon name="done" color="green-10" style="font-size: 1.5em"/> -->
                        <!-- {{props.row.condition}} -->
                        <span class="mdi mdi-circle-slice-7 mdi-24px" style="color: blue">
                          <q-tooltip 
                              anchor="top middle" self="bottom middle" :offset="[10, 10]"
                              transition-show="flip-right"
                              transition-hide="flip-left"
                          >
                            <strong>Excellent</strong>
                          </q-tooltip>                         
                        </span>
                      </div>


                      <div v-else-if="props.row.condition == 'Very Good'"> 
                        <!-- <q-icon name="done" color="light-blue-14" style="font-size: 1.5em"/>
                        {{props.row.condition}} -->
                        <span class="mdi mdi-circle-slice-6 mdi-24px" style="color: green">
                          <q-tooltip 
                              anchor="top middle" self="bottom middle" :offset="[10, 10]"
                              transition-show="flip-right"
                              transition-hide="flip-left"
                          >
                            <strong>Very Good</strong>
                          </q-tooltip>
                        </span>
                      </div>



                      <div v-else-if="props.row.condition == 'Good'"> 
                        <!-- <q-icon name="done" color="pink-13" style="font-size: 1.5em"/>
                        {{props.row.condition}} -->
                        <span class="mdi mdi-circle-slice-5 mdi-24px" style="color: #ccad14">
                          <q-tooltip 
                              anchor="top middle" self="bottom middle" :offset="[10, 10]"
                              transition-show="flip-right"
                              transition-hide="flip-left"
                          >
                            <strong>Good</strong>
                          </q-tooltip>                          
                        </span>
                      </div>


                      <div v-else-if="props.row.condition == 'Fair'"> 
                        <!-- <q-icon name="done" color="amber-9" style="font-size: 1.5em"/>
                        {{props.row.condition}} -->
                        <span class="mdi mdi-circle-slice-4 mdi-24px" style="color: orange">
                          <q-tooltip 
                              anchor="top middle" self="bottom middle" :offset="[10, 10]"
                              transition-show="flip-right"
                              transition-hide="flip-left"
                          >
                            <strong>Fair</strong>
                          </q-tooltip>                          
                        </span>
                      </div>


                      <div v-else> 
                        <!-- <q-icon name="remove" color="deep-orange-13" style="font-size: 1.5em"/>
                        {{props.row.condition}} -->
                        <span class="mdi mdi-circle-slice-2 mdi-24px" style="color: red">
                          <q-tooltip 
                              anchor="top middle" self="bottom middle" :offset="[10, 10]"
                              transition-show="flip-right"
                              transition-hide="flip-left"
                          >
                            <strong>Poor</strong>
                          </q-tooltip>                          
                        </span>
                      </div>

                      <q-popup-edit  v-model="props.row.condition" title="Condition" buttons>
                        <q-select @input="detectChange(props.rowIndex)" dense outlined v-model="props.row.condition" :options="optionsCondition"/>
                      </q-popup-edit>

                    </q-td>

                    <q-td key="status" :props="props" @click="copyRowData(props.rowIndex)">
                      
                      <div v-if="props.row.status == 'Disposed'"> 
                        <!-- <q-icon name="forward" color="green-10" style="font-size: 1.5em"/>
                        {{ props.row.status }} -->
                        <span class="mdi mdi-recycle mdi-24px" style="color: green">
                          <q-tooltip 
                              anchor="top middle" self="bottom middle" :offset="[10, 10]"
                              transition-show="flip-right"
                              transition-hide="flip-left"
                          >
                            <strong>Disposed</strong>
                          </q-tooltip>  
                        </span>
                      </div>

                      <div v-else-if="props.row.status == 'Lost'"> 
                        <!-- <q-icon name="gesture" color="green-10" style="font-size: 1.5em"/>
                        {{ props.row.status }} -->
                        <span class="mdi mdi-map-marker-question mdi-red mdi-24px" style="color: red">
                          <q-tooltip 
                              anchor="top middle" self="bottom middle" :offset="[10, 10]"
                              transition-show="flip-right"
                              transition-hide="flip-left"
                          >
                            <strong>Lost</strong>
                          </q-tooltip>                          
                        </span>
                      </div>

                      <div v-else-if="props.row.status == 'Stolen'"> 
                        <!-- <q-icon name="mail" color="green-10" style="font-size: 1.5em"/>
                        {{ props.row.status }} -->
                        <span class="mdi mdi-robber mdi-red mdi-24px" style="color: black">
                          <q-tooltip 
                              anchor="top middle" self="bottom middle" :offset="[10, 10]"
                              transition-show="flip-right"
                              transition-hide="flip-left"
                          >
                            <strong>Stolen</strong>
                          </q-tooltip>                             
                        </span>
                      </div>

                      <div v-else-if="props.row.status == 'Transferred'"> 
                        <!-- <q-icon name="push_pin" color="green-10" style="font-size: 1.5em"/>
                        {{ props.row.status }} -->
                        <span class="mdi mdi-truck-delivery mdi-24px" style="color: orange">
                          <q-tooltip 
                              anchor="top middle" self="bottom middle" :offset="[10, 10]"
                              transition-show="flip-right"
                              transition-hide="flip-left"
                          >
                            <strong>Transferred</strong>
                          </q-tooltip>   
                        </span>
                      </div>

                      <div v-else> 
                        <!-- <q-icon name="redo" color="green-10" style="font-size: 1.5em"/>
                        {{ props.row.status }} -->
                        <q-tooltip 
                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                            transition-show="flip-right"
                            transition-hide="flip-left"
                        >
                          <strong>Stored</strong>
                        </q-tooltip> 
                      </div>

                      <q-popup-edit  v-model="props.row.status" title="Status" buttons>
                        <q-select @input="detectChange(props.rowIndex)" dense outlined v-model="props.row.status" :options="optionsStatus"/>
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
                          :style="{visibility: props.row.changed ? 'visible' : 'hidden'}"
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

                      <div v-if="props.row.showEditButton && !props.row.changed">
                        <q-btn 
                          class="q-mr-sm"
                          icon="content_copy"
                          color="orange" 
                          @click="copyRow(props.row, props.rowIndex)"
                          size=sm 
                          no-caps
                          round 
                        >
                          <q-tooltip 
                              anchor="top middle" self="bottom middle" :offset="[10, 10]"
                              transition-show="flip-right"
                              transition-hide="flip-left"
                          >
                            <strong>Duplicate</strong>
                          </q-tooltip>
                        </q-btn>

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
                    <q-td colspan="100%">
                      <div class="q-mb-lg">

                        <div class="row q-mt-lg q-mb-lg"></div>

                        <div class="row ">

                          <div class="col-1"  @click="copyRowData(props.rowIndex)">
                            <div class="text-subtitle2 q-mb-md">Identifier</div>
                            <div>{{ props.row.identifier }}</div>

                            <q-popup-edit  v-model="props.row.identifier" title="Identifier" buttons>
                              <q-select @input="detectChange(props.rowIndex)" dense outlined v-model="props.row.identifier" :options="optionsIdentifier"/>
                            </q-popup-edit>

                          </div>

                          <div class="col-1" @click="copyRowData(props.rowIndex)">
                            <div class="text-subtitle2 q-mb-md">District ID</div>
                            <div>{{ props.row.mpsId }}</div>

                            <q-popup-edit v-model="props.row.mpsId" title="District ID" buttons>
                              <q-input type="text" v-model="props.row.mpsId" dense autofocus 
                                @input="detectChange(props.rowIndex)"
                              />
                            </q-popup-edit>

                          </div>

                          <div class="col-1" @click="copyRowData(props.rowIndex)">
                            <div class="text-subtitle2 q-mb-md">Serial #</div>
                            <div>{{ props.row.serial }}</div>
                            <q-popup-edit v-model="props.row.serial" title="Serial #" buttons>
                              <q-input type="text" v-model="props.row.serial" dense autofocus 
                                @input="detectChange(props.rowIndex)"
                              />
                            </q-popup-edit>
                          </div>

                          <div class="col-md-2 q-mr-sm q-ml-sm">
                            <div class="text-subtitle2 q-mb-md">Location</div>
                            <p class="white-space-initial fixed-height-for-large-text">{{props.row.location}}</p>
                            <!-- <q-input
                              v-model="props.row.location"
                              outlines 
                              dense
                              type="textarea"
                              readonly
                              class="full-height"
                            /> -->
                            <q-popup-edit v-model="props.row.location" title="Location" buttons>
                              <q-input type="input" v-model="props.row.location" dense autofocus />
                            </q-popup-edit> 
                          </div>

                          <div class="col-md-2 q-mr-sm q-ml-sm">
                            <div class="text-subtitle2 q-mb-md">Classroom or Location within School</div>
                            <p class="white-space-initial fixed-height-for-large-text">{{props.row.classroomOrLocationWithinSchool}}</p>
                            <!-- <q-input
                              v-model="props.row.classroomOrLocationWithinSchool"
                              outlines dense
                              type="textarea"
                              readonly
                              class="full-height"
                            /> -->
                            <q-popup-edit v-model="props.row.classroomOrLocationWithinSchool" title="Classroom or Location within School" buttons>
                              <q-input type="textarea" v-model="props.row.classroomOrLocationWithinSchool" dense autofocus />
                            </q-popup-edit> 
                          </div>

                          <div class="col-md-2 q-mr-sm q-ml-sm">
                            <div class="text-subtitle2 q-mb-md">Date and explanation of removal</div>
                            <p class="white-space-initial fixed-height-for-large-text">{{props.row.dateAndExplanationOfRemoval}}</p>
                            <!-- <q-input
                              v-model="props.row.dateAndExplanationOfRemoval"
                              outlines dense
                              type="textarea"
                              readonly
                              class="full-height"
                            /> -->
                            <q-popup-edit v-model="props.row.dateAndExplanationOfRemoval" title="Date and explanation of removal" buttons>
                              <q-input type="textarea" v-model="props.row.dateAndExplanationOfRemoval" dense autofocus />
                            </q-popup-edit> 
                          </div>

                          <div class="col-md-2 q-mr-sm q-ml-sm">
                            <div class="text-subtitle2 q-mb-md">Notes</div>
                            <p class="white-space-initial fixed-height-for-large-text">{{props.row.notes}}</p>
                            <!-- <q-input
                              v-model="props.row.notes"
                              outlines dense
                              type="textarea"
                              readonly
                              class="full-height"
                            /> -->
                            <q-popup-edit v-model="props.row.notes" title="Notes" buttons>
                              <q-input type="textarea" v-model="props.row.notes" dense autofocus />
                            </q-popup-edit> 
                          </div>

                        </div>

                      </div>
                    </q-td>
                  </q-tr>

              </template>


            </q-table>
          </q-tab-panel>

          <q-tab-panel name="Title2" class="q-p-sm">
            <h5>Title 2</h5>
          </q-tab-panel>

          <q-tab-panel name="Title3" class="q-p-sm">
            <h5>Title 3</h5>
          </q-tab-panel>

          <q-tab-panel name="Title4" class="q-p-sm">
           <h5>Title 4</h5>
          </q-tab-panel>

          <q-tab-panel name="ESSER" class="q-p-sm">
            <h5>ESSER</h5>
          </q-tab-panel>


        </q-tab-panels>

      </q-card>
    </div>

  </q-page>
</template>

<script>
import {exportFile} from 'quasar'
import lodash from 'lodash'
let oldObject = {}

export default {
  name: 'Inventory',
  data() {
    return {
      mode: 'list',
      tab: 'Title1',
      data: [],
      tempDataX: [],
      columns: [
        {
          name: "toggle",
          style: 'width: 30px'
        },
        {
          name: "qty",
          align: "left",
          label: "Qty",
          field: "qty",
          sortable: true
        },
        {
          name: "categoryDescription",
          align: "left",
          label: "Description",
          field: "categoryDescription",
          sortable: true
        },
        {
          name: "itemName",
          align: "left",
          label: "Item Name",
          field: "itemName",
          sortable: true
        },
        {
          name: "vendor",
          align: "left",
          label: "Vendor",
          field: "vendor",
          sortable: true
        },
        {
          name: "costPerItem",
          align: "left",
          label: "Cost Per Item",
          field: "costPerItem",
          sortable: true
        },
        {
          name: "totalCost",
          align: "left",
          label: "Total Cost",
          field: "totalCost",
          sortable: true
        },
        {
          name: "dateOfPurchase",
          align: "left",
          label: "Date Of Purchase",
          field: "dateOfPurchase",
          sortable: true
        },
        {
          name: "condition",
          align: "left",
          label: "Condition",
          field: "condition",
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
          field: "actions",
          sortable: true
        },
      ],
      filter: '',
      loading: false,
      confirm: false,
      pagination: {
        rowsPerPage: -1,
      },
      schoolYear: null,
      schoolYears: [
        'School Year 20-21',
        'School Year 19-20',
        'School Year 18-19'
      ],
      typeModel: '',
      optionsIdentifier: [
        'Sticker', 'Stamp'
      ],
      optionsCondition: [
        'Excellent', 'Very Good', 'Good', 'Fair', 'Poor'
      ],
      optionsStatus: [
        'Disposed', 'Lost', 'Stolen', 'Transferred', 'Stored'
      ],
      optionsType: [
        'PD', 'FE'
      ],
      typeModel: null,
    }
  },
  methods: {
    openDeleteModal(item) {
      this.item = item
      this.confirm = true
    },
    deleteItem() {
      let item = this.item
      const index = this.data.indexOf(item)
      this.data.splice(index, 1)
    },
    filterType() {
      if(this.typeModel) {
        if(this.typeModel == 'Professional Development') {
          this.data = this.tempDataX.filter(a => a.type == 'PD');
        }else {
          this.data = this.tempDataX.filter(a => a.type == 'FE');
        }
      }else {
        this.data = this.tempDataX
      }
    },
    addEmptyRow() {
      let id = Math.floor(Math.random() * 100)

      let obj = {
        id: id,
        qt0: 0,
        categoryDescription: '',
        itemName: '' ,
        vendor: '',
        identifier: '',
        mpsId: 0,
        serial: parseInt((id * 8) / 4),
        costPerItem: 0,
        totalCost: 0,
        type: 'PD',
        dateOfPurchase: '24-11-2020',
        condition: '',
        location: '',
        classroomOrLocationWithinSchool: '',
        dateAndExplanationOfRemoval: '',
        status: '',
        notes: '',
        // changed: false,
        // showEditButton: true,
      }
      this.data.unshift(obj)
    },
    copyRowData(index) {
      console.log(index)
    },
    copyRow(row, index) {
      // oldObject = JSON.stringify(row)
      // console.log('tempDataX', JSON.stringify(this.data[index]))
      // let old = JSON.stringify(this.data[index])

      // let newData = this.data[index]
      // newData.id =  Math.floor(Math.random() * 50)
      // newData.changed = true
      // let ddd = JSON.stringify(newData)
      // console.log('new data', JSON.stringify(newData))

      // let i = index+1
      
      // this.data.splice(i, 0, JSON.parse(ddd));
      
      // Object.assign(this.data[index], JSON.parse(old));
    },
    detectChange(index) {
      let d = JSON.parse(oldObject)
      // let d = oldObject
      let f = JSON.stringify(this.data[index])
          f = JSON.parse(f)

      console.log('OLD OBJECT', d)
      console.log('NEW OBJECT', f)

      let status = _.isEqual(d, f)
      // console.log('status', status)
      if(status) {
        this.data[index].changed = false
      }else {
        this.data[index].changed = true
      }
    },
    cancellChange(index) {
      let d = JSON.parse(oldObject)
      console.log('ddd =', d)
      Object.assign(this.data[index], d);
      this.data[index].changed = false
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
  },
  created() {
    console.log('Create data function works ...')
    let dataSet = []
    for(let i=0; i<20; i++) {
      let qty = Math.floor(Math.random() * 20)

      let obj = {
        id: i+1,
        qty,
        categoryDescription: 'Comprehension',
        itemName: 'Focus on Understanding Sequence ' + i,
        vendor: 'Curriculum Associates ' + i,
        identifier: 'Stamp',
        mpsId: (i+1) * qty,
        serial: parseInt((qty * 8) / 4),
        costPerItem: qty * 2,
        totalCost: 0,
        type: 'PD',
        dateOfPurchase: '24-11-2020',
        condition: 'Good',
        location: 'Adi-Dassler-Strasse 191074 Herzogenaurach Germany',
        classroomOrLocationWithinSchool: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content',
        dateAndExplanationOfRemoval: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content',
        status: 'Stolen',
        notes: 'Athletes will not settle for average. And neither do we. We have a clear mission: To be the best sports company in the world. Every day, we come to work to create and sell the best sports and fitness products in the world.',
        changed: false,
        showEditButton: true,
      }
      dataSet.push(obj)
    }
    this.data = dataSet
    this.tempDataX = dataSet
  },
  computed: {
    totalCost() {
      let totalCost = 0;
      
      for(let i=0; i<this.data.length; i++) {
        let tc = parseFloat( this.data[i].costPerItem ) * parseFloat( this.data[i].qty )
        totalCost += tc
      }
      return totalCost.toFixed(2)
    },
  }
}
</script>

<style>

._actions.q-btn-dropdown--simple .q-btn-dropdown__arrow {
    margin-left: 0 !important;
}

._actions .q-btn__wrapper {
    padding: 0 5px !important;
}

.white-space-initial {
  white-space: initial;
}

.fixed-height-for-large-text {
    height: 80px;
    overflow-y: auto;
}


</style>